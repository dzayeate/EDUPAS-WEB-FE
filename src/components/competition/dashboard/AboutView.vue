<template>
    <div>
        <div
            class="flex flex-row w-full shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-1/2 flex flex-col gap-2 py-[12px]">
                <div class="flex flex-col gap-1 mb-[8px] w-8/12">
                    <span>Upload Gambar</span>
                    <label
                        for="file-upload"
                        class="w-full flex items-center cursor-pointer custom-input"
                    >
                        <span class="flex-grow text-gray-500" v-if="!fileName"
                            >Pilih Gambar</span
                        >
                        <span class="flex-grow text-gray-500" v-else>{{
                            fileName
                        }}</span>
                        <v-icon name="fa-cloud-upload-alt" />
                        <input
                            id="file-upload"
                            type="file"
                            class="hidden"
                            @change="handleFileChange"
                        />
                    </label>
                    <span class="text-xs"
                        >Upload Gambar Untuk Banner Perlombaan 000 x 000px</span
                    >
                </div>
                <div class="flex flex-col gap-1 mb-[8px] w-8/12">
                    <span class="">Upload Gambar</span>
                    <label
                        for="file-upload"
                        class="w-full flex items-center cursor-pointer custom-input"
                    >
                        <span class="flex-grow text-gray-500" v-if="!fileName"
                            >Pilih Gambar</span
                        >
                        <span class="flex-grow text-gray-500" v-else>{{
                            fileName
                        }}</span>
                        <v-icon name="fa-cloud-upload-alt" />
                        <input
                            id="file-upload"
                            type="file"
                            class="hidden"
                            @change="handleFileChange"
                        />
                    </label>
                    <span class="text-xs"
                        >Upload Gambar Untuk Thumbnail Perlombaan 00 x
                        00px</span
                    >
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="category">Kategori Kompetisi</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Masukan Kategori Kompetisi"
                        :class="`custom-input`"
                    />
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="category">Nama Kompetisi</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Masukan Nama Kompetisi"
                        :class="`custom-input`"
                    />
                </div>
            </div>
        </div>
        <div
            class="flex flex-row gap-6 shadow-form rounded-md px-2 pt-2 text-sm"
        >
            <div class="w-9/12 flex flex-col gap-2 py-[12px]">
                <div class="flex flex-col gap-1 mb-3 w-8/12">
                    <p class="font-medium mb-2">JURI</p>
                    <InputItem
                        iconName="fa-user"
                        itemType="Juri"
                        placeholderText="Masukan Nama Juri"
                        :initialItems="judges"
                        @update-items="updateJudges"
                    />
                </div>
                <div class="flex flex-row justify-around">
                    <div class="flex flex-col gap-1 mb-[8px] w-8/12">
                        <p class="font-medium mb-2">SPONSOR</p>
                        <InputItem
                            iconName="fa-user"
                            itemType="Sponsor"
                            placeholderText="Masukan Nama Sponsor"
                            :initialItems="sponsors"
                            @update-items="updateSponsors"
                        />
                    </div>
                    <div class="flex flex-col gap-1 mb-[8px] w-8/12">
                        <p class="font-medium mb-2">ORGANIZE</p>
                        <InputItem
                            iconName="hi-solid-user-group"
                            itemType="Organizer"
                            placeholderText="Masukan Nama Organizer"
                            :initialItems="organizers"
                            @update-items="updateOrganizers"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div
            class="flex flex-row w-full shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-full flex flex-col gap-1 py-[12px]">
                <p class="font-medium mb-1">DESKRIPSI KOMPETISI</p>
                <textarea name="descripstion" id="description" cols="30" rows="10" class="custom-input mb-2" placeholder="Deskripsi"/>
            </div>
        </div>
        <div
            class="flex flex-row w-full shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-full flex flex-col gap-1 py-[12px]">
                <p class="font-medium mb-1">Syarat dan Ketentuan</p>
                <textarea name="descripstion" id="description" cols="30" rows="10" class="custom-input mb-2" placeholder="Deskripsi"/>
            </div>
        </div>
        <div class="flex justify-end">
            <button class=" text-sm bg-colorPurple text-white rounded-md px-4 font-medium py-2">Kirim</button>
        </div>
    </div>
</template>
<script>
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaCloudUploadAlt, FaUser, HiSolidUserGroup } from 'oh-vue-icons/icons';
import InputItem from './InputItem.vue';

addIcons(FaCloudUploadAlt, FaUser, HiSolidUserGroup);

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
            organizers: ['']
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
        }
    },
};
</script>
./InputItem.vue./register/InputItem.vue
