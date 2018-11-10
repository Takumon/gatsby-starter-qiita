/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.5.0"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-249a95510c551ecbd0da.js"
  },
  {
    "url": "app-1b1aadb11d2b90792575.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-9c88d686516c3299937a.js"
  },
  {
    "url": "index.html",
    "revision": "409c694f24575f7d0c57e1302a1e2409"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "14f4e787ba28716968b16eed59a23c3b"
  },
  {
    "url": "0.a327d153219dce8f5630.css"
  },
  {
    "url": "component---src-pages-index-js.5b3dc63a45b213e05e7a.css"
  },
  {
    "url": "component---src-pages-index-js-ad8f3d0b95dd4b85d744.js"
  },
  {
    "url": "0-187f6b47a30213241321.js"
  },
  {
    "url": "static/d/673/path---index-6a9-fOFbyC6eKOZI90hn4fgDcdGDE.json",
    "revision": "196892f984c4e1bd448f3a609a5f2d2e"
  },
  {
    "url": "component---src-pages-404-js-f28b7050d51a8c475c94.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "f96b84cb8ddaad8d1b198dd1bc990583"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/gatsby-starter-qiita/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});