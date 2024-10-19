<template>
	<div id="submit">
		<form method="POST" name="submit" @submit.prevent="handleFormSubmission">
			<!-- <h2 class="emergency-ui">This form is temporarily disabled.</h2> -->

			<h2>Enter Product Details</h2>

			<input type="hidden" name="form-name" value="submit" />

			<fieldset name="type">
				<legend>Which list should this go to?</legend>

				<!-- List Type -->
				<p>
					<input
						id="main"
						value="Main"
						type="radio"
						name="type"
						v-model="form.listType" />
					<label for="main">Main</label>
				</p>

				<p>
					<input
						id="watchlist"
						value="Watchlist"
						type="radio"
						name="type"
						v-model="form.listType" />
					<label for="watchlist">Watchlist</label>
				</p>

				<p>
					<input
						id="excluded"
						value="Excluded"
						type="radio"
						name="type"
						v-model="form.listType" />
					<label for="excluded">Excluded</label>
				</p>
			</fieldset>

			<label for="name">
				<abbr title="Required" aria-label="Required">*</abbr>
				Name:
				<input
					id="name"
					type="text"
					name="name"
					required
					placeholder="Name of the Product"
					v-model="form.name" />
			</label>

			<label for="desc">
				<abbr title="Required" aria-label="Required">*</abbr>
				Description:
				<textarea
					id="desc"
					name="desc"
					required
					v-model="form.desc"
					placeholder="Briefly describe the product..."></textarea>
			</label>

			<label for="url">
				<abbr title="Required" aria-label="Required">*</abbr>
				URL:
				<input
					id="url"
					type="url"
					name="url"
					required
					placeholder="https://example.com"
					v-model="form.url" />
			</label>

			<fieldset name="Tags">
				<legend>Tags <span>(Optional)</span>:</legend>

				<!-- All - Default Tag -->
				<p v-for="(tag, index) in tags" :key="index">
					<input
						:id="tag"
						name="tags"
						:value="tag"
						type="checkbox"
						v-model="form.tags" />
					<label :for="tag">{{ tag }}</label>
				</p>
			</fieldset>

			<fieldset name="Categories">
				<legend>Categories <span>(Optional)</span>:</legend>

				<!-- All - Default Category -->
				<p v-for="(cat, index) in categories" :key="index">
					<input
						:id="cat"
						:value="cat"
						type="checkbox"
						name="categories"
						v-model="form.categories" />
					<label :for="cat">{{ cat }}</label>
				</p>
			</fieldset>

			<div>
				<app-button type="submit" :label="'Submit'">
					Submit
					<app-send-icon></app-send-icon>
				</app-button>
			</div>
		</form>

		<p>
			If you discovered any products that aren't in the list, you can
			<mark class="highlight">submit</mark> one through this page. Use this page
			for new submissions and
			<router-link to="/report"
				>the report page <app-link-icon></app-link-icon
			></router-link>
			to report already existing products. I'll review the submission and add
			the product ASAP. This form is powered by GitHub Issues and submissions
			will be public.
		</p>
	</div>
</template>

<script>
import Button from "../components/Button.vue";
import LinkIcon from "../components/icons/LinkIcon.vue";
import SendIcon from "../components/icons/SendIcon.vue";
import { tags, categories } from "../scripts/filters";

export default {
	name: "Submit",
	components: {
		appButton: Button,
		appLinkIcon: LinkIcon,
		appSendIcon: SendIcon
	},
	metaInfo: {
		title: "Submit",
		meta: [
			{
				vmid: "title",
				name: "title",
				template: "%s | EncryptedList",
				content: "Submit"
			},

			{
				vmid: "og:title",
				property: "og:title",
				template: "%s | EncryptedList",
				content: "Submit"
			},
			{
				vmid: "og:url",
				property: "og:url",
				content: "https://encryptedlist.xyz/submit/"
			},

			{
				vmid: "twitter:title",
				name: "twitter:title",
				template: "%s | EncryptedList",
				content: "Submit"
			},
			{
				vmid: "twitter:site",
				name: "twitter:site",
				content: "https://encryptedlist.xyz/submit/"
			}
		],
		link: [{ rel: "canonical", href: "https://encryptedlist.xyz/submit/" }]
	},
	data() {
		return {
			form: {
				listType: "Main",
				name: "",
				desc: "",
				url: "https://",
				tags: [],
				categories: []
			},
			tags: [],
			categories: []
		};
	},
	methods: {
		handleFormSubmission: function () {
			this.$http
				.post("/api/formSubmit?formType=Submission", this.form)
				.then(() => {
					this.$router.push({ name: "FormSuccess", query: { from: "submit" } });
				})
				.catch(() => {
					this.$router.push({ name: "FormFailure", query: { from: "submit" } });
				});
		}
	},
	created() {
		this.tags = tags;
		this.categories = categories;
	}
};
</script>

<style scoped>
* {
	outline: none;
}

#submit {
	padding: 0.5rem;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

#submit > form {
	width: 55%;
	max-width: 640px;
}

#submit > form > * {
	width: 90%;
	margin: 0 auto;
	margin-bottom: 1rem;
}

#submit > form h2 {
	text-align: left;
}

#submit > form > label {
	display: block;
}

#submit > form button svg {
	margin-left: 0.5rem;
}

#submit > form > label abbr {
	color: var(--primary-red-color);
}

#submit > form textarea,
#submit > form input[type="url"],
#submit > form input[type="text"] {
	width: 100%;
	padding: 0.5rem 0.75rem;
	background-color: var(--background-color);
	color: var(--text-color);
	display: block;
	margin: 0.5rem 0;
	font-size: 1rem;
	border: 2.5px solid var(--gray-border-color);
	border-radius: 0.5rem;
	resize: none;
	box-shadow: none;
}

#submit > form textarea {
	height: 7rem;
}

#submit > form input[type="url"],
#submit > form input[type="text"] {
	height: 2.75rem;
}

#submit > form input[type="radio"],
#submit > form input[type="checkbox"] {
	margin-right: 0.5rem;
}

#submit > form fieldset {
	border: 2.5px solid var(--gray-border-color);
	border-bottom: 5px solid var(--gray-border-color);
	border-radius: 0.5rem;
}

#submit > form fieldset legend span {
	color: var(--placeholder-text-color);
}

#submit > form fieldset label,
#submit > form fieldset input {
	cursor: pointer;
}

#submit > form button {
	background-color: var(--yellow-black-color);
	border-color: var(--yellow-black-alt-color);
}

#submit > p {
	font-size: 1.1rem;
	width: 40%;
	text-align: left;
	margin: 0;
}

#submit a {
	text-decoration: none;
	border-radius: 0.1rem;
	padding: 0 0.25rem;
	color: var(--highlight-text-color);
	background-color: var(--primary-yellow-color);
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
}

.highlight {
	border-radius: 0.1rem;
	padding: 0 0.25rem;
}

/* #submit > form > .emergency-ui {
	padding: 0.5rem 0.75rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 2px solid var(--gray-border-color);
	border-radius: 0.5rem;
	color: var(--text-color);
	background-color: var(--yellow-black-color);
	border-color: var(--yellow-black-alt-color);
} */

@media only screen and (max-width: 840px) {
	#submit {
		flex-direction: column-reverse;
		align-items: center;
	}

	#submit > form {
		width: 100%;
	}

	#submit > p {
		width: 80%;
		text-align: center;
		margin: 0 0 2rem 0;
	}
}

@media only screen and (max-width: 480px) {
	#submit {
		padding: 1rem 0.25rem;
	}

	#submit > p,
	#submit > form {
		width: 95%;
	}

	#submit > form > * {
		width: 100%;
	}
}
</style>
