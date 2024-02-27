const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (input) => {
  const numericInput = input.replace(/[^0-9]/g, "");
  document.getElementById("number").value = numericInput;
};
document.getElementById("number").addEventListener("input", (event) => {
  validatePhoneNumber(event.target.value);
});

const validateForm = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const content = document.getElementById("content").value;

  if (name === "" || !validateEmail(email) || number === "" || content === "") {
    alert("Please fill in all the fields with valid information.");
  } else {
    alert("Form submitted successfully!");
    document.getElementById("contactForm").reset();
  }
};
