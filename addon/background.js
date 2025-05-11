const defaultRedirects = {
  "reddit.com": "https://red.ngn.tf",
  "fandom.com": "https://breezewiki.nadeko.net",
  "medium.com": "https://med.ngn.tf",
};

let redirects = { ...defaultRedirects };

// Load saved redirects once at startup
browser.storage.sync.get("redirects").then((data) => {
  if (data.redirects) redirects = data.redirects;
});

// Listen for updates from the options page
browser.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.redirects) {
    redirects = changes.redirects.newValue || defaultRedirects;
  }
});

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(details.url);
    for (let key in redirects) {
      if (url.hostname.includes(key)) {
        const newUrl = redirects[key] + url.pathname + url.search;
        return { redirectUrl: newUrl };
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"],
);
