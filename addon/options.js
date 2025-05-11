const table = document.getElementById("redirectTable").querySelector("tbody");

function loadRedirects() {
  browser.storage.sync.get("redirects").then(({ redirects }) => {
    redirects = redirects || {
      "reddit.com": "https://red.ngn.tf",
      "fandom.com": "https://breezewiki.nadeko.net",
      "medium.com": "https://med.ngn.tf",
    };

    table.innerHTML = "";
    for (let [src, dst] of Object.entries(redirects)) {
      addRow(src, dst);
    }
  });
}

function addRow(src = "", dst = "") {
  const row = table.insertRow();
  const srcCell = row.insertCell();
  const dstCell = row.insertCell();
  srcCell.innerHTML = `<input type="text" value="${src}">`;
  dstCell.innerHTML = `<input type="text" value="${dst}">`;
}

document.getElementById("save").onclick = () => {
  const rows = table.querySelectorAll("tr");
  const redirects = {};
  rows.forEach((row) => {
    const [srcInput, dstInput] = row.querySelectorAll("input");
    if (srcInput.value && dstInput.value) {
      redirects[srcInput.value.trim()] = dstInput.value.trim();
    }
  });
  browser.storage.sync.set({ redirects });
  alert("Saved!");
};

document.getElementById("add").onclick = () => addRow();

loadRedirects();
