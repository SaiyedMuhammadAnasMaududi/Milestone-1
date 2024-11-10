"use strict";
var togglebutton = document.getElementById('togglebutton');
var toggleelement = document.getElementById('toggleelement');
togglebutton.addEventListener("click", () => {
    if (toggleelement.style.display === 'none') {
        toggleelement.style.display = 'block';
    }
    else {
        toggleelement.style.display = "none";
    }
});
