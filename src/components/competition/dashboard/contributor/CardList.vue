<template>
    <div class="card-list my-5">
        <h2 class="text-xl font-medium mb-4">{{ title }}</h2>
        <div class="flex flex-wrap">
            <Card
                v-for="(item, index) in items"
                :key="index"
                :name="item.name"
                :title="item.title"
                :image="item.image"
            />
            <div
                v-if="!hideButton"
                class=" w-40 shadow-card rounded-lg p-4 m-2 flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-16 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue';

export default {
    components: {
        Card,        
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        hideButton: {
            type: Boolean,
            default: false
        }
    },    
};
</script>

<style scoped>
</style>
