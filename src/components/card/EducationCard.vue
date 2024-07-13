<template>
  <div class="flex items-center mb-4">
    <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
    <div class="ml-4">
      <h4 class="font-semibold">{{ institution }}</h4>
      <p class="text-gray-600">{{ degree }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    institution: String,
    degree: String,
  },
};
</script>
