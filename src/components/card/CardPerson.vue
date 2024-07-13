<template>
  <div class="p-4">
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4"
    >
      <img
        class="rounded-full w-24 h-24 mb-4"
        :src="require('@/assets/images/' + image)"
        alt="Profile Picture"
      />
      <p class="text-blue-500 text-sm mb-1">{{ status }}</p>
      <p class="text-gray-700 text-base">{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped></style>
