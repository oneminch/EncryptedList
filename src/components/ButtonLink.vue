<template>
	<router-link
		:to="path"
		:title="label"
		class="button-link"
		:aria-label="label"
		@click.native="$emit('clicked')">
		<slot></slot>
	</router-link>
</template>

<script>
export default {
	name: "ButtonLink",
	props: {
		path: {
			type: String,
			default: "/"
		},
		label: String
	}
};
</script>

<style scoped>
* {
	outline: none;
}

.button-link {
	margin: 0;
	height: 3rem;
	font-size: 1rem;
	cursor: pointer;
	padding: 0 0.75rem;
	text-decoration: none;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
}

.button-link:hover {
	color: var(--text-color);
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
}

.router-link-active,
.router-link-exact-active {
	color: var(--text-color);
}
</style>
