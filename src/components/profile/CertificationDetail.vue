<template>
    <div v-if="isLoading" class="w-16 my-10 mx-auto">
        <img src="../../assets//loading/loading.svg">
    </div>
    <div v-else class="py-5">
        <h2 class="font-medium text-[28px] pb-5">Detail Kompetisi</h2>
        <div class="w-full pb-5">
            <img class="object-cover w-full" :src="bannerUrl" alt="" />
        </div>
        <div class="w-full border-b border-b-[#C2C2C2] pb-3">
            <h2 class="font-medium text-[28px] leanding-[36px]">
                {{ contestDetail?.name }}
            </h2>
            <p class="py-[12px] text-justify text-[14px]">
                {{ contestDetail?.description }}
            </p>                    
        </div>
        <div class="flex flex-row py-[12px] gap-10 justify-between">
            <div
                class="shadow-lg p-5 rounded-[8px] w-9/12 flex flex-col gap-2"
            >
                <img
                    :src="photoUrl"
                    alt="Profile Photo"                
                    class="object-cover w-32 h-32 rounded-full"                
                />
                <div class="flex items-center gap-4 w-2/6">
                    <h2 class="text-2xl font-medium">
                        {{
                            userDetail?.biodate.firstName +
                            ' ' +
                            userDetail?.biodate.lastName
                        }}
                    </h2>
                    <p
                        :class="isClassVerified"
                        class="text-sm font-normal px-3 py-[0.1rem] rounded-md border"
                    >
                        {{ isVerified }}
                    </p>
                </div>
                <p class="border-b border-b-[#C2C2C2] pb-2">No sertif</p>
                <p>Point : 88</p>
                <p>Nama team</p>
                <ul class="text-[#9E9E9E] space-y-1">
                    <li>Anggota | Role</li>
                    <li>Anggota | Role</li>
                    <li>Anggota | Role</li>
                    <li>Anggota | Role</li>
                    <li>Anggota | Role</li>
                </ul>
            </div>                    
            <div
                class="flex flex-col gap-2 shadow-lg py-[18px] px-[18px] rounded-[8px] text-sm h-fit w-3/12"
            >
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2 w-full">
                        <img
                            :src="
                                require('@/assets/icons/icon-date.svg')
                            "
                            alt=""
                            class="w-contain"
                        />
                        {{ formatDate(contestDetail?.startDate) }} -
                        {{ formatDate(contestDetail?.endDate) }}
                    </div>
                    <div class="flex items-center gap-2">
                        <img
                            :src="
                                require('@/assets/icons/icon-time.svg')
                            "
                            alt=""
                            class="w-contain"
                        />
                        {{ formatTime(contestDetail?.startTime) }} -
                        {{ formatTime(contestDetail?.endTime) }}
                    </div>
                    <div class="flex items-center gap-2">
                        <img
                            :src="
                                require('@/assets/icons/icon-peoples.svg')
                            "
                            alt=""
                            class="w-contain"
                        />
                        {{ contestDetail?.registrationCount || 0 }}
                        Orang terdaftar
                    </div>
                </div>
                <div
                    class="border-b border-b-[#C2C2C2] w-full my-[6px]"
                ></div>
                <div class="flex flex-col gap-2">
                    <p class="text-[16px] font-semibold">Rp1.000.000</p>
                    <button                                                                
                        class="text-center bg-colorPurple text-white w-full py-[6px] rounded-[6px] hover:opacity-[0.8] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Lihat Sertifikat
                    </button>
                    <button                                                                
                        class="text-center bg-colorPurple text-white w-full py-[6px] rounded-[6px] hover:opacity-[0.8] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Unduh Sertifikat
                    </button>
                </div>
               
            </div>            
        </div>
    </div>
</template>

<script>
import HeaderView from '@/components/header/HeaderView.vue';
import Loading from 'vue3-loading-overlay';

export default {
    components: {
        HeaderView,
        Loading,        
    },
    data() {
        return {
            filter: [
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
                'Title Content',
            ],
            bannerUrl: '',
            photoUrl: '',
        };
    },
    computed: {
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },        
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        },        
        slug() {
            return this.$route.query.id;
        },
        isVerified() {
            const roleName = this.userDetail?.role?.name;
            const isVerified = this.userDetail?.isVerified;
            if (isVerified == false || roleName === 'Umum') {
                return 'Unverified';
            } else {
                return 'Verified';
            }
        },
        isClassVerified() {
            const roleName = this.userDetail?.role?.name;
            const isVerified = this.userDetail?.isVerified;
            if (isVerified == false || roleName === 'Umum') {
                return 'bg-red-100 text-red-800 border-red-500';
            } else {
                return 'bg-blue-100 text-blue-800 border-[#B1C5F6]';
            }
        },
    },
    async mounted() {
        if (this.slug) {
            await this.$store.dispatch('contest/getContestDetail', this.slug);
        }
    },
    created() {
        const url = this.contestDetail?.banner?.previewUrl;
        if (url == null) {
            this.bannerUrl = 'https://via.placeholder.com/900x200';
        } else {
            this.bannerUrl = url;
        }
    },
    watch: {
        userDetail: {
            immediate: true,
            handler(newVal) {
                const url = newVal?.biodate?.image?.previewUrl;
                if (url) {
                    this.photoUrl = url;
                } else {
                    this.photoUrl = 'https://via.placeholder.com/150';
                }
            },
        },
    },
    methods: {
        splitString(v) {
            // Mengganti karakter pemisah khusus (\m) dengan newline (\n)
            const normalizedString = v.replace(/\\m/g, '\n');

            // Memisahkan string berdasarkan newline (\n)
            const resultArray = normalizedString.split('\n');

            // Mengembalikan array yang dihasilkan
            return resultArray;
        },
        formatDate(v) {
            // Membuat objek Date dari string input
            const date = new Date(v);

            // Mendefinisikan nama bulan dalam bahasa Indonesia
            const months = [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember',
            ];

            // Mengambil tanggal dan nama bulan
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();

            // Mengembalikan string dalam format "10 Juni"
            return `${day} ${month} ${year}`;
        },
        formatTime(v) {
            // Membuat objek Date dari string input waktu
            const time = new Date(`1970-01-01T${v}Z`);

            // Mengambil jam dan menit
            const hours = time.getUTCHours();
            const minutes = time.getUTCMinutes();

            // Mengubah jam dan menit ke format dua digit
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');

            // Mengembalikan string dalam format "08:00"
            return `${formattedHours}:${formattedMinutes}`;
        },
        extractTime(v) {
            // Membuat objek Date dari string input
            const date = new Date(v);

            // Mengambil jam dan menit
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            // Mengembalikan waktu dalam format "HH:MM"
            return `${hours}:${minutes}`;
        },        
    },
};
</script>
