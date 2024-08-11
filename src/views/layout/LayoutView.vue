<template>
    <div class="flex flex-col min-h-screen">
        <NavbarView />
        <div class="flex-grow">
            <router-view />
        </div>
        <FooterView />
    </div>
</template>

<script>
import NavbarView from '@/components/navbar/NavbarView.vue';
import FooterView from '@/components/footer/FooterView.vue';

export default {
    components: {
        NavbarView,
        FooterView,
    },
    async created() {
        const userId = localStorage.getItem('userId') || '';
        if (userId) {
            const params = { search: userId };
            await this.$store.dispatch('user/getUserDetail', params);
        }        
    },
    methods: {        
    },
};
</script>
