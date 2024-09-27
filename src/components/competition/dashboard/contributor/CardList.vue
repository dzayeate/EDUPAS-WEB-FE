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
                <v-icon name="bi-plus" scale="4" class="text-gray-400"/>
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaPlus, BiPlus } from 'oh-vue-icons/icons';

addIcons(FaPlus, BiPlus)

export default {
    components: {
        Card,
        VIcon: OhVueIcon
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
