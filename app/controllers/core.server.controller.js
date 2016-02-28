'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.rr = function(req, res) {
	res.render('rr', {
		user: req.user || null,
		request: req
	});
};