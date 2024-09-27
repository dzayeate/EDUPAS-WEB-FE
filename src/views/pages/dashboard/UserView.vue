<template>
    <div class="flex flex-row justify-between border-b-2 pb-5 mb-6">
        <h3 class="font-medium text-2xl font-openSans">User</h3>
    </div>
    <TableView
        :columns="columns"
        :rows="rows"
        :is-loading="isLoading"
        :is-error="isError"
        @edit="handleEdit"
        @delete="handleDelete"
        @view="handleView"
        @update="handleUpdate"
    />
    <div v-if="showModal" class="fixed z-20 inset-0 overflow-y-auto">
        <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
                >&#8203;</span
            >
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-3/12">
                <div class="bg-white p-3 flex flex-col gap-2 text-sm">
                    <div class="flex justify-between items-center">
                        <h2>Edit</h2>
                        <button @click="closeModal">
                            <v-icon name="bi-x" scale="1.5"/>
                        </button>
                    </div>
                    <hr>
                    <div class="flex flex-col gap-2">
                        <label for="role">Ganti Role</label>
                        <select name="role" id="role" v-model="role" class="custom-input">                            
                            <option value="" disabled selected>Pilih Role</option>
                            <option value="Siswa">Siswa</option>
                            <option value="Mahasiswa">Mahasiswa</option>
                            <option value="Admin">Admin</option>
                            <option value="Eo">Eo</option>
                            <option value="Sponsor">Sponsor</option>
                        </select>
                    </div>
                    <div class="flex justify-end">
                        <button class="bg-blue-600 px-3 py-1 rounded-md w-fit text-white disabled:bg-opacity-50 disabled:cursor-not-allowed" @click="changeRole" :disabled="!role">
                            Selesai
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TableView from '@/components/table/TableView.vue';
import ApiService from '@/store/api.service';
import Swal from 'sweetalert2';
import { addIcons, OhVueIcon } from 'oh-vue-icons';
import { BiX } from "oh-vue-icons/icons";

addIcons(BiX);

export default {
    components: {
        TableView,
        VIcon: OhVueIcon
    },
    data() {
        return {
            columns: [
                { label: 'No', field: 'no' },
                { label: 'Nama', field: 'name' },
                { label: 'Email', field: 'email' },
                { label: 'Jenis Kelamin', field: 'gender' },
                { label: 'Role', field: 'roleUser' },
                { label: 'Status', field: 'isVerified' },
            ],            
            search : {
                page : '',
                length: 50,
                keyword: ''
            },
            showModal: false,
            role: "",
            id: ""            
        };
    },
    computed: {
        users() {
            return this.$store.getters['user/users'];
        },  
        rows() {
            return this.users.map((item, index) => ({
                no: index + 1,
                name: item.biodate.firstName +" "+ item.biodate.lastName,
                gender: item.biodate.gender,
                roleUser: item.role.name,
                ...item
            }))
        },
        isLoading() {
            return this.$store.getters['user/isLoading'];
        },
        isError() {
            return this.$store.getters['user/isError'];
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            await this.$store.dispatch('user/getUsers', this.search);
        },
        handleEdit(row) {            
            this.showModal = !this.showModal
            this.id = row.id
        },
        changeRole() {
            console.log("Fungsi Ubah Role");            
        },
        handleDelete(row) {
            Swal.fire({
                title: "Hapus Akun Ini ?",
                text: "Akun ini akan dihapus dan tidak dapat dipulihkan lagi",
                showCancelButton: true,
                cancelButtonText: "Batal",
                cancelButtonColor: "#4C4DDC",
                confirmButtonText: "Konfirmasi",
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
                    try {
                        await ApiService.delete(`user/delete-user/${row.id}`);
                        this.getData();
                    } catch (error) {                        
                        Swal.fire({
                            title: 'Gagal',
                            text: 'Akun gagal dihapus',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1100,
                            customClass: {
                                popup: "success-popup",
                                icon: "success-icon",
                                title: "success-title",
                                htmlContainer: "success-html",                    
                            }
                        })
                    }
                }
            })
        },
        closeModal() {
            this.showModal = !this.showModal
        },
        handleView(row) {
            console.log('View row:', row);
        },
        handleUpdate(row) {
            console.log('Update row:', row);
        },
    },
};
</script>
