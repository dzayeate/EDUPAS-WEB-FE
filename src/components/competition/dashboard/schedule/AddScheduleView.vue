<template>
    <div>
        <div
            class="flex flex-row w-8/12 shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-full flex flex-col gap-2 py-[12px]">
                <h3 class="font-medium text-2xl pb-3 mb-3 border-b-2">
                    Tambah Schedule
                </h3>
                <div class="flex flex-col gap-2 mb-[8px] w-7/12">
                    <label for="category">Masukan Tanggal</label>
                    <input
                        id="category"
                        type="date"
                        placeholder="Pilih Tanggal"
                        :class="`custom-input`"
                    />
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="category">Nama Jadwal</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Masukan Text"
                        :class="`custom-input`"
                    />
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="">Tipe Jadwal</label>
                    <select
                        class="w-full custom-input"
                    >
                        <option value="" disabled selected>
                            Pilih Tipe Jadwal
                        </option>                        
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="hybrid">Hybrid</option>
                    </select>                                                                
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="">Tipe Task</label>
                    <select
                        class="w-full custom-input"
                    >
                        <option value="" disabled selected>
                            Pilih Tipe Task
                        </option>                        
                        <option value="file">File</option>
                        <option value="text">Text</option>                        
                    </select>                                                                
                </div>
                <h3 class="font-medium text-2xl pb-3 mb-3 mt-4 ">
                    Pembuatan QR Code
                </h3>
                <div class="flex flex-col items-center justify-center w-4/12 mb-5">
                    <p class="font-medium text-lg">QR Code</p>
                    <img src="@/assets/images/qrcode.svg" alt="">
                </div>
                <div class="flex flex-row gap-7">
                    <button class="px-4 py-2 bg-colorPurple text-white rounded-md">
                        Generate QR Code
                    </button>
                    <button>
                        Download PNG
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
import {
    FaCloudUploadAlt,
    FaUser,
    HiSolidUserGroup,
    FaPlusCircle,
} from 'oh-vue-icons/icons';

addIcons(FaCloudUploadAlt, FaUser, HiSolidUserGroup, FaPlusCircle);

export default {
    components: {
        VIcon: OhVueIcon,        
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
</script>
