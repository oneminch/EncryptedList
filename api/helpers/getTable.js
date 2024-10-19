"use strict";
const { shuffle } = require("lodash");
const { base } = require("./airtable");

module.exports = async (tableName, numRecs) => {
	try {
		const table = base(tableName);
		const initialLimit = typeof numRecs !== "undefined" ? numRecs : 350;

		let products = [],
			img_name = "",
			imgBaseUrl = "https://enclist.sirv.com";

		const recs = await table
			.select({
				view: "all",
				maxRecords: parseInt(initialLimit)
			})
			.eachPage((records, fetchNextPage) => {
				records.forEach((record) => {
					// slugify name
					img_name = record.fields.name
						.trim()
						.split(" ")
						.join("-")
						.toLowerCase();

					products.push({
						name: record.fields.name,
						markup_name: record.fields.name,
						desc: record.fields.description,
						url: record.fields.url,
						tags: record.fields.tags,
						categories: record.fields.categories,
						alternatives: record.fields.alternatives
							? record.fields.alternatives
							: [],
						png_url: `${imgBaseUrl}/main/${img_name}.png?w=105`
					});
				});
				fetchNextPage();
			});

		if (typeof recs !== "undefined") {
			console.log(recs.length);
		}

		return shuffle(products);
	} catch (err) {
		return err;
	}
};
