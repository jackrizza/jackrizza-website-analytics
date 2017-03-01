'use strict';

var data = require('./data.js');
var timeArray = [];
var timeCountArray = [];

data.init();
setTimeout( () => {
        // 
        //do everything in here
        //
        data.statistics.filter( (a) => {
                a = JSON.parse(a).time;
                a = a.split(' ')[0];
                if(timeArray.includes(a)) {
                        var b = timeArray.indexOf(a);
                        timeCountArray[b] = timeCountArray[b] + 1;
                        console.log(timeCountArray[b]);

                } else {
                        timeArray.push(a)
                        timeCountArray.push(1);
                }
        });
        console.log(timeArray);
        console.log(timeCountArray);
        // 
        // all done
        // 
        process.exit();
}, 2000);
