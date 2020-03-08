let steamUrl = "";
window.location.href.split("/").forEach((e, i) => {
  if (i < 5) {
    steamUrl += e + "/";
  }
});

steamUrl = steamUrl.slice(0, steamUrl.length - 1);
fetch(
  "https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json?JSON"
)
  .then(response => response.json())
  .then(out => {
    let found = false;

    const name = document.querySelector("div.apphub_AppName");

    for (let i = 0; i < out.length; i++) {
      if (out[i].steamUrl === steamUrl || out[i].title === name.innerHTML) {
        found = out[i];
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
  });
