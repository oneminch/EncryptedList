<template>
	<div id="watchlist">
		<p>
			There are some services that don't currently have such encryption but plan
			to itegrate it into their products. These services either have encryption
			as a current beta feature or as a likely future feature on their roadmap.
			They can be accessed on this page.
			<br />
			If you find any products here that either no longer plan to offer
			encryption or should be in the main list, please
			<router-link to="/report"
				>report them here <app-link-icon></app-link-icon></router-link
			>.
		</p>

		<div class="product-list" ref="list">
			<app-product
				v-for="(product, index) in watchlistProducts"
				:key="index"
				:product="product"
				:filterable="false"></app-product>

			<div v-show="isFetchingData" class="no-products">
				<app-loading-icon></app-loading-icon>
				<h4>Loading...</h4>
			</div>

			<div v-show="errorFetching" class="no-products">
				<app-error-icon></app-error-icon>
				<h4>
					There was an issue getting the data.
					<br />
					Please try again soon.
				</h4>
			</div>

			<div
				class="no-products"
				v-show="
					watchlistProducts.length === 0 && !isFetchingData && !errorFetching
				">
				<app-list-icon></app-list-icon>
				<h4>This list is currently empty.</h4>
			</div>
		</div>

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
import { scroll, isDefined } from "../scripts/helpers";
import Button from "../components/Button.vue";
import Product from "../components/Product.vue";
import ListIcon from "../components/icons/ListIcon.vue";
import LinkIcon from "../components/icons/LinkIcon.vue";
import ErrorIcon from "../components/icons/ErrorIcon.vue";
import LoadingIcon from "../components/icons/LoadingIcon.vue";
import ArrowUpIcon from "../components/icons/ArrowUpIcon.vue";

export default {
	name: "Watchlist",
	components: {
		appButton: Button,
		appProduct: Product,
		appListIcon: ListIcon,
		appLinkIcon: LinkIcon,
		appErrorIcon: ErrorIcon,
		appLoadingIcon: LoadingIcon,
		appArrowUpIcon: ArrowUpIcon
	},
	metaInfo: {
		title: "Watchlist",
		meta: [
			{
				vmid: "title",
				name: "title",
				template: "%s | EncryptedList",
				content: "Watchlist"
			},

			{
				vmid: "og:title",
				property: "og:title",
				template: "%s | EncryptedList",
				content: "Watchlist"
			},
			{
				vmid: "og:url",
				property: "og:url",
				content: "https://encryptedlist.xyz/watchlist/"
			},

			{
				vmid: "twitter:title",
				name: "twitter:title",
				template: "%s | EncryptedList",
				content: "Watchlist"
			},
			{
				vmid: "twitter:site",
				name: "twitter:site",
				content: "https://encryptedlist.xyz/watchlist/"
			}
		],
		link: [{ rel: "canonical", href: "https://encryptedlist.xyz/watchlist/" }]
	},
	data() {
		return {
			scrollOffset: false,
			errorFetching: false,
			isFetchingData: false,
			watchlistProducts: []
		};
	},
	methods: {
		// scroll to top of page
		scroll,
		// fetches and populates list from db
		fetchData(limit) {
			this.isFetchingData = true;
			let reqURL = isDefined(limit)
				? `/api/getWatchlist?limit=${limit}`
				: `/api/getWatchlist`;

			const axiosConfig = {
				headers: { "Content-type": "application/json" }
			};

			this.$http
				.get(reqURL, axiosConfig)
				.then((res) => {
					return res.data;
				})
				.then((data) => {
					this.watchlistProducts = data.slice();
					this.isFetchingData = false;
				})
				.catch((err) => {
					this.errorFetching = true;
					this.isFetchingData = false;
					throw err;
				});
		}
	},
	created() {
		this.fetchData();
	}
};
</script>

<style scoped>
* {
	outline: none;
}

#watchlist {
	padding: 0.5rem;
}

#watchlist .scroll-to-top {
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

#watchlist p {
	font-size: 1.1rem;
	width: 80%;
	text-align: center;
	margin: 0 auto;
}

#watchlist a {
	text-decoration: none;
	border-radius: 0.1rem;
	padding: 0 0.25rem;
	color: var(--highlight-text-color);
	background-color: var(--primary-yellow-color);
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
}

.product-list {
	width: 85%;
	margin: 2rem auto;
	border-radius: 0.65rem;
	padding: 0 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
}

.product-list > :nth-last-child(4) {
	border: none !important;
}

.product-list .no-products {
	text-align: center;
	padding: 1rem;
}

@media only screen and (max-width: 768px) {
	.product-list {
		width: 100%;
	}
}

@media only screen and (max-width: 480px) {
	#watchlist {
		padding: 1rem 0.25rem;
	}

	#watchlist p {
		width: 95%;
		text-align: left;
	}
}
</style>
