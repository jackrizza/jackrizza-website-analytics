'use strict';

var data = require('./data.js');
// array(0) => dates
// array(1) => totalViews
// array(2) => slug count
//      slug (0) => index
//      slug (1) => about
//      slug (2) => login
//      slug (3) => admin
var dateData = [
        [],
        [],
        [0, 0, 0, 0]
];
var perDayData = [
        [],
        []
];

var analyze = () => {
        data.init();
        console.log("Analyzing data...");
        data._statsGetter().filter((a) => {
                slugCount(JSON.parse(a).url)
                a = JSON.parse(a);
                a = a.split(' ')[0];
                if (dateData[0].includes(a.time)) {
                        var b = dateData[0].indexOf(a.time);
                        dateData[1][b] = dateData[1][b] + 1;
                } else {
                        perDayData[0].push(a.time);
                        dateData[0].push(a.time)
                        dateData[1].push(1);
                }
        });

        console.log("====================\n   Views Per Day\n====================")
        for (var i = 0; i < dateData[0].length; i++) {
                console.log(dateData[0][i] + " : " + dateData[1][i]);
        }

        console.log("====================\n   Views Per slug\n====================")
        console.log("Index | About | login | Admin")
        console.log(dateData[2]);
        console.log(perDayData);

        return "It worked";


        // ending program
        // do not delete
        // process.exit();
        //
        //
}
var slugCount = (url) => {
        switch (url) {
                case "index":
                        dateData[2][0] = dateData[2][0] + 1
                        break;
                case "admin":
                        dateData[2][2] = dateData[2][2] + 1
                        break;
                case "work":
                        dateData[2][2] = dateData[2][2] + 1
                        break;
                case "login":
                        dateData[2][3] = dateData[2][3] + 1
                        break;
                default:
                        return 0
        }
}

module.exports = analyze;