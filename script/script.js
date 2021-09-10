const preloader = document.getElementById("preload"),
  input = document.getElementById('select-cities'),
  defaultList = document.querySelector('.dropdown-lists__list--default'),
  selectList = document.querySelector('.dropdown-lists__list--select'),
  autocompleteList = document.querySelector('.dropdown-lists__list--autocomplete'),
  button = document.querySelector('.button');

let countries = [];
button.style.pointerEvents = 'none';

const animatePreloader = elem => {
  elem.style.opacity = 1;
  const interval = setInterval(() => {
    elem.style.opacity -= 0.01;
    if (elem.style.opacity <= 0.01) {
      clearInterval(interval);
      preloader.style.display = "none";
    }
  }, 15);
};

const getAllInfo = () => {
  fetch("./db_cities.json")
    .then(response => {
      if (response.status !== 200) throw new Error("Status network not 200");
      animatePreloader(preloader);
      return response.json();
    })
    .then(data => {
      countries = data['RU'];
      return data;
    })
    .catch(error => console.error(error));
};
getAllInfo();



const fillDefaultList = () => {
  let listHTML = '<div class="dropdown-lists__col">';
  countries.forEach(country => {
    country['cities'].sort((a, b) => b.count - a.count);
    listHTML += `
      <div class="dropdown-lists__countryBlock">
        <div class="dropdown-lists__total-line" data-country="${country['country']}">
          <div class="dropdown-lists__country">${country['country']}</div>
          <div class="dropdown-lists__count">${country['count']}</div>
        </div>
      `;
    for (let i = 0; i < 3; i++) {
      listHTML += `
        <div class="dropdown-lists__line">
          <div class="dropdown-lists__city">${country['cities'][i].name}</div>
          <div class="dropdown-lists__count">${country['cities'][i].count}</div>
        </div>
      `;
    }
  });
  listHTML += '</div></div>';
  defaultList.insertAdjacentHTML("beforeend", listHTML);
};


const getLinks = countries => {
  const cities = document.querySelectorAll('.dropdown-lists__line');
  const closeBTN = document.querySelector('.close-button');
  const lists = document.querySelector('.dropdown-lists');
  const label = document.querySelector('.label');

  cities.forEach(city => {
    city.addEventListener('click', () => {
      input.value = city.querySelector('.dropdown-lists__city').textContent;
      closeBTN.style.display = 'block';
      button.style.pointerEvents = 'auto';
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
    button.style.pointerEvents = 'none';
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

const animateLeft = () => {
  let counter = 0;
  selectList.style.display = 'block';
  selectList.style.transform = 'translateX(200px)';
  const interval = setInterval(() => {
    counter += 10;
    defaultList.style.transform = `translateX(-${counter}px)`;
    selectList.style.transform = `translateX(${400 - counter}px)`;
    if (counter === 400) {
      clearInterval(interval);
      defaultList.style.display = 'none';
    }
  }, 10);
};

const animateRight = () => {
  let counter = 0;
  defaultList.style.display = 'block';
  defaultList.style.transform = 'translateX(-400px)';
  const interval = setInterval(() => {
    counter += 10;
    selectList.style.transform = `translateX(${counter}px)`;
    defaultList.style.transform = `translateX(-${400 - counter}px)`;
    if (counter === 400) {
      clearInterval(interval);
      selectList.style.display = 'none';
    }
  }, 10);
};

const replaceList = data => {
  const wrapper = document.querySelector('.dropdown');
  wrapper.style.overflowX = 'hidden';
  const countriesNames = document.querySelectorAll('.dropdown-lists__total-line');
  countriesNames.forEach(name => {
    name.addEventListener('click', event => {
      const parent = event.target.closest('.dropdown-lists__list');
      if (parent.classList.contains('dropdown-lists__list--default')) {
        selectList.innerHTML = '';
        data.forEach(country => {
          if (country['country'] === name.dataset.country) fillSelectList(country);
        });
        animateLeft();
        getLinks(data);
        replaceList(data);
      } else if (parent.classList.contains('dropdown-lists__list--select')) {
        selectList.innerHTML = '';
        animateRight();
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

    if (input.value !== '') {
      cities.forEach(item => {
        item.innerHTML = item.innerHTML.replace(/<\/?b>/, '');
        const substringIndex = item.textContent.toUpperCase().indexOf(input.value.toUpperCase());
        if (substringIndex === -1) {
          item.classList.add('displayNone');
        } else {
          const substring = item.textContent.slice(substringIndex, substringIndex + input.value.length);
          item.innerHTML = item.innerHTML.replace(substring, `<b>${substring}</b>`);
          item.classList.remove('displayNone');
        }
      });
    }

    if (autocompleteList.querySelectorAll('.displayNone').length === cities.length) {
      autocompleteList.querySelector('.nothing-found').style.display = '';
    } else {
      autocompleteList.querySelector('.nothing-found').style.display = 'none';
    }
  });
};

input.addEventListener('click', () => {
  const defaultList = document.querySelector('.dropdown-lists__list--default');
  if (!defaultList.querySelector('.dropdown-lists__col')) {
    fillDefaultList(countries);
    replaceList(countries);
    autocompleteListHandler(countries);
    getLinks(countries);
  }
  defaultList.style.display = 'block';
});
