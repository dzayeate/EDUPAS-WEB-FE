<template>
    <div class="flex items-center gap-4 mt-10 pb-7">
        <form class="relative w-1/4" action="" @submit.prevent="performSearch">
            <div>
                <div
                    class="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                    @click="performSearch"
                >
                    <svg
                        class="w-4 h-4 text-[#616161]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    class="block w-full p-2 pe-10 text-sm text-black border border-[#C2C2C2] rounded-lg bg-[#FFFF] placeholder-[#757575] focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    placeholder="Search"
                    v-model="search.keyword"                                    
                />
            </div>
        </form>

        <select
            id="competition-type"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 focus:outline-none"
        >
            <option selected>Competition Type</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
        <select
            id="competition-topics"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 focus:outline-none"
        >
            <option selected>Competition Topics</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
        <select
            id="competition-location"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 focus:outline-none"
        >
            <option selected>Locate</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
    </div>
    <div class="container mx-auto mb-12">
        <div v-if="isLoading" class="w-16 my-10 mx-auto">
            <img src="../../assets//loading/loading.svg">
        </div>                
        <div v-else-if="isError" class="text-center">
            <h2
                class="px-3 py-2 bg-red-600 w-fit text-white rounded-lg font-light italic text-lg mx-auto my-16 flex items-center gap-2"
            >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </span>
                Gagal memuat data
            </h2>
        </div>
        <div v-else-if="contests.length === 0 && searchPerformed" class="text-center">
            <h2
                class="px-3 py-2 bg-customBlue w-fit text-white rounded-lg font-light italic text-lg mx-auto my-16 flex items-center gap-2"
            >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </span>
                Data tidak ditemukan
            </h2>
        </div>
        <div v-else-if="contests.length === 0 && !searchPerformed"  class="text-center">
            <h2
                class="px-3 py-2 bg-customBlue w-fit text-white rounded-lg font-light italic text-lg mx-auto my-16 flex items-center gap-2"
            >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </span>
                Belum ada kompetisi
            </h2>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <EventCard
                v-for="(v, i) in contests"
                :key="i"
                :slug="v.id"
                :image="v.thumbnail?.previewUrl"
                :title="v.name"
                :description="v.description"
                :discount="v.discount"
            />
        </div>        
    </div>
</template>

<script>
import EventCard from '../card/EventCard.vue';

export default {
    components: {
        EventCard,        
    },
    data() {
        return {
            search: {
                page: '',
                length: '',
                keyword: '',
            },
            searchPerformed: false,
        }
    },
    computed: {
        contests() {
            return this.$store.getters['contest/contests'];
        },
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        },
        isError() {
            return this.$store.getters['contest/isError'];
        },
    },
    methods: {
        async performSearch() {
            this.searchPerformed = true;            
            await this.$store.dispatch('contest/getContest', this.search);                    
        },
    }
    
};
</script>
