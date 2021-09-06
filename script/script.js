const preloader = document.getElementById("preload"),
    filterInput = document.getElementById("filter"),
    search = document.getElementById("search"),
    cardBlock = document.querySelector(".main-container");

// // Функция исчезновения прелоадера
const animate = elem => {
    elem.style.opacity = 1;
    const interval = setInterval(() => {
        elem.style.opacity -= 0.01;
        if (elem.style.opacity <= 0.01) {
            clearInterval(interval);
            preloader.style.display = "none";
        }
    }, 15);
};
window.onload = () => {
    setTimeout(() => {
        animate(preloader);
    }, 500);
};

// Вывод карточек на страницу
const fillCards = data => {
    data.forEach(hero => {
        let description = "";

        for (let [key, value] of Object.entries(hero)) {
            if (key === "movies") {
                value = value.join(", ");
                description += `<li class="item">${key}: <span class="item-value movies">${value}</span></li> \n`;
            } else if (key !== "name" && key !== "photo") {
                description += `<li class="item">${key}: <span class="item-value">${value}</span></li> \n`;
            }
        }

        cardBlock.insertAdjacentHTML(
            "beforeend",
            `
            <div class="card">
                <h2 class="name">${hero["name"]}</h2>
                <div class="about">
                    <img src="${hero["photo"]}" alt="${hero["name"]}" class="photo">
                    <ul class="description">${description}</ul>
                </div>
            </div>
        `
        );
    });
};

// Заполнение селекта с фильмами
const fillFilter = films => {
    films.forEach(film => {
        const newOption = new Option(film, film);
        filterInput.append(newOption);
    });
};

// Получение информации из базы данных
const getAllInfo = () => {
    fetch("../dbHeroes.json")
        .then(response => {
            if (response.status !== 200) throw new Error("Status network not 200");
            return response.json();
        })
        .then(data => {
            const filmsArray = [];
            data.forEach(elem => {
                if (elem["movies"]) filmsArray.push(...elem["movies"]);
            });
            fillFilter(new Set(filmsArray));
            return data;
        })
        .then(data => fillCards(data))
        .catch(error => console.error(error));
};
getAllInfo();


// При выборе фильма скрываем ненужные карточки
filterInput.addEventListener("change", () => {
    search.value = '';
    const film = filterInput.options[filterInput.selectedIndex].value;
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.classList.remove("hidden");
        const heroFilms = card.querySelector(".movies");
        if (heroFilms && film !== "all") {
            if (heroFilms.textContent.indexOf(film) === -1) {
                card.classList.add("hidden");
            }
        }
    });
});


// Задержка поиска
function debounce(f, t) {
    return args => {
        const previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && ((this.lastCall - previousCall) <= t)) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => f(args), t);
    };
}

// Фильтр по имени персонажа
const filterCharacter = () => {
    const string = search.value;
    const cards = document.querySelectorAll(".card");
    const error = document.querySelector('.searchError');
    let countHideCard = 0; // Счетчик скрытых карточек

    cards.forEach(card => {
        card.classList.remove("hidden");
        countHideCard = 0;
    });

    cards.forEach(card => {
        const name = card.querySelector(".name").textContent.toUpperCase();
        if (name.indexOf(string.toUpperCase()) === -1) {
            card.classList.add("hidden");
            countHideCard += 1;
        } else if (error) {
            error.remove();
        }
    });

    if (countHideCard === 50 && !error) { // Если скрыты все карточки
        cardBlock.insertAdjacentHTML("beforeend",
            `<div class="searchError">
                <p> Нет карточек, соответствующих поисковому запросу </p>
                <img class="error-img" src="../img/404.jpg">
            </div>`);
    }
};

const debounceSearch = debounce(filterCharacter, 1000);
search.addEventListener('keydown', () => {
    filterInput.selectedIndex = 0;
    debounceSearch();
});