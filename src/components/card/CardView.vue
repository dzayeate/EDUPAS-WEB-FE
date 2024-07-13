<template>
  <div
    class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden mx-auto my-4"
  >
    <div class="p-4">
      <p class="text-sm text-gray-600">
        Date Competition, Competition Types -
        <a href="#" class="text-blue-600">Competition Locate</a>
      </p>
      <p class="text-sm bg-gray-200 inline-block px-2 py-1 rounded">
        Competition Topics
      </p>
      <h3 class="text-lg font-semibold mt-2">Competition Title</h3>
      <p class="mt-2 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
      <button
        v-if="isActivities"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        View details
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slug: String,
    image: String,
    title: String,
    description: String,
    discount: String,
    isActivities: Boolean,
  },
  methods: {},
};
</script>
