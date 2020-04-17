// Copyright 2020 Tommy McHugh
'use strict';

const paths = {
  "drive": {
    "url": "https://drive.google.com/a/u.northwestern.edu"
  },
  "github": {
    "url": "https://github.com/tommymchugh"
  },
};

const redirectHandler = "tommy";
const httpHandler = `://${redirectHandler}/`;

const performRequest = (path) => {
  const components = path.split("/");
  return paths[components[0]].url;
};

chrome.webRequest.onBeforeRequest.addListener((details) => {
  if (details.method === "GET" && details.initiator !== "null") {
    const path = details.url.substring(details.url.indexOf(httpHandler)+httpHandler.length);
    const redirectURL = performRequest(path);
    chrome.tabs.update({
      "url": redirectURL
    });
  }
}, {urls: ["https://tommy/*", "http://tommy/*"]});