<template>
    <nav
        class="fixed stick flex items-center gap-10 border-b-[1px] border-[#9E9E9E] px-[8px] md:px-[55px] py-[21px] w-full z-20 bg-white"
    >
        <transition name="slide">
            <ul
                v-if="isMenuOpen"
                class="md:hidden fixed top-0 left-0 mr-10 z-10 w-[250px] sm:w-[400px] h-[100vh] bg-white shadow-lg pt-[50px]"
            >
                <li class="py-2">
                    <a
                        v-if="['/'].includes($route.path)"
                        @click="navigateTo('home')"
                        :class="`${
                            isHomeSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Home</a
                    >
                    <a
                        v-else
                        href="/"
                        @click="navigateTo('home')"
                        :class="`${
                            isHomeSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Home</a
                    >
                </li>
                <li class="mr-4">
                    <a
                        v-if="['/', '/competition'].includes($route.path)"
                        @click="navigateTo('competition')"
                        :class="`${
                            isCompetitionSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Competition</a
                    >
                    <a
                        v-else
                        @click="navigateAndScrollTo('HomeView', 'competition')"
                        :class="`${
                            isCompetitionSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Competition</a
                    >
                </li>
                <li class="py-2">
                    <a
                        v-if="['/', '/locate'].includes($route.path)"
                        @click="navigateTo('locate')"
                        :class="`${
                            isLocateSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Locate</a
                    >
                    <a
                        v-else
                        @click="navigateAndScrollTo('HomeView', 'locate')"
                        :class="`${
                            isLocateSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Locate</a
                    >
                </li>
                <li class="py-2">
                    <a
                        v-if="['/', '/contact'].includes($route.path)"
                        @click="navigateTo('contact')"
                        :class="`${
                            isContactSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Contact</a
                    >
                    <a
                        v-else
                        @click="navigateAndScrollTo('HomeView', 'contact')"
                        :class="`${
                            isContactSectionInView
                                ? 'font-medium text-customBlue'
                                : 'font-normal text-colorText'
                        } cursor-pointer block px-4 py-2 font-medium hover:opacity-[0.8]`"
                        >Contact</a
                    >
                </li>
                <li class="py-2">
                    <a
                        href="/login"
                        class="font-normal text-colorText cursor-pointer block px-4 py-2 hover:opacity-[0.8]"
                        >Login</a
                    >
                </li>
            </ul>
        </transition>
        <div class="flex items-center gap-10 w-full z-20 bg-white">
            <div
                class="flex justify-between gap-10 items-center w-full md:w-auto"
            >
                <div>
                    <a
                        v-if="['/'].includes($route.path)"
                        @click="navigateTo('home')"
                        class="text-[#80B5E9] font-medium text-[28px] cursor-pointer"
                        >Edu<span class="text-[#EA8389]">Pas</span></a
                    >
                    <a
                        v-else
                        href="/"
                        class="text-[#80B5E9] font-medium text-[28px] cursor-pointer"
                        >Edu<span class="text-[#EA8389]">Pass</span></a
                    >
                </div>
                <div class="md:hidden">
                    <button
                        @click="toggleMenu"
                        :class="`text-gray-600 hover:text-gray-800 focus:text-gray-800 block focus:outline-none ms-auto`"
                    >
                        <svg
                            class="w-8 h-8 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                v-if="!isMenuOpen"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 6h16M6 12h16M6 18h16"
                            ></path>
                            <path
                                v-if="isMenuOpen"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
                <ul class="hidden md:flex md:gap-5">
                    <li class="mr-4">
                        <a
                            v-if="['/'].includes($route.path)"
                            @click="navigateTo('home')"
                            :class="`${
                                isHomeSectionInView
                                    ? 'font-medium text-customBlue'
                                    : 'font-normal text-colorText'
                            } cursor-pointer font-medium hover:opacity-[0.8]`"
                            >Home</a
                        >
                        <a
                            v-else
                            href="/"
                            :class="`${
                                isHomeSectionInView
                                    ? 'font-medium text-customBlue'
                                    : 'font-normal text-colorText'
                            } cursor-pointer font-medium hover:opacity-[0.8]`"
                            >Home</a
                        >
                    </li>
                    <li class="mr-4">
                        <a
                            v-if="['/competition'].includes($route.path)"
                            :class="[
                                'cursor-pointer',
                                'font-medium',
                                isCompetitionSectionInView
                                    ? 'text-customBlue'
                                    : 'text-colorText',
                                'transition-colors',
                                'duration-300',
                                'hover:opacity-[0.8]',
                            ]"
                            >Competition</a
                        >
                        <a
                            v-else
                            @click="
                                navigateAndScrollTo('HomeView', 'competition')
                            "
                            :class="[
                                'cursor-pointer',
                                'font-medium',
                                isCompetitionSectionInView
                                    ? 'text-customBlue'
                                    : 'text-colorText',
                                'transition-colors',
                                'duration-300',
                                'hover:opacity-[0.8]',
                            ]"
                            >Competition</a
                        >
                    </li>
                    <li class="mr-4">
                        <a
                            v-if="['/', '/locate'].includes($route.path)"
                            @click="navigateTo('locate')"
                            :class="`${
                                isLocateSectionInView
                                    ? 'font-medium text-customBlue'
                                    : 'font-normal text-colorText'
                            } cursor-pointer font-medium hover:opacity-[0.8]`"
                            >Locate</a
                        >
                        <a
                            v-else
                            @click="navigateAndScrollTo('HomeView', 'locate')"
                            :class="`${
                                isLocateSectionInView
                                    ? 'font-medium text-customBlue'
                                    : 'font-normal text-colorText'
                            } cursor-pointer font-medium hover:opacity-[0.8]`"
                            >Locate</a
                        >
                    </li>
                    <li>
                        <a
                            v-if="['/', '/contact'].includes($route.path)"
                            @click="navigateTo('contact')"
                            :class="`${
                                isContactSectionInView
                                    ? 'font-medium text-customBlue'
                                    : 'font-normal text-colorText'
                            } cursor-pointer text-[#413e66] font-medium hover:opacity-[0.8]`"
                            >Contact</a
                        >
                        <a
                            v-else
                            href="/"
                            @click="navigateAndScrollTo('HomeView', 'contact')"
                            :class="`${
                                isContactSectionInView &&
                                !$route.path == 'competition?type=list'
                                    ? 'font-medium text-customBlue'
                                    : 'font-normal text-colorText'
                            } cursor-pointer text-[#413e66] font-medium hover:opacity-[0.8]`"
                            >Contact</a
                        >
                    </li>
                </ul>
            </div>
            <div
                v-if="!userDetail"
                class="ml-auto hidden md:flex gap-4 text-sm"
            >
                <a href="/login">
                    <span class="font-normal text-colorText hover:opacity-[0.8]"
                        >Login</span
                    >
                </a>
                <span>|</span>
                <a href="/register">
                    <span
                        class="font-normal text-customBlue hover:opacity-[0.8]"
                        >Register</span
                    >
                </a>
            </div>
            <div v-else class="ml-auto hidden md:flex gap-4">
                <button
                    id="dropdownDefaultButton"
                    @click="showDropdown"
                    class="relative capitalize font-normal text-dark hover:opacity-[0.8] focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    {{ userDetail?.biodate.firstName }}
                    <span class="mx-2">|</span>
                    <span class="capitalize text-customBlue">{{
                        userDetail?.role.name
                    }}</span>
                    <svg
                        class="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="#3267E3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                <!-- Dropdown menu -->
                <div
                    id="dropdown"
                    v-show="isDropdownOpen"
                    class="absolute top-16 right-20 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                    <ul
                        class="py-2 text-sm text-gray-700"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <a
                                :href="`/profile`"
                                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >Profile</a
                            >
                        </li>
                        <li v-if="!hideDashboard">
                            <a
                                href="/dashboard"
                                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >Dashboard</a
                            >
                        </li>
                        <li>
                            <a
                                @click="logoutHandler"
                                class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >Log out</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { nextTick } from 'vue';
import { mapState } from 'vuex';
import { all } from 'axios';

export default {
    data() {
        return {
            isMenuOpen: false,
            activeTab: '',
            isScrolled: false,
            isHomeSectionInView: false,
            isCompetitionSectionInView: false,
            isLocateSectionInView: false,
            isContactSectionInView: false,
            isDropdownOpen: false,
            name: '',
        };
    },
    async mounted() {
        await nextTick(); // Ensure DOM elements are rendered
        window.addEventListener('scroll', this.handleScroll, { passive: true });

        const options = {
            rootMargin: '-50px 0px -50px 0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(
            this.handleIntersection,
            options,
        );
        const homeSection = document.getElementById('home');
        const competitionSection = document.getElementById('competition');
        const locateSection = document.getElementById('locate');
        const contactSection = document.getElementById('contact');

        if (homeSection) observer.observe(homeSection);
        if (competitionSection) observer.observe(competitionSection);
        if (locateSection) observer.observe(locateSection);
        if (contactSection) observer.observe(contactSection);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
        ...mapState('user', [
            'emailCorrected',
            'passwordStrength',
            'passwordConfirmed',
            'userEmail',
        ]),
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        hideDashboard() {
            const roleName = this.userDetail?.role.name;
            return (
                roleName === 'Umum' ||
                roleName === 'Siswa' ||
                roleName === 'Mahasiswa' ||
                roleName === 'Juri'
            );
        },
    },
    methods: {
        handleIntersection(entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    switch (entry.target.id) {
                        case 'home':
                            this.isHomeSectionInView = true;
                            break;
                        case 'competition':
                            this.isCompetitionSectionInView = true;
                            break;
                        case 'locate':
                            this.isLocateSectionInView = true;
                            break;
                        case 'contact':
                            this.isContactSectionInView = true;
                            break;
                        default:
                            break;
                    }
                } else {
                    switch (entry.target.id) {
                        case 'home':
                            this.isHomeSectionInView = false;
                            break;
                        case 'competition':
                            this.isCompetitionSectionInView = false;
                            break;
                        case 'locate':
                            this.isLocateSectionInView = false;
                            break;
                        case 'contact':
                            this.isContactSectionInView = false;
                            break;
                        default:
                            break;
                    }
                }
            });
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 100;
        },
        navigateTo(tab) {
            this.activeTab = tab;
            const section = document.getElementById(tab);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        },
        async navigateAndScrollTo(routeName, tab) {
            await this.$router.push({ name: routeName });
            this.$nextTick(() => {
                this.navigateTo(tab);
                window.addEventListener('scroll', this.handleScroll, { passive: true });

                const options = {
                    rootMargin: '-50px 0px -50px 0px',
                    threshold: 0.5,
                };

                const observer = new IntersectionObserver(
                    this.handleIntersection,
                    options,
                );
                const homeSection = document.getElementById('home');
                const competitionSection =
                    document.getElementById('competition');
                const locateSection = document.getElementById('locate');
                const contactSection = document.getElementById('contact');

                if (homeSection) observer.observe(homeSection);
                if (competitionSection) observer.observe(competitionSection);
                if (locateSection) observer.observe(locateSection);
                if (contactSection) observer.observe(contactSection);
            });
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        showDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        async logoutHandler() {
            await localStorage.removeItem('token');
            localStorage.clear();
            window.location.href = '/';
        }
    },
};
</script>

<style scoped>
.stick {
    top: 0;
    position: sticky;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s;
}
.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
