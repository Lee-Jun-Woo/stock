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

function modifyStock(event) {
  const stock = event.target.parentElement;
  const id = parseInt(stock.id);
  let idx = 0;
  for (let i = 0; i < stocks.length; i++) {
    if (stocks[i]["id"] === id) {
      idx = i;
    }
  }

  const random = Math.random();
  let product = 0;
  if (random < 0.1) {
    product = 2;
  } else if (random < 0.3) {
    product = 1.4;
  } else if (random < 0.55) {
    product = 0.8;
  } else if (random < 0.8) {
    product = 0.7;
  } else {
    product = 0.5;
  }
  stocks[idx]["pri"] *= product;
  saveStocks();
  location.reload();
}

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
  modifyButton.addEventListener("click", modifyStock);

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
