const json2md = require("json2md");

// Get header values from raw header data
const getHeaderValue = (headerKey, headers) => {
	const keyIndex = headers.indexOf(headerKey.toLowerCase());

	return keyIndex >= 0 ? headers[keyIndex + 1] : headers[1];
};

// Should the current page make a request
const makeRequest = (method, rawHeaders) => {
	const reqHost = getHeaderValue("host", rawHeaders);
	const reqReferer = getHeaderValue("referer", rawHeaders);

	const altHost = `${process.env.ALT_BASE_URL}`;
	const mainHost = `${process.env.MAIN_BASE_URL}`;

	const altReferer = `https://${process.env.ALT_BASE_URL}/`;
	const mainReferer = `https://${process.env.MAIN_BASE_URL}/`;

	if (
		method === "GET" &&
		(reqHost === altHost || reqHost === mainHost) &&
		(reqReferer.indexOf(altReferer) >= 0 ||
			reqReferer.indexOf(mainReferer) >= 0)
	) {
		return true;
	}

	return false;
};

// return error code and message
const unauthorizedError = () => {
	return {
		statusCode: 404,
		body: JSON.stringify({
			error: "Error Making Request (Unauthorized)"
		})
	};
};

// Convert given data to markdown based on form type
const mdify = (data, formType) => {
	if (formType == "report") {
		return json2md([
			{ p: `**Title**: ${data.pname.length > 0 ? data.pname : "N/A"}` },
			{ p: `**Message**: ${data.message}` },
			{ p: "From [EncryptedList](https://encryptedlist.xyz)" }
		]);
	} else if (formType == "submission") {
		return json2md([
			{ p: `**List Type**: ${data.listType}` },
			{ p: `**Product Name**: ${data.name}` },
			{ p: `**Product Description**: ${data.desc}` },
			{ p: `**Product URL**: ${data.url}` },
			{ h4: "Tags" },
			{ ul: data.tags },
			{ h4: "Categories" },
			{ ul: data.categories },
			{ p: "From [EncryptedList](https://encryptedlist.xyz)" }
		]);
	}
};

export { mdify, makeRequest, unauthorizedError };
