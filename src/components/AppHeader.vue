<script lang="ts" setup>
const menuItems = [
	{ name: 'Доходы', path: '/incomes' },
	{ name: 'Заказы', path: '/orders' },
	{ name: 'Продажи', path: '/sales' },
	{ name: 'Акции', path: '/stocks' }
]
</script>

<template>
	<header class="block min-h-[70px] pt-[70px] box-border">
		<div
			class="fixed flex top-0 left-0 right-0 flex-none flex-row items-center justify-between h-[70px] px-[20px] py-[5px] box-border z-10 border-b border-b-[var(--color-border)] bg-[var(--color-primary)]"
		>
			<div class="flex flex-row items-center justify-start flex-shrink flex-grow-0 min-w-0 max-w-full">
				<RouterLink
					to="/"
					class="block border-0 no-underline text-[var(--color-secondary)] text-4xl font-semibold"
				>
					Vue App
				</RouterLink>
			</div>
			<nav class="absolute left-1/2 -translate-x-1/2 flex gap-14 items-center">
				<RouterLink
					v-for="item in menuItems"
					:key="item.path"
					:to="item.path"
					class="text-[var(--color-muted)] text-lg font-semibold no-underline hover:text-[var(--color-muted-foreground)]"
				>
					{{ item.name }}
				</RouterLink>
			</nav>
		</div>
	</header>
</template>

<style scoped lang="scss">
.router-link-active,
.router-link-exact-active {
	color: var(--color-muted-foreground);
}
</style>
