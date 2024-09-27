<template>
    <div>
        <div
            class="overflow-x-auto rounded-lg border border-[#C2C2C2] shadow-md font-sans"
        >
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
                    <tr v-else-if="rows.length === 0 && !isLoading">
                        <td colspan="100%" class="py-4 px-6 text-center italic">
                            Belum Ada Schedule
                        </td>
                    </tr>
                    <tr
                        v-else
                        v-for="(row, rowIndex) in rows"
                        :key="rowIndex"
                        class="border-b border-[#C2C2C2] hover:bg-gray-100"
                    >
                        <td
                            v-for="(column, colIndex) in columns"
                            :key="colIndex"
                            class="py-4 px-6 text-left whitespace-nowrap"
                        >
                            <span
                                v-if="column.field === 'category'"
                                class="capitalize"
                            >
                                {{ row[column.field] }}
                            </span>
                            <span
                                v-else-if="column.field === 'description'"
                                class="capitalize whitespace-normal"
                            >
                                {{ row[column.field] }}
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
                                @click="handleDelete(row)"
                                class="text-red-500 hover:text-red-700"
                            >
                                <v-icon name="fa-trash" />
                            </button>
                            <button
                                v-if="shouldHideIcons"
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
import ApiService from '@/store/api.service';
import Swal from 'sweetalert2';

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
                { label: 'Tanggal', field: 'date' },
                { label: 'Nama', field: 'name' },
                { label: 'Kategori', field: 'category' },
                { label: 'Waktu', field: 'time' },
                { label: 'Deskripsi', field: 'description' },
                { label: 'Lokasi', field: 'location' },
            ],
            schedule: [],
            isLoading: false,
            isError: false,
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
        rows() {
            return this.schedule.map((item, index) => ({
                no: index + 1,
                ...item
            }))
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            const id = this.$route.query.id;
            let url = '/competition/findScheduleCompetition?search=';
            
            // Jika id ada, tambahkan ke URL
            if (id) {            
                url += id;
            }

            try {
                this.isLoading = true
                const response = await ApiService.get(url);

                const sortedData = response.data.data.sort(
                    (a, b) => new Date(a.date) - new Date(b.date),
                );

                this.schedule = sortedData;
            } catch (error) {
                console.error('Error fetching competition registration:', error);
                this.isLoading = false;
                this.isError = true;
            } finally {
                this.isLoading = false;
            }
        },        
        handleEdit(row) {                        
            this.$emit('edit-schedule', row.id);
        },
        handleView(row) {                        
            this.$emit('view-schedule', row.id);
        },              
        handleDelete(row) {
            Swal.fire({
                title: "Hapus Schedule Ini ?",
                text: "Schedule ini akan dihapus dan tidak bisa dikembalikan lagi",
                showCancelButton: true,
                cancelButtonText: "Batal",
                cancelButtonColor: "#4C4DDC",
                confirmButtonText: "Hapus",
                confirmButtonColor: "#CB3A31",                
                customClass: {
                    popup: "delete-popup",                    
                    title: "delete-title",
                    cancelButton: "delete-cancelButton",
                    confirmButton: "delete-confirmButton",
                    htmlContainer: "delete-html"
                }
            }).then( async (result) => {
                if (result.isConfirmed) {
                    await ApiService.delete(`competition/deleteScheduleCompetition/${row.id}`);
                    this.getData();                    
                }
            })                    
        },        
    },
};
</script>
