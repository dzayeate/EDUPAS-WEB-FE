<template>
  <div @click="toggle" :class="shouldDisable ? 'cursor-not-allowed' : 'cursor-pointer'" class="relative inline-flex items-center select-none">
    <span :class="isActive ? 'bg-green-500' : 'bg-gray-200'" class="block w-12 h-6 rounded-full transition duration-300 ease-in-out"></span>
    <span :class="isActive ? 'translate-x-6' : 'translate-x-0'" class="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-300 ease-in-out"></span>    
  </div>
</template>

<script>
export default {
    name: 'ToggleSwitch',
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        shouldDisable() {
            // Cek apakah role adalah Admin atau Sponsor
            return ['Admin', 'Sponsor'].includes(this.userDetail?.role.name);
        },
    },  
    methods: {
        toggle() {
            if (!this.shouldDisable) {
                this.$emit('toggle', !this.isActive);  // Emit new state to parent
            } // Emit new state to parent
        },
    },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
