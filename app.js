let cookiecount = 0;
let clickvalue = 1;

const cookieValueCont = localStorage.getItem("Cookies");

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
const cookieshop = document.getElementById("cookie-container");
const ownedCookie = document.getElementById("totalcookie");
const earnedcookie = document.getElementById("newcookie");
const resetbutton = document.getElementById("Reset");

let shopItems = [];
async function getshopupgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const data = await response.json();
  shopItems.push(data);
  console.log(shopItems);

  function createinterval() {
    let Interval = setInterval(function () {
      cookiecount = cookiecount + clickvalue;
      ownedCookie.innerText = cookiecount;
      let cookieValue = JSON.stringify(cookiecount);
      localStorage.setItem("Cookies", cookieValue);
    }, 1000);

    let Intervalcps = setInterval(function () {
      earnedcookie.innerText = `${clickvalue} Pcs`;
      let cookiePerSecondValue = JSON.stringify(clickvalue);
      localStorage.setItem("CookiesPerSecond", cookiePerSecondValue);
    }, 1000);
  }
  function readinterval() {
    const retrievedcookie = localStorage.getItem("Cookies");
    console.log(retrievedcookie);
    const parsedcookie = JSON.parse(retrievedcookie);

    cookiecount = parsedcookie;
  }
  function readintervalPerCookie() {
    const retrievedcookiePs = localStorage.getItem("CookiesPerSecond");
    console.log(retrievedcookiePs);
    const parsedcookiePs = JSON.parse(retrievedcookiePs);
    clickvalue = parsedcookiePs;
  }

  const buttonreset = document.createElement("button");
  buttonreset.textContent = "Reset";
  buttonreset.className = "reset-button";
  resetbutton.appendChild(buttonreset);
  buttonreset.addEventListener("click", reset);

  function reset() {
    cookiecount = cookiecount - cookiecount;
    clickvalue = clickvalue - clickvalue + 1;
  }

  const buycookie = document.getElementById("buycookie");
  const cookievalue = document.getElementById("newcookie");
  buycookie.addEventListener("click", buycookies);

  function buycookies() {
    cookiecount = cookiecount + clickvalue;
    ownedCookie.innerHTML = cookiecount;
  }

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

      const cookieCost = document.createElement("p");
      cookieCost.textContent = `£C ${shopItems[0][i].cost}`;
      cookieCost.className = "cookie-cost";
      cookieContainer.appendChild(cookieCost);

      const cookieIncrease = document.createElement("p");
      cookieIncrease.textContent = `${shopItems[0][i].increase} Pcs`;
      cookieIncrease.className = "cookie-increase";
      cookieContainer.appendChild(cookieIncrease);

      const buyButton = document.createElement("button");
      buyButton.textContent = "Buy";
      buyButton.className = "buy-button";
      buyButton.addEventListener("click", buycookiefunction);
      cookieContainer.appendChild(buyButton);

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
    }
  }

  shopitemdetail();
  readinterval();
  readintervalPerCookie();
  createinterval();
}
getshopupgrades();

//localStorage.clear();
