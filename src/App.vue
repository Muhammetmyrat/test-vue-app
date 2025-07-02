<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
	<AppLayout>
		<router-view />
	</AppLayout>
</template>

<style lang="scss">
@use '@/assets/styles/base/fonts.scss';
@use '@/assets/styles/index.scss';
</style>
