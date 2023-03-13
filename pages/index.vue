<template>
	<div class="flex h-full w-full justify-center p-4">
		<div class="flex w-full max-w-4xl flex-wrap gap-6">
			<BookmarkCategoryCard
				v-for="bookmark_category in bookmark_categories"
				:categoryTitle="bookmark_category.bookmark_category_name"
				:categoryIcon="bookmark_category.bookmark_category_icon"
				:bookmarks="bookmark_category.bookmarks" />
		</div>
	</div>
</template>

<script setup lang="ts">
	const { data: bookmark_categories, refresh } = useFetch('/api/bookmarks', {
		method: 'GET',
	})

	onMounted(() => {
		refresh()
		console.log(bookmark_categories.value)
	})
</script>
