const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const errorMsg = document.getElementById('errorMsg');
const lengthInput = document.getElementById('length');
const uppercaseInput = document.getElementById('uppercase');
const lowercaseInput = document.getElementById('lowercase');
const numbersInput = document.getElementById('numbers');
const symbolsInput = document.getElementById('symbols');
const passwordInput = document.getElementById('password');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-={}[]:";\'<>?,./|\\';

function generatePassword() {
  let password = '';
  let charPool = '';

  if (uppercaseInput.checked) {
    charPool += uppercaseChars;
  }
  if (lowercaseInput.checked) {
    charPool += lowercaseChars;
  }
  if (numbersInput.checked) {
    charPool += numberChars;
  }
  if (symbolsInput.checked) {
    charPool += symbolChars;
  }

  if (charPool.length === 0) {
    errorMsg.classList.remove('d-none');
    passwordInput.value = '';
    return;
  }

  errorMsg.classList.add('d-none');

  for (let i = 0; i < lengthInput.value; i++) {
    password += charPool.charAt(Math.floor(Math.random() * charPool.length));
  }

  passwordInput.value = password;
}

function copyPassword() {
  passwordInput.select();
  document.execCommand('copy');
  copyMsg.classList.remove('d-none');
  setTimeout(() => {
    copyMsg.classList.add('d-none');
  }, 1000);
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
