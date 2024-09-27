<template>
    <div id="competition" class="px-[16px] md:px-[42px] py-[24px]">
        <div class="flex justify-between items-center">
            <h2 class="font-medium text-[28px] leading-[36px]">Competition</h2>
            <div class="flex gap-6">
                <a
                    @click.prevent="navigateToCompetition('list')"
                    :class="`${
                        $route.query.type !== 'calendar'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Competition List
                </a>
                <a
                    @click.prevent="navigateToCompetition('calendar')"
                    :class="`${
                        $route.query.type === 'calendar'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Calendar
                </a>
            </div>
        </div>
        <ListView v-if="$route.query.type === 'list' || !$route.query.type" />
        <Calendar v-if="$route.query.type === 'calendar'" />
    </div>
</template>

<script>
import HeaderView from '@/components/header/HeaderView.vue';
import EventCard from '@/components/card/EventCard.vue';
import ListView from '@/components/competition/ListView.vue';
import Calendar from '@/components/competition/Calendar.vue';
import { useMeta } from 'vue-meta';

export default {
    setup() {
        useMeta({ title: 'Competition', titleTemplate: 'EduPass | %s' });
    },
    components: {
        HeaderView,
        EventCard,
        ListView,
        Calendar,
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
            search: {
                page: '',
                length: 0,
                keyword: ''
            }
        };
    },
    async mounted() {
        await this.$store.dispatch('contest/getContest', this.search);        
    },
    computed: {
        contests() {
            return this.$store.getters['contest/getContest'];
        },
    },
    methods: {        
        navigateToCompetition(value) {
            this.$router.push({
                name: 'CompetitionView',
                query: { type: value },
            });
        },
    },
};
</script>
