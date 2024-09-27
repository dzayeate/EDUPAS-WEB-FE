<template>
    <div class="flex flex-row justify-end pb-5 ">
        <button
            v-if="!shouldHideButton"
            @click="showSchedule"
            class="bg-colorPurple text-white text-sm rounded-md flex items-center px-3 py-2"
        >
            {{ !showAddSchedule ? 'Schedule Baru' : 'Kembali' }}
            <!-- Kompetisi Baru -->
        </button>
    </div>
    <TableScheduleView v-if="!showAddSchedule"  @edit-schedule="editSchedule" @view-schedule="viewSchedule" />
    <AddScheduleView v-else :is-editing="isEditing" :schedule-id="scheduleId" @show-add="showAdd"/>
</template>
<script>
import TableScheduleView from './TableScheduleView.vue';
import AddScheduleView from './AddScheduleView.vue';
export default {
    components: {
        TableScheduleView,
        AddScheduleView,
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
    data() {
        return {
            showAddSchedule: false,
            isEditing: false,  // Menandakan apakah sedang dalam mode edit
            scheduleId: "",  // ID jadwal yang sedang diedit
        };
    },
    methods: {
        showSchedule() {
            this.showAddSchedule = !this.showAddSchedule;
            this.isEditing = false;
        },
        editSchedule(id) {                        
            // Method ini bisa dipanggil ketika ingin mengedit jadwal
            this.isEditing = true;  // Menandakan form dalam mode edit
            this.scheduleId = id;   // Mengirimkan ID jadwal ke form
            this.showAddSchedule = !this.showAddSchedule;  // Menampilkan form edit
        },
        viewSchedule(id) {
            this.scheduleId = id;   // Mengirimkan ID jadwal ke form
            this.showAddSchedule = !this.showAddSchedule;  // Menampilkan form edit
        },  
        showAdd() {
            this.showAddSchedule = !this.showAddSchedule;                        
        }
    },
};
</script>./schedule/AddScheduleView.vue./schedule/TableScheduleView.vue
