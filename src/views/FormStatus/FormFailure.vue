<template>
	<div id="FormFailure">
		<app-clear-icon></app-clear-icon>

		<h2>Oops! An error has occurred. Please try again soon.</h2>

		<div>
			<app-button-link :path="previous" :label="'Go Back to Previous Page'">
				Go Back
				<app-back-icon></app-back-icon>
			</app-button-link>

			<app-button-link :path="'/'" :label="'Go to Homepage'">
				Go Home
				<app-home-icon></app-home-icon>
			</app-button-link>
		</div>
	</div>
</template>

<script>
import ButtonLink from "../../components/ButtonLink.vue";
import BackIcon from "../../components/icons/BackIcon.vue";
import HomeIcon from "../../components/icons/HomeIcon.vue";
import ClearIcon from "../../components/icons/ClearIcon.vue";

export default {
	name: "FormFailure",
	components: {
		appBackIcon: BackIcon,
		appHomeIcon: HomeIcon,
		appClearIcon: ClearIcon,
		appButtonLink: ButtonLink
	},
	metaInfo: {
		title: "Error"
	},
	data() {
		return {
			previous: "/"
		};
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.previous = from.path.toLowerCase();
		});
	}
};
</script>

<style scoped>
* {
	outline: none;
}

#FormFailure {
	padding: 2rem 0.5rem;
}

#FormFailure > svg {
	width: 8rem;
	height: 8rem;
	color: var(--primary-red-color);
	margin: 0 auto;
	display: block;
}

#FormFailure h2 {
	width: 65%;
	text-align: center;
	font-size: 1.5rem;
	font-weight: 700;
	margin: 1rem auto;
}

#FormFailure > :last-child {
	width: 19rem;
	margin: 2rem auto;
	padding: 0;
}

#FormFailure > :last-child > a {
	width: 8.5rem;
	display: inline-flex;
	justify-content: space-around;
}

#FormFailure > :last-child > a svg {
	margin: 0;
}

#FormFailure > :last-child > a:first-of-type {
	margin-right: 1.5rem;
}

#FormFailure > :last-child > a:last-of-type {
	float: right;
}

@media only screen and (max-width: 480px) {
	#FormFailure {
		padding: 1rem 0.25rem;
	}

	#FormFailure h2 {
		width: 95%;
	}
}
</style>
