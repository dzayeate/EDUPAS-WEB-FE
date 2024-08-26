<template>
    <div
        class="h-auto bg-white border border-gray-200 rounded-lg shadow"
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
                    class="mb-2 text-base font-bold tracking-tight text-gray-900"
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
        description: {
            type: String,
            default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nulla, quo incidunt, porro qui id quod sunt eligendi assumenda ab vel minus fuga corrupti reiciendis, fugiat possimus. Repellendus perspiciatis odio pariatur. Hic consequatur perferendis voluptatum tempore non numquam commodi et veritatis doloremque alias, praesentium dolorem similique mollitia dicta velit, necessitatibus doloribus aperiam saepe quam magnam incidunt. Magni ea doloremque, architecto quis sit dolorem maxime explicabo enim quos placeat accusamus optio illum qui molestias amet! Libero soluta debitis reiciendis atque autem eos? Illum incidunt earum totam voluptate exercitationem ipsa similique porro recusandae beatae maxime, debitis, facere provident iusto atque, velit aut!'
        },
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
