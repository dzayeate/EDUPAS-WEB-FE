<template>
    <div>
        <div
            v-for="(item, index) in items"
            :key="index"
            class="flex items-center pb-2"
        >
            <!-- <v-icon :name="iconName" /> -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <input
                type="text"
                v-model="items[index]"
                class="border-0 py-0 px-3 w-full text-sm placeholder:text-neutral-700 text-neutral-700 focus:ring-0 custom"
                @input="updateItems"
                :placeholder="placeholderText"
            />
        </div>
        <button v-if="!shouldHideButton" @click="addItem" class="flex items-center text-blue-500 mt-2 gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tambah {{ itemType }}
        </button>
    </div>
</template>

<script>
export default {    
    props: {
        iconName: {
            type: String,
            default: 'fa-user',
        },
        itemType: {
            type: String,
            default: 'Item',
        },
        placeholderText: {
            type: String,
            default: 'Masukan Item',
        },
        initialItems: {
            type: Array,
            default: () => [''],
        },
    },
    data() {
        return {
            items: [...this.initialItems],
        };
    },
    methods: {
        addItem() {
            this.items.push('');
            this.updateItems();
        },
        updateItems() {
            this.$emit('update-items', [...this.items]);
        },        
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        shouldHideButton() {
            // Cek apakah role adalah Admin atau Sponsor
            return ['Admin', 'Sponsor'].includes(this.userDetail.role.name);
        }
    },
    watch: {
        // Watch for changes in initialItems prop and update items accordingly
        initialItems(newItems) {
            this.items = [...newItems]; // Reassign items when initialItems prop changes
        }
    },
};
</script>
