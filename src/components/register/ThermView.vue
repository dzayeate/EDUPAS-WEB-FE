<template>
  <div class="bg-white w-full h-[100vh] overflow-x-auto px-[84px] py-[24px]">
    <div class="w-full px-[24px] md:px-0">
      <div>
        <h2
          class="font-medium text-[28px] leanding-[36px] text-[#0A0A0A] mb-[8px]"
        >
          TERM AND CONDITION
        </h2>
      </div>
      <div class="text-justify">
        <p class="mb-[8px]">
          Here are some of the key sections that are commonly included in terms
          and conditions agreements:
        </p>
        <ul class="list-disc px-[24px] mb-[8px]">
          <li>
            Introduction: This section will identify the agreement and the
            parties involved.  
          </li>
          <li>
            Definitions: This section will define any important terms used
            throughout the agreement.
          </li>
          <li>
            Use of the Service: This section will outline the rules and
            regulations for using your service. This might include things like
            acceptable use policies, restrictions on content, and limitations of
            liability.
          </li>
          <li>
            User Accounts: This section will explain how user accounts are
            created, managed, and terminated.
          </li>
          <li>
            Intellectual Property: This section will clarify who owns the
            intellectual property rights to the content on your service.
          </li>
          <li>
            IPrivacy: This section will explain how you collect, use, and
            disclose user data. You should comply with all applicable privacy
            laws and regulations, including GDPR and CCPA.
          </li>
          <li>
            Termination: This section will outline the circumstances under which
            you or the user can terminate the agreement.
          </li>
          <li>
            Disclaimers: This section will disclaim any warranties or guarantees
            that you make about your service.
          </li>
          <li>
            Limitation of Liability: This section will limit your liability for
            any damages that may arise from the use of your service.
          </li>
          <li>
            Governing Law and Dispute Resolution: This section will specify the
            laws that govern the agreement and how any disputes will be resolved
          </li>
        </ul>
        <p class="mb-[8px]">
          Here are some additional things to consider when creating your terms
          and conditions agreement:
        </p>
        <ul class="list-disc px-[24px] mb-[8px]">
          <li>
            Keep it simple and easy to understand. Your terms and conditions
            agreement should be written in plain language that your users can
            understand.
          </li>
          <li>
            Make it accessible. Your terms and conditions agreement should be
            easy for users to find. You can include a link to it on your website
            or mobile app.
          </li>
          <li>
            Get legal advice. It is always a good idea to consult with an
            attorney before finalizing your terms and conditions agreement.
          </li>
        </ul>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <input
            id="link-checkbox"
            type="checkbox"
            v-model="data.isAgree"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />
          <label
            for="link-checkbox"
            class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
            >I agree.</label
          >
        </div>
        <button
          type="button"
          class="bg-[#4C4DDC] text-white py-[6px] px-[16px] rounded-[6px] hover:opacity-[0.8] cursor-pointer"
          @click="showThermsHandler"
        >
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "Login",
      titleTemplate: "EduPass - %s",
    };
  },
  props: {
    email: String,
    password: String,
    confirmPassword: String,
    roleName: String,
    isAgree: Boolean,
    status: Object,
  },
  data() {
    return {
      isLoading: false,
      showPassword: false,
      passwordStrength: "",
      emailCorrected: "",
      passwordConfirmed: "",
      data: {
        email: "",
        password: "",
        confirmPassword: "",
        isAgree: false,
        roleName: "umum",
      },
    };
  },
  mounted() {
    this.data.email = this.email;
    this.data.password = this.password;
    this.data.confirmPassword = this.confirmPassword;
    this.data.roleName = this.roleName;
    this.data.isAgree = this.isAgree;
    this.passwordStrength = this.status.passwordStrength;
    this.emailCorrected = this.status.emailCorrected;
    this.passwordConfirmed = this.status.passwordConfirmed;
  },
  methods: {
    showThermsHandler() {
      const status = {
        passwordStrength: this.passwordStrength,
        emailCorrected: this.emailCorrected,
        passwordConfirmed: this.passwordConfirmed,
      };
      this.$emit("showThermsHandler", { step: 1, data: this.data, status });
    },
  },
};
</script>

<style scoped>
/* Styles here */
</style>
