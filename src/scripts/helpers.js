// check if item is undefined
const isDefined = (item) => {
	return typeof item !== "undefined";
};

// scroll to top
const scroll = () => {
	window.scroll({
		top: 0,
		left: 0,
		behavior: "smooth"
	});
};

// encoding used for form submissions
const encode = (data) => {
	return Object.keys(data)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
		.join("&");
};

// identify whether the current browser is Internet Explorer
const isIE = () => {
	const ua = navigator.userAgent;
	return ua.indexOf("MSIE") > -1 || ua.indexOf("Trident") > -1;
};

// Capitalizes the first letter of every word in a string
const capitalizeWords = (str) => {
	return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

// Basically changes "Product Name" to "product-name"
const hyphenify = (str) => str.split(" ").join("-").toLowerCase();

// returns start & end indices of all occurences of a query from a string
const stringSearch = (str, query, caseInsensitive = true) => {
	caseInsensitive = isDefined(caseInsensitive) ? caseInsensitive : true;

	if (str.length === 0 || query.length === 0) {
		return [];
	}

	let indexes = [],
		i = 0,
		findIndex = -1,
		localStr = caseInsensitive ? str.toLowerCase() : str,
		localQuery = caseInsensitive ? query.toLowerCase() : query;

	while (localStr.indexOf(localQuery, i) !== -1) {
		findIndex = localStr.indexOf(localQuery, i);
		indexes.push([findIndex, findIndex + query.length]);
		i = findIndex + 1;
	}

	return indexes;
};

// highlights all occurences of a query in a string
// wraps each occurence with <mark class='highlight'></mark>
const highlightQuery = (str, query) => {
	let highlight = ``,
		res = stringSearch(str, query);

	let i,
		j = 0;
	for (i = 0; i < res.length; i++) {
		highlight += str.substring(j, res[i][0]);
		highlight += `<mark class='highlight'>`;
		highlight += str.substring(res[i][0], res[i][1]);
		highlight += `</mark>`;
		j = res[i][1];
	}
	highlight += str.substring(j);

	return highlight;
};

export {
	isIE,
	encode,
	scroll,
	hyphenify,
	isDefined,
	capitalizeWords,
	stringSearch,
	highlightQuery
};
