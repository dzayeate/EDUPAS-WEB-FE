<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white w-full flex justify-center items-center overflow-y-auto"
  >
    <div class="flex flex-col gap-6 w-full px-[24px] md:px-0 md:w-[400px]">
      <div>
        <h2
          class="font-medium text-[28px] leading-[36px] text-[#3267E3] mb-[8px]"
        >
          Get Started
        </h2>
        <p class="font-normal text-[16px] leading-[36px] text-[#3267E3]">
          Please select your role
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
        <div class="text-[#3267E3]">or</div>
        <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="role">Role</label>
        <select
          id="role"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 focus:outline-none"
          v-model="data.roleName"
        >
          <option value="">Choose Role</option>
          <option value="umum">Umum</option>
          <option value="siswa">Siswa</option>
          <option value="mahasiswa">Mahasiswa</option>
          <option value="eo">EO</option>
          <option value="sponsor">Sponsor</option>
          <option value="perusahaan">Perusahaan</option>
        </select>
      </div>
      <div class="flex flex-col gap-4">
        <button
          type="submit"
          :class="`${
            !data.roleName || isLoading
              ? 'opacity-[0.6] cursor-not-allowed'
              : 'cursor-pointer'
          } bg-[#4C4DDC] text-white py-[6px] px-[16px] rounded-[6px]`"
          :disabled="!data.roleName || isLoading"
        >
          {{ isLoading ? "Loading..." : "Choose" }}
        </button>
        <a
          @click="skipHandler"
          class="text-customBlue cursor-pointer hover:opacity-[0.8] w-fit"
          >Lewati</a
        >
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    roleName: String,
  },
  data() {
    return {
      isLoading: false,
      data: {
        roleName: "",
      },
    };
  },
  mounted() {
    this.data.roleName = this.roleName;
  },
  methods: {
    async handleSubmit() {
      if (this.data.roleName != "") {
        this.isLoading = true;
        this.$emit("stepTwoHandler", this.data);
      }
      this.isLoading = false;
    },
    skipHandler() {
      this.$emit("skipHandler");
    },
  },
};
</script>
