<template>
	<div id="FormSuccess">
		<app-check-icon></app-check-icon>

		<h2>Your submission was successfull. Thank you!</h2>

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
import CheckIcon from "../../components/icons/CheckIcon.vue";

export default {
	name: "FormSuccess",
	components: {
		appBackIcon: BackIcon,
		appHomeIcon: HomeIcon,
		appCheckIcon: CheckIcon,
		appButtonLink: ButtonLink
	},
	metaInfo: {
		title: "Success"
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

#FormSuccess {
	padding: 2rem 0.5rem;
}

#FormSuccess > svg {
	width: 8rem;
	height: 8rem;
	color: var(--primary-green-color);
	margin: 0 auto;
	display: block;
}

#FormSuccess h2 {
	width: 65%;
	text-align: center;
	font-size: 1.5rem;
	font-weight: 700;
	margin: 1rem auto;
}

#FormSuccess > :last-child {
	width: 19rem;
	margin: 2rem auto;
	padding: 0;
}

#FormSuccess > :last-child > a {
	width: 8.5rem;
	display: inline-flex;
	justify-content: space-around;
}

#FormSuccess > :last-child > a svg {
	margin: 0;
}

#FormSuccess > :last-child > a:first-of-type {
	margin-right: 1.5rem;
}

#FormSuccess > :last-child > a:last-of-type {
	float: right;
}

@media only screen and (max-width: 480px) {
	#FormSuccess {
		padding: 1rem 0.25rem;
	}

	#FormSuccess h2 {
		width: 95%;
	}
}
</style>
