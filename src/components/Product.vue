<template>
	<div class="product">
		<div class="product-info">
			<div class="product-logo">
				<picture>
					<source
						:srcset="`${product.png_url}&format=webp`"
						type="image/webp" />
					<img :src="product.png_url" loading="lazy" alt="Product Logo" />
				</picture>
			</div>
			<div class="product-detail">
				<h3 class="product-name" ref="pName" v-html="product.name"></h3>
				<p class="product-desc" ref="pDesc" v-html="product.desc"></p>
			</div>
			<div
				:class="[
					'product-link',
					{ 'with-alts': product.alternatives.length > 0 }
				]">
				<a
					title="Go To Product Website"
					aria-label="Go to Product Website"
					target="_blank"
					rel="noopener noreferrer"
					:href="`${product.url}?ref=encryptedlist`">
					<app-external-icon></app-external-icon>
				</a>
				<app-button
					:label="'Show insecure alternatives:'"
					:iconButton="true"
					@clicked="toggleAlts = !toggleAlts"
					:class="{ 'active-alts': toggleAlts }">
					<app-alternative-icon></app-alternative-icon>
				</app-button>
			</div>
		</div>
		<div class="product-tags">
			<app-button-tag
				v-for="(tag, index) in product.tags"
				:key="index"
				:value="tag"
				@clicked="filterWith(tag)"
				:class="{ warn: tag === 'opt-in' }"
				:title="tag === 'opt-in' ? 'Beware!' : ''"
				>{{ tag }}</app-button-tag
			>
		</div>
		<div :class="['product-alternatives', { visible: toggleAlts }]">
			<p>Secure alternative to:</p>

			<div
				class="alt"
				v-for="(alt, index) in product.alternatives"
				:key="index">
				<img
					:src="`https://enclist.sirv.com/alts/${hyphenify(alt)}.png`"
					:alt="`${alt} logo`" />
				<p>{{ alt }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import Button from "./Button.vue";
import ButtonTag from "./ButtonTag.vue";
import { hyphenify } from "../scripts/helpers";
import ExternalIcon from "./icons/ExternalIcon.vue";
import AlternativeIcon from "./icons/AlternativeIcon.vue";

export default {
	name: "Product",
	props: {
		product: {
			type: Object
		},
		filterable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			toggleAlts: false
		};
	},
	components: {
		appButton: Button,
		appButtonTag: ButtonTag,
		appExternalIcon: ExternalIcon,
		appAlternativeIcon: AlternativeIcon
	},
	methods: {
		hyphenify,
		filterWith: function (q) {
			// filtering is disabled on some pages that use this component
			if (this.filterable) {
				let query = Object.assign({}, this.$route.query);

				if (query.t !== q) {
					// needs to be here to avoid redundant navigation error
					this.$router.push({
						query: Object.assign({}, this.$route.query, { t: q })
					});
				}
			}
		}
	}
};
</script>

<style scoped>
* {
	outline: none;
}

img {
	font-size: .25rem;
}

.product {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: var(--background-color);
	border-bottom: 2px solid var(--light-dark-gray-color);
	padding: 0.75rem 0;
}

.product-info {
	width: 100%;
	background-color: var(--background-color);
	color: var(--text-color);
	display: flex;
	align-items: center;
	margin-bottom: 0.25rem;
}

.product-logo {
	min-width: 3rem;
	position: relative;
}

.product-logo img {
	width: 2.5rem;
	height: auto;
	display: block;
	position: absolute;
	top: calc(50% - 1.25rem);
	left: calc(50% - 1.25rem);
	border-radius: 0.25rem;
	overflow: hidden;
	background: transparent;
}

.product-detail {
	margin-left: 0.75rem;
	padding: 0.25rem 0.25rem 0.25rem 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-evenly;
}

.product-detail > * {
	margin: 0 0 0.5rem 0;
	padding-right: 0.5rem;
}

.product-name {
	font-size: 1.1rem;
	color: var(--text-color);
}

.product-desc {
	color: var(--dark-light-gray-color);
	line-height: 1.5;
	font-size: 0.9rem;
}

.product-link {
	display: block;
	min-width: 2.5rem;
	height: 2.5rem;
	border-radius: 1.25rem;
	margin-left: auto;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: var(--tags-bg-color);
}

.product-link.with-alts {
	height: 5rem;
}

.product-link > a,
.product-link > button {
	display: block;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 1.25rem;
	border: none;
	background-color: var(--background-color);
	background: transparent;
	color: var(--text-color);
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
}

.product-link > a:hover,
.product-link > button:hover {
	border: none;
	background-color: var(--primary-yellow-color);
}

.product-link > a:hover > svg,
.product-link > button:hover > svg {
	color: var(--highlight-text-color);
}

.product-link > button {
	display: none;
}

.product-link.with-alts > button {
	display: flex;
}

.product-link.with-alts > button.active-alts {
	background-color: var(--primary-yellow-color);
}

.product-link.with-alts > button.active-alts svg {
	color: var(--primary-black-color);
}

.product-tags {
	padding: 0.25rem 0 0 0;
}

.product-tags button {
	margin: 0 0.5rem 0.5rem 0;
}

.product-tags .warn {
	color: var(--primary-white-color);
	background-color: var(--alternate-red-color);
}

.product-alternatives {
	width: 100%;
	min-height: 3rem;
	border-radius: 0.5rem;
	padding: 0.75rem 1rem;
	background-color: var(--tags-bg-color);
	margin-top: 0.5rem;
	display: none;
	border: 2px solid var(--light-dark-gray-color);
}

.product-alternatives > p {
	font-weight: 700;
	margin: 0;
	margin-bottom: 0.75rem;
	padding: 0;
}

.product-alternatives.visible {
	display: block;
}

.product-alternatives .alt {
	float: left;
	padding: 0.25rem;
	padding-right: 0.75rem;
	border-radius: 1.25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 2rem;
	margin: 0 0.5rem 0.5rem 0;
	background-color: var(--tags-bg-hover-color);
	border: 2px solid var(--light-dark-gray-color);
}

.product-alternatives .alt > * {
	float: left;
}

.product-alternatives .alt img {
	height: 1.5rem;
	margin-right: 0.5rem;
	width: 1.5rem;
	border-radius: 50%;
	overflow: hidden;
	object-fit: contain;
}

.product-alternatives .alt > p {
	font-size: 0.85rem;
}
</style>
