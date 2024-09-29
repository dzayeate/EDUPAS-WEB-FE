<template>
    <div class="flex flex-row justify-between border-b-2 pb-5 mb-6">
        <h3 class="font-medium text-2xl font-openSans">Overview</h3>        
    </div>
    <div class="flex flex-row w-full gap-6 mb-6">
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 w-7/12"
        >
            <div
                class="bg-white px-5 py-6 h-fit rounded-lg shadow-chart flex flex-row items-center gap-5"
            >
                <DoughnutChart :data="doughnutData" :key="participants" class="w-[8.5rem] -mt-2" />
                <div class="flex flex-col w-full gap-10 justify-between">
                    <p class="font-medium text-sm flex justify-between">
                        Total Peserta
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData.datasets[0].data[0] }} Peserta
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5 flex items-center">                                
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-3 text-[#B8DBCA]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                                7.2%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="bg-white px-5 py-6 h-fit rounded-lg shadow-chart flex flex-row items-center gap-5"
            >
                <DoughnutChart :data="doughnutData2" class="w-[8.5rem] -mt-2" />
                <div class="flex flex-col w-full gap-10 justify-between">
                    <p class="font-medium text-sm flex justify-between">
                        Total Audience
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData2.datasets[0].data[0] }} Audience
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-3 text-[#B8DBCA]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg> 7.2%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="bg-white px-5 py-6 h-fit rounded-lg shadow-chart flex flex-row items-center gap-5"
            >
                <DoughnutChart :data="doughnutData3" class="w-[9rem] -mt-2" />
                <div class="flex flex-col w-full gap-10 justify-between">
                    <p class="font-medium text-sm flex justify-between">
                        Gender Audience
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData3.datasets[0].data[0] }} Kompetisi
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-3 text-[#B8DBCA]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg> 7.2%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="bg-white px-5 py-6 h-fit rounded-lg shadow-chart flex flex-row items-center gap-5"
            >
                <DoughnutChart :data="doughnutData4" class="w-[9rem] -mt-2" />
                <div class="flex flex-col w-full gap-10 justify-between">
                    <p class="font-medium text-sm flex justify-between">
                        Jumlah Pendaftar
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData4.datasets[0].data[0] }} Pendaftar
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 h-3 text-[#B8DBCA]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg> 7.2%
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="bg-white shadow-chart rounded-lg px-5 py-5 flex flex-col w-5/12"
        >
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">
                    Pendaftar terbaru
                </h3>
                <a href="#" class="text-sm text-blue-600 hover:underline"
                    >Lihat Semua</a
                >
            </div>
            <ul>
                <li
                    v-for="(item, index) in registrants"
                    :key="index"
                    class="border-b-2 border-[#CBD2E0] py-2 flex justify-start items-center mb-4"
                >
                    <div class="pr-14">{{ index + 1 }}.</div>
                    <div class="flex flex-col gap-1">
                        <p class="text-base">{{ item.name }}</p>
                        <p class="text-sm text-gray-300">{{ item.date }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div
        class="bg-white px-5 py-3 rounded-lg shadow-chart flex flex-col w-full"
    >
        <div class="flex flex-row justify-between -mb-5 items-center">
            <h2 class="font-medium text-base font-poppins">Total Usia Audience</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
        </div>
        <BarChart :data="barData" class="w-auto" />
    </div>
</template>

<script>
import DoughnutChart from './DoughnutChart.vue';
import BarChart from './BarChart.vue';
import ApiService from '@/store/api.service';

export default {
    components: {
        DoughnutChart,
        BarChart,        
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        doughnutData() {
            return {
                labels: '',
                datasets: [
                    {
                        data: [this.participants || 0, 100 - (this.participants || 0)],
                        backgroundColor: ['#3267E3', '#B1C5F6'],
                    },
                ],
            }
        }
    },
    data() {
        return {
            participants: null,
            registrants: [
                { name: 'Nama', date: '04/20/2024' },
                { name: 'Nama', date: '04/20/2024' },
                { name: 'Nama', date: '04/20/2024' },
            ],            
            doughnutData2: {
                labels: '',
                datasets: [
                    {
                        data: [20, 80],
                        backgroundColor: ['#20573D', '#B8DBCA'],
                    },
                ],
            },
            doughnutData3: {
                labels: '',
                datasets: [
                    {
                        data: [30, 70],
                        backgroundColor: ['#BD251C', '#DEAAEF'],
                    },
                ],
            },
            doughnutData4: {
                labels: '',
                datasets: [
                    {
                        data: [40, 60],
                        backgroundColor: ['#BF6919', '#EECEB0'],
                    },
                ],
            },
            barData: {
                labels: [
                    '18 Tahun',
                    '19 Tahun',
                    '20 Tahun',
                    '21 Tahun',
                    '22 Tahun',
                    '23 Tahun',
                    '24 Tahun',
                    '25 Tahun',
                ],
                datasets: [
                    {
                        backgroundColor: '#3490dc',
                        data: [5, 10, 3, 15, 7, 2, 10, 10],
                    },
                ],
            },
        };
    },
    async mounted() {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        if (this.userDetail?.role.name === "Admin" || this.userDetail?.role.name === "Eo") {
            const response = await ApiService.get('admin/team');
            const filteredData = response.data.data.filter(item => item.month === currentMonth);
            this.participants = filteredData[0]?.totalParticipants || 0;                                                            
        }
    }
};
</script>
