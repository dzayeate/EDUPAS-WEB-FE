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
                    <tr
                        v-for="(row, rowIndex) in rows"
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
                                    @toggle="handleUpdate(row)"
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
                                @click="$emit('edit', row)"
                                class="text-green-500 hover:text-green-700"
                            >
                                <v-icon name="fa-edit" />
                            </button>
                            <button
                                @click="$emit('delete', row)"
                                class="text-red-500 hover:text-red-700"
                            >
                                <v-icon name="fa-trash" />
                            </button>
                            <button
                                @click="$emit('view', row)"
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
    props: {
        columns: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        },
    },
    methods: {
        handleUpdate(row) {
            row.isActive = !row.isActive;
            this.$emit('update', row);
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
