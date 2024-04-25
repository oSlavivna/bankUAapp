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
  transactions: [630, 800, 300, -50, 120],
  interest: 1.3,
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
  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

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

    const date = new Date(account.transactionsDates[index]);
    const tranDate = formaTransDate(date, account.locale);

    const formaTrans = formatCurrency(trans, account.locale, account.currency);

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
const updateUI = function (account) {
  displayTransaction(account);

  dislayBalance(account);

  displayTotal(account);
};
let currentAccount, currentLogOutTimeer;
const startLogoutTimer = function () {
  const logCallBAck = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');

    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(logoutTime);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--;
  };
  let time = 300;

  logCallBAck();
  const logoutTime = setInterval(logCallBAck, 1000);
  return logoutTime;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `З поверненням ${
      currentAccount.userName.split(' ')[0]
    }!`;

    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);

    inputLoginUsername.value = '';
    inputLoginUsername.blur();
    inputLoginPin.value = '';
    inputLoginPin.blur();

    if (currentLogOutTimeer) clearInterval(currentLogOutTimeer);
    currentLogOutTimeer = startLogoutTimer();

    let hint = document.querySelector('.hint');
    hint.style.display = 'none';
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );
  console.log(recipientAccount);
  inputTransferTo.value = '';
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

    clearInterval(currentLogOutTimeer);
    currentLogOutTimeer = startLogoutTimer();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseNickname.value === currentAccount.nickname &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Ввійдіть в свій кабінет';
  }
  inputCloseNickname.value = '';
  inputClosePin.value = '';
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

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

  clearInterval(currentLogOutTimeer);
  currentLogOutTimeer = startLogoutTimer();
});

let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransaction(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
