<script setup lang="ts">
	interface HeaderLink {
		title: string
		url: string
	}

	const headerLinks: Array<HeaderLink> = [
		{
			title: 'Profile',
			url: '/profile',
		},
		{
			title: 'Stats',
			url: '/stats',
		},
	]
</script>

<template>
	<div class="border-lightgray mb-6 flex w-full justify-center border-b">
		<div class="m-4 flex w-full max-w-4xl items-center gap-4">
			<Icon
				class="text-blue-500"
				name="mdi:bookshelf"
				size="32" />
			<div v-for="headerLink in headerLinks">
				<NuxtLink :to="headerLink.url">
					{{ headerLink.title }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
