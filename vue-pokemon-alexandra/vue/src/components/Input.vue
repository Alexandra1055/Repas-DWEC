<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
    placeholder: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['input']);
</script>

<template>
    <input type="text" :placeholder="placeholder" @input="emit('input', $event.target.value)">
</template>

<style scoped></style>