var express = require("express");
var process = require("process");
var router = express.Router();
var { google } = require("googleapis");
const spreadsheetId = "1NH2KxlnVROWEKzDAa4QIoa0rlFCKP_bkGbG0h_o4VpM";

// get data from spreadsheet
async function getSheetData() {
    const auth = new google.auth.GoogleAuth({
        scopes: "https://www.googleapis.com/auth/spreadsheets",
        keyFile: `${process.cwd()}\\credentials.json`,
    });

    const client = await auth.getClient();

    const googleSheet = google.sheets({ version: "v4", auth: client });

    const dataSheet = await googleSheet.spreadsheets.values.get({ auth, spreadsheetId, range: "Sheet1" });

    return dataSheet;
}

/* GET home page. */
router.get("/", async function (req, res, next) {
    const dataAch = await getSheetData();

    if (dataAch.data.values.length > 0) {
        const headers = dataAch.data.values[0];
        const result = [];

        for (let i = 1; i < dataAch.data.values.length; i++) {
            const row = dataAch.data.values[i];
            const rowData = {};

            for (let j = 0; j < row.length; j++) {
                const header = headers[j];
                const value = row[j];

                rowData[header] = value;
            }

            result.push(rowData);
        }

        // res.json(result);
        res.render("index", { data: result });
    }
});

module.exports = router;
