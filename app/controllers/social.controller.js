'use strict';

var request = require('request'),
	keys = require('../../keys.json');

exports.steamInfo = function(req, res) {
	var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+ keys.steam_key + '&steamids=' + keys.steam_id;

	request.get(
	    url,
		function (error, response, body) {
	        if (!error && response.statusCode === 200) {
	          var obj = JSON.parse(body);
	            res.json(obj);
	        }
	    }
	);

};

exports.steamGames = function (req, res) {
	var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + keys.steam_key + 
		'&steamid=' + keys.steam_id + '&include_appinfo=1&format=json';

	request.get(
	    url,
		function (error, response, body) {
	        if (!error && response.statusCode === 200) {
	          var obj = JSON.parse(body);
	            res.json(obj);
	        }
	    }
	);
};