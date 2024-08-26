<template>
    <div class="flex flex-col md:flex-row w-full h-[100vh] h-max-[100%]">
        <div
            class="hidden md:flex md:w-2/6 bg-gradient-to-b from-blue-500 to-purple-500 text-white p-8 items-center"
        >
            <div>
                <h2 class="text-3xl font-bold mb-4">
                    Join and explore many interesting events
                </h2>
                <p class="text-lg">Get experience and prizes in them</p>
            </div>
        </div>
        <div class="md:w-4/6 h-screen overflow-y-auto">
            <RegisterWizard/>
        </div>
    </div>
</template>

<script>
import RegisterWizard from '@/components/register/RegisterWizard.vue';
import { useMeta } from 'vue-meta';

export default {
    setup() {
        useMeta({ title: 'Register', titleTemplate: 'EduPass | %s' });
    },
    components: {
        RegisterWizard,
    },
    data() {
        return {
            //   data: {
            //     email: "",
            //     password: "",
            //     confirmPassword: "",
            //     // roleName: "umum",
            //     isAgree: false,
            //   },
            //   status: {
            //     passwordStrength: "",
            //     emailCorrected: "",
            //     passwordConfirmed: "",
            //   },
            // step: 1,
        };
    },
    methods: {
    },
};
</script>

<style>
/* Tambahkan beberapa gaya untuk memastikan tampilan kartu tetap baik */
</style>
