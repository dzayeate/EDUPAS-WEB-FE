<template>
    <form
        @submit.prevent="handleSubmit"
        class="flex h-screen justify-center items-center"
    >
        <div class="flex flex-col gap-6 w-full px-[24px] md:px-0 md:w-[400px]">
            <div>
                <h2
                    class="font-medium text-[28px] leading-[36px] text-[#3267E3] mb-[8px]"
                >
                    Get Started
                </h2>
                <p
                    class="font-normal text-[16px] leading-[36px] text-[#3267E3]"
                >
                    Please select your role
                </p>
            </div>
            <div class="flex items-center gap-4">
                <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
                <div class="text-[#3267E3]">or</div>
                <div class="border-[1px] border-[#3267E3] w-full h-0"></div>
            </div>
            <div class="flex flex-col gap-2 text-sm">
                <label for="role">Role</label>
                <select
                    id="role"
                    class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-4 focus:outline-none"
                    v-model="form.roleName"
                >
                    <option value="">Choose Role</option>
                    <option value="Umum" class="hidden">Umum</option>
                    <option value="Siswa">SMA/Sederajat</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="eo" class="hidden">EO</option>
                    <option value="sponsor" class="hidden">Sponsor</option>
                    <option value="perusahaan" class="hidden">
                        Perusahaan
                    </option>
                </select>
            </div>
            <div class="flex flex-col gap-4">
                <button
                    type="submit"
                    :class="`${
                        !form.roleName || isLoading
                            ? 'opacity-[0.6] cursor-not-allowed'
                            : 'cursor-pointer'
                    } bg-[#4C4DDC] text-white py-[6px] px-[16px] rounded-[6px]`"
                    :disabled="!form.roleName || isLoading"
                >
                    {{ isLoading ? 'Loading...' : 'Choose' }}
                </button>
            </div>
            <div class="flex flex-row justify-between">
                <a
                    @click="backHandler"
                    class="text-customBlue cursor-pointer hover:opacity-[0.8] w-fit"
                >
                    Kembali
                </a>
                <a
                    @click="skipHandler"
                    class="text-customBlue cursor-pointer hover:opacity-[0.8] w-fit"
                    :class="isLogin"
                >
                    Lewati
                </a>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        form: {
            type: Object,
            default: () => ({
                roleName: '',
            }),
            //   required: true,
        },
    },
    data() {
        return {
            isLoading: false,
            userId: '',
        };
    },
    computed: {
        isLogin() {
            this.userId = localStorage.getItem('userId');
            if (this.userId) {
                return 'hidden';
            } else {
                ('');
            }
        },
    },
    methods: {
        async handleSubmit() {
            if (this.form.roleName != '') {
                this.isLoading = true;
                this.$emit('next-step');
            }
            this.isLoading = false;
        },
        skipHandler() {
            this.$emit('next-step');
            this.form.roleName = 'Umum';
        },
        backHandler() {
            if (this.userId) {
                this.$router.go(-1);
            } else {
                this.$emit('back-step');
            }
        },
    },
};
</script>
