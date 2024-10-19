<template>
	<div id="about">
		<p>
			EncryptedList is a collection of products &amp; services that offer or
			ensure data security through
			<a
				href="https://protonmail.com/blog/what-is-end-to-end-encryption?ref=encryptedlist"
				target="_blank"
				rel="noopener noreferrer"
				>end-to-end encryption <app-external-icon></app-external-icon
			></a>
			👈 or some form of
			<a
				href="https://tresorit.com/blog/zero-knowledge-encryption?ref=encryptedlist"
				target="_blank"
				rel="noopener noreferrer"
				>zero-knowledge architecture <app-external-icon></app-external-icon
			></a>
			🔐. This can include services that either have such architecture on some
			of their features or that implement it fully.
		</p>

		<h2 id="disclosure">Disclosure</h2>

		<ul>
			<li>
				This collection is based on claims made by their respective owners or
				companies.
			</li>
			<li>
				Some of the services come with the ability to encrypt which isn't on by
				default. They either require
				<mark class="highlight">enabling encryption</mark> or have it as a
				feature on some <mark class="highlight">specific part</mark> of the
				software. These services are tagged in red as "opt-in".
			</li>
			<li>
				Products tagged as "open-source" are more reliable. However, not all
				products tagged as "open-source" are fully open source.
			</li>
			<li>
				Some services may be discontinued without notice and their link or URL
				may point to a new service that's not meant to be there.
			</li>
			<li>
				Please
				<router-link to="/report"
					>report here <app-link-icon></app-link-icon
				></router-link>
				if you notice any suspicious services.
			</li>
			<li>All product logos belong to their respective owners.</li>
			<li>And lastly, <mark class="highlight">do your research</mark> before trusting a service 🤓.</li>
		</ul>

		<div class="links">
			<app-button-link :path="'/'" :label="'Go Home'">
				Go Home
				<app-home-icon></app-home-icon>
			</app-button-link>

			<a
				title="Go To GitHub Repo"
				aria-label="Go To GitHub Repo"
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/oneminch/encrypted-list">
				GitHub
				<app-external-icon></app-external-icon>
			</a>
		</div>
	</div>
</template>

<script>
import ButtonLink from "../components/ButtonLink.vue";
import HomeIcon from "../components/icons/HomeIcon.vue";
import LinkIcon from "../components/icons/LinkIcon.vue";
import ExternalIcon from "../components/icons/ExternalIcon.vue";

export default {
	name: "About",
	components: {
		appHomeIcon: HomeIcon,
		appLinkIcon: LinkIcon,
		appButtonLink: ButtonLink,
		appExternalIcon: ExternalIcon
	},
	metaInfo: {
		title: "About",
		meta: [
			{
				vmid: "title",
				name: "title",
				template: "%s | EncryptedList",
				content: "About"
			},

			{
				vmid: "og:title",
				property: "og:title",
				template: "%s | EncryptedList",
				content: "About"
			},
			{
				vmid: "og:url",
				property: "og:url",
				content: "https://encryptedlist.xyz/about/"
			},

			{
				vmid: "twitter:title",
				name: "twitter:title",
				template: "%s | EncryptedList",
				content: "About"
			},
			{
				vmid: "twitter:site",
				name: "twitter:site",
				content: "https://encryptedlist.xyz/about/"
			}
		],
		link: [{ rel: "canonical", href: "https://encryptedlist.xyz/about/" }]
	}
};
</script>

<style scoped>
* {
	outline: none;
}

#about p svg {
	display: inline-block;
	margin: 0 0.25rem;
	color: var(--highlight-text-color);
}

#about {
	padding: 0.5rem;
	font-size: 1.1rem;
}

#about p {
	width: 80%;
	line-height: 1.6;
}

#about p > a {
	text-decoration: none;
	border-radius: 0.2rem;
	padding: 0 0.25rem;
	color: var(--highlight-text-color);
	background-color: var(--primary-yellow-color);
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
}

#about > ul {
	width: 80%;
	line-height: 1.6;
	list-style: none;
	text-align: left;
}

#about > ul li::before {
	content: "\25FC";
	color: var(--primary-yellow-color);
	font-weight: 700;
	float: left;
	width: 1.5em;
	margin-left: -1em;
}

#about > ul li a {
	text-decoration: none;
	border-radius: 0.1rem;
	padding: 0 0.25rem;
	color: var(--highlight-text-color);
	background-color: var(--primary-yellow-color);
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
}

#about .links {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

#about .links > :first-child {
	width: 8rem;
	margin-right: 1rem;
}

#about .links > :last-child {
	width: 7.5rem;
	margin: 0;
	height: 3rem;
	font-size: 1rem;
	cursor: pointer;
	padding: 0 0.75rem;
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 2px solid;
	border-bottom: 4px solid;
	border-radius: 0.5rem;
	color: var(--text-color);
	background-color: var(--yellow-black-color);
	border-color: var(--yellow-black-alt-color);
}

#about .links > :last-child svg {
	color: var(--text-color);
}

.highlight {
	border-radius: 0.1rem;
	padding: 0 0.25rem;
}

@media only screen and (max-width: 480px) {
	#about {
		padding: 1rem 1rem;
	}

	#about p,
	#about ul {
		width: 100%;
	}
}
</style>
