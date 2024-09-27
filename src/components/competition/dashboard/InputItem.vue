<template>
    <div>
        <div
            v-for="(item, index) in items"
            :key="index"
            class="flex items-center pb-2"
        >
            <v-icon :name="iconName" />
            <input
                type="text"
                v-model="items[index]"
                class="border-0 py-0 px-3 w-full text-sm placeholder:text-neutral-700 text-neutral-700 focus:ring-0 custom"
                @input="updateItems"
                :placeholder="placeholderText"
            />
        </div>
        <button v-if="!shouldHideButton" @click="addItem" class="flex items-center text-blue-500 mt-2">
            <v-icon name="fa-plus" scale="0.7" class="mr-1" />
            Tambah {{ itemType }}
        </button>
    </div>
</template>

<script>
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaUser, FaPlus } from 'oh-vue-icons/icons';

addIcons(FaUser, FaPlus);

export default {
    components: {
        VIcon: OhVueIcon,
    },
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
