<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white w-full h-[100vh] flex justify-center items-center overflow-y-auto"
  >
    <div class="flex flex-col gap-6 w-full px-[24px] md:px-0 md:w-[400px]">
      <div>
        <h2
          class="font-medium text-[28px] leanding-[36px] text-[#3267E3] mb-[8px]"
        >
          Forgot Password
        </h2>
        <p class="font-normal text-[16px] leanding-[36px] text-[#3267E3]">
          Please Enter your email addres
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
        <div class="text-[#3267E3]">or</div>
        <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Example@gmail.com"
            class="block w-full p-2 text-sm text-black border border-[#C2C2C2] rounded-[6px] bg-[#F5F5FF] placeholder-[#757575] focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            v-model="data.email"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <button
          type="submit"
          :disabled="!data.email || isLoading"
          :class="`${
            !data.email || isLoading
              ? 'opacity-[0.6] cursor-not-allowed'
              : 'cursor-pointer'
          } bg-[#4C4DDC] text-white py-[6px] px-[16px] rounded-[6px]`"
        >
          {{ isLoading ? "Loading..." : "Submit" }}
        </button>
      </div>
      <div class="flex flex-col gap-4 text-center">
        <p>
          Don’t have an account yet?
          <a href="/register" class="text-[#3267E3] hover:underline"
            >Sign up here</a
          >
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import Loading from "vue3-loading-overlay";
import { POST_FORGOT } from "@/store/user.module";
import Swal from "sweetalert2";
import { useMeta } from "vue-meta";

export default {
  props: {
    email: String,
  },
  data() {
    return {
      isLoading: false,
      data: {
        email: "",
      },
    };
  },
  computed: {},
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true;
        const response = await this.$store.dispatch(POST_FORGOT, this.data);
        this.$emit("stepOneHandler", this.data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Something went worng!",
          icon: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
