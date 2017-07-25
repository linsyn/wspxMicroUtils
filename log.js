var log_level = 1;
const INFO =  3;
function log_info(message) {
	if (log_level < INFO )
		console.log("info:" + message);
}

function set_log_level(level) {
	log_level = level
}

exports.log_info = log_info
exports.set_log_level = set_log_level
