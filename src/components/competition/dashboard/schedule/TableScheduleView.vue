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
                    <tr
                        v-for="(row, rowIndex) in rows"
                        :key="rowIndex"
                        class="border-b border-[#C2C2C2] hover:bg-gray-100"
                    >
                        <td
                            v-for="(column, colIndex) in columns"
                            :key="colIndex"
                            class="py-4 px-6 text-left whitespace-nowrap"
                        >
                            {{ row[column.field] }}
                        </td>
                        <td
                            class="py-3 px-6 text-left justify-end whitespace-nowrap flex gap-2"
                        >
                            <button
                                @click="editRow(row)"
                                class="text-green-500 hover:text-green-700"
                            >
                                <v-icon name="fa-edit" />
                            </button>
                            <button
                                @click="deleteRow(row)"
                                class="text-red-500 hover:text-red-700"
                            >
                                <v-icon name="fa-trash" />
                            </button>
                            <button
                                @click="deleteRow(row)"
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

addIcons(BiBookmarkFill, FaEdit, FaTrash, FaEye);

export default {
    components: {
        VIcon: OhVueIcon,
        ToggleSwitch,
    },
    data() {
        return {
            columns: [
                { label: 'No', field: 'id' },
                { label: 'Tanggal', field: 'date' },
                { label: 'Nama', field: 'name' },
                { label: 'Kategori', field: 'category' },
                { label: 'Waktu', field: 'time' },
                { label: 'Deskripsi', field: 'description' },
                { label: 'Lokasi', field: 'location' },
            ],
            rows: [
                {
                    id: 1,
                    date: '12/12/2012',
                    name: 'John Doe',
                    category: 'John Doe',
                    time: 30,
                    description: 'Selesai',
                    location: 'Bandung',
                },
                {
                    id: 2,
                    date: '12/12/2012',
                    name: 'John Doe',
                    category: 'John Doe',
                    time: 30,
                    description: 'Selesai',
                    location: 'Bandung',
                },
                {
                    id: 3,
                    date: '12/12/2012',
                    name: 'John Doe',
                    category: 'John Doe',
                    time: 30,
                    description: 'Selesai',
                    location: 'Bandung',
                },
            ],
        };
    },
    methods: {
        handleUpdate(row) {
            row.isActive = !row.isActive;
            console.log('Row updated:', row);
            // Lakukan update state atau panggil API jika diperlukan
        },
        handleEdit(row) {
            console.log('Edit row:', row);
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
    },
};
</script>

<style scoped></style>
