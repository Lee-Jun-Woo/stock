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

function makeRandom() {
  const r = Math.random();
  return r * 2 - 1;
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

  let flow = stocks[idx]["flo"];
  flow += makeRandom() * 0.05;
  flow = Math.tanh(12 * flow) / 20;
  stocks[idx]["flo"] = flow;
  let price = stocks[idx]["pri"];
  price *= 1 + flow + makeRandom() * 0.03;
  price = Math.tanh(0.025 * (price - 50)) / 0.025 + 50;
  stocks[idx]["pri"] = price;

  saveStocks();
  location.reload();
}

function paintStock(obj) {
  const stock = document.createElement("li");
  const stockContent = document.createElement("span");
  const modifyButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  stock.id = obj["id"];
  stockContent.innerText = `${obj["nam"]}: ${
    Math.round(obj["pri"] * 10) / 10
  }준우`;
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

  if (name !== "" && 15 <= price && price <= 95) {
    const obj = { nam: name, pri: price, flo: 0, id: Date.now() };
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
