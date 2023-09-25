import "./style.css";

const form = document.querySelector("form");
const email = document.getElementById("mail");
const country = document.getElementById("country");
const zipCode = document.getElementById("zipCode");
const password = document.getElementById("password");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");
const passwordConf = document.getElementById("passwordConf");

function checkEmail() {
  if (email.validity.valueMissing) {
    email.setCustomValidity("You need to enter an email address");
  } else if (email.validity.typeMismatch) {
    email.setCustomValidity("Entered value needs to be an email address");
  } else if (email.validity.tooShort) {
    email.setCustomValidity(
      `Email should be at least ${email.minLength} characters; you entered ${email.value.length}`
    );
  } else {
    email.setCustomValidity("");
  }
}

function checkZIP() {
  const constraints = {
    "": ["[a-zA-Z]", "Must Enter Country Code"],
    usa: ["[0-9]{5}", "US ZIPs must have exactly 5 digits: 98103 or 53558"],
    ca: [
      "[A-Za-z]{1}[0-9]{1}[A-Za-z]{1} [0-9]{1}[A-Za-z]{1}[0-9]{1}",
      "Canadian ZIPs must follow this pattern A1A 1A1.",
    ],
    mx: ["[0-9]{5}", "Mexican ZIPs must have exactly 5 digits: 77507 or 01049"],
  };

  const countryValue = document.getElementById("country").value;
  const constraint = new RegExp(constraints[countryValue][0], "");

  if (zipCode.validity.valueMissing) {
    zipCode.setCustomValidity("You need to enter a Zip Code");
  } else if (constraint.test(zipCode.value)) {
    zipCode.setCustomValidity("");
  } else {
    zipCode.setCustomValidity(constraints[countryValue][1]);
  }
}

function checkPassword() {
  const passValue = document.getElementById("password").value;
  const passValueConf = document.getElementById("passwordConf").value;
  if (passValue !== passValueConf) {
    passwordConf.setCustomValidity("Passwords do not match");
  } else {
    passwordConf.setCustomValidity("");
  }
}

password.onfocus = function () {
  document.getElementById("message").style.display = "block";
};
password.onblur = function () {
  document.getElementById("message").style.display = "none";
};

password.onkeyup = function () {
  const lowerCaseLetters = /[a-z]/g;
  if (password.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  const upperCaseLetters = /[A-Z]/g;
  if (password.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  const numbers = /[0-9]/g;
  if (password.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  if (password.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};

window.onload = () => {
  country.onchange = checkZIP;
  zipCode.oninput = checkZIP;
  email.oninput = checkEmail;
  passwordConf.oninput = checkPassword;
};

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    checkEmail();
    event.preventDefault();
  }
  if (!zipCode.validity.valid) {
    checkZIP();
    event.preventDefault();
  }
  if (!password.validity.valid) {
    checkPassword();
    event.preventDefault();
  }
  if (!passwordConf.validity.valid) {
    checkPassword();
    event.preventDefault();
  }
});
