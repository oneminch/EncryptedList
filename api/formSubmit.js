"use strict";
import axios from "axios";
import { mdify } from "./helpers/helpers";

module.exports = async (req, res) => {
	try {
		const { formType } = req.query;
		const submissionBody = mdify(req.body, formType.toLowerCase());

		const githubIssueURL =
			"https://api.github.com/repos/oneminch/encrypted-list/issues";

		const axiosConfig = {
			headers: {
				Accept: "application/vnd.github.v3+json",
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
			}
		};

		axios
			.post(
				githubIssueURL,
				{
					title: formType,
					body: submissionBody,
					labels: [formType.toLowerCase()],
					assignees: ["oneminch"]
				},
				axiosConfig
			)
			.then(() => {
				res.status(200).json({ error: "" });
			})
			.catch((err) => {
				console.error("Somethings gone wrong ", err);

				res.status(err.statusCode || 500).json({ error: err.message }); // send the thrown error
			});
	} catch (err) {
		console.error("Somethings gone wrong ", err);

		res.status(err.statusCode || 500).json({ error: err.message }); // send the thrown error
	}
};
