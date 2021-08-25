
const usersList = document.querySelector('.users'),
  buttons = document.querySelector('.buttons'),
  userName = document.querySelector('#userName'),
  users = JSON.parse(localStorage.getItem('users')) || [],

  optionsOfDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };


const addToStorage = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

const getName = () => {
  const fullName = prompt('Введите имя и фамилию через пробел:');
  if (fullName.length === 0 || fullName.split(' ').length !== 2) {
    alert('Неверный ввод. Попробуйте ещё раз');
    getName();
  } else {
    return fullName.split(' ');
  }
};

const getLogin = () => {
  const login = prompt('Введите логин (от 5 символов):');
  if (login.length < 5) {
    alert('Логин должен быть длиннее 5 символов');
    getLogin();
  } else {
    return login;
  }
};

const getPassword = user => {
  const password = prompt('Введите пароль (от 5 символов):');
  if (password.length < 5) {
    alert('Пароль должен быть длиннее 5 символов');
    getPassword(user);
  } else {
    return password;
  }
};

const checkUser = login => {
  let user;
  users.forEach(elem => {
    if (elem.login === login) {
      user = elem;
    }
  });
  return user;
};

const displayUserOnPage = user => {
  const li = document.createElement('li');
  li.classList.add('user');
  li.setAttribute('data-key', user.key);
  li.insertAdjacentHTML('beforeend', `
    <span>Имя: ${user.name}, фамилия: ${user.surname}, зарегистрирован: ${user.date}</span>
    <button class="remove">Удалить</button>
  `);
  usersList.append(li);
};

const removeUser = item => {
  const key = item.getAttribute('data-key');
  users.forEach(user => {
    if (user.key === key) {
      users.splice(users.indexOf(user), 1);
      addToStorage();
    }
  });
};
const cangeUserName = name => {
  userName.textContent = name;
};

const authorization = () => {
  console.log('authorization');

  let user = checkUser(getLogin());
  while (!user) {
    alert('Пользователя с таким логином нет в базе, повторите');
    user = checkUser(getLogin());
  }
  let password = getPassword();
  while (user.password !== password) {
    alert('Неверный пароль');
    password = getPassword();
  }
  cangeUserName(user.name);
};

const registration = () => {
  console.log('registration');
  const newUser = {};

  const fullName = getName();
  newUser.name = fullName[0];
  newUser.surname = fullName[1];

  let login = getLogin();
  while (checkUser(login)) {
    alert('Пользователь с таким логином уже существует, придумайте новый');
    login = getLogin();
  }
  newUser.login = login;

  newUser.password = getPassword();
  newUser.date = new Date().toLocaleString("ru", optionsOfDate);

  newUser.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  users.push(newUser);
  addToStorage();
  displayUserOnPage(newUser);
};


users.forEach(user => {
  displayUserOnPage(user);
});

buttons.addEventListener('click', event => {
  const target = event.target;
  if (target.id === 'authorization') authorization(users);
  if (target.id === 'registration') registration();
});

usersList.addEventListener('click', event => {
  const target = event.target;
  if (target.matches('.remove')) {
    removeUser(target.closest('li'));
    target.closest('li').remove();
  }
});
