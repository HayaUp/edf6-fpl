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
    async SetItems() {
        const items = await this.ReadItems();
        const fragment = document.createDocumentFragment();
        items.forEach((item, index) => {
            if(index == 0) {
                return;
            }

            const fp = this.ConvertCSVToObject(item);
            const div = this.CreateFixedPhraseElement(fp);

            this.AddHasVoiceElement(div, div.dataset.has_ranger_voice);
            this.AddHasVoiceElement(div, div.dataset.has_wingdiver_voice);
            fragment.appendChild(div);
        });

        document.getElementById("FixedPhrase").append(fragment);
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
        const div = document.createElement("div");
        div.dataset.group1_id = fp.FixedPhraseGroup1ID;
        div.dataset.group2_id = fp.FixedPhraseGroup2ID;
        div.dataset.id = fp.id;
        div.textContent = fp.Name;
        div.dataset.has_ranger_voice = fp.HasRangerVoice;
        div.dataset.has_wingdiver_voice = fp.HasWingDiverVoice;
        return div;
    }

    /*
        音声付き定型文であればアイコン(DOM)を追加する
    */
    AddHasVoiceElement(fixed_phrase_element, has_voice) {
        if(has_voice != "true") {
            return;
        }
        const has_voice_element = document.createElement("span");
        has_voice_element.textContent = "volume_up";
        has_voice_element.classList.add("material-icons");
        fixed_phrase_element.appendChild(has_voice_element);
    }
}