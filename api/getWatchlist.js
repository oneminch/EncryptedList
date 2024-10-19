"use strict";
const getTable = require("./helpers/getTable");
import { makeRequest, unauthorizedError } from "./helpers/helpers";

module.exports = async (req, res) => {
	try {
		if (makeRequest(req.method, req.rawHeaders)) {
			if (Object.keys(req.query).length > 0) {
				const initialLimit = req.query.limit;
				res.status(200).send(await getTable("Watchlist", initialLimit));
			} else {
				res.status(200).send(await getTable("Watchlist"));
			}
		} else {
			return unauthorizedError();
		}
	} catch (err) {
		console.error("Somethings gone wrong ", err);

		res.send(err); // send the thrown error
	}
};
