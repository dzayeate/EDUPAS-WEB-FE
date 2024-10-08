<template>
    <div id="competition" class="px-[16px] md:px-[42px] py-[24px]">
        <div class="flex justify-between items-center pb-10">
            <div class="flex gap-6">
                <a
                    @click.prevent="navigateToCompetition('about')"
                    :class="`${
                        !$route.query.type || $route.query.type === 'about'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    About Competition
                </a>
                <a
                    v-if="!isValid && userDetail"
                    @click.prevent="navigateToCompetition('registration')"
                    :class="`${
                        $route.query.type === 'registration'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Registration
                </a>
                <a
                    @click.prevent="navigateToCompetition('schedule')"
                    :class="`${
                        $route.query.type === 'schedule'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Schedule
                </a>
                <a
                    @click.prevent="navigateToCompetition('contributors')"
                    :class="`${
                        $route.query.type === 'contributors'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Competition Contributors
                </a>
                <a
                    @click.prevent="navigateToCompetition('organizers')"
                    :class="`${
                        $route.query.type === 'organizers'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Organizers
                </a>
            </div>
        </div>
        <AboutView
            v-if="!$route.query.type || $route.query.type === 'about'"
        />
        <RegisterView
            v-if="$route.query.type === 'registration' && !isValid"
        />
        <ScheduleView v-if="$route.query.type === 'schedule'" />
        <OrganizerView v-if="$route.query.type === 'organizers'" />
        <ContributorView v-if="$route.query.type === 'contributors'" />        
    </div>
</template>

<script>
import HeaderView from '@/components/header/HeaderView.vue';
import AboutView from '@/components/competition/AboutView.vue';
import RegisterView from '@/components/competition/RegisterView.vue';
import ScheduleView from '@/components/competition/ScheduleView.vue';
import OrganizerView from '@/components/competition/OrganizerView.vue';
import ContributorView from '@/components/competition/ContributorView.vue';
import { useMeta } from 'vue-meta';

export default {
    setup() {
        useMeta({ title: 'Competition', titleTemplate: 'EduPass | %s' });
    },
    components: {
        HeaderView,
        AboutView,
        RegisterView,
        ScheduleView,
        OrganizerView,
        ContributorView,
    },
    data() {
        return {};
    },
    async mounted() {
        await this.getData();
        this.redirectIfInvalid();
    },    
    computed: {
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        isValid() {
            const activities = this.userDetail?.activities?.map(
                (activity) => activity.competitionId,
            );
            const competitionId = this.$route.params.slug;
            const date = new Date();
            const lombaDate = new Date(this.contestDetail?.endDate);
            const allowedRoles = ['Siswa', 'Mahasiswa'];

            return activities?.includes(competitionId) || date > lombaDate || !allowedRoles.includes(this.userDetail?.role?.name) || allowedRoles.includes(this.userDetail?.role?.name) && !this.userDetail?.isVerified;
        },
    },
    methods: {
        async getData() {
            try {
                await this.$store.dispatch(
                    'contest/getContestDetail',
                    this.$route.params.slug,
                );
            } catch (err) {
                console.log(err);
            }
        },
        navigateToCompetition(value) {
            this.$router.push({
                name: 'Competition Detail',
                query: { type: value },
            });
        },
        redirectIfInvalid() {
            const validTypes = ['about', 'registration', 'schedule', 'organizers', 'contributors'];
            const currentType = this.$route.query.type || 'about';

            // Redirect to 'about' if the type is not valid
            if (!validTypes.includes(currentType)) {
                this.$router.replace({
                    name: 'Competition Detail',
                    query: { type: 'about' },
                });
            }

            // Existing redirect logic
            const activities = this.userDetail?.activities?.map(
                (activity) => activity.competitionId,
            );
            const competitionId = this.$route.params.slug;
            const date = new Date();
            const lombaDate = new Date(this.contestDetail?.endDate);
            const allowedRoles = ['Siswa', 'Mahasiswa'];            
            if (
                (this.$route.query.type === 'registration' &&
                    (!this.userDetail || activities?.includes(competitionId) ||
                        date > lombaDate || !allowedRoles.includes(this.userDetail?.role?.name) || allowedRoles.includes(this.userDetail?.role?.name) && !this.userDetail?.isVerified))
            ) {
                this.$router.replace({
                    name: 'Competition Detail',
                    query: { type: 'about' },
                });                
            }
        },
        watch: {
            '$route.query.type': 'redirectIfInvalid'
        },
        beforeRouteUpdate(to, from, next) {
            const validTypes = ['about', 'registration', 'schedule', 'organizers', 'contributors'];
            if (!validTypes.includes(to.query.type || 'about')) {
                next({ name: 'Competition Detail', query: { type: 'about' } });
            } else {
                next();
            }
        }
    },
};
</script>
