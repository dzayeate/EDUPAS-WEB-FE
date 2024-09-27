<template>
    <div class="flex flex-col w-7/12">
        <div class="mt-8 flex flex-col gap-3">
            <CardList title="Sponsor" :items="sponsors" :hide-button="hideButton"/>
            <CardList title="Speaker" :items="speakers" :hide-button="hideButton"/>
            <CardList title="Juri" :items="judges" :hide-button="hideButton"/>
        </div>
        <div v-if="!hideButton" class="flex justify-end">
            <button class="px-3 py-2 bg-customBlue text-white rounded-md flex items-end">
                Kirim
            </button>
        </div>
    </div>
</template>

<script>
import CardList from '@/components/competition/dashboard/contributor/CardList.vue';

export default {
    components: {
        CardList,
    },
    data() {
        return {
            sponsors: [
                { name: 'Kunci.co', title: '', image: 'kunci.png' },
                { name: 'Kunci.co', title: '', image: 'kunci.png' },
            ],
            speakers: [
                { name: 'Hilman fc', title: '', image: 'image.png' },
            ],
            judges: [{ name: 'Sulaiman', title: '', image: 'image.png' }],
        };
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        hideButton() {
            return ['Admin', 'Sponsor'].includes(this.userDetail.role.name)
        }
    }
};
</script>
