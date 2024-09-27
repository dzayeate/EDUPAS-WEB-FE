<template>
    <div>
        <div
            v-if="activities != ''"
            class="flex justify-start pb-6 border-b border-b-1 border-b-gray-200 font-openSans"
        >
            <div class="w-4/12">
                <h3 class="text-base font-normal">Kompetisi Terdaftar</h3>
                <h4 class="text-4xl font-medium my-4">
                    {{ userDetail?.registeredCompetitions }}
                </h4>
                <p class="text-neutral-400">Indeks total kompetisi terdaftar</p>
            </div>
            <div
                class="border-l border-l-1 border-l-gray-200 h-[120px] pr-10"
            ></div>
            <div class="w-4/12">
                <h3 class="text-base font-normal">Kompetisi Dimulai</h3>
                <h4 class="text-4xl font-medium my-4">
                    {{ userDetail?.startedCompetitions }}
                </h4>
                <p class="text-neutral-400">Indeks total kompetisi dimulai</p>
            </div>
            <div
                class="border-l border-l-1 border-l-gray-200 h-[120px] pr-10"
            ></div>
            <div class="w-4/12">
                <h3 class="text-base font-normal">Kompetisi Belum Dimulai</h3>
                <h4 class="text-4xl font-medium my-4">
                    {{ userDetail?.notStartedCompetitions }}
                </h4>
                <p class="text-neutral-400">
                    Indeks total kompetisi belum dimulai
                </p>
            </div>
        </div>
        <div></div>
        <div>
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold mb-2 pt-3">Aktifitas</h3>
            </div>
            <div v-if="activities != ''">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-48 gap-y-8 border-b border-b-1 border-b-gray-200 pb-5 mb-5"
                >
                    <CardView
                        v-for="(v, i) in activities"
                        :key="i"
                        :slug="v.competitionId"
                        :image="v.thumbnail?.previewUrl"
                        :title="v.competitionName"
                        :description="v.description"
                        :discount="v.discount"
                    />
                </div>
                <div class="justify-between items-center hidden">
                    <h3 class="text-lg font-semibold mb-2">
                        Riwayat Kompetisi
                    </h3>
                </div>
                <div
                    class=" grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-48 hidden"
                >
                    <CardView v-for="i in 3" :key="i" :isActivities="true" />
                </div>
            </div>
            <div v-else class="flex justify-center">
                <img src="@/assets/images/empty-activity.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import CardView from '@/components/card/CardView.vue';
export default {
    components: {
        CardView,
    },
    data() {
        return {
            activity: '',
        };
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        activities() {
            return this.userDetail?.activities;
        },
    },
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
