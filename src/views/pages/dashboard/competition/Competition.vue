<template>
    <div class="flex flex-row justify-between border-b-2 pb-5 mb-6">
        <h3 class="font-medium text-2xl font-openSans">Kompetisi</h3>
        <button
            v-if="!shouldHideButton"
            @click="addCompetition"
            class="bg-colorPurple text-white text-sm rounded-md flex items-center px-3 py-2"
        >
            <v-icon
                v-if="!$route.query.type"
                name="bi-bookmark-fill"
                scale="0.8"
                class="mr-2 font-sans"
            />
            <v-icon
                v-else
                name="fa-arrow-left"
                scale="0.8"
                class="mr-2 font-sans"
            />
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
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiBookmarkFill, FaArrowLeft } from 'oh-vue-icons/icons';
import { useMeta } from 'vue-meta';

addIcons(BiBookmarkFill, FaArrowLeft);

export default {
    setup() {
        useMeta({ title: 'Dashboard', titleTemplate: 'EduPass | %s' });
    },
    components: {
        VIcon: OhVueIcon,
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
