<template>
    <div>
        <header class="flex gap-x-4">
            <ul class="">
                <li v-for="list, index in lists">
                    <RouterLink :to="list">{{ index }}</RouterLink>
                </li>
            </ul>
        </header>
    </div>
</template>

<script setup>
import {RouterLink} from 'vue-router'

const lists = {
    "題目1": "/todo-list",
    "題目2": "/serve-time",
    "題目3": "/code-review",
}
</script>

<style lang="scss" scoped></style>