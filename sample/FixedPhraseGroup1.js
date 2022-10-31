"use strict";

/*
    定型文の第1階層
*/
class FixedPhraseGroup1 {
    constructor() {
        Object.defineProperty(this, "CSV_FILE_PATH", {value : "./data/fixed_phrase_group1.csv"});
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
            option.value = isNaN(item[0]) ? item[0] : parseInt(item[0]);
            option.textContent = item[1];
            fragment.appendChild(option);
        });

        document.getElementById("FixedPhraseGroup1").append(fragment);
    }
}