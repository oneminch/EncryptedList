<template>
	<div id="home">
		<div class="search">
			<div class="search-bar">
				<div @click="focusInput">
					<app-search-icon></app-search-icon>
				</div>
				<input
					type="text"
					ref="searchInput"
					aria-label="Search Input"
					v-model="searchQuery"
					:placeholder="placeholderText" />
				<div
					@click="searchQuery = ''"
					v-show="searchQuery.length > 0"
					title="Clear Input">
					<app-clear-icon></app-clear-icon>
				</div>
			</div>
		</div>

		<app-product-list
			ref="list"
			:tags="tags"
			:visible="allProducts.length === limit"
			:categories="categories"
			:products="processedList"
			:isFetchingData="isFetchingData"
			:errorFetching="errorFetching"
			:allResultsShown="isThatAll"
			v-on:fetch-all="fetchAll"></app-product-list>

		<app-button
			@clicked="scroll"
			v-show="scrollOffset"
			class="scroll-to-top"
			:label="'Scroll to the top'">
			Top
			<app-arrow-up-icon></app-arrow-up-icon>
		</app-button>
	</div>
</template>

<script>
import Button from "../components/Button.vue";
import ProductList from "../components/ProductList.vue";
import ClearIcon from "../components/icons/ClearIcon.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import ArrowUpIcon from "../components/icons/ArrowUpIcon.vue";

import { tags, categories } from "../scripts/filters";
import {
	scroll,
	isDefined,
	stringSearch,
	highlightQuery
} from "../scripts/helpers";

export default {
	name: "Home",
	components: {
		appButton: Button,
		appClearIcon: ClearIcon,
		appSearchIcon: SearchIcon,
		appProductList: ProductList,
		appArrowUpIcon: ArrowUpIcon
	},
	metaInfo: {
		title: "Home",
		meta: [
			{
				vmid: "title",
				name: "title",
				template: null,
				content: "EncryptedList - Curated Collection of Encrypted Tools."
			},

			{
				vmid: "og:title",
				property: "og:title",
				template: null,
				content: "EncryptedList - Curated Collection of Encrypted Tools."
			},
			{
				vmid: "og:url",
				property: "og:url",
				content: "https://encryptedlist.xyz/"
			},

			{
				vmid: "twitter:title",
				name: "twitter:title",
				template: null,
				content: "EncryptedList - Curated Collection of Encrypted Tools."
			},
			{
				vmid: "twitter:site",
				name: "twitter:site",
				content: "https://encryptedlist.xyz/"
			}
		],
		link: [{ rel: "canonical", href: "https://encryptedlist.xyz/" }]
	},
	data() {
		return {
			tags: [],
			limit: 10,
			categories: [],
			allProducts: [],
			searchQuery: "",
			searchResults: [],
			placeholderText: "",
			isFetchingData: false,
			errorFetching: false,
			allFetched: false,
			scrollOffset: false
		};
	},
	methods: {
		// scroll to top of page
		scroll,
		// fetch and populate data from database
		fetchSome(limit) {
			this.isFetchingData = true;
			let reqURL = isDefined(limit)
				? `/api/getMain?limit=${limit}`
				: `/api/getMain`;

			const axiosConfig = {
				headers: { "Content-type": "application/json" }
			};

			this.$http
				.get(reqURL, axiosConfig)
				.then((res) => {
					return res.data;
				})
				.then((data) => {
					this.allProducts = [];
					this.allProducts.length = 0;
					this.allProducts = data.slice();
					this.isFetchingData = false;
				})
				.catch((err) => {
					this.errorFetching = true;
					this.isFetchingData = false;
					throw err;
				});
		},
		fetchAll() {
			if (this.allProducts.length <= this.limit && !this.allFetched) {
				this.fetchSome();
				this.allFetched = true;
			}
		},
		// searches through given list and adds highlighting markup (html) to queries
		searchWithHighlight: function (list = this.filterResults) {
			// fetch all products before searching
			if (this.searchQuery.trim().length > 0) {
				this.fetchAll();
			}

			list = isDefined(list) ? list : this.filterResults;

			return list.map((product) => {
				let newProduct = {},
					name = product.name,
					desc = product.desc,
					query = this.searchQuery.trim(),
					nameMatch = stringSearch(name, query).length > 0,
					descMatch = stringSearch(desc, query).length > 0;

				if (nameMatch || descMatch) {
					if (nameMatch && !descMatch) {
						newProduct = Object.assign({}, product, {
							name: highlightQuery(name, query)
						});
					} else if (!nameMatch && descMatch) {
						newProduct = Object.assign({}, product, {
							desc: highlightQuery(desc, query)
						});
					} else {
						newProduct = Object.assign({}, product, {
							name: highlightQuery(name, query),
							desc: highlightQuery(desc, query)
						});
					}
				} else {
					newProduct = null;
				}

				return newProduct;
			});
		},
		// filters given list with a certain tag value
		filterWithTag: function (tag, list) {
			// fetch all products before filtering
			this.fetchAll();

			list = isDefined(list) ? list : this.allProducts;

			return tag.length > 0
				? list.filter((product) => product.tags.indexOf(tag) !== -1)
				: [...list];
		},
		// filters given list with a certain category value
		filterWithCategory: function (cat, list) {
			// fetch all products before filtering
			this.fetchAll();

			list = isDefined(list) ? list : this.allProducts;

			return cat.length > 0
				? list.filter((product) => product.categories.indexOf(cat) !== -1)
				: [...list];
		},
		// focuses search input
		focusInput: function () {
			let currPath = this.$route.path.toLowerCase();

			if (currPath === "/" || currPath === "/all") {
				this.$refs.searchInput.focus();
			}
		},
		// detect list reaching top of viewport
		setScrollOffset: function () {
			let currPath = this.$route.path.toLowerCase();

			if (currPath === "/" || currPath === "/all") {
				// console.log(this.$refs.list.$el);
				this.scrollOffset =
					this.$refs.list.$el.offsetTop -
						document.documentElement.scrollTop +
						250 <=
					0;
			}
		}
	},
	computed: {
		// filtered results based on query parameters
		filterResults: function () {
			let cat = this.$route.query.c,
				tag = this.$route.query.t;

			// if either filters is undefined
			if (!isDefined(tag) || !isDefined(cat)) {
				if (!isDefined(tag) && isDefined(cat)) {
					return this.filterWithCategory(cat.toLowerCase());
				} else if (!isDefined(cat) && isDefined(tag)) {
					return this.filterWithTag(tag.toLowerCase());
				} else {
					return [...this.allProducts];
				}
			} // if both filters are defined
			else {
				return this.filterWithCategory(
					cat.toLowerCase(),
					this.filterWithTag(tag.toLowerCase())
				);
			}
		},
		// list used to render results either filtered or searched
		processedList: function () {
			if (this.searchQuery.trim().length > 0) {
				// if searching
				return this.searchResults.filter((product) => product !== null);
			} else {
				// if just filtering
				return [...this.filterResults];
			}
		},
		// Are the search results being displayed everything?
		isThatAll: function () {
			if (this.searchQuery.trim().length > 0) {
				// if searching
				let filtered = this.searchWithHighlight().filter(
						(product) => product !== null
					),
					allResults = this.searchWithHighlight(this.allProducts).filter(
						(product) => product !== null
					);

				return filtered.length === allResults.length;
			} else {
				return true;
			}
		}
	},
	watch: {
		// make search again when search query changes
		searchQuery: function () {
			this.searchResults = this.searchWithHighlight();
		},
		// make search again when filter values change
		filterResults: function () {
			this.searchResults = this.searchWithHighlight();
		}
	},
	created() {
		// fetch and populate data
		if (isDefined(this.$route.query.c) || isDefined(this.$route.query.t)) {
			this.fetchAll(); // fetch all
		} else {
			this.fetchSome(); // fetch first few
		}

		this.tags = tags;
		this.categories = categories;
	},
	mounted: function () {
		let vm = this;

		this.setScrollOffset();
		window.addEventListener("scroll", () => {
			this.setScrollOffset();
		});

		// set input placeholder based on device width
		this.placeholderText =
			window.innerWidth > 480
				? "Press ; key to enter search..."
				: "Search products...";

		// attach keyboard shortcuts for input
		window.addEventListener("keyup", (e) => {
			if (vm.$refs.searchInput) {
				if (e.key === ";") {
					// when semicolon ( ; )
					vm.focusInput();
				} else if (e.key === "Escape") {
					// when 'Esc' key is pressed
					vm.$refs.searchInput.blur();
				}
			}
		});

		window.addEventListener("resize", () => {
			this.placeholderText =
				window.innerWidth > 480
					? "Press ; key to enter search..."
					: "Search products...";
		});
	}
};
</script>

<style scoped>
* {
	outline: none;
}

.search {
	width: 62.5%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

.search-bar {
	width: 100%;
	height: 3rem;
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
	border-radius: 0.65rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.search-bar > * {
	height: 2.5rem;
}

.search-bar > :first-child,
.search-bar > :last-child {
	display: flex;
	justify-content: center;
	align-items: center;
}

.search-bar > :first-child {
	min-width: 2.5rem;
	max-width: 2.5rem;
	cursor: pointer;
}

.search-bar > :last-child {
	min-width: 2.5rem;
	max-width: 2.5rem;
	cursor: pointer;
}

.search-bar input {
	border: none;
	font-size: 1rem;
	width: 100%;
	padding: 0.5rem 0.25rem;
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
}

#home .scroll-to-top {
	width: 5.5rem;
	margin: 0 auto;
	position: fixed;
	z-index: 0;
	bottom: 1.5rem;
	left: calc(50% - 2.75rem);
	background-color: var(--yellow-black-color);
	border-color: var(--yellow-black-alt-color);
	box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

@media only screen and (max-width: 840px) {
	.search {
		width: 100%;
	}
}
</style>
