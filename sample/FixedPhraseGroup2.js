"use strict";

/*
    定型文の第2階層
*/
class FixedPhraseGroup2 {
    constructor() {
        Object.defineProperty(this, "CSV_FILE_PATH", {value : "./data/fixed_phrase_group2.csv"});
        this.SetOptions();
    }

    /*
        CSVファイルの内容を読み込む
        ※CSVReader.jsに依存している
    */
    async ReadItems() {
        try {
            const response = await CSVReader.Read(this.CSV_FILE_PATH);
            return CSVReader.ConvertCSVToCSVLines(response);
        }
        catch(error) {
            console.log(error);
        }
    }

    /*
        読み込んだCSVファイルの内容をselectに追加
    */
    async SetOptions() {
        const items = await this.ReadItems();
        const fragment = document.createDocumentFragment();
        items.forEach((item, index) => {
            if(index == 0) {
                return;
            }
            const option = document.createElement("option");
            option.dataset.group1_id = isNaN(item[0]) ? item[0] : parseInt(item[0]);
            option.value = isNaN(item[1]) ? item[1] : parseInt(item[1]);
            option.textContent = item[2];
            fragment.appendChild(option);
        });

        document.getElementById("FixedPhraseGroup2").append(fragment);
    }
}