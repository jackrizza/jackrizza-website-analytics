'use strict';

var data = require('./data.js');
var now = require("performance-now");
var json = require('./json.js');


var slugCount = (url) => {
        switch (url) {
                case "index":
                        dateData[2][0] = dateData[2][0] + 1
                        break;
                case "admin":
                        dateData[2][1] = dateData[2][1] + 1
                        break;
                case "work":
                        dateData[2][2] = dateData[2][2] + 1
                        break;
                case "login":
                        dateData[2][3] = dateData[2][3] + 1
                        break;
                default:
                        return;
        }
}
// array(0) => dates
// array(1) => totalViews for array(0) dates
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
var start = '';
var end = '';
var analyze = new Promise((resolve, reject) => {
        start = now()
        data.init();
        setTimeout(() => {
                console.log("Analyzing data...");
                data._statsGetter().filter((a) => {
                        slugCount(JSON.parse(a).url)
                        a = JSON.parse(a);
                        var time = a.time.split(' ')[0];
                        if (dateData[0].includes(time)) {
                                var b = dateData[0].indexOf(time);
                                dateData[1][b] = dateData[1][b] + 1;
                        } else {
                                perDayData[0].push(time);
                                dateData[0].push(time)
                                dateData[1].push(1);
                        }
                });
                // console.log(dateData);
                resolve('Sucsess');
        }, 2000);

}).then(() => {
        console.log('==========starttest==========');
        for( var i = 0; i < dateData[0].length; i++) {
                //((a < b) ? 2 : 3);
                console.log("total views on " + dateData[0][i] + " is " + dateData[1][i] + ((dateData[1][i] === 1) ? " view" : " views") );
        }
        console.log('==========endtest==========');
        json.init();
        end = now();
        var time = end.toFixed(3) - start.toFixed(3);
        var done = console.log("Elapsed Time : " + time);
        process.exit();
});

module.exports = analyze;