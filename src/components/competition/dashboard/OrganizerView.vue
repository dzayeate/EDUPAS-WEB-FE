<template>
    <div class="flex flex-col w-11/12">
        <div class="mt-8 flex flex-col gap-3">
            <CardList title="" :items="sponsors" />            
        </div>
        <div class="flex justify-end">
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
};
</script>
