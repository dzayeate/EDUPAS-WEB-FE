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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button
                                v-if="!shouldHideIcons"
                                @click="handleDelete(row)"
                                class="text-red-500 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <button
                                v-if="shouldHideIcons"
                                @click="handleView(row)"
                                class="text-blue-500 hover:text-blue-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import ToggleSwitch from '@/components/toggle/ToggleSwitch.vue';
import ApiService from '@/store/api.service';
import Swal from 'sweetalert2';

export default {
    components: {        
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
