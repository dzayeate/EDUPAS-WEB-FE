<template>
  <Loading :active="isLoadingPage" />
  <form
    v-if="!isLoadingPage"
    @submit.prevent="handleSubmit"
    class="bg-white w-full h-[100vh] flex justify-center items-center overflow-y-auto"
  >
    <div
      class="flex flex-col md:flex-row w-full h-full justify-center items-center"
    >
      <div
        class="flex flex-col gap-6 w-full md:w-1/2 px-8 md:px-16 py-12 md:py-16"
      >
        <div>
          <h2
            class="font-medium text-[28px] leanding-[36px] text-[#3267E3] mb-[8px]"
          >
            Forgot Password
          </h2>
          <p class="text-base text-gray-500">
            Please enter your Verification Code
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
          <div class="text-[#3267E3]">or</div>
          <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
        </div>
        <div class="flex gap-2 justify-center">
          <input
            v-for="n in 5"
            :key="n"
            type="text"
            maxlength="1"
            v-model="data.tokenDigits[n - 1]"
            class="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            @input="updateToken"
          />
        </div>
        <div class="flex gap-4 mt-4">
          <button
            type="button"
            class="flex-1 bg-gray-200 text-gray-600 py-2 rounded-md"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 bg-blue-600 text-white py-2 rounded-md"
          >
            {{ isLoading ? "Loading..." : "Submit" }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Loading from "vue3-loading-overlay";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isLoadingPage: true,
      isLoading: false,
      data: {
        email: "",
        token: "",
        tokenDigits: Array(5).fill(""),
      },
    };
  },
  async mounted() {
    this.isLoadingPage = true;
    try {
      this.data.email = this.$route.query.email || "";
    } catch (error) {
      console.error("Error during mounting:", error);
    } finally {
      this.isLoadingPage = false;
    }
  },
  methods: {
    updateToken() {
      this.data.token = this.data.tokenDigits.join("");
    },
    async handleSubmit() {
      try {
        this.isLoading = true;
        // Handle submit logic here
        if (["12345"].includes(this.data.token)) {
          this.$emit("stepTwoHandler", this.data);
        } else {
          Swal.fire({
            title: "Error",
            text: "Token error!",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "An error occurred!",
          icon: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
    handleCancel() {
      this.$emit("cancelHandler", 2);
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
