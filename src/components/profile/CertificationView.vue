<template>
    <div class="y-6">
        <div class="py-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold mb-2">Kompetisi</h3>        
            </div>
            <div v-if="activities != ''">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-48 gap-y-8 border-b border-b-1 border-b-gray-200 pb-5 mb-5"
                >
                    <CardCertificate
                        v-for="(v, i) in activities"
                        :key="i"
                        :slug="v.competitionId"
                        :image="v.thumbnail?.previewUrl"
                        :title="v.competitionName"
                        :description="v.description"
                        :discount="v.discount"
                    />
                </div>                
            </div>
            <div v-else class="flex justify-center">
                <img src="@/assets/images/empty-activity.svg" alt="" />
            </div>
    </div>
  </div>
</template>

<script>
import CardCertificate from "@/components/card/CardCertificate.vue";
export default {
    components: {
        CardCertificate,
    },
    data() {
        return {
            certificate: ""
        }
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
