var request = require('request');
var redis = require('redis');
var red_client = null;


function getRedisClient() {

	return red_client;
}


function init(callback) {
	get_db_config("http://localhost:8080/micro/is/base/getDBconf", function(error) {
		if (error != null) {
			console.log(error);
		}
    	callback(red_client);
	});
}


function get_db_config(url, callback) {
    request.post(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
                    //res.end(body);
                var json_data = JSON.parse(body);
                console.log(json_data);
                if (json_data) {
                    var content = json_data.content;
                    if (content) {
                        redis_conf = content.redis;
                        if (redis_conf) {
                            var red_port = parseInt(redis_conf.port);
                            var red_addr = redis_conf.addr;
                            var red_pwd = redis_conf.pwd;
                            if (red_port == undefined){
                                red_port = 6379;
                            } 
                            if (red_addr) {
                                if (red_pwd) {
                                    var opt = {auth_pass: red_pwd};
                                    red_client = redis.createClient(red_port, red_addr, opt);
                                } else {
                                    red_client = redis.createClient(red_port, red_addr);
                                }

                            } 
                        }
                    }
                }
                callback(null);
                return;
         } else {
                    //res.statusCode = 500;
                    //res.end('redirect failed');
                    callback(1);
                    return;
        }

    });
}


exports.getRedisClient =  getRedisClient
exports.init =  init