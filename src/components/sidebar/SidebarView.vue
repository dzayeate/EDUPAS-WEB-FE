<template>
    <div class="flex">
        <aside
            :class="[
                'h-screen bg-white border-r-2 border-neutral-300',
                isExpanded ? 'w-60' : 'w-[5.1rem]',
            ]"
            class="transition-width duration-500"
        >
            <div class="flex flex-col justify-between px-4 py-4 relative">
                <div class="flex flex-row justify-start items-center mb-3">
                    <div
                        class="w-12 h-12 min-w-12 min-h-12 overflow-hidden rounded-full"
                    >
                        <img
                            :src="photoUrl"
                            alt="profile picture"
                            class="object-cover w-full h-full shadow-md"
                        />
                    </div>
                    <p v-if="isExpanded" class="font-medium text-md ml-5 font-openSans">
                        Edupas
                    </p>
                </div>
                <button
                    @click="toggleSidebar"
                    class="absolute -right-12 focus:outline-none text-center w-10 h-10 border bg-white shadow-md rounded-full"
                >
                    <svg
                        :class="[
                            isExpanded ? 'transform rotate-90 text-center' : '',
                        ]"
                        class="w-6 h-6 mx-auto transform -rotate-90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                <div class="w-full border border-neutral-300"></div>
            </div>
            <nav class="mt-2 text-sm font-openSans">
                <ul>
                    <li
                        v-for="(menuItem, index) in filteredMenuItems"
                        :key="index"
                        class="mx-4 px-[0.7rem] py-2 my-1 rounded-md hover:bg-colorPurple hover:text-white cursor-pointer"
                        :class="[
                            !isExpanded ? 'px-[0.7rem]' : '',
                            isActive(menuItem.link)
                                ? 'bg-colorPurple text-white'
                                : '',
                        ]"
                        @click="navigateTo(menuItem.link)"
                    >
                        <router-link
                            :to="menuItem.link"
                            class="flex items-center space-x-2"
                            @click.stop
                        >
                            <v-icon
                                :name="menuItem.icon"
                                class="w-6 h-6 min-w-6 min-h-6"
                            />
                            <span v-if="isExpanded">{{ menuItem.label }}</span>
                        </router-link>
                    </li>
                    <!-- Tambahkan item menu lainnya di sini -->
                </ul>
            </nav>
        </aside>
        <main class="flex-1 px-16 py-5">
            <!-- Konten utama -->
            <slot></slot>
        </main>
    </div>
</template>

<script>
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiGrid, HiSolidClipboardList, PrUser } from 'oh-vue-icons/icons';

addIcons(BiGrid, HiSolidClipboardList, PrUser);

export default {
    components: {
        VIcon: OhVueIcon,
    },
    data() {
        return {
            isExpanded: false,
            menuItems: [
                { label: 'Dashboard', icon: 'bi-grid', link: '/dashboard' },
                {
                    label: 'Kompetisi',
                    icon: 'hi-solid-clipboard-list',
                    link: '/dashboard/competition',
                },
                {
                    label: 'User',
                    icon: 'pr-user',
                    link: '/dashboard/user',
                    requiredRole: 'Admin'
                },
            ],
            photoUrl: ''
        };
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail']
        },
        filteredMenuItems() {
            return this.menuItems.filter(menuItem => {
                if (menuItem.requiredRole) {
                    return this.userDetail?.role?.name === menuItem.requiredRole;
                }
                return true;
            });
        }        
    },
    watch: {
        userDetail: {
            immediate: true,
            handler(newVal) {
                const url = newVal?.biodate?.image?.previewUrl;
                if (url) {
                    this.photoUrl = url;
                } else {
                    this.photoUrl = 'https://via.placeholder.com/150';
                }
            },
        },
    },
    methods: {
        toggleSidebar() {
            this.isExpanded = !this.isExpanded;
        },
        isActive(route) {
            return this.$route.path === route;
        },
        navigateTo(route) {
            this.$router.push(route);
        },
    },
};
</script>

<style scoped>
.transition-width {
    transition-property: width;
}
</style>
