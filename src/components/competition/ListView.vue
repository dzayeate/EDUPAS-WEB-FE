<template>
    <div class="flex items-center gap-4 mt-10 pb-7">
        <div class="relative w-1/4">
            <div
                class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none"
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
                required
            />
        </div>

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
    <div class="mb-12">
        <div class="flex gap-6 justify-start">
            <EventCard
                v-for="(v, i) in contests"
                :key="i"
                :slug="v.id"
                :image="v.banner"
                :title="v.name"
                :description="v.description"
                :discount="v.discount"
            />
        </div>
        <v-icon name="ri-refresh-line" class="text-gray-400 my-10 w-full" speed="slow" scale="4" animation="spin" v-if="isLoading"/>
    </div>
</template>

<script>
import EventCard from '../card/EventCard.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiRefreshLine } from 'oh-vue-icons/icons';

addIcons(RiRefreshLine);


export default {
    components: {
        EventCard,
        VIcon: OhVueIcon
    },
    computed: {
        contests() {
            return this.$store.getters['contest/contests'];
        },
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        }
    },
};
</script>
