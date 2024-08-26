<template>
    <div
        class="h-fit bg-white border border-gray-200 rounded-lg shadow"
    >
        <a :href="`/competition/${slug}`">
            <img v-if="image" class="rounded-t-lg" :src="image" alt="" />
            <img
                v-else
                class="rounded-t-lg w-full"
                src="https://via.placeholder.com/300x200"
                alt="Placeholder"
            />
        </a>
        <div class="p-5">
            <a :href="`/competition/${slug}`">
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                >
                    {{ title }}
                </h5>
            </a>
            <p class="mb-1 font-normal text-sm text-gray-700">
                <span v-if="!showFullDescription">
                    {{ truncatedDescription }}...
                </span>
                <span v-else>
                    {{ description }}
                </span>
            </p>
            <button
                v-if="description.length > 100"
                class="text-blue-500 text-sm hover:underline focus:outline-none"
                @click="toggleDescription"
            >
                {{
                    showFullDescription
                        ? 'Lihat Lebih Sedikit'
                        : 'Lihat Selengkapnya'
                }}
            </button>
        </div>        
    </div>
</template>

<script>
export default {
    props: {
        slug: String,
        image: String,
        title: String,
        description: String,
        discount: String,
    },
    data() {
        return {
            showFullDescription: false,
        };
    },
    computed: {
        truncatedDescription() {
            return this.description.length > 100
                ? this.description.substring(0, 100)
                : this.description;
        },
    },
    methods: {
        toggleDescription() {
            this.showFullDescription = !this.showFullDescription;
        },
    },
};
</script>
