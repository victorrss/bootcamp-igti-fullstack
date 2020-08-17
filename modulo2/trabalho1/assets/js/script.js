'use strict';

window.addEventListener('load', start);

function start() {
    let rgRed = document.querySelector("#rgRed");
    let rgGreen = document.querySelector("#rgGreen");
    let rgBlue = document.querySelector("#rgBlue");

    onChangeRange(rgRed.value, rgGreen.value, rgBlue.value);

    rgRed.addEventListener('input', onChangeRange);
    rgGreen.addEventListener('input', onChangeRange);
    rgBlue.addEventListener('input', onChangeRange);
}

function onChangeRange() {
    let txtRed = document.querySelector("#txtRed");
    let txtGreen = document.querySelector("#txtGreen");
    let txtBlue = document.querySelector("#txtBlue");

    txtRed.value = rgRed.value;
    txtGreen.value = rgGreen.value;
    txtBlue.value = rgBlue.value;

    let colorBox = document.querySelector(".color-box");
    colorBox.style.backgroundColor = `rgb(${[rgRed.value, rgGreen.value, rgBlue.value].join(',')})`;
}