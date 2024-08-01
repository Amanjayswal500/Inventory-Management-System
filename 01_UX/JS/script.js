const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitButton = document.getElementById("submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  let hasErrors = false;

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "") {
    setError(email, "Email is required");
    hasErrors = true;
    return;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Please enter a valid email address");
    hasErrors = true;
    return;
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
    hasErrors = true;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
    hasErrors = true;
  } else {
    setSuccess(password);
  }

  if (!hasErrors) {
    window.location.href = "blank.html"; // Redirect to a blank page
  }
};

// Clear error messages and styles on input focus
email.addEventListener("focus", () => {
  setSuccess(email);
});

password.addEventListener("focus", () => {
  setSuccess(password);
});

document.getElementById("themeToggle").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});
