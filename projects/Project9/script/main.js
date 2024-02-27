const contentContainer = document.getElementById("content-container");

window.addEventListener("load", loadFromLocalStorage);

function addElement() {
  const elementType = document.getElementById("element-type-select").value;
  const elementWidth = document.getElementById("element-width").value;
  const elementWidthUnit = document.getElementById("element-width-unit").value;
  const elementHeight = document.getElementById("element-height").value;
  const elementHeightUnit = document.getElementById("element-height-unit").value;
  const elementBgColor = document.getElementById("element-background-color").value;
  const elementBorderStyle = document.getElementById("element-border-style").value;
  const elementContent = document.getElementById("content").value;
  let textColor = document.getElementById("textColor").value;
  const newElement = document.createElement(elementType);

  newElement.style.width = `${elementWidth}${elementWidthUnit}`;
  newElement.style.height = `${elementHeight}${elementHeightUnit}`;
  newElement.style.backgroundColor = elementBgColor;
  newElement.style.border = `1px ${elementBorderStyle} black`;
  newElement.textContent = elementContent;
  newElement.style.color = textColor;

  contentContainer.appendChild(newElement);
}

function clearBoard() {
  contentContainer.innerHTML = "";
}

function saveToLocalStorage() {
  localStorage.setItem("savedContent", contentContainer.innerHTML);
}

function loadFromLocalStorage() {
  const savedContent = localStorage.getItem("savedContent");
  if (savedContent) {
    contentContainer.innerHTML = savedContent;
  }
}
