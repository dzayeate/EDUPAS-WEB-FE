<template>
    <div>
        <div
            class="flex flex-row w-full shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-1/2 flex flex-col gap-2 py-[12px]">
                <div class="flex flex-col gap-1 mb-[8px] ">
                    <span>Upload Gambar</span>
                    <label
                        for="banner-upload"
                        :class="[
                            'w-full flex items-center custom-input',
                            { 
                            'cursor-pointer': !isDisabled, 
                            'cursor-not-allowed': isDisabled 
                            }
                        ]"                        
                    >
                        <span class="flex-grow text-gray-500" v-if="!bannerFileName"
                            >Pilih Gambar</span
                        >
                        <span class="flex-grow text-gray-500" v-else>{{
                            bannerFileName
                        }}</span>
                        <v-icon name="fa-cloud-upload-alt" />
                        <input
                            id="banner-upload"
                            type="file"
                            class="hidden"
                            @change="handleBannerChange"
                            accept="image/png, image/jpeg"
                            :disabled="isDisabled"
                        />
                    </label>
                    <span class="text-xs"
                        >Upload Gambar Untuk Banner Perlombaan 900 x 200px</span
                    >                    
                </div>
                <div class="flex flex-col gap-1 mb-[8px]">
                    <span class="">Upload Gambar</span>
                    <label
                        for="thumbnail-upload"
                        :class="[
                            'w-full flex items-center custom-input',
                            { 
                            'cursor-pointer': !isDisabled, 
                            'cursor-not-allowed': isDisabled 
                            }
                        ]"
                    >
                        <span class="flex-grow text-gray-500" v-if="!thumbnailFileName"
                            >Pilih Gambar</span
                        >
                        <span class="flex-grow text-gray-500" v-else>{{
                            thumbnailFileName
                        }}</span>
                        <v-icon name="fa-cloud-upload-alt" />
                        <input
                            id="thumbnail-upload"
                            type="file"
                            class="hidden"
                            @change="handleThumbnailChange"
                            accept="image/png, image/jpeg"
                            :disabled="isDisabled"
                        />
                    </label>
                    <span class="text-xs"
                        >Upload Gambar Untuk Thumbnail Perlombaan 300 x
                        200px</span
                    >
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="category">Kategori Kompetisi</label>
                    <input
                        id="category"
                        type="text"
                        placeholder="Masukan Kategori Kompetisi"
                        class="custom-input disabled:cursor-not-allowed"
                        v-model="data.category"
                        :disabled="isDisabled"
                    />
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="name">Nama Kompetisi</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Masukan Nama Kompetisi"
                        class="custom-input disabled:cursor-not-allowed"
                        v-model="data.name"
                        :disabled="isDisabled"
                    />
                </div>
                <div class="flex flex-row gap-2 mb-[8px] justify-stretch">
                    <div class="flex flex-col gap-2 w-full">
                        <label for="startDate">Tanggal Mulai</label>
                        <input
                            id="startDate"
                            type="date"                            
                            class="custom-input disabled:cursor-not-allowed"
                            v-model="data.startDate"
                            :disabled="isDisabled"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label for="endDate">Tanggal Akhir</label>
                        <input
                            id="endDate"
                            type="date"                            
                            class="custom-input disabled:cursor-not-allowed"
                            v-model="data.endDate"
                            :disabled="isDisabled"
                        />
                    </div>
                </div>
                <div class="flex flex-row gap-2 mb-[8px] justify-stretch">
                    <div class="flex flex-col gap-2 w-full">
                        <label for="startTime">Waktu Mulai</label>
                        <input
                            id="startTime"
                            type="time"                            
                            class="custom-input disabled:cursor-not-allowed"
                            v-model="data.startTime"
                            :disabled="isDisabled"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-full">
                        <label for="endTime">Waktu Akhir</label>
                        <input
                            id="endTime"
                            type="time"                            
                            class="custom-input disabled:cursor-not-allowed"
                            v-model="data.endTime"
                            :disabled="isDisabled"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="location">Lokasi</label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Masukan Lokasi Kompetisi"
                        class="custom-input disabled:cursor-not-allowed"
                        v-model="data.location"
                        :disabled="isDisabled"
                    />
                </div>
                <div class="flex flex-col gap-2 mb-[8px]">
                    <label for="platform">Platfrom</label>
                    <input
                        id="platform"
                        type="text"
                        placeholder="Masukan Platfrom"
                        class="custom-input disabled:cursor-not-allowed"
                        v-model="data.platform"
                        :disabled="isDisabled"
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
                        :initialItems="data.mentors"
                        @update-items="updateJudges"
                    />
                </div>
                <div class="flex flex-col gap-1 mb-3 w-8/12">
                    <p class="font-medium mb-2">SPONSOR</p>
                    <InputItem
                        iconName="fa-user"
                        itemType="Sponsor"
                        placeholderText="Masukan Nama Sponsor"
                        :initialItems="data.sponsors"
                        @update-items="updateSponsors"
                    />
                </div>
                <!-- <div class="flex flex-row justify-around">
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
                </div> -->
            </div>
        </div>
        <div
            class="flex flex-row w-full shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-full flex flex-col gap-1 py-[12px]">
                <p class="font-medium mb-1">DESKRIPSI KOMPETISI</p>
                <textarea
                    name="descripstion"
                    id="description"
                    cols="30"
                    rows="10"
                    class="custom-input disabled:cursor-not-allowed mb-2"
                    placeholder="Deskripsi"
                    v-model="data.description"
                    :disabled="isDisabled"
                />
            </div>
        </div>
        <div
            class="flex flex-row w-full shadow-form rounded-md px-2 pt-2 text-sm mb-5"
        >
            <div class="w-full flex flex-col gap-1 py-[12px]">
                <p class="font-medium mb-1">Syarat dan Ketentuan</p>
                <textarea
                    name="descripstion"
                    id="description"
                    cols="30"
                    rows="10"
                    class="custom-input disabled:cursor-not-allowed mb-2"
                    placeholder="Deskripsi"
                    v-model="rules"
                    :disabled="isDisabled"
                />
            </div>
        </div>
        <div class="flex justify-end">
            <button                
                class="text-sm bg-colorPurple text-white rounded-md px-4 font-medium py-2 disabled:cursor-not-allowed disabled:bg-opacity-60"
                @click="handleSubmit"
                :disabled="!isFormValid"
                v-if="!shouldHideButton"
            >
                Kirim            
            </button>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaCloudUploadAlt, FaUser, HiSolidUserGroup } from 'oh-vue-icons/icons';
import InputItem from './InputItem.vue';
import ApiService from '@/store/api.service';
import router from '@/router';

addIcons(FaCloudUploadAlt, FaUser, HiSolidUserGroup);

export default {
    components: {
        VIcon: OhVueIcon,
        InputItem,
    },
    data() {
        return {
            bannerFileName: '',
            thumbnailFileName: '',
            bannerFile: null,
            thumbnailFile: null,
            isFileValid: false,
            rules: "",
            data: {
                category: "",
                name: "",
                mentors: [''],
                sponsors: [''],
                description: "",
                startDate: "",
                endDate: "",
                startTime: "",
                endTime: "",
                location: "",
                platform: ""
            }
        };
    },
    computed: {
        isFormValid() {
            return (
                this.data.name &&
                this.data.category &&
                this.data.description &&
                this.data.startDate && this.data.endDate &&
                this.data.startTime && this.data.endTime &&
                this.data.location && this.data.platform &&
                this.data.mentors.length > 0 && this.data.mentors.every(mentor => mentor.trim() !== '') &&
                this.data.sponsors.length > 0 && this.data.sponsors.every(sponsor => sponsor.trim() != '')             
            )
        },
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        shouldHideButton() {
            // Cek apakah role adalah Admin atau Sponsor
            return ['Admin', 'Sponsor'].includes(this.userDetail.role.name);
        },
        isDisabled() {
            return ['Admin', 'Sponsor'].includes(this.userDetail.role.name);
        },
    },
    async mounted() {
        const id = this.$route.query.id;
        let url = '/competition/findCompetition?search=';        

        // Jika id ada, tambahkan ke URL
        if (id) {            
            url += id;
            try {
                const response = await ApiService.get(url);
                const competitionData = response.data.data[0];                        
                
    
                // Update initial value dari `data` dengan hasil GET dari API
                if (competitionData) {
                    this.data.category = competitionData.category || "";
                    this.data.name = competitionData.name || "";
                    // Validasi dan mapping data mentor
                    if (Array.isArray(competitionData.mentor) && competitionData.mentor.length > 0) {
                        const mentorIds = competitionData.mentor.map(item => item.userId);
                        this.data.mentors = mentorIds.length > 0 ? mentorIds : [''];
                    } else {
                        this.data.mentors = [''];
                    }
                    
                    // Validasi dan mapping data sponsor
                    if (Array.isArray(competitionData.sponsor) && competitionData.sponsor.length > 0) {
                        const sponsorIds = competitionData.sponsor.map(item => item.userId);
                        this.data.sponsors = sponsorIds.length > 0 ? sponsorIds : [''];
                    } else {
                        this.data.sponsors = [''];
                    }
                    
                        
                    this.data.description = competitionData.description || "";
                    this.data.startDate = competitionData.startDate || "";
                    this.data.endDate = competitionData.endDate || "";
                    this.data.startTime = competitionData.startTime || "";
                    this.data.endTime = competitionData.endTime || "";
                    this.data.location = competitionData.location || "";
                    this.data.platform = competitionData.platform || "";
                }
            } catch (error) {
                console.error('Error fetching competition data:', error);
            }
        }
    },
    methods: {
        handleBannerChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert('File banner terlalu besar! Ukuran maksimal adalah 5 MB.');
                    this.isFileValid = false;
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = () => {
                        if (img.width !== 900 || img.height !== 200) {
                            alert('Dimensi banner harus 900x200px.');
                            this.isFileValid = false;
                        } else {
                            this.isFileValid = true;
                            this.bannerFileName = file.name;
                            this.bannerFile = file;
                        }
                    };
                };
                reader.readAsDataURL(file);
            } else {
                this.bannerFileName = '';
                this.isFileValid = false;
            }
        },

        // Validate Thumbnail Image
        handleThumbnailChange(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 5 * 1024 * 1024) {
                    alert('File thumbnail terlalu besar! Ukuran maksimal adalah 5 MB.');
                    this.isFileValid = false;
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = () => {
                        if (img.width !== 300 || img.height !== 200) {
                            alert('Dimensi thumbnail harus 300x200px.');
                            this.isFileValid = false;
                        } else {
                            this.isFileValid = true;
                            this.thumbnailFileName = file.name;
                            this.thumbnailFile = file;
                        }
                    };
                };
                reader.readAsDataURL(file);
            } else {
                this.thumbnailFileName = '';
                this.isFileValid = false;
            }
        },
        updateJudges(judges) {
            this.data.mentors = judges;                                    
        },
        updateSponsors(sponsors) {
            this.data.sponsors = sponsors;            
        },
        updateOrganizers(organizers) {
            this.data.organizers = organizers;            
        },
        async handleSubmit() {
            try {
                if (this.isFormValid) {
                    const formData = new FormData();

                    formData.append('banner', this.bannerFile);
                    formData.append('thumbnail', this.thumbnailFile);

                    for (const key in this.data) {
                        formData.append(key, this.data[key]);
                    }

                    const response = await ApiService.post('competition/registerCompetition', formData);
                    Swal.fire({
                        title: 'Sukses',
                        text: 'Pembuatan Kompetisi Anda Berhasil.',
                        icon: 'success',
                    }).then(() => {
                        router.push('/dashboard/competition');                        
                    });                    
                } 
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text:
                        err?.response?.data?.message || 'Gagal Membuat Kompetisi',
                    icon: 'error',
                });
            }
        }
    },
};
</script>
