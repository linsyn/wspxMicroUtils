var request = require('request');
var redis = require('redis');
var red_client = null;


function getRedisClient() {

	return red_client;
}


function init(host, pwd, port, callback) {

    var red_port = parseInt(port);
    var red_addr = host;
    var red_pwd = pwd
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
	callback(red_client);
	
}


exports.getRedisClient =  getRedisClient
exports.init =  init