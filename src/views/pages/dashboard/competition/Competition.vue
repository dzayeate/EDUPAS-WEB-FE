<template>
    <div class="flex flex-row justify-between border-b-2 pb-5 mb-6">
        <h3 class="font-medium text-2xl font-openSans">Kompetisi</h3>
        <button
            v-if="!shouldHideButton"
            @click="addCompetition"
            class="bg-colorPurple text-white text-sm rounded-md flex items-center px-3 py-2 gap-1"
        >            
            <svg v-if="!$route.query.type" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>            
            {{ !$route.query.type ? 'Kompetisi Baru' : 'Kembali' }}
            <!-- Kompetisi Baru -->
        </button>
    </div>
    <TableView v-if="!$route.query.type" />
    <CompetitionWizard
        v-if="$route.query.type || $route.query.type === 'about'"
    />
</template>
<script>
import TableView from '@/components/competition/dashboard/TableView.vue';
import CompetitionWizard from '@/components/competition/dashboard/CompetitionWizard.vue';
import { useMeta } from 'vue-meta';

export default {
    setup() {
        useMeta({ title: 'Dashboard', titleTemplate: 'EduPass | %s' });
    },
    components: {        
        TableView,
        CompetitionWizard,
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        shouldHideButton() {
            // Cek apakah role adalah Admin atau Sponsor
            return ['Admin', 'Sponsor'].includes(this.userDetail.role.name);
        }
    },
    methods: {
        addCompetition() {
            if (!this.$route.query.type) {
                this.$router.push({
                    name: 'Competition Dashboard',
                    query: { type: 'about' },
                });
            } else {
                this.$router.push({ name: 'Competition Dashboard' });
            }
        },
    },
};
</script>
