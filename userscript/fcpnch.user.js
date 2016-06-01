// ==UserScript==
// @name          fcpn.ch
// @author        Lenny. (@ohitsLenny)
// @namespace     fcpn.ch
// @version       1.1
// @description   This will add a buton to shorten and copy links
// @include       *facepunch.com/showthread*
// @require       jquery.js
// @resource      fpnchcss fcpnch.css
// @grant         GM_setClipboard
// @grant         GM_getResourceText
// @grant         GM_addStyle
// @run-at document-idle
// ==/UserScript==

var myCss = GM_getResourceText("fpnchcss");
GM_addStyle(myCss);

var lookUp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function base62(n, b) {
    var res = [];
    do {
        var idk = n % b;
        res.unshift(lookUp.charAt(idk));
        n = Math.floor(n / b);
    } while (n > 0);
    return res.join("");
}

var shortner = document.createElement("a");
shortner.innerHTML = "shortn";
shortner.className = "fcpnchBtn";

$(".nodecontrols").prepend(shortner);

$(".fcpnchBtn").click(function(event) {
    var postID = $(this).next()[0].name;
    postID = Number(postID.replace("post", ""));

    var shortPostID = base62(postID, 62);

    var toCopy = "http://fcpn.ch/" + shortPostID;
    GM_setClipboard(toCopy);
});
