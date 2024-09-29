<template>
    <div v-if="isLoading" class="w-ful h-96 flex items-center justify-center">
        <div class="w-16">
            <img src="../../assets//loading/loading.svg">
        </div>
    </div>
    <div v-else-if="isError"  class="w-ful h-96 flex items-center justify-center gap-1 text-lg italic text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>        
        <h2>Gagal Memuat Data</h2>
    </div>
    <div v-else>
        <div class="w-full py-3">                        
            <img class="object-cover w-full" :src="bannerUrl" alt="" />
        </div>
        <div class="flex flex-col py-[12px]">
            <h2 class="font-medium text-[28px] leanding-[36px]">
                {{ contestDetail?.name }}
            </h2>
            <div class="flex gap-8">
                <div class="flex flex-col gap-2 w-full text-[14px]">
                    <p class="py-[12px] text-justify">
                        {{ contestDetail?.description }}
                    </p>
                    <div
                        class="flex border-t border-t-[#C2C2C2] py-[12px] w-full"
                    >
                        <div class="w-1/2">
                            <div class="flex flex-col gap-2 py-[12px]">
                                <h3 class="font-medium text-[14px] uppercase">
                                    SCHEDULE DATE
                                </h3>
                                <div class="flex items-center gap-2">
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-date.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    {{
                                        formatDate(contestDetail?.startDate) +
                                        ' - ' +
                                        formatDate(contestDetail?.endDate)
                                    }}
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
                                            require('@/assets/icons/icon-locate.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    {{ contestDetail?.location }}
                                </div>
                                <div class="flex items-center gap-2">
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-platform.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    {{ contestDetail?.platform }}
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 py-[12px]">
                                <h3 class="font-semibold text-[14px uppercase">
                                    SPEAKERS
                                </h3>
                                <div
                                    v-if="
                                        contestDetail?.mentor &&
                                        contestDetail.mentor.length > 0
                                    "
                                    v-for="(v, i) in contestDetail.mentor"
                                    :key="i"
                                    class="flex items-center gap-2"
                                >
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-person.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    {{ v }}
                                </div>
                                <div v-else class="flex items-center gap-2">
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-person.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    Tidak ada speaker
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2">
                            <div class="flex flex-col gap-2 py-[12px] w-1/2">
                                <h3 class="font-semibold text-[14px] uppercase">
                                    BENEFITS
                                </h3>
                                <div
                                    v-if="
                                        contestDetail?.benefits &&
                                        contestDetail.benefits.length > 0
                                    "
                                    v-for="(v, i) in contestDetail.benefits"
                                    :key="i"
                                    class="flex items-center gap-2"
                                >
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-person.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    {{ v }}
                                </div>
                                <div v-else class="flex items-center gap-2">
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-person.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    Tidak ada benefits
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 py-[12px]">
                                <h3 class="font-semibold text-[14px uppercase">
                                    ORGANIZE
                                </h3>
                                <div
                                    v-if="
                                        contestDetail?.organizer &&
                                        contestDetail.organizer.length > 0
                                    "
                                    v-for="(v, i) in contestDetail.organizer"
                                    :key="i"
                                    class="flex items-center gap-2"
                                >
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-person.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    {{ v }}
                                </div>
                                <div v-else class="flex items-center gap-2">
                                    <img
                                        :src="
                                            require('@/assets/icons/icon-person.svg')
                                        "
                                        alt=""
                                        class="w-contain"
                                    />
                                    Tidak Ada Organize
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 w-1/3">
                    <h3 class="font-semibold text-[14px]">
                        Syarat dan ketentuan
                    </h3>
                    <div class="px-[20px]">
                        <ul>
                            <li
                                v-for="(v, i) in contestDetail?.rule"
                                :key="i"
                                class="list-disc text-justify text-[14px]"
                            >
                                {{ v }}
                            </li>
                        </ul>
                    </div>
                    <div
                        class="flex flex-col gap-2 shadow-lg py-[7px] px-[18px] rounded-[8px] text-sm"
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
                                :disabled="!isEligibleForRegistration"
                                @click.prevent="
                                    navigateToCompetition('registration')
                                "
                                class="text-center bg-colorPurple text-white w-full py-[6px] rounded-[6px] hover:opacity-[0.8] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Register
                            </button>
                        </div>
                        <p class="flex justify-center items-center gap-1" v-if="messageRegister">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            {{ messageRegister }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderView from '@/components/header/HeaderView.vue';

export default {
    components: {
        HeaderView,                
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
        };
    },
    computed: {
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        isEligibleForRegistration() {
            const allowedRoles = ['Siswa', 'Mahasiswa'];
            const date = new Date();
            const lombaStartDate = new Date(this.contestDetail?.startDate);
            const activities = this.userDetail?.activities?.map(activity => activity.competitionId);
            const competitionId = this.$route.params.slug;

            date.setHours(0, 0, 0, 0);
            lombaStartDate.setHours(0, 0, 0, 0);

            return (
                allowedRoles.includes(this.userDetail?.role?.name) &&
                this.userDetail?.isVerified && date <= lombaStartDate && 
                !activities?.includes(competitionId)
            );
        },
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        },
        isError() {
            return this.$store.getters['contest/isError'];
        },
        messageRegister() {
            const date = new Date();
            const lombaStartDate = new Date(this.contestDetail?.startDate);
            const lombaEndDate = new Date(this.contestDetail?.endDate);
            const allowedRoles = ['Siswa', 'Mahasiswa'];
            const activities = this.userDetail?.activities?.map(activity => activity.competitionId);
            const competitionId = this.$route.params.slug;

            date.setHours(0, 0, 0, 0);
            lombaStartDate.setHours(0, 0, 0, 0);
            lombaEndDate.setHours(0, 0, 0, 0);

            // jika tanggal lomba sudah terlewat
            if (date > lombaEndDate) {
                return 'Kegiatan sudah selesai';
            } 
            else if (date >= lombaStartDate && date <= lombaEndDate && !activities?.includes(competitionId)) {
                return 'Kegiatan sedang berlangsung'
            } 
            // jika user belum login
            else if (!this.userDetail) {
                return 'Silahkan Login terlebih dahulu'
            } 
            // jika role siswa dan mahasiswa tapi akun belum terverifikasi
            else if (allowedRoles.includes(this.userDetail?.role?.name) && !this.userDetail?.isVerified) {
                return 'Akun sedang diverifikasi';
            } 
            // jika role umum
            else if (this.userDetail?.role?.name == 'Umum') {
                return 'Akun belum terverifikasi'
            } 
            // jika siswa sudah mendaftar lomba 
            else if (activities?.includes(competitionId)) {
                return 'Anda sudah mendaftar kegiatan ini'
            } 
            else {
                return '';
            }
            
        },
    },
    created() {
        const url = this.contestDetail?.banner?.previewUrl;
        if (url == null) {
            this.bannerUrl = 'https://via.placeholder.com/900x200';
        } else {
            this.bannerUrl = url;
        }
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
        navigateToCompetition(value) {
            this.$router.push({
                name: 'Competition Detail',
                query: { type: value },
            });
        },
    },
};
</script>
