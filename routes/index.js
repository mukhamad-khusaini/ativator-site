var express = require("express");
var process = require("process");
var router = express.Router();
var { google } = require("googleapis");
const spreadsheetId = "1NH2KxlnVROWEKzDAa4QIoa0rlFCKP_bkGbG0h_o4VpM";

// get data from spreadsheet
async function getSheetData() {
    const auth = new google.auth.GoogleAuth({
        scopes: "https://www.googleapis.com/auth/spreadsheets",
        credentials: {
            type: "service_account",
            project_id: "ativator",
            private_key_id: "c637878208f0d3399d6fbfa2dfb58dfe23f42c84",
            private_key:
                "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeaC9UqrdSeksJ\neQLaWczmC0H/iDmBDju59Ux9Sk/JkbXnpyGqditsnJxPQITScRD2G7u3+JES5zRY\nBX7xBuc3yHlrU7SUwPh4U+3fXOksqF+xCJkYdI0d17EU/+J8Yh5XREHwAbwE/Cyg\nwHgchf/oHyHXRcF1qkWHn1oZVC0E1+V3sURG21M8a88Y1TLYAJFAUQwSRllkCJw2\nlYpFSL7YtuP3/n7DzHA36HFlxS8fYV47XhKfp7ZAgtvtase+q+7BzsfTlwKpReoJ\n/g+NRs0jFs17B7Ksxo+Eiffojx2aqHVy4P6XpQs1eS9NQGDrb5CSgnayA1hteqwf\nyQYRfn4NAgMBAAECggEAPQiBbArW1XV/Ieg5PC4rb1tZE37GQT5drtmfngqa0VxO\nDTJtG0OqmY+B/lsqkfa0hU7MNicUpobkuSFs9qslPW4Fsl+vDT2Ivrv/w/cFdIpv\nTEO20SBfGud3OFMbTbd0X0VSbooMipMrEsj1vm+22RXdsRcUYiS343h3e5jeO6Xj\n+xi0XZYYgxiNaeOR6gK/0mC/AVycJZsw/lJ4jWxWhGg8n/IuxyUfisLzT/ppHaKF\nn+Jgjy+441gguAuFEI3IpSwT0FL/9PFpUZwZgz5VOUT7tUQR82zT3R2qCRewZ8Pl\nuJGn7JFkr1hjGLBiPvUmcVLnC1IK0ZRSUKvinZKctQKBgQDaMXqCybq+nvm1DhFF\nIwZV6JFEpxBSRTu7+slnVTMrq9fM0enZaDUiTgGbmDuWzT5yljuXMK9Y+8b+XgyU\nLcTkwtNf5PVt7U6Ng40joyC5Y7+E6b9XaXAKmAlbdNp/QTLptteyHirmcSWPvBK0\n9i8BZ4n9PkV+ff4PeWBRCRoOhwKBgQC52rtUGsrFCxb+nRxQwvOK0zd3giCXKW6N\n1crKE9Utdg/LSFwiHYQI527hDAB272yfZs4RIOxhVU9GQW7gr3XqM/owhdMAfm8H\nvTQXTX6hMyXMkIOu4MQxBUPCkvl+FcX81Oljhsum/BiifHN2vTRB7h4X9fdQM5qf\nQXDGNmB/ywKBgBD1o5Yi4/cJGFOwYjtDe6yVxSTW73fVlc0Iszrq7m1IkB+FeW3C\noc6mzY0wigEwttflQYCA8kAyYcdHvCaQYCt/0To067a9qUtqnD/W4CZI0IweNxcu\nRN0t8BxBuvIFOVXdNmrL2X3L8aV4cuPJ9uFfEOS0QGaSmHrPbmMeF/5lAoGANKI9\naxQrWKJLYNAdtMGBN0+Z5b50fFq/dGuXgqMbPESzNF7JuN+jBOKGBDXh68zidkIn\nGbK5PtdqG/tr6zXFrw4JTLSZjQpBZ2+t0OuhcQWLLuO+Z0hAR6G2DuSQw6Rm7bNe\nZVFHW4MJdvrHuFjc8877ts1xvMTghTmDNp8vtQECgYEApikYsinJX5YdrZfZJANk\nWJTgliIZgmLbQ8/0RTuqrWzhIqse8262VzXwAnSZB+/fEMSwmR2m0U5ucEcSQyaE\ni3wSXan7OMGYspx7MzeBp8BzhUo5rwnRMnTKKa/pPIdtMOzvB0A6EHd22Hjae5+B\n6dUa151OJhs9A17N+6pL1Zg=\n-----END PRIVATE KEY-----\n",
            client_email: "ativatordata@ativator.iam.gserviceaccount.com",
            client_id: "106881902705449273618",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/ativatordata%40ativator.iam.gserviceaccount.com",
            universe_domain: "googleapis.com",
        },
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
