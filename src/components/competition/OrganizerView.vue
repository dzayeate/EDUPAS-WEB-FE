<template>
    <div class="min-h-screen bg-gray-100 py-8">
        <div class="container mx-auto px-4">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
                <CardPerson
                    v-for="(member, index) in contests?.sponsor"
                    :key="index"
                    :image="member.image"
                    :name="member.name"
                    :status="member.status"
                />                
            </div>
            <h1 v-if="!contests?.sponsor" class="text-center font-bold text-lg flex justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                Belum ada organize
            </h1>
        </div>
    </div>
</template>

<script>
import CardPerson from '@/components/card/CardPerson.vue';

export default {
    components: {
        CardPerson,        
    },
    computed: {
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
    },
    data() {
        return {
            teamMembers: [
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
                {
                    image: 'image.png',
                    name: 'Hilman Leonardo',
                    status: 'Team Core',
                },
            ],
        };
    },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
