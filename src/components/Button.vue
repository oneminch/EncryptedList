<template>
	<button
		:title="label"
		:aria-label="label"
		@click="$emit('clicked')"
		:class="['button', { 'icon-button': iconButton }]">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "Button",
	props: {
		label: String,
		iconButton: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style scoped>
* {
	outline: none;
}

.button {
	margin: 0;
	height: 2.5rem;
	font-size: 1rem;
	cursor: pointer;
	padding: 0 0.75rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
}

.button:hover {
	color: var(--text-color);
	border: 2px solid var(--gray-border-color);
	border-bottom: 4px solid var(--gray-border-color);
}

.button.icon-button {
	min-width: 2.5rem;
	max-width: 2.5rem;
	padding: 0;
	justify-content: center;
}
</style>
