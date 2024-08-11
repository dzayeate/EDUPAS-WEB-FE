<template>
  <div
    class="flex justify-between items-start py-3 border-b border-b-1 border-b-gray-200"
  >
    <div>
      <h3 class="text-lg font-semibold mb-2">About</h3>
      <p class="text-gray-600">
        {{ about ? about : "" }}
      </p>
    </div>
    <img
      :src="require('@/assets/icons/icon-edit.svg')"
      alt="Edit"
      @click="showAbout"
      class="cursor-pointer w-7"
    />
  </div>
  <div class="py-3">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold mb-2">Keahlian</h3>
      <img
        :src="require('@/assets/icons/icon-edit.svg')"
        alt="Edit"
        @click="showSkill"
        class="cursor-pointer w-7"
      />
    </div>
    <ul v-if="skills.length" class="list-disc list-inside text-gray-600">
        <li v-for="skill in skills" :key="skill">{{ skill }}</li>
    </ul>
    <!-- <p v-else class="text-gray-600">No skills available</p> -->
  </div>
</template>

<script>
export default {
    data() {
        return {
            about: "",
            skills: []
        }
    },
  methods: {
    showAbout() {
        this.$emit('show-modal-about')
    },
    showSkill() {
        this.$emit('show-modal-skill')
    }
  },
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
