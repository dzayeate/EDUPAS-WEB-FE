<template>
  <div class="fixed z-20 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Edit Keahlian
              </h3>
              <div class="mt-2">
                <form @submit.prevent="handleSubmit">
                  <div class="mb-4">
                    <input
                      type="text"
                      id="school"
                      placeholder="Masukan Keahlian"
                      class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div class="mb-4">
                    <button
                      type="button"
                      class="text-blue-500"
                      @click="addSkill"
                    >
                      + Tambah keahlian baru
                    </button>
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="button"
                      class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                      @click="$emit('closeModal')"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  async mounted() {},
  computed: {},
  methods: {
    handleSubmit() {
      // Handle form submission
      this.$emit("closeModal");
    },
    addSkill() {
      // Handle adding new education
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
