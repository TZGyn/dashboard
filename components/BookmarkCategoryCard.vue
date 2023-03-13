<script setup lang="ts">
	interface Props {
		categoryTitle: string
		categoryIcon: string
		bookmarks: {
			bookmark_name: string
			bookmark_icon: string
			bookmark_link: string
		}[]
	}

	const props = defineProps<Props>()

	const openBookmarks = ref<Boolean>(false)

	const toggleOpenBookmarks = () => {
		openBookmarks.value = !openBookmarks.value
	}
</script>

<template>
	<div
		v-auto-animate
		class="shrink-0 grow basis-64">
		<div
			@click.stop.prevent.self="toggleOpenBookmarks()"
			class="bg-secondary flex select-none gap-6 rounded-lg p-4 hover:cursor-pointer">
			<Icon :name="props.categoryIcon" />
			<p class="font-bold">{{ props.categoryTitle }}</p>
		</div>
		<div
			v-if="openBookmarks"
			class="flex flex-col p-4">
			<div v-for="bookmark in props.bookmarks">
				{{ bookmark }}
			</div>
		</div>
	</div>
</template>
