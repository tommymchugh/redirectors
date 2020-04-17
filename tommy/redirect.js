// Copyright 2020 Tommy McHugh
'use strict';

const paths = {
  "drive": {
    "url": "https://drive.google.com/a/u.northwestern.edu"
  },
  "github": {
    "url": "https://github.com/tommymchugh"
  },
  "mail": {
    "url": "https://mail.google.com/a/u.northwestern.edu"
  },
  "calendar": {
    "url": "https://calendar.google.com"
  },
  "itl": {
    "url": "https://github.com/inclusivetechnu/itl",
    "issues": {
      "url": "https://github.com/inclusivetechnu/itl/issues"
    },
    "pr": {
      "url": "https://github.com/inclusivetechnu/itl/pulls"
    },
    "commits": {
      "url": "https://github.com/InclusiveTechNU/itl/commits/master"
    },
    "status": {
      "url": "https://travis-ci.com/InclusiveTechNU/itl"
    }
  },
  "dtr": {
    "url": "https://calendar.google.com",
    "studio": {
      "url": "https://northwestern.zoom.us/j/108696191?pwd=SGNkaEp5UnlBc1MzbHVxU1NOL1cwdz09"
    }
  },
};

const redirectHandler = "tommy";
const httpHandler = `://${redirectHandler}/`;

const performRequest = (path) => {
  const components = path.split("/");
  let urlObject = paths;
  for (let i = 0; i < components.length; i++) {
    urlObject = urlObject[components[i]];
  }
  return urlObject.url;
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