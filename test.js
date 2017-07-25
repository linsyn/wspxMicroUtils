var redis = require('./redisClient')
var log = require('./log')


log.set_log_level(1)
log.log_info("test info");
log.set_log_level(5)
log.log_info("test info ");

log.set_log_level(1)
log.log_info("test info");




redis.init( "127.0.0.1", null, 6379, function(redis_client) {
	
	if (redis_client) {
		console.log("redis connect success");
		redis_client.select(1)
		 redis_client.hgetall("205ddc44bb8091db97fe2ce69f364f78", function(error, result) {
            if (error) {
               
                return;
            }
          	console.log(result);
        });
	}
});

