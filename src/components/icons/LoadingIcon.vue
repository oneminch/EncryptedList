<template>
	<div class="spinner"></div>
</template>

<script>
export default {
	name: "LoadingIcon"
};
</script>

<style scoped>
* {
	outline: none;
}

.spinner {
	width: 3rem;
	height: 3rem;
	margin: 0 auto;
	border-top: 0.5rem solid var(--primary-yellow-color);
	border-bottom: 0.5rem solid var(--primary-yellow-color);
	border-left: 0.5rem solid var(--background-color);
	border-right: 0.5rem solid var(--background-color);
	border-radius: 1.5rem;
	-webkit-transform-origin: center;
	-moz-transform-origin: center;
	-ms-transform-origin: center;
	-o-transform-origin: center;
	transform-origin: center;
	-webkit-animation: spinner 2s linear infinite;
	-moz-animation: spinner 2s linear infinite;
	-ms-animation: spinner 2s linear infinite;
	-o-animation: spinner 2s linear infinite;
	animation: spinner 2s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	50% {
		-webkit-transform: rotate(360deg);
	}
	100% {
		-webkit-transform: rotate(720deg);
	}
}

@-moz-keyframes spinner {
	0% {
		-moz-transform: rotate(0deg);
	}
	50% {
		-moz-transform: rotate(360deg);
	}
	100% {
		-moz-transform: rotate(720deg);
	}
}

@-ms-keyframes spinner {
	0% {
		-ms-transform: rotate(0deg);
	}
	50% {
		-ms-transform: rotate(360deg);
	}
	100% {
		-ms-transform: rotate(720deg);
	}
}

@-o-keyframes spinner {
	0% {
		-o-transform: rotate(0deg);
	}
	50% {
		-o-transform: rotate(360deg);
	}
	100% {
		-o-transform: rotate(720deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(360deg);
	}
	100% {
		transform: rotate(720deg);
	}
}
</style>
