'use strict';

var r = require('rethinkdb');

var data = {
        statistics: [],
        gettingDataLists: false,
        dataListFinish: false,
        connection: null,
        statApp: () => {
                data.gettingDataLists = true;
                // the database "webapp"
                // in table "statistics"
                // get all data
                r.db('webapp').table('statistics').run(data.connection, (err, cursor) => {
                        if (err) throw err;
                        cursor.each( (err, row) => {
                                //failed
                                if (err) return 0;
                                //push data
                                data._statsSetter(JSON.stringify(row, null, 2));
                        }, () => {
                                //data handlers
                                data.gettingDataLists = false;
                                data.dataListFinish = true;
                        });
                });
        },
        //get statistics
        _statsGetter: () => {
                return data.statistics;
        },
        //set statistics
        _statsSetter: (a) => {
                data.statistics.push(a);
        },
        //connect to rethinkdb server
        connect: new Promise( (resolve, reject) => {
                r.connect({
                        host: 'localhost',
                        port: 28015
                }, (err, conn) => {
                        //failed connection
                        if (err) reject('failed!');
                        // successful connection
                        data.connection = conn;
                        resolve('Yay!');
                });
        }),
        init:  () => {
                //connection promise
                data.connect.then( () => {
                        //successful promise
                        data.statApp();
                }).catch( () => {
                        //failed promise
                        return 'error';
                        process.exit();
                });

        }

}
module.exports = data;