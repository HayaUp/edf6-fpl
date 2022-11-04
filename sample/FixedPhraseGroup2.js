"use strict";

/*
    定型文の第2階層
*/
class FixedPhraseGroup2 {
    constructor() {
        Object.defineProperty(this, "CSV_FILE_PATH", {value : "./data/fixed_phrase_group2.csv"});
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
        selectにoptionを指定する
    */
    SetOptionInSelect(csv_lines) {
        if(csv_lines == null) {
            return;
        }

        csv_lines.then((items) => {
            const fragment = document.createDocumentFragment();
            items.forEach((item, index) => {
                if(index == 0) {
                    return;
                }

                const data = this.ConvertCSVToObject(item);
                const option = this.#CreateOptionElement(data);
                fragment.appendChild(option);
            });

            document.getElementById("FixedPhraseGroup2").append(fragment);
        });
    }

    /*
        selectに追加するoptionを作る
    */
    #CreateOptionElement(data) {
        const option = document.createElement("option");
        option.value = data.ID;
        option.dataset.group1_id = data.GROUP1_ID;
        option.textContent = data.Name;
        return option;
    }

    /*
        読み込んだCSVをオブジェクトへ変換する
    */
    ConvertCSVToObject(csv_line) {
        return {
            GROUP1_ID   : csv_line[0],
            ID          : csv_line[1],
            Name        : csv_line[2]
        };
    }
}