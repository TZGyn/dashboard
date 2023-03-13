<template>
	<div class="flex h-full w-full justify-center p-4">
	</div>
</template>

<script setup lang="ts">
	const msg = ref<string>('hello')

	onMounted(() => {
		console.log(msg)
	})
</script>
