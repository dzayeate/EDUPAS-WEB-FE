<template>
    <div class="flex flex-col min-h-screen">
        <SidebarView>
            <router-view />
        </SidebarView>
    </div>
</template>

<script>
import SidebarView from '@/components/sidebar/SidebarView.vue';
import { useMeta } from 'vue-meta';

export default {
    setup() {
        useMeta({ title: 'Dashboard', titleTemplate: 'EduPass | %s' });
    },
    components: {        
        SidebarView,        
    },
    async created() {
        const userId = localStorage.getItem('userId') || '';
        if (userId) {
            const params = { search: userId };
            await this.$store.dispatch('user/getUserDetail', params);
        }        
    },
    methods: {
        // async getData() {
        // },
    },
};
</script>
