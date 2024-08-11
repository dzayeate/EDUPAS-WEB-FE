<template>
  <div class="y-6">
    <div class="py-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold mb-2">Kompetisi</h3>
        <img
          @click="showModalProfile = true"
          :src="require('@/assets/icons/icon-edit.svg')"
          alt="Edit"
          class="cursor-pointer w-7"
        />
      </div>
      <div class="flex justify-between items-center" v-if="certificate">
        <CardView v-for="i in 3" :key="i" />
      </div>
      <div v-else></div>
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
        certificate: ""
    }
  }
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
