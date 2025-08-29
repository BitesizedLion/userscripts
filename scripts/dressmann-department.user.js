// ==UserScript==
// @name         Dressmann department filter
// @namespace    https://github.com/BitesizedLion/userscripts
// @version      1.0
// @description  Automatically applies the department filter on Dressmann
// @author       BitesizedLion
// @match        https://dressmann.com/sv/klader/*
// @grant        none
// ==/UserScript==

(function() {
    const hash = "#custom.searchdepartment=Dressmann";

    if (!window.location.hash.includes("custom.searchdepartment=Dressmann")) {
        window.location.replace(window.location.href.split("#")[0] + hash);
    }
})();
