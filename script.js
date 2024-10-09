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
  const id = parseInt(stock.id);
  stocks = stocks.filter(function (item) {
    return item["id"] !== id;
  });
  saveStocks();
}

function modifyStock(event) {}

function paintStock(obj) {
  const stock = document.createElement("li");
  const stockContent = document.createElement("span");
  const modifyButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  stock.id = obj["id"];
  stockContent.innerText = `${obj["nam"]}: ${Math.round(obj["pri"])}준우`;
  modifyButton.innerText = "주가 갱신";
  deleteButton.innerText = "삭제";
  deleteButton.addEventListener("click", deleteStock);
  // modifyButton.addEventListener("click", modifyStock);

  stock.appendChild(stockContent);
  stock.appendChild(modifyButton);
  stock.appendChild(deleteButton);
  stockList.appendChild(stock);
}

function saveStocks() {
  localStorage.setItem("stocks", JSON.stringify(stocks));
}

function HandleCreate() {
  const name = nameInput.value;
  const price = number(priceInput.value);
  nameInput.value = "";
  priceInput.value = "";

  if (name !== "" && price > 0) {
    const obj = { nam: name, pri: price, id: Date.now() };
    stocks.push(obj);
    paintStock(obj);
    saveStocks();
  }
}

submit.addEventListener("click", HandleCreate);

const savedStocks = localStorage.getItem("stocks");
if (savedStocks) {
  const parsedStocks = JSON.parse(savedStocks);
  stocks = parsedStocks;
  parsedStocks.forEach(paintStock);
}

function resetStocks() {
  localStorage.removeItem("stocks");
  location.reload();
}

reset.addEventListener("click", resetStocks);
