<script setup>
import { defineProps } from "vue";
defineProps({
    text: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['click']);

</script>
<template>
    <button type="button" @click="emit('click')">
        {{ text }}
    </button>
</template>
<style scoped></style>