<template>
    <div>
        <div
            v-if="activity"
          class="flex justify-between items-start py-6 border-b border-b-1 border-b-gray-200"
        >
            <div>
                <h3 class="text-lg font-semibold mb-2">Kompetisi Terdaftar</h3>
                <h4 class="text-[36px] font-medium">10</h4>
                <p class="text-gray-600">Index total kompetisi terdaftar</p>
            </div>
            <div class="border-l border-l-1 border-l-gray-200 h-[120px]"></div>
                <div>
                    <h3 class="text-lg font-semibold mb-2">Kompetisi Dimulai</h3>
                    <h4 class="text-[36px] font-medium">10</h4>
                    <p class="text-gray-600">Index total kompetisi dimulai</p>
                </div>
            <div class="border-l border-l-1 border-l-gray-200 h-[120px]"></div>
            <div>
                <h3 class="text-lg font-semibold mb-2">Kompetisi Belum Dimulai</h3>
                <h4 class="text-[36px] font-medium">10</h4>
                <p class="text-gray-600">Index total kompetisi belum dimulai</p>
            </div>
        </div>
        <div v-else></div>
        <div>
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold mb-2 pt-3">Aktifitas</h3>
            </div>
            <div v-if="activity">
                <div class="flex justify-between items-center" >
                    <CardView v-for="i in 3" :key="i" :isActivities="true" />
                </div>
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold mb-2">Riwayat Kompetisi</h3>
                </div>
                <div class="flex justify-between items-center">
                    <CardView v-for="i in 3" :key="i" :isActivities="false" />
                </div>
            </div>
            <div v-else class="flex justify-center">
                <img src="@/assets/images/empty-activity.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import CardView from "@/components/card/CardView.vue";
export default {
  components: {
    CardView,
  },
  data() {
    return {
        activity: ""
    }
  }
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
