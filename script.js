'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.56, 250.34, -300.67, 5000, -850, -110, -170, 1100],
  interest: 1.5, // %
  pin: 1111,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
    '2024-03-09T11:42:26.371Z',
    '2023-05-21T07:43:59.331Z',
    '2023-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2024-03-02T14:43:31.074Z',
    '2024-03-29T11:24:19.761Z',
    '2024-04-15T10:45:23.907Z',
    '2024-04-22T12:17:46.255Z',
    '2024-04-12T15:14:06.486Z',
    '2024-04-09T11:42:26.371Z',
    '2024-04-21T07:43:59.331Z',
    '2024-04-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
    '2024-03-09T11:42:26.371Z',
    '2023-05-21T07:43:59.331Z',
    '2023-06-22T15:21:20.814Z',
  ],
  currency: 'AED',
  locale: 'ar-AE',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2024-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
  ],
  // currency: 'CAD',
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const account6 = {
  userName: 'Mitia Balinov',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 6666,
  transactionsDates: [
    '2023-10-02T14:43:31.074Z',
    '2023-10-29T11:24:19.761Z',
    '2023-11-15T10:45:23.907Z',
    '2024-01-22T12:17:46.255Z',
    '2024-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// 191 Операции С Датами В Приложении
const formaTransDate = function (date, locale) {
  const getDaysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  // Math.abs абсолютне - отримали дати з дробами , Math.round - округлили, відкинули дроби
  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // 189 Добавляем Даты В Приложение
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;
    // 192
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// 194
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayTransaction = function (account, sort = false) {
  containerTransactions.innerHTML = ''; // clean

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]); // строку преобразовали в об'єкт Date і можемо вибрати дані дати
    const tranDate = formaTransDate(date, account.locale);
    // 194
    const formaTrans = formatCurrency(trans, account.locale, account.currency);

    // 155. Вычисление Nicknames

    const transactionRow = `  
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
         <div class="transactions__date">${tranDate}</div>
          <div class="transactions__value">  ${formaTrans} </div>
        </div>
    `;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

// 155. Вычисление Nicknames
// фун-я для перебору і ств нікнеймів
const creatNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(world => world[0])
      .join('');
  });
};
creatNicknames(accounts);
console.log(accounts);

// const userName = 'Oliver Avila'; // nickname = oa
// const nickname = userName
//   .toLowerCase()
//   .split(' ')
//   .map(function (world) {
//     return world[0];
//   })
//   .join('');
// // сплит-раздилитель пробелом / потім мар щоб взяти перші літери. потім джоїн щоб ці літери з'єднати.
// console.log(nickname); // оа

// const shortNick = userName
//   .toLowerCase()
//   .split(' ')
//   .map(world => world[0])
//   .join('');
// console.log(shortNick);
//// чат gpt HELP
// const firstLetters = nickname.map(nickname => nickname.charAt(0));
// console.log(firstLetters); //  (2) ['o', 'a']
// const result = firstLetters.join('');
// console.log(result); //oa

// 158 Отображаем баланс в приложении

const dislayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};
dislayBalance(account1);

// 162. Method Chaining В Приложении

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  );

  const withdrawsTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = formatCurrency(
    withdrawsTotal,
    account.locale,
    account.currency
  );

  // bank give % of deposite - labelSumInterest
  const interesTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurrency(
    interesTotal,
    account.locale,
    account.currency
  );
};
////////////////////////////
const updateUI = function (account) {
  // відображати транзакції
  displayTransaction(account);

  // відображати баланс
  dislayBalance(account);

  // відобразити ітого
  displayTotal(account);
};
////////////
// 166. Имплементация Login   // 196 глобальна для таймера
let currentAccount, currentLogOutTimeer; // оприділили глобально, бо в ін фун-ях, нам треба знати який поточний користувач і всі його параметри рахунку

// // 189 always login щоб постійно не логінитись. зробити шо залогінені
// currentAccount = account2;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
/////////////////////////////////////////

// 196. Имплементация Обратного Отсчёта
const startLogoutTimer = function () {
  const logCallBAck = function () {
    // trunc відкидує дробну частину. хв стартують з 0 тому треба огорнути в Стрінг і викликати педСтарт
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');

    labelTimer.textContent = `${min}:${sec}`;
    // показувати час що залишився в UI
    // labelTimer.textContent = time;

    // labelTimer.textContent = `${Math.trunc(time / 60)}:${time % 60}`;

    // зупинити таймер і вийти з застосунку
    if (time === 0) {
      clearInterval(logoutTime); // це фун-я для зупинки setInterval  передати його ім'я
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--; //зменшувати таймер на одиницю це -1 або -- . і ще щоб виходити коли таймер 0 сек а не 1 сек, це опустили після if
  };
  // установити час виходу через 5 хв
  let time = 300;

  // виклик таймера кожну сек
  logCallBAck();
  const logoutTime = setInterval(logCallBAck, 1000); //так як setInterval викликається через секунду, то ми всі дії перенесли в окрeму фун-ю, яку передали Інтервалу як аргумент
  return logoutTime;
};

////////////////// even handlers обработчики событий ////////////////////////

//у формах добре те, коли курсор в інпуті (заповнив дані) і нажимаєш ентер = ідентично кліку на кнопку (воно спрацьовує як клік на кнопку) запускається обработчік собитій
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //// отменить поведение по умолчанию, не буде отправка формы и перезагрузка страницы

  //
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );
  console.log(currentAccount);
  // ?. - оператор опшинал чейнінг. метод find якщо не знаходить елемент по умові повертає андефайнд, щоб не було помилки провіримо чи існує currentAccount оператором ?.
  if (currentAccount?.pin === +inputLoginPin.value) {
    // відображати ЮІ і велкам меседж
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Welcome back ${
      currentAccount.userName.split(' ')[0]
    }!`;

    // //189 правильний формат 02/05/2025 а не 2/5/2025 тому додамо padStart
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;

    // 192  Интернационализация Дат
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', // лонг-це назва,'numeric'-це число, '2-digit'-теж число
      year: 'numeric',
      weekday: 'long',
    };
    // Intl це пространство імен де теж є певні об'єкти, фун-ї і тд . ТУТ labelDate - locale ми ств в ручну, а можна отримувати з браузера
    //const locale = navigator.language; // uk - українська в браузері
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);

    // clear input after enter
    inputLoginUsername.value = '';
    inputLoginUsername.blur();
    inputLoginPin.value = ''; //курсор залишається тут
    inputLoginPin.blur(); // забирає курсор

    // провірка чи існує TIMER
    if (currentLogOutTimeer) clearInterval(currentLogOutTimeer); // для очистки попереднього таймера
    currentLogOutTimeer = startLogoutTimer();

    let hint = document.querySelector('.hint');
    hint.style.display = 'none';
    updateUI(currentAccount);
  }
});
/////// 167. Имплементация Transfers

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );
  console.log(recipientAccount);
  inputTransferTo.value = ''; // пуста строка без пробела
  inputTransferAmount.value = '';
  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    //add transaction
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    //add trans date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    //update UI
    updateUI(currentAccount);

    // 196 скидуємо-перезапускаємо таймер
    clearInterval(currentLogOutTimeer);
    currentLogOutTimeer = startLogoutTimer();
  }
});

/////// 168 findIndex()
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseNickname.value === currentAccount.nickname &&
    Number(inputClosePin.value) === currentAccount.pin /////// НЕ ЗАБУВАЄМ!!! з імпута отримуєм строку тому треба пін перевести в число
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    ); /// цей вираз повертає тру або фолс. для кожного елементу масиву провіряється цей вираз. для першого елементу якому цей вираз = тру, ІНДЕКС  ЦЬОГО елемента повертається з метода findIndex. в даному випадку ми поміщаємо цей індекс в змінну currentAccountIndex.

    accounts.splice(currentAccountIndex, 1);
    ///// 1 - бо удаляємо 1 цей елемент

    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт';
  }
  inputCloseNickname.value = '';
  inputClosePin.value = '';
});
/////// find і findIndex мають доступ до самого елемента, індекса і всього масиву

// 170. Запрос Займа
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value); //округлюємо суму щоб без дробів

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = '';
  // 196 скидуємо-перезапускаємо таймер
  clearInterval(currentLogOutTimeer);
  currentLogOutTimeer = startLogoutTimer();
});

// 173. Сортируем Транзакции В Приложении
// при кліку на btnSort щоб транзакції по зростанню ставали, ще 1 клік - поевертались до попереднього(по даті)
// змінна стану буде "наглядати" сортуємо чи ні масив. ств глобал
let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransaction(currentAccount, !transactionsSorted); /// true = пока часткове але працююче рішення
  transactionsSorted = !transactionsSorted;
});

//175 Array.from() приклад роботи
////вибираємо всі суми по кліку на картинку
// const logoIm = document.querySelector('.logo');
// logoIm.addEventListener('click', function () {
//   const transactionUi = document.querySelectorAll('.transactions__value'); // nodeList це не масив.
//   console.log(transactionUi); //  NodeList(8)
//   const transactionUiArr = Array.from(transactionUi); // перетворили в масив з div.transactions__value
//   console.log(transactionUiArr.map(elem => Number(elem.textContent))); // вибрали всі суми як числа
//   // коротша версія ⬇️ бо в Array 2им аргументом можна вставити колбек функцію та шо там⬆️ у мар
//   const transactionUiArr1 = Array.from(transactionUi, elem =>
//     Number(elem.textContent)
//   );
//   console.log(transactionUiArr1);
// });

// // 186 Используем Оператор Остаток В Приложении || замалювати в зелений
// const logoImf = document.querySelector('.logo');
// logoIm.addEventListener('click', function () {
//   [...document.querySelectorAll('.transactions__row')].forEach(function (
//     row,
//     i
//   ) {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = '#b7d433';
//     }
//   });
// });
