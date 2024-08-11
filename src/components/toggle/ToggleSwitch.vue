<template>
  <div @click="toggle" class="relative inline-flex items-center cursor-pointer select-none">
    <span :class="isActive ? 'bg-green-500' : 'bg-gray-200'" class="block w-12 h-6 rounded-full transition duration-300 ease-in-out"></span>
    <span :class="isActive ? 'translate-x-6' : 'translate-x-0'" class="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-300 ease-in-out"></span>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle', !this.isActive);
    },
  },
};
</script>

<style scoped>
/* Tambahkan gaya khusus di sini jika diperlukan */
</style>
