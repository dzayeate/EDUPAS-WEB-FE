<template>
  <Loading :active="isLoadingPage" />
  <form
    v-if="!isLoadingPage"
    @submit.prevent="handleSubmit"
    class="bg-white w-full flex justify-center items-center overflow-y-auto"
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
      <div class="flex flex-col gap-4">
        <div class="relative flex flex-col gap-2">
          <label for="password">New Password</label>
          <div class="relative w-full">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your new password"
              @input="checkPasswordStrength()"
              @focus="showPasswordCard = true"
              @blur="showPasswordCard = false"
              :class="`${
                !passwordStrength
                  ? 'focus:ring-blue-500 focus:border-blue-500 border-[#C2C2C2]'
                  : passwordStrength === 'Weak'
                  ? ' focus:ring-red-500 focus:border-red-500 border-red-500'
                  : passwordStrength === 'Medium'
                  ? 'focus:ring-yellow-500 focus:border-yellow-500 border-yellow-500'
                  : passwordStrength === 'Strong'
                  ? 'focus:ring-green-500 focus:border-green-500 border-green-500'
                  : ''
              } block w-full p-2 text-sm text-black border rounded-[6px] bg-[#F5F5FF] placeholder-[#757575] focus:outline-none`"
              v-model="data.password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 4.5C5.75 4.5 2.45 7.42 1 10c1.45 2.58 4.75 5.5 9 5.5s7.55-2.92 9-5.5c-1.45-2.58-4.75-5.5-9-5.5zm0 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 3.5c-3.25 0-6.05 2.6-7.35 5 1.3 2.4 4.1 5 7.35 5s6.05-2.6 7.35-5c-1.3-2.4-4.1-5-7.35-5zm0 8c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zm0-5.5C7.35 6.5 5.5 8.35 5.5 10s1.85 3.5 4.5 3.5 4.5-1.85 4.5-3.5S12.65 6.5 10 6.5zm0 6.5c-1.35 0-2.5-1.15-2.5-2.5S8.65 8.5 10 8.5s2.5 1.15 2.5 2.5S11.35 13 10 13z"
                />
              </svg>
            </button>
          </div>
          <div
            :class="`${
              showPasswordCard ? '' : 'hidden'
            } absolute w-full top-full mt-2 border border-[#C2C2C2] p-4 rounded-[6px] bg-[#F5F5FF] z-10 duration-300`"
          >
            <h3
              class="font-medium text-[20px] leading-[28px] text-[#3267E3] mb-[8px]"
            >
              Password Requirements:
            </h3>
            <ul class="list-disc pl-5">
              <li
                :class="`${
                  data.password?.length < 8 ? 'text-red-500' : 'text-green-500'
                } mb-1`"
              >
                At least 8 characters long
              </li>
              <li
                :class="`${
                  !/[A-Z]/.test(data.password)
                    ? 'text-red-500'
                    : 'text-green-500'
                } mb-1`"
              >
                Contains at least one capital letter
              </li>
              <li
                :class="`${
                  !/[0-9]/.test(data.password)
                    ? 'text-red-500'
                    : 'text-green-500'
                } mb-1`"
              >
                Contains at least one number
              </li>
              <li
                :class="`${
                  !checkSymbol() ? 'text-red-500' : 'text-green-500'
                } mb-1`"
              >
                Contains at least one symbol (e.g., !@#$%^&*)
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label for="confirmPassword">Confirm Password</label>
          <div class="relative w-full">
            <input
              id="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              @input="checkConfirmPassword()"
              placeholder="Enter your confirm password"
              :class="`${
                !passwordConfirmed
                  ? 'focus:ring-blue-500 focus:border-blue-500 border-[#C2C2C2]'
                  : passwordConfirmed === 'Weak'
                  ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
                  : 'focus:ring-green-500 focus:border-green-500 border-green-500'
              } block w-full p-2 text-sm text-black border rounded-[6px] bg-[#F5F5FF] placeholder-[#757575] focus:outline-none`"
              v-model="data.confirmPassword"
            />
            <button
              type="button"
              @click="toggleConfirmPasswordVisibility"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
            >
              <svg
                v-if="showConfirmPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 4.5C5.75 4.5 2.45 7.42 1 10c1.45 2.58 4.75 5.5 9 5.5s7.55-2.92 9-5.5c-1.45-2.58-4.75-5.5-9-5.5zm0 9c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0-4.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 3.5c-3.25 0-6.05 2.6-7.35 5 1.3 2.4 4.1 5 7.35 5s6.05-2.6 7.35-5c-1.3-2.4-4.1-5-7.35-5zm0 8c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5zm0-5.5C7.35 6.5 5.5 8.35 5.5 10s1.85 3.5 4.5 3.5 4.5-1.85 4.5-3.5S12.65 6.5 10 6.5zm0 6.5c-1.35 0-2.5-1.15-2.5-2.5S8.65 8.5 10 8.5s2.5 1.15 2.5 2.5S11.35 13 10 13z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <button
          type="submit"
          :class="`${
            passwordStrength !== 'Strong' ||
            passwordConfirmed !== 'Strong' ||
            isLoading
              ? 'opacity-[0.6] cursor-not-allowed'
              : 'cursor-pointer'
          } bg-[#4C4DDC] text-white py-[6px] px-[16px] rounded-[6px]`"
          :disabled="
            passwordStrength !== 'Strong' ||
            passwordConfirmed !== 'Strong' ||
            emailCorrected !== 'Strong' ||
            !data.isAgree ||
            isLoading
          "
        >
          {{ isLoading ? "Loading..." : "Change" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import HeaderView from "@/components/header/HeaderView.vue";
import Loading from "vue3-loading-overlay";
import { GET_USER_EMAIL } from "@/store/user.module";
import { POST_REGISTER } from "@/store/auth.module";
import Swal from "sweetalert2";

export default {
  props: {
    email: String,
    token: String,
  },
  data() {
    return {
      isLoadingPage: true,
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false,
      isChecking: false,
      passwordStrength: "",
      emailCorrected: "",
      passwordConfirmed: "",
      data: {
        email: "",
        password: "",
        confirmPassword: "",
        token: "",
      },
      showPasswordCard: false,
    };
  },
  async mounted() {
    this.isLoadingPage = true;
    try {
      this.data.email = this.email;
      this.data.token = this.token;
    } catch (error) {
      console.error("Error during mounting:", error);
    } finally {
      this.isLoadingPage = false;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    checkSymbol() {
      return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.data.password);
    },
    checkPasswordStrength() {
      const password = this.data.password;

      // Check if password contains at least one capital letter, one number, and one symbol
      const hasCapital = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

      // Calculate password strength based on criteria
      if (password?.length < 4 || !(hasCapital && hasNumber && hasSymbol)) {
        this.passwordStrength = "Weak";
      } else if (password.length < 8) {
        this.passwordStrength = "Medium";
      } else {
        this.passwordStrength = "Strong";
      }
    },
    checkConfirmPassword() {
      const password = this.data.password;
      const confirmPassword = this.data.confirmPassword;

      // Calculate password strength based on criteria
      if (confirmPassword.length < 8 || !(password === confirmPassword)) {
        this.passwordConfirmed = "Weak";
      } else {
        this.passwordConfirmed = "Strong";
      }
    },
    validateEmail() {
      // Regular expression for validating email format
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (re.test(this.data.email)) {
        this.emailCorrected = "Strong";
      } else {
        this.emailCorrected = "Weak";
      }
    },
    async handleSubmit() {
      const params = { email: this.data.email };
      if (this.data.email != "") {
        this.isLoading = true;
        await this.$store.dispatch(GET_USER_EMAIL, params);
        if (this.userEmail) {
          Swal.fire({
            title: "Warning",
            text: "Email already takken.",
            icon: "warning",
          });
          setTimeout(() => {
            this.isUrlCopied = false;
          }, 2000);
        } else {
          await this.$store.dispatch(POST_REGISTER, this.data);
          Swal.fire({
            title: "Success",
            text: "Email registered successfully.",
            icon: "success",
          }).then(() => {
            this.$router.push("/login").then(() => {
              setTimeout(() => {
                window.location.reload(true);
              }, 0);
            });
          });
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
