"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const fpg1 = new FixedPhraseGroup1();
    const fpg2 = new FixedPhraseGroup2();
    // const fp = new FixedPhrase();

    const fpg1_element = document.getElementById("FixedPhraseGroup1");
    const fpg2_element = document.getElementById("FixedPhraseGroup2");
    const fp_element = document.getElementById("FixedPhrase");

    const fpg1_items = fpg1.ReadItems();
    fpg1.SetOptionInSelect(fpg1_items);
    fpg1.SetContentInFixedPhrase(fpg1_items);

    const fpg2_items = fpg2.ReadItems();
    fpg2.SetOptionInSelect(fpg2_items);
    fpg2.SetContentInFirstLevelOfFixedPhrase(fpg2_items);

    fpg1_element.addEventListener("change", (e) => {
        fpg2_element.disabled = e.target.value == 0;
        fpg2_element.value = 0;

        for(let i = 0; i < fpg2_element.options.length; i++) {
            const item = fpg2_element.options[i];

            if(item.dataset.group1_id == e.target.value) {
                item.style.display = "block"
            }
            else {
                item.style.display = "none";
            }
        }
    });
});