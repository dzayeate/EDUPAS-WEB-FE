<template>
    <div class="flex">
        <aside
            :class="[
                'bg-white border-r-2 border-neutral-300 fixed top-0 left-0 transition-all duration-500 ease-in-out',
                isExpanded ? 'w-60' : 'w-[5.1rem]', 'h-full z-50'
            ]"            
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
                    <p                          
                        class="font-medium text-md ml-5 font-openSans transition-all duration-500 ease-in-out" 
                        :class="[
                            isExpanded ? ' opacity-100' : 'opacity-0'
                        ]"
                    >
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
                            class="flex items-center gap-2"
                            @click.stop
                        >
                            <svg v-if="menuItem.label == 'Dashboard'" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-grid-fill w-6 h-6 min-w-6 min-h-6" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/>
                            </svg>                            
                            <svg v-if="menuItem.label == 'Kompetisi'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 min-w-6 min-h-6">
                                <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                            </svg>                            
                            <svg v-if="menuItem.label == 'User'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 min-w-6 min-h-6">
                                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                            </svg>
                            <span                                 
                                class="transition-opacity duration-500 ease-in-out" 
                                :class="[ 
                                    isExpanded ? ' opacity-100' : 'opacity-0'
                                ]"
                            >{{ menuItem.label }}</span>
                        </router-link>
                    </li>                    
                </ul>
            </nav>
        </aside>
        <main :class="[
                'flex-1 min-h-screen px-16 py-5 transition-all duration-500 ease-in-out',
                isExpanded ? 'ml-60' : 'ml-[5.1rem]' // Adjust margin based on sidebar width
            ]">
            <!-- Konten utama -->
            <slot></slot>
        </main>
    </div>
</template>

<script>
export default {   
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