const signupContainer = document.getElementById("signup-container");
const signinContainer = document.getElementById("signin-container");
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");
const username = document.getElementById("username");
const usernameHint = document.getElementById("username-hint");
const signupEmail = document.getElementById("signup-email");
const signupEmailHint = document.getElementById("signupemail-hint");
const signupPassword = document.getElementById("signup-password");
const signupPasswordHint = document.getElementById("signuppassword-hint");
const confirmPassword = document.getElementById("cpassword");
const confirmPasswordHint = document.getElementById("cpassword-hint");
const signinEmail = document.getElementById("signin-email");
const signinEmailHint = document.getElementById("signinemail-hint");
const signinPassword = document.getElementById("signin-password");
const signinPasswordHint = document.getElementById("signinpassword-hint");
const signupBtn = document.getElementById("signup-btn");
const signinBtn = document.getElementById("signin-btn");
const successMsg = document.getElementById("success-msg");
const signinLink = document.getElementById("signin-link");
const signupLink = document.getElementById("signup-link");
const showPassword = document.getElementById("showsignup-pw");
const hidePassword = document.getElementById("hidesignup-pw");
const showCpassword = document.getElementById("showsignup-cpw");
const hideCpassword = document.getElementById("hidesignup-cpw");
const showSigninPw = document.getElementById("showsignin-pw");
const hideSigninPw = document.getElementById("hidesignin-pw");

// Regex patterns
const userPattern = /^[A-za-z0-9_]{3,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// input validation function
function validateForm(
  inputField,
  hint,
  pattern,
  defaultHint,
  successMemo,
  errorMsg,
) {
  if (inputField.value === "") {
    inputField.classList.remove("valid", "invalid");
    hint.textContent = defaultHint;
    hint.classList.remove("valid-text", "invalid-text");
    return;
  }
  if (pattern.test(inputField.value)) {
    inputField.classList.add("valid");
    inputField.classList.remove("invalid");
    hint.textContent = successMemo;
    hint.classList.add("valid-text");
    hint.classList.remove("invalid-text");
  } else {
    inputField.classList.remove("valid");
    inputField.classList.add("invalid");
    hint.textContent = errorMsg;
    hint.classList.remove("valid-text");
    hint.classList.add("invalid-text");
  }
}

// Button update
function updateSignupBtn() {
  const validUsername = userPattern.test(username.value);
  const validEmail = emailPattern.test(signupEmail.value);
  const validPassword = passwordPattern.test(signupPassword.value);
  const validCpassword =
    confirmPassword.value === signupPassword.value && confirmPassword !== "";
  if (validUsername && validEmail && validPassword && validCpassword) {
    signupBtn.disabled = false;
  } else {
    signupBtn.disabled = true;
  }
}

function updateSigninBtn() {
  const validSigninEmail = emailPattern.test(signinEmail.value);
  const validSigninPassword = passwordPattern.test(signinPassword.value);
  if (validSigninEmail && validSigninPassword) {
    signinBtn.disabled = false;
  } else {
    signinBtn.disabled = true;
  }
}

// looping through each field by grouping them into an array and accessing the array method "for..of"

const signupFields = [
  {
    inputField: username,
    hint: usernameHint,
    pattern: userPattern,
    defaultHint: "3-15 characters. Letters, numbers, underscores only",
    successMemo: " valid credentials ✓",
    errorMsg: "3-15 characters. Letters, numbers, underscores only❗",
  },
  {
    inputField: signupEmail,
    hint: signupEmailHint,
    pattern: emailPattern,
    defaultHint: "Please enter a valid email",
    successMemo: " valid credentials ✓",
    errorMsg: "Please enter a valid email❗",
  },
  {
    inputField: signupPassword,
    hint: signupPasswordHint,
    pattern: passwordPattern,
    defaultHint: "Min 8 chars with 1 uppercase, 1 number, 1 special char.",
    successMemo: " valid credentials ✓",
    errorMsg: "3-15 characters. Letters, numbers, underscores only❗",
  },
  {
    inputField: confirmPassword,
    hint: confirmPasswordHint,
    pattern: {
      test: () =>
        confirmPassword.value === signupPassword.value &&
        confirmPassword !== "" &&
        passwordPattern.test(signupPassword.value),
    },
    defaultHint: "",
    successMemo: "Password matches ✓",
    errorMsg: "Incorrect password❗",
  },
];
for (const field of signupFields) {
  field.inputField.addEventListener("input", () => {
    validateForm(
      field.inputField,
      field.hint,
      field.pattern,
      field.defaultHint,
      field.successMemo,
      field.errorMsg,
    );
    updateSignupBtn();
  });
}

function passwordToggle(inputField, showIcon, hideIcon) {
  hideIcon.addEventListener("click", () => {
    inputField.type = "text";
    hideIcon.classList.add("hidden");
    showIcon.classList.remove("hidden");
  });
  showIcon.addEventListener("click", () => {
    inputField.type = "password";
    showIcon.classList.add("hidden");
    hideIcon.classList.remove("hidden");
  });
}

// for signup password
passwordToggle(signupPassword, showPassword, hidePassword);

// for confirm password
passwordToggle(confirmPassword, showCpassword, hideCpassword);

// for signin password
passwordToggle(signinPassword, showSigninPw, hideSigninPw);

signupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = {
    username: username.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  console.log(formData);
  if (signupFields) {
    signupContainer.classList.add("hidden");
    successMsg.classList.remove("hidden");
  }
  setTimeout(() => {
    location.href = "https://www.vephla.com";
  }, 5000);
});

signinLink.addEventListener("click", () => {
  signupContainer.classList.add("hidden");
  signinContainer.classList.remove("hidden");
});

signupLink.addEventListener("click", () => {
  signinContainer.classList.add("hidden");
  signupContainer.classList.remove("hidden");
});

const signinFields = [
  {
    inputField: signinEmail,
    hint: signinEmailHint,
    pattern: emailPattern,
    defaultHint: "Enter your valid email",
    successMemo: "✓",
    errorMsg: "Please enter a valid email❗",
  },
  {
    inputField: signinPassword,
    hint: signinPasswordHint,
    pattern: passwordPattern,
    defaultHint: "Enter your designated password",
    successMemo: "✓",
    errorMsg: "Please enter your valid password❗",
  },
];
for (const fieldInput of signinFields) {
  fieldInput.inputField.addEventListener("input", () => {
    validateForm(
      fieldInput.inputField,
      fieldInput.hint,
      fieldInput.pattern,
      fieldInput.defaultHint,
      fieldInput.successMemo,
      fieldInput.errorMsg,
    );
    updateSigninBtn();
  });
}

signinForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

// confirmPassword.addEventListener("input", () => {
//   if (
//     confirmPassword.value === signupPassword.value &&
//     confirmPassword.value !== ""
//   ) {
//     confirmPassword.classList.add("valid");
//     confirmPassword.classList.remove("invalid");
//     confirmPasswordHint.textContent = "Password matches ✓";
//     confirmPasswordHint.classList.add("valid-text");
//     confirmPasswordHint.classList.remove("invalid-text");
//   } else {
//     confirmPassword.classList.add("invalid");
//     confirmPassword.classList.remove("valid");
//     confirmPasswordHint.textContent = "Incorrect match❗";
//     confirmPasswordHint.classList.add("invalid-text");
//     confirmPasswordHint.classList.remove("valid-text");
//   }
// });
