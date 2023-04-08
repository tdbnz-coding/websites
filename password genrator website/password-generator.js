function generatePassword() {
  var length = parseInt(document.getElementById("length").value);
  var uppercase = document.getElementById("uppercase").checked;
  var lowercase = document.getElementById("lowercase").checked;
  var numbers = document.getElementById("numbers").checked;
  var symbols = document.getElementById("symbols").checked;
  var password = "";

  var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  var numberChars = "0123456789";
  var symbolChars = "!@#$%^&*()_+";

  var allChars = "";

  if (uppercase) {
    allChars += uppercaseChars;
  }

  if (lowercase) {
    allChars += lowercaseChars;
  }

  if (numbers) {
    allChars += numberChars;
  }

  if (symbols) {
    allChars += symbolChars;
  }

  for (var i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password;
}

document.getElementById("generate").addEventListener("click", function() {
  var password = generatePassword();
  document.getElementById("password").value = password;
});
