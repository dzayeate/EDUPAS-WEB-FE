<template>
    <div id="competition">
        <div class="flex justify-between items-center">
            <div class="flex gap-12">
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
                <a
                    @click.prevent="navigateToCompetition('result')"
                    :class="`${
                        $route.query.type === 'result'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Result
                </a>
            </div>
        </div>
        <div class="w-full py-3">            
            <AboutView
                v-if="!$route.query.type || $route.query.type === 'about'"
            />
            <RegisterView v-if="$route.query.type === 'registration'" />
            <ScheduleView v-if="$route.query.type === 'schedule'" />                            
            <OrganizerView v-if="$route.query.type === 'organizers'" />
            <ContributorView v-if="$route.query.type === 'contributors'" />                        
            <ResultView v-if="$route.query.type === 'result'" />                        
        </div>
    </div>
</template>

<script>
import AboutView from '@/components/competition/dashboard/AboutView.vue';
import RegisterView from '@/components/competition/dashboard/register/RegisterView.vue';
import ScheduleView from '@/components/competition/dashboard/schedule/ScheduleView.vue';
import OrganizerView from '@/components/competition/dashboard/OrganizerView.vue';
import ContributorView from '@/components/competition/dashboard/contributor/ContributorView.vue';
import ResultView from '@/components/competition/dashboard/ResultView.vue';

export default {
    components: {
        AboutView,
        RegisterView,
        ScheduleView,
        OrganizerView,
        ContributorView,
        ResultView
    },
    data() {
        return {
            filter: [
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
            ],
        };
    },
    //   async mounted() {
    //     await this.getData();
    //   },
    computed: {},
    methods: {
        // async getData() {
        //     try {
        //         await this.$store.dispatch(
        //             'contest/getContestDetail',
        //             this.$route.params.slug,
        //         );
        //     } catch (err) {
        //         console.log(err);
        //     }
        // },
        navigateToCompetition(value) {
            this.$router.push({
                name: 'Competition Dashboard',
                query: { type: value },
            });
        },
    },
};
</script>
