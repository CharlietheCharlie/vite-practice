<template>
    <div class="description">
        <slot>default description</slot>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['textColor','iconColor']);
</script>

<style lang="scss" scoped>
    .description{
        font-size: 20px;
        color: v-bind(textColor);
    }
</style>