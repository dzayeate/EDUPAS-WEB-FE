<template>
    <div>
        <component
            :is="currentStepComponent"
            :form="form"
            @next-step="nextStep"
            @show-term="showTherm"
            @go-back="goBack"
            @back-step="backStep"
            @submit-form="submitForm"
        ></component>
    </div>
</template>

<script>
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";
import ThermView from "./ThermView.vue";

export default {
    components: {
        StepOne,
        StepTwo,
        ThermView,
    },
    data() {
        return {
            currentStep: 1,
            form: {
                email: "",
                password: "",
                confirmPassword: "",
                roleName: "",
            },
        };
    },
    // async mounted() {
    //     const userId = localStorage.getItem("userId");
    //     if (this.userDetail?.role.name == "Umum") {
    //         this.currentStep = 2;
    //     } else if (userId) {
    //         await this.$router.push("profile");
    //         console.log('yang wizard');
            
    //     }
    // },
    computed: {
        currentStepComponent() {
            return {
                1: StepOne,
                2: StepTwo,
                3: StepThree,
                4: ThermView,
            }[this.currentStep];
        },
        userDetail() {
            return this.$store.getters["user/userDetail"];
        },
    },
    methods: {
        nextStep() {
            this.currentStep += 1;
        },
        showTherm() {
            this.currentStep = 4;
        },
        backStep() {
            this.currentStep -= 1;
        },
        goBack() {
            this.currentStep = 1;
        },
        submitForm() {
            // Kirim data form ke server
            console.log("Form submitted:", this.form);
            // Implementasi logika pengiriman data ke server
        },
    },
};
</script>
./StepThree.vue
