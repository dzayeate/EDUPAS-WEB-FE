<template>
    <div class="h-64 w-full">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const canvas = ref(null);

        onMounted(() => {
            new Chart(canvas.value, {
                type: 'bar', // Tentukan jenis chart di sini
                data: props.data,
                options: {
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },                            
                            categoryPercentage: 0.8, // Mengatur ukuran kategori
                        },
                        y: {                            
                            beginAtZero: true,
                            min: 0, // Nilai minimum sumbu Y
                            max: 50, // Nilai maksimum sumbu Y (sesuaikan dengan data)
                        },
                    },
                    datasets: {
                        bar: {
                            barThickness: 30, // Ketebalan bar
                            maxBarThickness: 30, // Ketebalan maksimum bar
                            barPercentage: 0.7, // Mengatur ukuran bar dalam grup
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        });

        return {
            canvas,
        };
    },
});
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
