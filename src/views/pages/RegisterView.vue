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
    <ThermView
      v-if="step === 0"
      :email="data.email"
      :password="data.password"
      :confirmPassword="data.confirmPassword"
      :roleName="data.roleName"
      :isAgree="data.isAgree"
      :status="status"
      @showThermsHandler="showThermsHandler"
    />
    <StepOne
      v-else-if="step === 1"
      :email="data.email"
      :password="data.password"
      :confirmPassword="data.confirmPassword"
      :roleName="data.roleName"
      :isAgree="data.isAgree"
      @stepOneHandler="stepOneHandler"
      :status="status"
      @showThermsHandler="showThermsHandler"
    />
    <StepTwo v-else-if="step === 2" @stepTwoHandler="stepTwoHandler" />
    <StepThree
      v-else
      :role="data.role"
      @stepTwoHandler="stepTwoHandler"
      :email="data.email"
      :password="data.password"
      :confirmPassword="data.confirmPassword"
      :roleName="data.roleName"
    />
  </div>
</template>

<script>
import ThermView from "@/components/register/ThermView.vue";
import StepOne from "@/components/register/StepOne.vue";
import StepTwo from "@/components/register/StepTwo.vue";
import StepThree from "@/components/register/StepThree.vue";
import { useMeta } from "vue-meta";

export default {
  setup() {
    useMeta({ title: "Register", titleTemplate: "EduPass | %s" });
  },
  components: {
    ThermView,
    StepOne,
    StepTwo,
    StepThree,
  },
  data() {
    return {
      data: {
        email: "",
        password: "",
        confirmPassword: "",
        roleName: "umum",
        isAgree: false,
      },
      status: {
        passwordStrength: "",
        emailCorrected: "",
        passwordConfirmed: "",
      },
      step: 1,
    };
  },
  methods: {
    showThermsHandler(data) {
      this.step = data.step;
      this.data.email = data.data.email;
      this.data.password = data.data.password;
      this.data.confirmPassword = data.data.confirmPassword;
      this.data.roleName = data.data.roleName;
      this.data.isAgree = data.data.isAgree;
      this.status.passwordStrength = data.status.passwordStrength;
      this.status.emailCorrected = data.status.emailCorrected;
      this.status.passwordConfirmed = data.status.passwordConfirmed;
    },
    stepOneHandler(data) {
      this.data = data;
      if (this.data) {
        this.step = 2;
      }
    },
    stepTwoHandler(data) {
      this.data.roleName = data.roleName;
      if (this.data.roleName) {
        this.step = 3;
      }
    },
  },
};
</script>

<style>
/* Tambahkan beberapa gaya untuk memastikan tampilan kartu tetap baik */
</style>
