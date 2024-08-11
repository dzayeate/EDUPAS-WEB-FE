<template>
    <div class="flex flex-row justify-end pb-5 ">
        <button
            @click="showSchedule"
            class="bg-colorPurple text-white text-sm rounded-md flex items-center px-3 py-2"
        >
            {{ !showAddSchedule ? 'Schedule Baru' : 'Kembali' }}
            <!-- Kompetisi Baru -->
        </button>
    </div>
    <TableScheduleView v-if="!showAddSchedule"/>
    <AddScheduleView v-else/>
</template>
<script>
import TableScheduleView from './TableScheduleView.vue';
import AddScheduleView from './AddScheduleView.vue';
export default {
    components: {
        TableScheduleView,
        AddScheduleView,
    },
    data() {
        return {
            showAddSchedule: false,
        };
    },
    methods: {
        showSchedule() {
            this.showAddSchedule = !this.showAddSchedule;
        }
    },
};
</script>./schedule/AddScheduleView.vue./schedule/TableScheduleView.vue
