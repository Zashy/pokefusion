!function e(t,r,n){function o(i,s){if(!r[i]){if(!t[i]){var f="function"==typeof require&&require;if(!s&&f)return f(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=r[i]={exports:{}};t[i][0].call(p.exports,function(e){var r=t[i][1][e];return o(r?r:e)},p,p.exports,e,t,r,n)}return r[i].exports}for(var u="function"==typeof require&&require,i=0;i<n.length;i++)o(n[i]);return o}({1:[function(e,t,r){e("./modules/fusion.js")},{"./modules/fusion.js":2}],2:[function(e,t,r){var n=e("./../utility/keyUtil.js"),o=(n.getRandomOrgAPIKey(),new XMLHttpRequest),u={};o.onreadystatechange=processRandomResults,httpRequest.open("POST","https://api.random.org/json-rpc/1/invoke",!0),httpRequest.send(u)},{"./../utility/keyUtil.js":3}],3:[function(e,t,r){},{}]},{},[1]);