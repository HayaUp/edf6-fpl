"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const fpg1 = new FixedPhraseGroup1();
    const fpg2 = new FixedPhraseGroup2();

    const fpg1_element = document.getElementById("FixedPhraseGroup1");
    const fpg2_element = document.getElementById("FixedPhraseGroup2");

    fpg1_element.addEventListener("change", (e) => {
        fpg2_element.disabled = e.target.value == 0;
        fpg2_element.value = 0;

        for(let i = 0; i < hoge2.options.length; i++) {
            const item = hoge2.options[i];

            if(item.dataset.group1_id == e.target.value) {
                item.style.display = "block"
            }
            else {
                item.style.display = "none";
            }
        }
    });});