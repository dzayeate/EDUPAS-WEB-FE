<template>
  <div class="flex flex-col md:flex-row w-full h-[100vh] h-max-[100%]">
    <div
      class="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-500 to-purple-500 text-white p-8 items-center"
    >
      <div>
        <h2 class="text-3xl font-bold mb-4">
          Join and explore many interesting events
        </h2>
        <p class="text-lg">Get experience and prizes in them</p>
      </div>
    </div>
    <StepOne v-if="step === 1" @stepOneHandler="stepOneHandler" />
    <StepTwo
      v-else-if="step === 2"
      :email="data.email"
      @stepTwoHandler="stepTwoHandler"
      @cancelHandler="cancelHandler"
    />
    <StepThree
      v-else
      :email="data.email"
      :token="data.token"
      @stepThreeHandler="stepTwoHandler"
      @cancelHandler="cancelHandler"
    />
  </div>
</template>

<script>
import StepOne from "@/components/forgot/StepOne.vue";
import StepTwo from "@/components/forgot/StepTwo.vue";
import StepThree from "@/components/forgot/StepThree.vue";

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
  },
  metaInfo() {
    return {
      title: "Forget",
      titleTemplate: "EduPass | %s",
    };
  },
  data() {
    return {
      isLoading: false,
      showPassword: false,
      data: { email: "", token: "", password: "", confirmPassword: "" },
      step: 1,
    };
  },
  methods: {
    stepOneHandler(data) {
      this.data = data;
      if (this.data) {
        this.step = 2;
      }
    },
    stepTwoHandler(data) {
      this.data.token = data.token;
      if (this.data) {
        this.step = 3;
      }
    },
    cancelHandler(position) {
      this.step = position - 1;
    },
  },
};
</script>

<style scoped>
/* Styles here */
</style>
