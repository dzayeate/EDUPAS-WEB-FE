<template>
    <div class="min-h-screen bg-gray-100 py-8">
        <div class="container mx-auto px-4">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
                <CardPerson
                    v-for="(member, index) in contests?.mentor"
                    :key="index"
                    :image="member.image"
                    :name="member.name"
                    :status="member.status"
                />
            </div>
            <h1 v-if="!contests?.mentor" class="text-center font-bold text-lg"><span><v-icon name="bi-info-circle" /></span> Belum ada contributor</h1>
        </div>
    </div>
</template>

<script>
import CardPerson from '@/components/card/CardPerson.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiInfoCircle } from 'oh-vue-icons/icons';

addIcons(BiInfoCircle);

export default {
    components: {
        CardPerson,
        VIcon: OhVueIcon
    },
    computed: {
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
    },
    data() {
        return {
            teamMembers: [
                { image: 'kunci.png', name: 'Kunci' },
                { image: 'kunci.png', name: 'Kunci' },
                { image: 'kunci.png', name: 'Kunci' },
            ],
        };
    },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
