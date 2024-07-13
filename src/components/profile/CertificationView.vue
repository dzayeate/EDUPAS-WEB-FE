<template>
  <div class="y-6">
    <div class="py-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold mb-2">Education</h3>
        <img
          @click="showModalProfile = true"
          :src="require('@/assets/icons/icon-edit.svg')"
          alt="Edit"
          class="cursor-pointer"
        />
      </div>
      <h4 class="text-md mb-4">Kompetisi</h4>
      <div class="flex justify-between items-center">
        <CardView v-for="i in 3" :key="i" />
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
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
