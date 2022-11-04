"use strict";

/*
    定型文の第1階層
*/
class FixedPhraseGroup1 {
    constructor() {
        Object.defineProperty(this, "CSV_FILE_PATH", {value : "./data/fixed_phrase_group1.csv"});
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

            document.getElementById("FixedPhraseGroup1").append(fragment);
        });
    }

    /*
        selectに追加するoptionを作る
    */
    #CreateOptionElement(data) {
        const option = document.createElement("option");
        option.value = data.ID;
        option.textContent = data.Name;
        return option;
    }

    /*
        読み込んだCSVをオブジェクトへ変換する
    */
    ConvertCSVToObject(csv_line) {
        return {
            ID      : csv_line[0],
            Name    : csv_line[1]
        };
    }

    /*
        読み込んだCSVの内容を定型文に指定する
    */
    SetContentInFixedPhrase(csv_lines) {
        if(csv_lines == null) {
            return;
        }

        csv_lines.then((items) => {
            const fragment = document.createDocumentFragment();
            const ul = document.createElement("ul");
            items.forEach((item, index) => {
                if(index == 0) {
                    return;
                }

                const data = this.ConvertCSVToObject(item);
                const li = this.#CreateListItemElement(data);
                ul.appendChild(li);
            });

            fragment.appendChild(ul);
            document.getElementById("FixedPhrase").append(fragment);
        });
    }

    /*
        ulに追加するliを作る
    */
    #CreateListItemElement(data) {
        const li = document.createElement("li");
        li.dataset.group1_id = data.ID;
        li.textContent = data.Name;
        return li;
    }
}