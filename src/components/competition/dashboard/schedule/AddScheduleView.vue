<template>
  <div>
    <div class="flex flex-row w-8/12 shadow-form rounded-md px-2 pt-2 text-sm mb-5">
        <div class="w-full flex flex-col gap-2 py-[12px]">
            <h3 v-if="isEditing" class="font-medium text-2xl pb-3 mb-3 border-b-2">Edit Schedule</h3>
            <h3 v-else-if="shouldHideIcons" class="font-medium text-2xl pb-3 mb-3 border-b-2">View Schedule</h3>            
            <h3 v-else class="font-medium text-2xl pb-3 mb-3 border-b-2">Tambah Schedule</h3>            
            <div class="flex flex-col gap-2 mb-[8px] w-7/12">
                <label for="date">Masukan Tanggal</label>
                <input
                    id="date"
                    type="date"
                    v-model="data.date"
                    placeholder="Pilih Tanggal"
                    class="custom-input disabled:cursor-not-allowed"
                    :disabled="shouldHideIcons"
                />
                <p class="text-xs italic text-red-700">{{ messageDate }}</p>
            </div>
            <div class="flex flex-col gap-2 mb-[8px]">
                <label for="name">Nama Jadwal</label>
                <input
                    id="name"
                    v-model="data.name"
                    type="text"
                    placeholder="Masukan Nama"
                    class="custom-input disabled:cursor-not-allowed"
                    :disabled="shouldHideIcons"
                />
            </div>
            <div class="flex flex-col gap-2 mb-[8px]">
                <label for="">Tipe Jadwal</label>
                <select v-model="data.category" class="custom-input disabled:cursor-not-allowed"
                    :disabled="shouldHideIcons">
                    <option value="" disabled selected>Pilih Tipe Jadwal</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>            
            <div class="flex flex-col gap-2 mb-[8px]">
                <label for="time">Waktu</label>
                <input
                    id="time"
                    v-model="data.time"
                    type="time"
                    placeholder="Masukan Waktu"
                    class="custom-input disabled:cursor-not-allowed"
                    :disabled="shouldHideIcons"
                />
            </div>
            <div class="flex flex-col gap-2 mb-[8px]">
                <label for="location">Lokasi</label>
                <input
                    id="location"
                    v-model="data.location"
                    type="text"
                    placeholder="Masukan Lokasi"
                    class="custom-input disabled:cursor-not-allowed"
                    :disabled="shouldHideIcons"
                />
            </div>
            <div class="flex flex-col gap-2 mb-[8px]">
                <label for="description">Deskripsi Jadwal</label>
                <textarea
                    id="description"
                    v-model="data.description"
                    type="text"
                    placeholder="Masukan Deskripsi"
                    class="custom-input disabled:cursor-not-allowed"
                    :disabled="shouldHideIcons"
                    rows="4"
                />
            </div>

            <div v-if="!shouldHideIcons">
                <h3 class="font-medium text-2xl pb-3 mb-3 mt-4">Pembuatan QR Code</h3>
                <div class="flex flex-col items-center justify-center w-4/12 mb-5">
                    <p class="font-medium text-lg">QR Code</p>
                    <img :src="qrCodeDataUrl" alt="Generated QR Code" v-if="qrCodeDataUrl" />
                    <p v-else class="text-gray-500">QR Code belum di-generate</p>
                </div>
    
                <div class="flex flex-row gap-7">
                    <button @click="generateQRCode" class="px-4 py-2 bg-colorPurple text-white rounded-md">
                        Generate QR Code
                    </button>
                    <button @click="downloadQRCode" :disabled="!qrCodeDataUrl" class="px-4 py-2 bg-gray-500 text-white rounded-md">
                        Download PNG
                    </button>
                </div>
    
                <div class="flex justify-end">
                    <button
                        @click="submitSchedule"
                        class="text-sm bg-colorPurple text-white rounded-md px-4 font-medium py-2 disabled:cursor-not-allowed disabled:bg-opacity-50"
                        :disabled="!isFormValid"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaCloudUploadAlt, FaUser, HiSolidUserGroup, FaPlusCircle } from 'oh-vue-icons/icons';
import ApiService from '@/store/api.service';
import Swal from 'sweetalert2';

addIcons(FaCloudUploadAlt, FaUser, HiSolidUserGroup, FaPlusCircle);

export default {
    components: {
        VIcon: OhVueIcon,
    },
    props: {
        isEditing: {
            type: Boolean,
            default: false,
        },
        scheduleId: {
            type: String,
            default: null,
        },               
    },
    data() {
        return {            
            fileName: '',                  
            qrCodeDataUrl: '', // Untuk menyimpan URL QR code
            data: {
                competitionId: "",
                date: "",
                name: "",
                category: "",
                time: "",
                location: "",
                description: ""
            }
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
        isFormValid() {
            return (
                this.data.name &&
                this.data.date &&
                this.data.date >= this.contestDetail.startDate &&
                this.data.date <= this.contestDetail.endDate &&
                this.data.category &&
                this.data.time &&
                this.data.description
            )
        },
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
        messageDate() {
        if (this.data.date && this.contestDetail) {
            const formattedStartDate = this.formatDate(this.contestDetail.startDate);
            const formattedEndDate = this.formatDate(this.contestDetail.endDate);

            // Cek jika tanggal lebih kecil dari startDate
            if (this.data.date < this.contestDetail.startDate) {
                return `Tanggal tidak boleh kurang dari ${formattedStartDate}`;
            } 
            // Cek jika tanggal lebih besar dari endDate
            else if (this.data.date > this.contestDetail.endDate) {
                return `Tanggal tidak boleh lebih dari ${formattedEndDate}`;
            }
        }
        return null; // Tidak ada pesan jika tidak ada masalah
    }
    },
    mounted() {
        if (this.isEditing && this.scheduleId) {
            this.loadScheduleData(this.scheduleId);
        }
    },
    watch: {
        // Watch for changes in scheduleId
        scheduleId(newId) {
            if (newId && this.isEditing) {
                this.loadScheduleData(newId);
            }
        }
    },
    methods: {
        async loadScheduleData(id) {
            // Contoh: Ambil data jadwal berdasarkan ID
            const response = await ApiService.get(`/competition/findScheduleCompetition?search=${id}`);                        
            console.log(response.data.data)            
        },
        formatDate(date) {
            let parts = date.split('-');
            let year = parts[0];
            let month = parts[1];
            let day = parts[2];
            return `${day}/${month}/${year}`;
        },        
        async generateQRCode() {
            try {
                const qrCodeUrl = await QRCode.toDataURL(this.scheduleId); // Generate QRCode menggunakan scheduleId
                this.qrCodeDataUrl = qrCodeUrl;        
            } catch (error) {
                console.error('Error generating QR Code:', error);
            }
        },
        downloadQRCode() {
            const link = document.createElement('a');
            link.href = this.qrCodeDataUrl;
            link.download = `QRCode_Schedule_${this.scheduleId}.png`;
            link.click();
        },
        dataUrlToBlob(dataUrl) {
        // Fungsi untuk mengubah data URL menjadi Blob
            const arr = dataUrl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        async submitSchedule() {                        
            try {
                if (this.isFormValid) {                    
                    const idCompetition = this.$route.query.id
                    this.data.competitionId = idCompetition
                    // // const formData = new FormData();
                        
                    // formData.append('competitionId', idCompetition);
                    // for (const key in this.data) {
                    //     formData.append(key, this.data[key]);
                    // }

    
                    // Tambahkan file QR code sebagai file blob
                    // if (this.qrCodeDataUrl) {
                    //     const blob = await this.dataUrlToBlob(this.qrCodeDataUrl); // Convert data URL to Blob
                    //     formData.append('qrCode', blob, `QRCode_Schedule_${this.scheduleId}.png`);
                    // }
    
                    // Kirimkan data menggunakan Axios (sesuaikan dengan endpoint API Anda)
                    await ApiService.post('competition/schedule', this.data);
                    
                        
                    Swal.fire({
                        title: 'Sukses',
                        text: 'Schedule berhasil ditambahkan',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1100,
                        customClass: {
                            popup: "success-popup",
                            icon: "success-icon",
                            title: "success-title",
                            htmlContainer: "success-html",                    
                        }
                    }).then(() => {
                        this.$emit('show-add');                       
                    });
                }
            } catch (error) {
                console.error('Error submitting schedule:', error);
                Swal.fire({
                    title: 'Gagal',
                    text: 'Schedule gagal ditambahkan',
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
        },        
    },
};
</script>

<style scoped>
/* Tambahkan gaya khusus di sini jika diperlukan */
</style>
