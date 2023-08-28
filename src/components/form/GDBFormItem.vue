<template>
    <div>

    </div>
</template>

<script setup>
import { ref, provide } from 'vue';
const isFieldError = ref(false);
provide('isFieldError', isFieldError);
</script>

<style lang="scss" scoped></style>