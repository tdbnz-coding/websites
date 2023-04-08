const lengthInput = document.getElementById("length");
const generateButton = document.getElementById("generate");
const passwordInput = document.getElementById("password");
const copyButton = document.getElementById("copy");

generateButton.addEventListener("click", () => {
  const length = lengthInput.value;
  const password = generatePassword(length);
  passwordInput.value = password;
  document.getElementById("password-container").style.display = "block";
});

copyButton.addEventListener("click", () => {
  passwordInput.select();
  passwordInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Password copied to clipboard!");
});

function generatePassword(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}
