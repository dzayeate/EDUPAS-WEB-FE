<template>
  <div
    class="flex justify-between items-start py-6 border-b border-b-1 border-b-gray-200"
  >
    <div>
      <h3 class="text-lg font-semibold mb-2">About</h3>
      <p class="text-gray-600">
        Aspiring UI/UX Junior | Passionate about creating intuitive and visually
        appealing user experiences. Proficient in design tools and eager to
        contribute creative solutions for user-centered designs. Open to
        learning and collaborating with cross-functional teams to enhance
        digital interactions.
      </p>
    </div>
    <img
      :src="require('@/assets/icons/icon-edit.svg')"
      alt="Edit"
      @click="$emit('showModalAbout')"
      class="cursor-pointer"
    />
  </div>
  <div class="py-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold mb-2">Keahlian</h3>
      <img
        :src="require('@/assets/icons/icon-edit.svg')"
        alt="Edit"
        @click="$emit('showModalSkill')"
        class="cursor-pointer"
      />
    </div>
    <ul class="list-disc list-inside text-gray-600">
      <li>UI/UX</li>
      <li>Wireframing</li>
      <li>Prototyping</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
