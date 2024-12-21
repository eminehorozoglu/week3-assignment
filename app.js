
let cookiecount = 0;
let clickvalue = 1;

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
const cookieshop = document.getElementById("cookie-container");
const ownedCookie = document.getElementById("totalcookie");
const earnedcookie = document.getElementById("newcookie");

let shopItems = [];
async function getshopupgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  shopItems.push(data);
  console.log(shopItems);

  function shopitemdetail() {
    for (let i = 0; i < shopItems[0].length; i++) {
      console.log(i);
      const cookieContainer = document.createElement("div");
      cookieContainer.className = "cookie-container";
      cookieshop.appendChild(cookieContainer);

      const cookieItem = document.createElement("h3");
      cookieItem.textContent = `${shopItems[0][i].name}`;
      cookieItem.className = "upgrade-item";
      cookieContainer.appendChild(cookieItem);

      const cookieIncrease = document.createElement("p");
      cookieIncrease.textContent = `${shopItems[0][i].increase} Pcs`;
      cookieIncrease.className = "cookie-increase";
      cookieContainer.appendChild(cookieIncrease);

      const cookieCost = document.createElement("p");
      cookieCost.textContent = `£C ${shopItems[0][i].cost}`;
      cookieCost.className = "cookie-cost";
      cookieContainer.appendChild(cookieCost);

      const buyButton = document.createElement("button");
      buyButton.textContent = "Buy";
      buyButton.className = "buy-button";
      buyButton.addEventListener("click", buycookiefunction);

      async function buycookiefunction() {
        if (cookiecount < shopItems[0][i].cost) {
          alert("Not enough money!");
        } else if (cookiecount >= shopItems[0][i].cost) {
          cookiecount = sub(cookiecount, shopItems[0][i].cost);
          clickvalue = add(clickvalue, shopItems[0][i].increase);
        }

        console.log(cookiecount);
        console.log(clickvalue);
      }
      cookieContainer.appendChild(buyButton);
    }
  }
  shopitemdetail();
}
getshopupgrades();

const buycookie = document.getElementById("buycookie");
const cookievalue = document.getElementById("newcookie");
buycookie.addEventListener("click", buycookies);

function buycookies() {
  cookiecount = cookiecount + clickvalue;
  ownedCookie.innerHTML = cookiecount;
}

let Interval = setInterval(function () {
  cookiecount = cookiecount + clickvalue;
  ownedCookie.innerText = cookiecount;
}, 1000);
console.log(cookiecount);

let Intervalcps = setInterval(function () {
  earnedcookie.innerText = `${clickvalue} Pcs`;
}, 1000);
console.log(clickvalue);

localStorage.setItem("cookies", stringifiedCookie);
