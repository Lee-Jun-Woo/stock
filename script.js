const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const submit = document.querySelector("#final");
const stockList = document.querySelector("ul");
const reset = document.querySelector("#reset");

let stocks = [];

function number(str) {
  const num = parseFloat(str);
  if (!isNaN(num) && num > 0) {
    return num;
  } else {
    return -1;
  }
}

function deleteStock(event) {
  const stock = event.target.parentElement;
  stock.remove();
}

function paintStock(name, price) {
  const stock = document.createElement("li");
  const stockContent = document.createElement("span");
  const deleteButton = document.createElement("button");

  stockContent.innerText = `${name}: ${Math.round(price)}준우`;
  deleteButton.innerText = "삭제 (지금은 작동 X)";
  // deleteButton.addEventListener("click", deleteStock);

  stock.appendChild(stockContent);
  stock.appendChild(deleteButton);
  stockList.appendChild(stock);
}

function saveStocks() {
  localStorage.setItem("stocks", JSON.stringify(stocks));
  console.log("saved");
}

function HandleCreate() {
  const name = nameInput.value;
  const price = number(priceInput.value);
  nameInput.value = "";
  priceInput.value = "";

  if (name !== "" && price > 0) {
    const obj = { nam: name, pri: price };
    stocks.push(obj);
    paintStock(name, price);
    saveStocks();
  }
}

submit.addEventListener("click", HandleCreate);

function loadStocks(item) {
  const name = item["nam"];
  const price = item["pri"];
  paintStock(name, price);
}

const savedStocks = localStorage.getItem("stocks");
if (savedStocks) {
  const parsedStocks = JSON.parse(savedStocks);
  stocks = parsedStocks;
  parsedStocks.forEach(loadStocks);
}

function resetStocks() {
  localStorage.removeItem("stocks");
  location.reload();
}

reset.addEventListener("click", resetStocks);
