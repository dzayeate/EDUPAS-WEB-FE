<template>
  <div class="y-6">
    <div class="py-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold mb-2">Education</h3>
        <img
          @click="$emit('showModalEducation')"
          :src="require('@/assets/icons/icon-edit.svg')"
          alt="Edit"
          class="cursor-pointer w-7 hidden"
        />
      </div>
      <div v-if="education">
          <h4 class="text-md mb-4">Perguruan Tinggi</h4>
          <EducationCard
            institution="UNIVERSITAS PASUNDAN"
            degree="S1 Teknik Informatika"
          />
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import EducationCard from "@/components/card/EducationCard.vue";

export default {
  components: {
    EducationCard,
  },
  data() {
    return {
        education: ""
    }
  }
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
