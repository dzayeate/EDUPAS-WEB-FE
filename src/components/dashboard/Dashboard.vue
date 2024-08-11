<template>
    <div>
        <div class="flex flex-row w-8/12 flex-wrap gap-4">
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="font-bold text-lg">Total Peserta</h2>
                <DoughnutChart :data="doughnutData"/>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="font-bold text-lg">Total Audience</h2>
                <DoughnutChart :data="doughnutData2" />
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="font-bold text-lg">Jumlah Kompetisi</h2>
                <DoughnutChart :data="doughnutData3" />
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="font-bold text-lg">Jumlah Pendaftar</h2>
                <DoughnutChart :data="doughnutData4" />
            </div>
        </div>
        <div class="bg-white p-4 mt-4 rounded-lg shadow">
            <h2 class="font-bold text-lg">Jumlah Pendaftar</h2>
            <BarChart :data="barData"/>
        </div>
    </div>
</template>

<script>
import DoughnutChart from './DoughnutChart.vue';
import BarChart from './BarChart.vue';

export default {
    components: {
        DoughnutChart,
        BarChart,
    },
    data() {
        return {
            doughnutData: {
                labels: ['Peserta'],
                datasets: [
                    {
                        data: [12, 88],
                        backgroundColor: ['#3490dc', '#e2e8f0'],
                        borderWidth: 1 
                    },
                ],
            },
            doughnutData2: {
                labels: ['Audience'],
                datasets: [
                    {
                        data: [12, 88],
                        backgroundColor: ['#38c172', '#e2e8f0'],
                    },
                ],
            },
            doughnutData3: {
                labels: ['Kompetisi'],
                datasets: [
                    {
                        data: [12, 88],
                        backgroundColor: ['#e3342f', '#e2e8f0'],
                    },
                ],
            },
            doughnutData4: {
                labels: ['Pendaftar'],
                datasets: [
                    {
                        data: [12, 88],
                        backgroundColor: ['#f6993f', '#e2e8f0'],
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
                        label: 'Jumlah Pendaftar',
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
