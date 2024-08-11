<template>
    <div>
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
                type: 'doughnut', // Tentukan jenis chart di sini
                data: props.data,
                options: {
                    cutout: '80%', // Mengontrol ukuran lubang di tengah (bisa juga angka seperti 70)                    
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
