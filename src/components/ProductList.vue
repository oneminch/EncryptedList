<template>
	<div class="ProductList">
		<div class="product-list">
			<app-button
				class="clear-filters"
				@clicked="clearFilters"
				v-show="!allResultsShown"
				:label="'Reset Filters & Show All Results'">
				Reset Filters &amp; Show All Results
			</app-button>

			<app-product
				v-for="(product, index) in products"
				:key="index"
				:product="product"
				:class="{
					'last-product': index === products.length - 1
				}"></app-product>

			<div v-show="isFetchingData" class="no-results">
				<app-loading-icon></app-loading-icon>
				<h3>Loading...</h3>
			</div>

			<div v-show="errorFetching" class="no-results">
				<app-error-icon></app-error-icon>
				<h3>
					There was an issue getting the data.
					<br />
					Please try again soon.
				</h3>
			</div>

			<div
				class="no-results"
				v-show="products.length === 0 && !isFetchingData && !errorFetching">
				<app-list-icon></app-list-icon>
				<h3>No results found.</h3>
			</div>

			<app-button
				class="show-more"
				:label="'Show All Products'"
				@clicked="$emit('fetch-all')"
				v-show="visible && !isFetchingData && !errorFetching">
				Show all
				<app-chevron-down-icon></app-chevron-down-icon>
			</app-button>
		</div>
		<div class="filter-list">
			<!-- Message UI: Support Me -->
			<!-- <a class="message"></a> -->
			<div class="product-filters">
				<div class="headers">
					<h4>Tags</h4>
					<app-button-tag
						class="current"
						:closable="true"
						:value="currTagValue"
						v-show="currTagExists"
						:closingTaskTitle="'Reset Tag'"
						@close-tag="resetFilter(0)"></app-button-tag>
					<app-chevron-down-icon
						:expanded="!tagsHidden"
						@clicked="tagsHidden = !tagsHidden"></app-chevron-down-icon>
				</div>
				<div class="tag-list" v-show="!tagsHidden">
					<app-button-tag
						v-for="(tag, index) in firstNTags"
						:key="index"
						:value="tag"
						@clicked="filterWith(0, tag)"></app-button-tag>

					<app-button-tag
						:value="'...'"
						@clicked="toggleMoreTags"></app-button-tag>
				</div>
			</div>
			<div class="product-filters">
				<div class="headers">
					<h4>Category</h4>
					<app-button-tag
						class="current"
						:closable="true"
						:value="currCategoryValue"
						v-show="currCategoryExists"
						:closingTaskTitle="'Reset Category'"
						@close-tag="resetFilter(1)"></app-button-tag>
					<app-chevron-down-icon
						@clicked="catsHidden = !catsHidden"
						:expanded="!catsHidden"></app-chevron-down-icon>
				</div>

				<div class="tag-list" v-show="!catsHidden">
					<app-button-tag
						v-for="(cat, index) in firstMCategories"
						:key="index"
						:value="cat"
						@clicked="filterWith(1, cat)"></app-button-tag>

					<app-button-tag
						:value="'...'"
						@clicked="toggleMoreCategories"></app-button-tag>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Button from "./Button.vue";
import Product from "./Product.vue";
import ButtonTag from "./ButtonTag.vue";
import ListIcon from "./icons/ListIcon.vue";
import ErrorIcon from "./icons/ErrorIcon.vue";
import LoadingIcon from "./icons/LoadingIcon.vue";
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import { isDefined, capitalizeWords } from "../scripts/helpers";

export default {
	name: "ProductList",
	props: [
		"tags",
		"visible",
		"products",
		"categories",
		"isFetchingData",
		"errorFetching",
		"allResultsShown"
	],
	components: {
		appButton: Button,
		appProduct: Product,
		appListIcon: ListIcon,
		appErrorIcon: ErrorIcon,
		appButtonTag: ButtonTag,
		appLoadingIcon: LoadingIcon,
		appChevronDownIcon: ChevronDownIcon
	},
	data() {
		return {
			n: 5,
			m: 5,
			isSmallScreen: window.innerWidth <= 580,
			tagsHidden: this.isSmallScreen,
			catsHidden: this.isSmallScreen
		};
	},
	methods: {
		// update queries when filters are clicked
		filterWith: function (type, q) {
			if (type === 0 && this.$route.query.t !== q) {
				// if tag
				this.$router.push({
					query: Object.assign({}, this.$route.query, { t: q })
				});
			} else if (type === 1 && this.$route.query.c !== q) {
				// if category
				this.$router.push({
					query: Object.assign({}, this.$route.query, {
						c: q.toLowerCase()
					})
				});
			}
		},
		// remove/reset filter by type: tag or category
		resetFilter: function (type) {
			let query = Object.assign({}, this.$route.query);

			if (type === 0 && this.$has(query, "t")) {
				// if tag
				delete query.t;
				this.$router.replace({ query }); // needs to be here to avoid redundant navigation error
			} else if (type === 1 && this.$has(query, "c")) {
				// if category
				delete query.c;
				this.$router.replace({ query }); // needs to be here to avoid redundant navigation error
			}
		},
		// show/hide full tag list
		toggleMoreTags: function () {
			if (this.n === this.tags.length) {
				this.n = window.innerWidth <= 580 ? 3 : 5;
			} else {
				this.n = this.tags.length;
			}
		},
		// show/hide full category list
		toggleMoreCategories: function () {
			if (this.m === this.categories.length) {
				this.m = window.innerWidth <= 580 ? 3 : 5;
			} else {
				this.m = this.categories.length;
			}
		},
		// set minimum number of filters displayed; rest are hidden
		minDisplayedFilters: function () {
			if (window.innerWidth <= 580) {
				this.n = this.tags.length;
				this.m = this.categories.length;
			} else {
				this.n = 5;
				this.m = 5;
			}
		},
		// clears all filters to show all search results
		clearFilters: function () {
			if (
				this.$has(this.$route.query, "t") ||
				this.$has(this.$route.query, "c")
			) {
				let query = {};
				this.$router.replace({ query });
			}
		}
	},
	computed: {
		firstNTags: function () {
			return this.tags.slice(0, this.n);
		},
		firstMCategories: function () {
			return this.categories.slice(0, this.m);
		},
		currTagValue: function () {
			let queryTag = this.$route.query.t;

			if (isDefined(queryTag)) {
				return queryTag.toLowerCase();
			} else {
				return queryTag; // undefined
			}
		},
		currCategoryValue: function () {
			let queryCat = this.$route.query.c;

			if (isDefined(queryCat)) {
				return capitalizeWords(queryCat.toLowerCase());
			} else {
				return queryCat; // undefined
			}
		},
		currTagExists: function () {
			return isDefined(this.currTagValue);
		},
		currCategoryExists: function () {
			return isDefined(this.currCategoryValue);
		}
	},
	mounted() {
		this.minDisplayedFilters();
		this.tagsHidden = this.isSmallScreen;
		this.catsHidden = this.isSmallScreen;

		window.addEventListener("resize", () => {
			this.minDisplayedFilters();
			this.isSmallScreen = window.innerWidth <= 580;
			this.tagsHidden = this.isSmallScreen;
			this.catsHidden = this.isSmallScreen;
		});
	}
};
</script>

<style scoped>
* {
	outline: none;
}

.ProductList {
	width: 100%;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding-bottom: 2.5rem;
}

.product-list {
	width: 62.5%;
	border-radius: 0.65rem;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
}

.product-list > .clear-filters {
	width: 100%;
	min-height: 2.5rem;
	height: auto;
	justify-content: center;
	border-radius: 0.5rem;
	margin: 0.75rem 0;
	padding: 0.5rem;
	background-color: var(--yellow-black-color);
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
	border-color: var(--yellow-black-alt-color);
}

.product-list > .no-results {
	width: 100%;
	padding: 3rem;
}

.product-list > .no-results h3 {
	margin: 1rem auto;
	text-align: center;
}

.last-product {
	border: none !important;
}

.product-list .show-more {
	width: 100%;
	border: none;
	margin: 0.75rem 0;
	justify-content: center;
	background-color: var(--tags-bg-color);
}

.product-list .show-more:hover {
	background-color: var(--tags-bg-hover-color);
}

.filter-list {
	width: 35%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.product-filters {
	width: 100%;
	border-radius: 0.65rem;
	padding: 0.35rem 0.75rem;
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
	margin-bottom: 0.5rem;
}

.product-filters .headers {
	width: 100%;
	height: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.25rem 0;
	color: var(--text-color);
}

.product-filters .headers .current {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0;
	border: none;
	margin-left: auto;
	padding: 0 0.2rem 0 0.5rem;
	color: var(--text-color);
	background-color: var(--light-dark-gray-color);
}

.product-filters .headers .current:hover {
	background-color: var(--current-tags-bg-hover-color);
}

.product-filters .headers > svg {
	display: none;
	margin-left: 0.5rem;
	cursor: pointer;
}

.product-filters .tag-list {
	margin-top: 0.75rem;
}

.product-filters .tag-list > button {
	margin: 0 0.25rem 0.5rem 0;
}

.product-filters:last-of-type button {
	border-radius: 0.35rem;
}

.message {
	width: 100%;
	padding: 1rem;
	line-height: 1.35;
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	border: 2px solid var(--yellow-black-alt-color);
	border-bottom: 4px solid var(--yellow-black-alt-color);
	background-color: var(--yellow-black-color);
}

@media only screen and (max-width: 840px) {
	.ProductList {
		flex-direction: column-reverse;
	}

	.message,
	.product-list,
	.filter-list {
		width: 100%;
	}

	.product-filters {
		border-width: 2px;
		border-bottom-width: 4px;
	}
}

@media only screen and (max-width: 580px) {
	.product-list {
		padding: 0 1rem;
	}

	.product-filters .headers > svg {
		display: inline-block;
	}

	.product-filters .tag-list :last-child {
		display: none;
	}
}
</style>
