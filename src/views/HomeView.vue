<template>
    <div id="home" class="px-[16px] md:px-[42px] py-[24px]">
        <HeaderView />
    </div>
    <div
        id="competition"
        class="px-[16px] md:px-[42px] pt-9 pb-12 my-10 bg-colorBg-default"
    >
        <div class="text-center mb-3">
            <h2 class="font-medium text-[28px] text-colorPurple font-openSans">
                Kompetisi Mendatang
            </h2>
            <p class="font-normal text-[16px] leading-[24px]">
                Temukan event menarik dan asah skill mu!
            </p>
        </div>
        <form class="mx-auto w-6/12" @submit.prevent="performSearch">
            <label
                for="default-search"
                class="mb-2 text-sm font-medium text-colorText sr-only dark:text-white"
                >Search</label
            >
            <div class="relative">
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
                    class="block w-full py-2 px-3 pe-10 text-sm text-black border border-[#C2C2C2] rounded-md bg-white placeholder-[#757575] focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    placeholder="Search Event"
                    v-model="search.keyword"
                />
            </div>
        </form>
        <div class="flex justify-center items-center gap-3 py-5">
            <label class="text-[14px]">Filter: </label>
            <div
                v-for="(v, i) in filter"
                :key="i"
                class="py-[6px] px-[10px] shadow-md font-normal text-[12px] leading-[16px] bg-white rounded-md cursor-pointer"
            >
                {{ v }}
            </div>
        </div>
        <v-icon
            name="ri-refresh-line"
            class="text-gray-400 my-10 w-full"
            speed="slow"
            scale="4"
            animation="spin"
            v-if="isLoading"
        />
        <div v-else-if="isError" class="text-center">
            <h2
                class="px-3 py-2 bg-red-600 w-fit text-white rounded-lg font-light italic text-lg mx-auto my-16"
            >
                <span>
                    <v-icon name="bi-info-circle" class="space-x-3"/>
                </span>
                Gagal memuat data
            </h2>
        </div>
        <div v-else-if="contests.length === 0 && searchPerformed" class="text-center">
            <h2
                class="px-3 py-2 bg-customBlue w-fit text-white rounded-lg font-light italic text-lg mx-auto my-16"
            >
                <span>
                    <v-icon name="bi-info-circle" class="space-x-3"/>
                </span>
                Data tidak ditemukan
            </h2>
        </div>
        <div v-else-if="contests.length === 0 && !searchPerformed"  class="text-center">
            <h2
                class="px-3 py-2 bg-customBlue w-fit text-white rounded-lg font-light italic text-lg mx-auto my-16"
            >
                <span>
                    <v-icon name="bi-info-circle" class="space-x-3"/>
                </span>
                Belum ada kompetisi
            </h2>
        </div>
        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5"            
        >
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
        <!-- <Loading v-else/> -->
        <div class="flex justify-end pt-5 text-colorPurple mx-5">
            <a href="/competition?type=list">Lainnya</a>
        </div>
    </div>
    <div id="locate" class="py-[54px] text-center mb-6">
        <h2 class="font-medium text-[28px] text-colorPurple mb-4 font-openSans">
            Lokasi Kompetisi
        </h2>
        <div class="flex justify-center">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.201018565748!2d107.59162083730583!3d-6.866498637864936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6be3e8a0c49%3A0x730028bf4627def4!2sUniversitas%20Pasundan!5e0!3m2!1sen!2sid!4v1717856647607!5m2!1sen!2sid"
                class="w-[90%]"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    </div>
</template>

<script>
import HeaderView from '@/components/header/HeaderView.vue';
import EventCard from '@/components/card/EventCard.vue';
import { useMeta } from 'vue-meta';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiRefreshLine, BiInfoCircle } from 'oh-vue-icons/icons';

addIcons(RiRefreshLine, BiInfoCircle);

export default {
    components: {
        HeaderView,
        EventCard,
        VIcon: OhVueIcon,
        // StepThree,
    },
    setup() {
        useMeta({ title: 'Home' });
    },
    data() {
        return {
            filter: [
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
            ],                                    
            search: {
                page: '',
                length: 4,
                keyword: '',
            },
            searchPerformed: false,
        };
    },
    computed: {
        contests() {
            return this.$store.getters['contest/contests'];
        },
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        },
        isError() {
            return this.$store.getters['contest/isError'];
        },
    },
    async mounted() {
        await this.$store.dispatch('contest/getContest', this.search);
    },
    methods: {        
        async performSearch() {
            this.searchPerformed = true;
            await this.$store.dispatch('contest/getContest', this.search);                            
        },
    },
};
</script>
