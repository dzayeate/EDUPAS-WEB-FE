<template>
    <div>
        <div
            class="overflow-x-auto rounded-lg border border-[#C2C2C2] shadow-md font-sans mt-6"
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
                            Belum Ada Pendaftar
                        </td>
                    </tr>
                    <!-- Render rows if data exists -->
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
                            {{ row[column.field] }}
                        </td>
                        <td
                            class="py-3 px-6 text-center whitespace-nowrap flex gap-2"
                        >
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
import ApiService from '@/store/api.service';
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
                { label: 'Nama', field: 'nameTeam' },
                { label: 'Gender', field: 'date' },
                { label: 'Institusi', field: 'domicile' },
                { label: 'Email', field: 'email' },                
            ],                       
        };
    },
    computed: {
        userRole() {
            return this.$store.getters['user/userDetail'].role.name;
        },
        rows() {
            return this.registered.map((regis, index) => ({
                no: index + 1,
                email: regis.user.email,
                ...regis
            }))
        },
        registered() {
            return this.$store.getters['contest/registered'];
        },
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        },
        isError() {
            return this.$store.getters['contest/isError'];
        }
    },
     watch: {
        '$route.query': {
            handler(newQuery) {
                // Cek apakah role adalah Admin atau Sponsor
                if (!newQuery.id && (this.userRole === 'Admin' || this.userRole === 'Sponsor')) {
                this.$router.go(-1);  // Arahkan kembali ke halaman sebelumnya
                }
            },
            immediate: true,  // Jalankan segera ketika komponen di-mount
            deep: true        // Watch secara mendalam pada perubahan query
        }
    },
    mounted() {
        this.getData();
        if (!this.$route.query.id && (this.userRole === 'Admin' || this.userRole === 'Sponsor')) {
            this.$router.go(-1);  // Arahkan kembali ke halaman sebelumnya jika id tidak ada
        }
    },
    methods: {
        async getData () {
            const id = this.$route.query.id;
            await this.$store.dispatch('contest/getRegistered', id);
        },        
        handleView(row) {
            console.log('View row:', row);            
            // Buka modal edit atau lakukan aksi lain
        },              
    },
};
</script>

<style scoped></style>
