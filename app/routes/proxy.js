'use strict';

// proxy routing to hide api keys by making requests from server
module.exports = function(app) {
	var proxy = require('../../app/controllers/proxy.controller');
	app.route('/conditions/:loc').get(proxy.conditions);
};