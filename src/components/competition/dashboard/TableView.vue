<template>    
    <div>
        <div class="overflow-x-auto rounded-lg border border-[#C2C2C2] shadow-md font-sans">
            <table class="min-w-full bg-white">
                <thead>
                    <tr
                        class="w-full bg-neutral-100 border-b border-[#C2C2C2] rounded-md text-neutral-950 capitalize text-sm leading-normal"
                    >
                        <th
                            v-for="(column, index) in columns"
                            :key="index"
                            class="py-3 px-6 text-left font-medium"
                        >
                            {{ column.label }}
                        </th>                        
                        <th class="py-3 px-6 text-left"></th>
                    </tr>
                </thead>
                <tbody class="text-neutral-700 text-sm font-normal">
                    <tr v-if="isLoading">
                        <td colspan="100%" class="py-4 px-6 text-center italic">
                            Loading.....
                        </td>
                    </tr>
                    <tr v-else-if="isError">
                        <td colspan="100%" class="py-4 px-6 text-center italic">
                            Gagal memuat data
                        </td>
                    </tr>
                    <tr v-else-if="contests.length === 0 && !isLoading">
                        <td colspan="100%" class="py-4 px-6 text-center italic">
                            Belum Ada Kompetisi
                        </td>
                    </tr>
                    <tr
                        v-else
                        v-for="(row, rowIndex) in contests"
                        :key="rowIndex"
                        class="border-b border-[#C2C2C2] hover:bg-gray-100"
                    >                        
                        <td
                            v-for="(column, colIndex) in columns"
                            :key="colIndex"
                            class="py-3 px-6 text-left whitespace-nowrap"
                        >
                            <span
                                v-if="column.field === 'status'"
                                :class="[
                                    'px-2 rounded-lg text-center inline-block font-medium',
                                    statusClass(row[column.field]),
                                ]"
                            >
                                {{ row[column.field] }}
                            </span>
                            <span v-else-if="column.field === 'aktivasi'">
                                <ToggleSwitch
                                    :isActive="row.isActive"                                    
                                    @toggle="handleUpdate(row, $event)"
                                />
                            </span>
                            <span v-else>
                                {{ row[column.field] }}
                            </span>
                        </td>                        
                        <td
                            class="py-3 px-6 text-left whitespace-nowrap flex gap-2"
                        >
                            <button
                                v-if="!shouldHideIcons"
                                @click="handleEdit(row)"
                                class="text-green-500 hover:text-green-700"
                            >
                                <v-icon name="fa-edit" />
                            </button>
                            <button
                                v-if="!shouldHideIcons"
                                @click="deleteRow(row)"
                                class="text-red-500 hover:text-red-700"
                            >
                                <v-icon name="fa-trash" />
                            </button>
                            <button
                                @click="handleView(row)"
                                class="text-blue-500 hover:text-blue-700"
                            >
                                <v-icon name="fa-eye" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiBookmarkFill, FaEdit, FaTrash, FaEye } from 'oh-vue-icons/icons';
import ToggleSwitch from '@/components/toggle/ToggleSwitch.vue';
import router from '@/router';

addIcons(BiBookmarkFill, FaEdit, FaTrash, FaEye);

export default {
    components: {
        VIcon: OhVueIcon,
        ToggleSwitch,
    },
    data() {
        return {
            columns: [
                { label: 'No', field: 'no' },
                { label: 'Nama', field: 'name' },
                { label: 'Jadwal', field: 'jadwal' },
                { label: 'Aktivasi', field: 'aktivasi' },
                { label: 'Status', field: 'status' },
            ],
            contests: []            
        };
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        shouldHideIcons() {
            // Cek apakah role adalah Admin atau Sponsor
            return ['Admin', 'Sponsor'].includes(this.userDetail.role.name);
        },
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        },
        isError() {
            return this.$store.getters['contest/isError'];
        }
    },
    async mounted() {
        await this.$store.dispatch('contest/getContest');
        
        const fetchedContests = this.$store.getters['contest/contests'].map((contest, index) => ({
            no: index + 1,
            jadwal: this.formatDate(contest.startDate) + ' - ' + this.formatDate(contest.endDate),
            isActive: contest.isActive !== undefined ? contest.isActive : false,
            ...contest,
        }));
        this.contests = fetchedContests; // Store fetched data in local state
    },    
    methods: {
        handleUpdate(row, newState) {
            row.isActive = newState; // Update the state of the toggle            
        },
        handleEdit(row) {
            router.push({
                name: 'Competition Dashboard',
                query: { type: "registration", id: row.id },
            })                        
            // Buka modal edit atau lakukan aksi lain
        },
        handleView(row) {
            router.push({
                name: 'Competition Dashboard',
                query: { type: "registration", id: row.id },
            })                        
            // Buka modal edit atau lakukan aksi lain
        },
        handleDelete(row) {
            console.log('Delete row:', row);
            this.rows = this.rows.filter((r) => r.id !== row.id);
        },
        statusClass(status) {
            switch (status) {
                case 'Selesai':
                    return 'bg-green-100 text-green-800 border border-green-400';
                case 'Berlangsung':
                    return 'bg-blue-100 text-blue-800 border border-blue-400';
                case 'Batal':
                    return 'bg-red-100 text-red-800 border border-red-400';
                default:
                    return 'bg-gray-100 text-gray-800 border border-gray-400';
            }
        },
        formatDate(v) {
            // Membuat objek Date dari string input
            const date = new Date(v);

            // Mendefinisikan nama bulan dalam bahasa Indonesia
            const months = [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember',
            ];

            // Mengambil tanggal dan nama bulan
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            // Mengembalikan string dalam format "10 Juni"
            return `${day} ${month} ${year}`;
        }
    },
};
</script>
