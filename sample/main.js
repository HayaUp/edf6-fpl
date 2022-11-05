"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const fpg1 = new FixedPhraseGroup1();
    const fpg2 = new FixedPhraseGroup2();
    const fp = new FixedPhrase();

    const fpg1_element = document.getElementById("FixedPhraseGroup1");
    const fpg2_element = document.getElementById("FixedPhraseGroup2");
    const fp_element = document.getElementById("FixedPhrase");

    const fpg1_items = fpg1.ReadItems();
    fpg1.SetOptionInSelect(fpg1_items);
    fpg1.SetContentInFixedPhrase(fpg1_items);

    const fpg2_items = fpg2.ReadItems();
    fpg2.SetOptionInSelect(fpg2_items);
    fpg2.SetContentInFirstLevelOfFixedPhrase(fpg2_items);

    const fp_items = fp.ReadItems();
    fp.SetItems(fp_items);

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

        // 全ての要素を表示する
        if(e.target.value == 0) {
            const targets = document.querySelectorAll("li");
            targets.forEach((target) => {
                target.style.display = "list-item";
            });
        }
    });

    fpg2_element.addEventListener("change", (e) => {
        const group1_id = fpg1_element.value;
        const group2_id = e.target.value;

        const targets = document.querySelectorAll(`li[data-group1_id="${group1_id}"],li[data-group2_id="${group2_id}"]`);
        targets.forEach((target) => {
            target.style.display = "list-item";
        });

        const not_targets = document.querySelectorAll(`li[data-group1_id]:not(li[data-group1_id="${group1_id}"]),li[data-group2_id]:not(li[data-group2_id="${group2_id}"])`);
        not_targets.forEach((not_target) => {
            not_target.style.display = "none";
        });
    });

    // レンジャーの音声付き定型文の表示・非表示を処理する
    const HasRangerVoice = document.getElementById("HasRangerVoice");
    HasRangerVoice.addEventListener("change", (e) => {
        const checked = e.target.checked;

        if(checked) {
            const targets = document.querySelectorAll(`li[data-has_ranger_voice="${checked}"]`);
            targets.forEach((target) => {
                target.style.display = "list-item";
            });

            const not_targets = document.querySelectorAll(`li[data-has_ranger_voice]:not([data-has_ranger_voice="${checked}"])`);
            not_targets.forEach((not_target) => {
                not_target.style.display = "none";
            });
        }
        else {
            const targets = document.querySelectorAll("li[style='display: none;']");
            targets.forEach((target) => {
                target.style.display = "list-item";
            });
        }
    });
});