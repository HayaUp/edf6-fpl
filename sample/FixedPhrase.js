"use strict";

/*
    定型文
*/
class FixedPhrase {
    constructor() {
        Object.defineProperty(this, "CSV_FILE_PATH", {value : "./data/fixed_phrase.csv"});
        this.SetItems();
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
        読み込んだCSVファイルの内容を検索結果に追加
    */
    async SetItems(csv_lines) {
        if(csv_lines == null) {
            return;
        }

        csv_lines.then((items) => {
            items.forEach((item, index) => {
                if(index == 0) {
                    return;
                }

                const fp = this.ConvertCSVToObject(item);
                const li = this.CreateFixedPhraseElement(fp);

                this.AddHasVoiceElement(li, li.dataset.has_ranger_voice, "ranger");
                this.AddHasVoiceElement(li, li.dataset.has_wingdiver_voice, "wingdiver");

                const target = document.querySelector(`li[data-group1_id="${fp.FixedPhraseGroup1ID}"][data-group2_id="${fp.FixedPhraseGroup2ID}"]`);

                if(target.childElementCount == 0) {
                    const ul = document.createElement("ul");
                    ul.appendChild(li);
                    target.appendChild(ul);
                }
                else {
                    target.querySelector("ul").appendChild(li);
                }
            });
        });
    }

    /*
        CSVを定型文オブジェクトに変換する
    */
    ConvertCSVToObject(item) {
        return {
            FixedPhraseGroup1ID : item[0],
            FixedPhraseGroup2ID : item[1],
            ID                  : item[2],
            Name                : item[3],
            HasRangerVoice      : item[4] == "1",
            HasWingDiverVoice   : item[5] == "1",
        };
    }

    /*
        定型文DOMを作成する
    */
    CreateFixedPhraseElement(fp) {
        const li = document.createElement("li");
        li.dataset.group1_id = fp.FixedPhraseGroup1ID;
        li.dataset.group2_id = fp.FixedPhraseGroup2ID;
        li.dataset.id = fp.id;
        li.textContent = fp.Name;
        li.dataset.has_ranger_voice = fp.HasRangerVoice;
        li.dataset.has_wingdiver_voice = fp.HasWingDiverVoice;
        return li;
    }

    /*
        音声付き定型文であればアイコン(DOM)を追加する
    */
    AddHasVoiceElement(fixed_phrase_element, has_voice, soldier_name) {
        if(has_voice != "true") {
            return;
        }
        const has_voice_element = document.createElement("span");
        has_voice_element.textContent = "volume_up";
        has_voice_element.classList.add("material-icons");

        if(soldier_name == "ranger") {
            has_voice_element.classList.add("has_ranger_voice");
        }
        else if(soldier_name == "wingdiver") {
            has_voice_element.classList.add("has_wingdiver_voice");
        }

        fixed_phrase_element.appendChild(has_voice_element);
    }

    /*
        検索結果の文を作成する
    */
    CreateSearchResultMessage(items) {
        const count_items = items.length - 1;
        const count_voice = items.filter((item) => item[4] == "1" || item[5] == "1").length;
        return `定型文は${count_items}個(内、音声付きは${count_voice}個)あります。`;
    }
}