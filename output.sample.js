{
	"2017-04-02" : {
		"page_views" : [
		["index", "admin", "login", "work"],
		[4, 2, 3, 8]
		],
		"views" : 17
	},
	"2017-04-03" : {
		"page_views" : [
		["index", "admin", "login", "work"],
		[8, 2, 3, 8]
		],
		"views" : 21
	},
	"total" : {
		"page_views" : [
		["index", "admin", "login", "work"],
		[12, 4, 6, 16]
		]
	}

}

var r = require('rethinkdb');
var CronJob = require('cron').CronJob;

var connection = null;
var output;

r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
	if (err) throw err;
	console.log(getRawOutput(conn));
});


function getRawOutput(connection) {
	var gro = r.table('marvel').run(connection, function(err, cursor) {
		return cursor.each();
	});

	return gro
}





//final step
//
//var production = '* */3 * * *';
//var development = '* * * * *';
//
//var schedule = new CronJob(development, function() {
//  console.log('Analytics service now running | ' + Date());
//}, null, true, 'America/New_York');
