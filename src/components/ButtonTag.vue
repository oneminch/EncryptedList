<template>
	<button
		@click="emitEvent"
		:aria-label="value"
		:closable="closable"
		:class="['button-tag', { closable: closable }]">
		{{ value }}
		<app-close-icon
			@clicked="$emit('close-tag')"
			v-show="closable"
			:title="closingTaskTitle"></app-close-icon>
	</button>
</template>

<script>
import CloseIcon from "./icons/CloseIcon.vue";

export default {
	name: "ButtonTag",
	props: {
		value: String,
		closingTaskTitle: {
			type: String,
			required: false
		},
		closable: {
			type: Boolean,
			default: false
		}
	},
	components: {
		appCloseIcon: CloseIcon
	},
	methods: {
		emitEvent: function () {
			if (!this.closable) {
				this.$emit("clicked");
			}
		}
	}
};
</script>

<style scoped>
* {
	outline: none;
}

.button-tag {
	margin: 0;
	height: 1.5rem;
	font-size: 0.8rem;
	cursor: pointer;
	padding: 0 0.75rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: 0.75rem;
	color: var(--text-color);
	background-color: var(--tags-bg-color);
}

.button-tag:hover {
	color: var(--text-color);
	background-color: var(--tags-bg-hover-color);
}

.button-tag.closable {
	justify-content: space-between;
}

.button-tag.closable svg {
	margin: 0 0.15rem 0 0.35rem;
}
</style>
