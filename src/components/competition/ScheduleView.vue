<template>
    <div v-if="isLoading" class="w-ful h-96 flex items-center">
        <v-icon
            name="ri-refresh-line"
            class="text-gray-400 my-24 items-center w-full"
            speed="slow"
            scale="4"
            animation="spin"
        />
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
                    <div class="border-t border-t-[#C2C2C2] py-[12px] w-full">
                        <div class="w-1/2" v-if="schedule">
                            <div class="flex flex-col">
                                <div
                                    v-for="(event, index) in schedule"
                                    :key="index"
                                    class="flex items-center"
                                >
                                    <div class="relative flex items-center">
                                        <div
                                            class="bg-blue-500 w-4 h-4 rounded-full z-10"
                                        ></div>
                                        <div
                                            v-if="index < schedule.length - 1"
                                            class="h-16 w-1 bg-blue-500 absolute top-full left-1/2 transform -translate-x-1/2"
                                        ></div>
                                    </div>
                                    <div class="ml-4 mt-4">
                                        <p class="text-lg font-semibold">
                                            {{ formatDate(event.date) }}
                                        </p>
                                        <p class="text-sm font-medium">
                                            {{ event.name }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            {{ event.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="schedule.length == 0"
                            class="flex items-center justify-center gap-2 text-base text-gray-500 mt-2"
                        >
                            <v-icon name="bi-info-circle" />
                            <p>Schedule Belum Tersedia</p>
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
                                :disabled="isValid"
                                class="bg-colorPurple text-white w-full py-[6px] rounded-[6px] hover:opacity-[0.8] disabled:cursor-not-allowed disabled:opacity-50"
                                @click="showModal"
                            >
                                Unggah Berkas
                            </button>
                        </div>
                        <p
                            class="flex justify-center gap-1"
                            v-if="messageRegister"
                        >
                            <span>
                                <v-icon name="bi-info-circle" />
                            </span>
                            {{ messageRegister }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <addSubmission v-if="showSubmission" @closeModal="closeModal" />
</template>

<script>
import HeaderView from '@/components/header/HeaderView.vue';
import Loading from 'vue3-loading-overlay';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { RiRefreshLine, BiInfoCircle } from 'oh-vue-icons/icons';
import addSubmission from '../modal/addSubmission.vue';

addIcons(RiRefreshLine, BiInfoCircle);

export default {
    components: {
        HeaderView,
        Loading,
        addSubmission,
        VIcon: OhVueIcon,
    },
    data() {
        return {
            events: [
                {
                    date: '17 Juni 2024',
                    title: 'Pendaftaran',
                    helperText:
                        'peserta melakukan registrasi dan mengisi form registrasi',
                },
                {
                    date: '20 Juni 2024',
                    title: 'Unggah berkas',
                    helperText:
                        'peserta melakukan registrasi dan mengisi form registrasi',
                },
                {
                    date: 'DD,MM,YYYY',
                    title: 'Title',
                    helperText: 'helper text',
                },
                {
                    date: 'DD,MM,YYYY',
                    title: 'Title',
                    helperText: 'helper text',
                },
                {
                    date: 'DD,MM,YYYY',
                    title: 'Title',
                    helperText: 'helper text',
                },
                {
                    date: 'DD,MM,YYYY',
                    title: 'Title',
                    helperText: 'helper text',
                },
            ],
            bannerUrl: '',
            showSubmission: false,
        };
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
        schedule() {
            return this.$store.getters['contest/schedule'];
        },
        registration() {
            return this.$store.getters['user/registration'];
        },
        isLoading() {
            return this.$store.getters['contest/isLoading'];
        },
        slug() {
            return this.$route.params.slug;
        },
        isValid() {
            const regis = this.registration?.map((id) => id.competitionId);
            const date = new Date();
            const lombaEndDate = new Date(this.contestDetail?.endDate);            

            const activity = this.userDetail?.activities.find(activity => activity.competitionId === this.slug);
            const submissionIds = activity ? activity.submissions.map(submission => submission.submissionId) : [];

            date.setHours(0, 0, 0, 0);
            lombaEndDate.setHours(0, 0, 0, 0);

            return (
                !regis.includes(this.slug) ||
                date > lombaEndDate ||
                submissionIds.length > 0
            );
        },
        messageRegister() {
            const regis = this.registration?.map((id) => id.competitionId);
            const date = new Date();
            const lombaStartDate = new Date(this.contestDetail?.startDate);

            date.setHours(0, 0, 0, 0);
            lombaStartDate.setHours(0, 0, 0, 0);

            const activity = this.userDetail?.activities.find(activity => activity.competitionId === this.slug);
            const submissionIds = activity ? activity.submissions.map(submission => submission.submissionId).flat() : [];

            if (!this.userDetail) {
                return '';
            }else if (submissionIds.length > 0) {
                return 'Anda sudah mengumpulkan task';
            } 
            else if (
                this.userDetail &&
                !regis.includes(this.slug) &&
                date < lombaStartDate
            ) {
                return 'Anda belum daftar kegiatan ini';
            }  else {
                return ''
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
    async mounted() {
        const id = localStorage.getItem('userId');
        if (this.slug) {
            await this.$store.dispatch('contest/getSchedule', this.slug);
        }
        if (id) {
            await this.$store.dispatch('user/getRegistration', id);
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
        showModal() {
            this.showSubmission = !this.showSubmission;
        },
        closeModal() {
            this.showSubmission = !this.showSubmission;
        },                
    },
};
</script>
