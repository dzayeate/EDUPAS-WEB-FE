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
                <DoughnutChart :data="doughnutData" class="w-[8.5rem] -mt-2" />
                <div class="flex flex-col w-full gap-10 justify-between">
                    <p class="font-medium text-sm flex justify-between">
                        Total Peserta
                        <span>
                            <v-icon
                                name="oi-kebab-horizontal"
                                class="rotate-90"
                        /></span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData.datasets[0].data[0] }} Peserta
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5">
                                <v-icon name="hi-solid-arrow-sm-up" class="text-[#B8DBCA]" scale="0.8"/> 7.2%
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
                            <v-icon
                                name="oi-kebab-horizontal"
                                class="rotate-90"
                        /></span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData2.datasets[0].data[0] }} Audience
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5">
                                <v-icon name="hi-solid-arrow-sm-up" class="text-[#B8DBCA]" scale="0.8"/> 7.2%
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
                        Jumlah Kompetisi
                        <span>
                            <v-icon
                                name="oi-kebab-horizontal"
                                class="rotate-90"
                        /></span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData3.datasets[0].data[0] }} Kompetisi
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5">
                                <v-icon name="hi-solid-arrow-sm-up" class="text-[#B8DBCA]" scale="0.8"/> 7.2%
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
                            <v-icon
                                name="oi-kebab-horizontal"
                                class="rotate-90"
                        /></span>
                    </p>
                    <div class="font-poppins">
                        <p class="text-xs text-gray-400">Deskripsi</p>
                        <p class="text-sm font-medium mt-3 flex justify-between items-center">
                            {{ doughnutData4.datasets[0].data[0] }} Pendaftar
                            <span class="bg-[#F5F5FF] text-[#20573D] rounded-md px-[0.3rem] py-[0.2rem] mr-5">
                                <v-icon name="hi-solid-arrow-sm-up" class="text-[#B8DBCA]" scale="0.8"/> 7.2%
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
            <h2 class="font-medium text-base font-poppins">Jumlah Pendaftar</h2>
            <v-icon name="oi-kebab-horizontal" class="rotate-90" />
        </div>
        <BarChart :data="barData" class="w-auto" />
    </div>
</template>

<script>
import DoughnutChart from './DoughnutChart.vue';
import BarChart from './BarChart.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { OiKebabHorizontal, HiSolidArrowSmUp} from 'oh-vue-icons/icons';

addIcons(OiKebabHorizontal, HiSolidArrowSmUp);

export default {
    components: {
        DoughnutChart,
        BarChart,
        VIcon: OhVueIcon,
    },
    data() {
        return {
            registrants: [
                { name: 'Nama', date: '04/20/2024' },
                { name: 'Nama', date: '04/20/2024' },
                { name: 'Nama', date: '04/20/2024' },
            ],
            doughnutData: {
                labels: '',
                datasets: [
                    {
                        data: [12, 88],
                        backgroundColor: ['#3267E3', '#B1C5F6'],
                    },
                ],
            },
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
                    'Senin',
                    'Selasa',
                    'Rabu',
                    'Kamis',
                    'Jumat',
                    'Sabtu',
                    'Minggu',
                ],
                datasets: [
                    {
                        backgroundColor: '#3490dc',
                        data: [5, 10, 3, 15, 7, 2, 10],
                    },
                ],
            },
        };
    },
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
