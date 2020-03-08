let steamUrl = "";
const tokens = window.location.href.split("/");

if (tokens[3] !== "app") {
  checkURLs();
} else {
  gamePage();
}

function checkURLs() {
  const links = document.getElementsByTagName("a");
  links.forEach(e => {
    const linkTokens = e.split("/");
    if (linkTokens[3] === "app") {
      f;
    }
  });
}

function gamePage() {
  tokens.forEach((e, i) => {
    if (i < 5) {
      steamUrl += e + "/";
    }
  });
  steamUrl = steamUrl.slice(0, steamUrl.length - 1);

  const date = new Date();
  const updateDate = new Date(localStorage.getItem("updateDate"));
  updateGamePage(date, updateDate);
}

function updateGamePage(date, updateDate) {
  if (
    !(
      !updateDate ||
      date.getFullYear() > updateDate.getFullYear() ||
      date.getMonth() > updateDate.getMonth() ||
      date.getDay() > updateDate.getDay()
    )
  ) {
    const gameData = localStorage.getItem("gameData");
    checkGame(JSON.parse(gameData));
  } else {
    fetchDataAndUpdate();
  }
}

function fetchDataAndUpdate() {
  fetch(
    "https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON"
  )
    .then(response => response.json())
    .then(out => {
      localStorage.setItem("updateDate", new Date().toISOString());
      localStorage.setItem("gameData", JSON.stringify(out));
      console.log("saved updated game data.");
      checkGame(out);
    });
}

function checkGame(data) {
  let found = false;

  const name = document.querySelector("div.apphub_AppName");

  for (let i = 0; i < data.length; i++) {
    if (data[i].steamUrl === steamUrl || data[i].title === name.innerHTML) {
      found = data[i];
      break;
    }
  }

  if (found) {
    name.innerHTML +=
      '<span style="vertical-align: middle; font-size: 13px; color: #7f997a; margin-left: 10px;">This game is available on GeForce Now.';
  } else {
    name.innerHTML +=
      '<span style="vertical-align: middle; font-size: 13px; color: #bf7c7c; margin-left: 10px;">This game is not available on GeForce Now.';
  }
}
