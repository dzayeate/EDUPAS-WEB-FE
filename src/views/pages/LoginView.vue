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
        <form
            @submit.prevent="handleSubmit"
            class="bg-white w-full flex justify-center items-center"
        >
            <div
                class="flex flex-col gap-6 w-full px-[24px] md:px-0 md:w-[400px]"
            >
                <div>
                    <h2
                        class="font-medium text-[28px] leanding-[36px] text-[#3267E3] mb-[8px]"
                    >
                        Log In to Website
                    </h2>
                    <p
                        class="font-normal text-[16px] leanding-[36px] text-[#3267E3]"
                    >
                        Please Enter your email addres and password
                    </p>
                </div>
                <div
                    class="flex justify-center gap-2 items-center border-[1px] rounded-[6px] p-[12px] border-[#E0E0E0] cursor-pointer hover:opacity-[0.8]"
                >
                    <img src="@/assets/icons/google.png" class="w-[24px]" />
                    <p class="text-[#0A0A0A]">Sign up with Google</p>
                </div>
                <div
                    class="flex justify-center gap-2 items-center border-[1px] rounded-[6px] p-[12px] border-[#E0E0E0] cursor-pointer hover:opacity-[0.8]"
                >
                    <img src="@/assets/images/kunci.png" class="w-[24px]" />
                    <p class="text-[#0A0A0A]">Sign up with Kunci</p>
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
                            autocomplete="email"
                            class="block w-full p-2 text-sm text-black border border-[#C2C2C2] rounded-[6px] bg-[#F5F5FF] placeholder-[#757575] focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            v-model="data.email"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password">Password</label>
                        <div class="relative w-full">
                            <input
                                id="password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="Enter your password"
                                autocomplete="new-password"
                                class="block w-full p-2 text-sm text-black border border-[#C2C2C2] rounded-[6px] bg-[#F5F5FF] placeholder-[#757575] focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
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
                    </div>
                    <a
                        href="/forgot"
                        class="text-[#3267E3] hover:underline text-[14px] w-fit"
                        >Forgot password?</a
                    >
                </div>
                <div class="flex flex-col gap-2">
                    <button
                        type="submit"
                        :disabled="!data.email || !data.password || isLoading"
                        :class="`${
                            !data.email || !data.password || isLoading
                                ? 'opacity-[0.6] cursor-not-allowed'
                                : 'cursor-pointer'
                        } bg-[#4C4DDC] text-white py-[6px] px-[16px] rounded-[6px]`"
                    >
                        {{ isLoading ? 'Loading...' : 'Log In' }}
                    </button>
                </div>
                <div class="flex flex-col gap-4 text-center">
                    <p>
                        Don’t have an account yet?
                        <a
                            href="/register"
                            class="text-[#3267E3] hover:underline"
                            >Sign up here</a
                        >
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import { useMeta } from 'vue-meta';
import { mapActions } from 'vuex';

export default {
    setup() {
        useMeta({ title: 'Login', titleTemplate: 'EduPass | %s' });
    },
    data() {
        return {            
            showPassword: false,
            data: {
                email: '',
                password: '',
            },
        };
    },
    computed: {
        isLoading() {
            return this.$store.getters['auth/isLoading'];
        }
    },
    methods: {
        ...mapActions('auth', ['postLogin']),
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async handleSubmit() {
            try {                
                await this.$store.dispatch('auth/postLogin', this.data);
            } catch (error) {
                // Handle error (e.g., display error message)
                Swal.fire({
                    title: 'Error',
                    text: 'Email or password wrong!',
                    icon: 'error',
                });
            }
        },
    },
};
</script>

<style scoped>
/* Styles here */
</style>
