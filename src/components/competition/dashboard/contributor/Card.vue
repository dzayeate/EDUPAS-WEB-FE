<template>
    <div class="w-40 shadow-card rounded-lg p-4 m-2 text-center">
        <img
            v-if="image"
            :src="require(`@/assets/images/${image}`)"
            :alt="name"
            class="w-24 h-24 mx-auto border-2 rounded-full object-cover"
        />
        <div class="mt-2">
            <p class="font-medium">{{ name }}</p>
            <p v-if="title" class="text-gray-500">{{ title }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
    },
};
</script>

<style scoped>
</style>
