const input = document.getElementById('select-cities'),
  defaultList = document.querySelector('.dropdown-lists__list--default'),
  selectList = document.querySelector('.dropdown-lists__list--select'),
  autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete');



const getCitiesHTML = cities => {
  cities.sort((a, b) => b.count - a.count);
  let citiesHTML = '';
  for (let i = 0; i < 3; i++) {
    citiesHTML += `
      <div class="dropdown-lists__line">
        <div class="dropdown-lists__city">${cities[i].name}</div>
        <div class="dropdown-lists__count">${cities[i].count}</div>
      </div>
      `;
  }
  return citiesHTML;
};

const fillDefaultList = countries => {
  let listHTML = '<div class="dropdown-lists__col">';
  countries.forEach(country => {
    listHTML += `
      <div class="dropdown-lists__countryBlock">
        <div class="dropdown-lists__total-line" data-country="${country['country']}">
          <div class="dropdown-lists__country">${country['country']}</div>
          <div class="dropdown-lists__count">${country['count']}</div>
        </div>
        ${getCitiesHTML(country['cities'])}
      `;
  });
  listHTML += '</div></div>';
  defaultList.insertAdjacentHTML("beforeend", listHTML);
};


const getLinks = countries => {
  const cities = document.querySelectorAll('.dropdown-lists__line');
  const closeBTN = document.querySelector('.close-button');
  const button = document.querySelector('.button');
  const lists = document.querySelector('.dropdown-lists');
  const label = document.querySelector('.label');

  cities.forEach(city => {
    city.addEventListener('click', () => {
      input.value = city.querySelector('.dropdown-lists__city').textContent;
      closeBTN.style.display = 'block';
      countries.forEach(country => {
        country.cities.forEach(city => {
          if (city.name === input.value) button.setAttribute('href', city.link);
        });
      });
      Array.from(lists.children).forEach(list => list.style.display = 'none');
      label.style.display = 'none';
    });
  });

  closeBTN.addEventListener('click', () => {
    input.value = '';
    label.style.display = '';
    button.setAttribute('href', '#');
    closeBTN.style.display = 'none';
  });
};


const fillSelectList = country => {
  let listHTML = `
    <div class="dropdown-lists__col">
      <div class="dropdown-lists__countryBlock">
        <div class="dropdown-lists__total-line" data-country="${country['country']}">
          <div class="dropdown-lists__country">${country['country']}</div>
          <div class="dropdown-lists__count">${country['count']}</div>
        </div>
  `;

  country.cities.forEach(city => {
    listHTML += `
      <div class="dropdown-lists__line">
        <div class="dropdown-lists__city">${city.name}</div>
        <div class="dropdown-lists__count">${city.count}</div>
      </div>
    `;
  });

  listHTML += '</div></div>';
  selectList.insertAdjacentHTML("beforeend", listHTML);
};

const replaceList = data => {
  const countriesNames = document.querySelectorAll('.dropdown-lists__total-line');
  countriesNames.forEach(name => {
    name.addEventListener('click', event => {
      const parent = event.target.closest('.dropdown-lists__list');
      if (parent.classList.contains('dropdown-lists__list--default')) {
        selectList.innerHTML = '';
        parent.style.display = 'none';
        data.forEach(country => {
          if (country['country'] === name.dataset.country) fillSelectList(country);
        });
        selectList.style.display = 'block';
        getLinks(data);
        replaceList(data);
      } else if (parent.classList.contains('dropdown-lists__list--select')) {
        selectList.style.display = 'none';
        selectList.innerHTML = '';
        defaultList.style.display = 'block';
      }
    });
  });
};

const fillAutocompleteList = countries => {
  let listHTML = '<div class="dropdown-lists__col">';
  countries.forEach(country => {
    country.cities.forEach(city => {
      listHTML += `
      <div class="dropdown-lists__line">
        <div class="dropdown-lists__city">${city.name}</div>
        <div class="dropdown-lists__count">${city.count}</div>
      </div>
    `;
    });
  });
  listHTML += '<div class="nothing-found" style="display:none">Ничего не найдено</div></div></div>';
  autocompleteList.insertAdjacentHTML("beforeend", listHTML);
};

const autocompleteListHandler = data => {
  fillAutocompleteList(data);
  let counterOfKeyDown = 0;
  const cities = autocompleteList.querySelectorAll('.dropdown-lists__line');

  input.addEventListener('keyup', () => {
    getLinks(data);
    if (counterOfKeyDown === 0) {
      defaultList.style.display = 'none';
      autocompleteList.style.display = 'block';
      counterOfKeyDown = 1;
    } else if (input.value === '') {
      defaultList.style.display = '';
      autocompleteList.style.display = 'none';
      counterOfKeyDown = 0;
    }
    cities.forEach(item => {
      const substring = item.textContent.toUpperCase().indexOf(input.value.toUpperCase());
      if (substring === -1) {
        item.classList.add('displayNone');
      } else {
        item.classList.remove('displayNone');
      }
    });

    if (autocompleteList.querySelectorAll('.displayNone').length === cities.length) {
      autocompleteList.querySelector('.nothing-found').style.display = '';
    } else {
      autocompleteList.querySelector('.nothing-found').style.display = 'none';
    }
  });
};

const getAllInfo = () => {
  fetch("./db_cities.json")
    .then(response => {
      if (response.status !== 200) throw new Error("Status network not 200");
      return response.json();
    })
    .then(data => {
      fillDefaultList(data['RU']);
      defaultList.style.display = 'block';
      return data;
    })
    .then(data => {
      replaceList(data['RU']);
      return data;
    })
    .then(data => {
      autocompleteListHandler(data['RU']);
      return data;
    })
    .then(data => {
      getLinks(data['RU']);
      return data;
    })
    .catch(error => console.error(error));
};

input.addEventListener('click', () => {
  const defaultList = document.querySelector('.dropdown-lists__list--default');
  if (defaultList.querySelector('.dropdown-lists__col')) {
    defaultList.style.display = 'block';
  } else {
    getAllInfo();
  }
});
