var r = require('rethinkdb');

var connection = null;
var p = new Promise(
        function (resolve, reject) {
                r.connect({
                        host: 'localhost',
                        port: 28015
                }, function (err, conn) {
                        if (err) throw err;
                        connection = conn;
                        resolve('Success!');
                });
        });

p.then(function () {
        r.db('webapp').table('statistics').run(connection, function (err, cursor) {
                if (err) throw err;
                cursor.each(function (err, row) {
                        if (err) throw err;
                        console.log(JSON.stringify(row, null, 2));
                });
        });

}).catch(
        // Log the rejection reason
        function (reason) {
                console.log('Handle rejected promise (' + reason + ') here.');
        });