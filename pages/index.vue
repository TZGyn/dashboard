<template>
	<div></div>
</template>

<script setup lang="ts">
	const msg = ref<string>('hello')

	onMounted(() => {
		console.log(msg)
	})
</script>
