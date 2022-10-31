"use strict";

class CSVReader {
    static Read(file_path) {
        return fetch(file_path).then((response) => {
            if(response.ok) {
                return response.text();
            }
            throw new Error("Error Read CSV File.");
        });
    }

    static ConvertCSVToCSVLines(csv) {
        return csv.split("\r\n").map((item) => item.split(","));
    }
}