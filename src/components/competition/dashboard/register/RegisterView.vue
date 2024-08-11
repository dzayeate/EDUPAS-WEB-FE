<template>
    <div>
        <div
            class="flex flex-row w-8/12 shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-full flex flex-col gap-2 py-[12px]">
                <h3 class="font-medium text-2xl pb-3 mb-3 border-b-2">Form Pembuatan Registrasi</h3>                
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="category">Masukan Text</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Masukan Text"
                        :class="`custom-input`"
                    />
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="category">Masukan Text</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Masukan Text"
                        :class="`custom-input`"
                    />
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="category">Masukan Text</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Masukan Text"
                        :class="`custom-input`"
                    />
                </div>
                <div class="flex flex-row gap-4 mb-[8px]">
                    <button class="flex justify-between custom-input w-3/12 text-gray-400">
                        Tambah Field
                        <v-icon name="fa-plus-circle" class="text-colorPurple"/>
                    </button>
                    <button class="flex justify-between custom-input w-4/12 text-gray-400">
                        Tambah Field Upload
                        <v-icon name="fa-plus-circle" class="text-colorPurple"/>
                    </button>                                        
                </div>                
                <div class="flex justify-end">
                    <button
                        class="text-sm bg-colorPurple text-white rounded-md px-4 font-medium py-2"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaCloudUploadAlt, FaUser, HiSolidUserGroup, FaPlusCircle } from 'oh-vue-icons/icons';
import InputItem from '@/components/competition/dashboard/InputItem.vue';

addIcons(FaCloudUploadAlt, FaUser, HiSolidUserGroup, FaPlusCircle);

export default {
    components: {
        VIcon: OhVueIcon,
        InputItem,
    },
    data() {
        return {
            fileName: '', // Data untuk menyimpan nama file
            judges: [''],
            sponsors: [''],
            organizers: [''],
        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.fileName = file.name; // Simpan nama file
                // Lakukan logika upload file di sini
                console.log(file.name);
            } else {
                this.fileName = ''; // Kosongkan nama file jika tidak ada file
            }
        },
        updateJudges(judges) {
            this.judges = judges;
            console.log('Updated Judges:', judges);
        },
        updateSponsors(sponsors) {
            this.sponsors = sponsors;
            console.log('Updated Sponsors:', sponsors);
        },
        updateOrganizers(organizers) {
            this.organizers = organizers;
            console.log('Updated Organizers:', organizers);
        },
    },
};
</script>../InputItem.vue
