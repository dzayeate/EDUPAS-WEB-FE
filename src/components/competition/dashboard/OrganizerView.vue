<template>
    <div class="flex flex-col w-11/12">
        <div class="mt-8 flex flex-col gap-3">
            <CardList title="" :items="sponsors" :hide-button="hideButton" />            
        </div>
        <div class="flex justify-end" v-if="!hideButton">
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
                { name: 'Kunci.co', title: '', image: 'kunci.png' },
                { name: 'Kunci.co', title: '', image: 'kunci.png' },
                { name: 'Kunci.co', title: '', image: 'kunci.png' },
                { name: 'Kunci.co', title: '', image: 'kunci.png' },
                { name: 'Kunci.co', title: '', image: 'kunci.png' },
            ],            
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
