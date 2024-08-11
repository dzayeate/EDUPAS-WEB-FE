<template>
    <div class="flex flex-col items-center my-12">
        <div class="flex justify-around w-full bg-colorPurple text-white">
            <div
                class="flex-1 py-3 pl-3 border-r-2 border-primaryBorder-default"
                v-for="day in weekdays"
                :key="day"
            >
                {{ day }}
            </div>
        </div>
        <div class="flex flex-wrap w-full">
            <div
                v-for="day in getDaysInMonth(currentDate)"
                :key="day.date ? day.date.toDateString() : day.index"
                class="w-1/7 day border p-2 box-border bg-primarySurface-default border-primaryBorder-default"
            >
                <div
                    v-if="day.date"
                    class="text-end pr-1 font-bold text-neutral80-default"
                >
                    <span>{{ day.date.getDate() }}</span>
                </div>
                <div v-else class="text-center font-bold empty"></div>
                <div class="mt-2">
                    <div
                        v-if="contests"
                        v-for="competition in day.competitions"
                        :key="competition.id"
                        class="mb-2 text-neutral70-default"
                    >
                        {{ competition.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vue3-datepicker';

export default {
    components: {
        Datepicker,
    },
    data() {
        return {
            currentDate: new Date(),
            competitions: [],
            weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // Nama-nama hari
        };
    },
    created() {
        this.updateCompetitions();
    },
    computed: {
        highlightedDates() {
            return this.competitions.map((comp) => new Date(comp.date));
        },
        contests() {
            return this.$store.getters['contest/contests'];
        },
    },
    watch: {
        contests: 'updateCompetitions',
    },
    methods: {
        updateCompetitions() {
            if (this.contests) {
                this.competitions = this.contests;
            }
        },
        getDaysInMonth(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDay = new Date(year, month, 1).getDay();
            const days = [];

            // Add empty slots for the days of the previous month
            for (let i = 0; i < firstDay; i++) {
                days.push({
                    date: null,
                    competitions: [],
                    index: `empty-${i}`,
                });
            }

            // Add the actual days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                const competitions = this.competitions.filter((comp) => {
                    const compDate = new Date(comp.date);
                    return (
                        compDate.getFullYear() === year &&
                        compDate.getMonth() === month &&
                        compDate.getDate() === day
                    );
                });
                days.push({ date, competitions });
            }

            return days;
        },
        dayClass(date) {
            return this.competitions.some(
                (comp) => new Date(comp.date).getTime() === date.getTime(),
            )
                ? 'has-competitions'
                : '';
        },
    },
};
</script>

<style scoped>
.day {
    width: calc(100% / 7);
}
.empty {
    height: 1.5rem;
}
</style>
