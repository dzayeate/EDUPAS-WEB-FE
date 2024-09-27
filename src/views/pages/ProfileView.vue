<template>
    <div class="container px-24 py-12">
        <div class="flex justify-between items-center">
            <div class="flex gap-6">
                <a
                    @click.prevent="navigateToCompetition('profile')"
                    :class="`${
                        !$route.query.type || $route.query.type === 'profile'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Profile
                </a>
                <a
                    @click.prevent="navigateToCompetition('activities')"
                    :class="`${
                        $route.query.type === 'activities'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    My Activites
                </a>
                <a
                    @click.prevent="navigateToCompetition('education')"
                    :class="`${
                        $route.query.type === 'education'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    {{ navigationLabel }}
                </a>
                <a
                    @click.prevent="navigateToCompetition('certification')"
                    :class="`${
                        $route.query.type === 'certification' || $route.query.type === 'competition-detail'
                            ? 'text-customBlue border-b-[1px] border-customBlue'
                            : 'text-black'
                    } cursor-pointer`"
                >
                    Licenses & Certifications
                </a>
            </div>
        </div>
        <CertificationDetail
            v-if="
                $route.query.type === 'competition-detail'
            "
        />
        <div v-else class="flex items-center gap-4 py-[24px]">
            <div class="flex gap-6 w-full">
                <div class="w-full min-h-screen flex flex-col items-center">
                    <div
                        class="bg-white w-full rounded-sm shadow-sm border border-1 border-gray-200"
                    >
                        <div
                            class="w-full h-[400px]"
                            :style="`background-image: url(${require('@/assets/images/default-header.png')})`"
                        ></div>
                        <div class="p-6">
                            <div
                                class="flex flex-col gap-1 mb-6 pb-6 border-b border-b-1 border-b-gray-200"
                            >
                                <ProfilePhoto
                                    class="w-32 h-32 rounded-full mb-4 mt-[-90px] ml-[20px] shadow-md"
                                />
                                <!-- <img
                                    :src="
                                        userDetail && userDetail?.biodate.image
                                            ? userDetail.biodate.image
                                                .previewUrl
                                            : 'https://via.placeholder.com/150'
                                    "
                                    alt="Profile Picture"
                                    class="w-32 h-32 rounded-full mb-4 mt-[-60px] ml-[20px] shadow-md"
                                /> -->
                                <img
                                    @click="showModalProfile = true"
                                    :src="
                                        require('@/assets/icons/icon-edit.svg')
                                    "
                                    alt="Edit"
                                    class="cursor-pointer ml-auto w-7 mb-2"
                                />
                                <div class="flex items-center capitalize">
                                    <div class="flex items-center gap-4 w-2/6">
                                        <h2 class="text-2xl font-medium">
                                            {{
                                                userDetail?.biodate.firstName +
                                                ' ' +
                                                userDetail?.biodate.lastName
                                            }}
                                        </h2>
                                        <p
                                            :class="isClassVerified"
                                            class="text-sm font-normal px-3 py-[0.1rem] rounded-md border"
                                        >
                                            {{ isVerified }}
                                        </p>
                                    </div>
                                    <p
                                        class="text-lg font-medium text-gray-600"
                                    >
                                        {{
                                            userDetail?.biodate.institutionName
                                                ? userDetail.biodate
                                                    .institutionName
                                                : ''
                                        }}
                                    </p>
                                </div>
                                <p>{{ userDetail?.role.name }}</p>
                                <p class="text-[#9E9E9E]">
                                    {{
                                        userDetail?.biodate.regencies +
                                        ', ' +
                                        userDetail?.biodate.province
                                    }}
                                    INDONESIA
                                </p>
                                <a :href="linkRole" class="text-blue-500">
                                    {{ roleMessage }}
                                </a>
                            </div>
                            <ProfileView
                                v-if="
                                    !$route.query.type ||
                                    $route.query.type === 'profile'
                                "
                            />
                            <ActivityView
                                v-else-if="$route.query.type === 'activities'"
                            />
                            <EducationView
                                v-else-if="$route.query.type === 'education'"
                                @showModalEducation="showModalEducation = true"
                            />
                            <CertificationView
                                v-else-if="
                                    $route.query.type === 'certification'
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- Modal -->
        <transition name="modal">
            <EditProfile v-if="showModalProfile" @closeModal="closeModal" />
            <EditAbout v-else-if="showModalAbout" @closeModal="closeModal" />
            <EditSkill v-else-if="showModalSkill" @closeModal="closeModal" />
            <EditEducation
                v-else-if="showModalEducation"
                @closeModal="closeModal"
            />
        </transition>
    </div>
</template>

<script>
import ProfileView from '@/components/profile/ProfileView.vue';
import ActivityView from '@/components/profile/ActivityView.vue';
import EducationView from '@/components/profile/EducationView.vue';
import CertificationView from '@/components/profile/CertificationView.vue';
import CertificationDetail from '@/components/profile/CertificationDetail.vue';
import EditProfile from '@/components/modal/EditProfile.vue';
import EditAbout from '@/components/modal/EditAbout.vue';
import EditSkill from '@/components/modal/EditSkill.vue';
import EditEducation from '@/components/modal/EditEducation.vue';
import ProfilePhoto from '@/components/profile/ProfilePhoto.vue';
import { useMeta } from 'vue-meta';

export default {
    setup() {
        useMeta({ title: 'Profile', titleTemplate: 'EduPass | %s' });
    },
    components: {
        ProfileView,
        ActivityView,
        EducationView,
        CertificationView,
        EditProfile,
        EditAbout,
        EditSkill,
        EditEducation,
        ProfilePhoto,
        CertificationDetail
    },
    data() {
        return {
            showModalProfile: false,
            showModalAbout: false,
            showModalSkill: false,
            showModalEducation: false,
            detail: '',
            role: '',
            loading: true,
        };
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        roleMessage() {
            const roleName = this.userDetail?.role?.name;
            const activities = this.userDetail?.registeredCompetitions > 0;
            if (roleName === 'Umum') {
                return 'Anda belum Terverifikasi, Lengkapi Biodata Anda Sekarang';
            } else if (roleName === 'Siswa' || roleName === 'Mahasiswa') {
                if (activities) {
                    return ''
                } else {
                    return 'Anda belum mendaftar untuk sebuah lomba! Bergabunglah dengan salah satunya';
                }
            } else {
                return '';
            }
        },
        linkRole() {
            const roleName = this.userDetail?.role?.name;
            if (roleName === 'Umum') {
                return '/register';
            } else if (roleName === 'Siswa' || roleName === 'Mahasiswa') {
                return '/competition?type=list';
            }
        },
        isVerified() {
            const roleName = this.userDetail?.role?.name;
            const isVerified = this.userDetail?.isVerified;
            if (isVerified == false || roleName === 'Umum') {
                return 'Unverified';
            } else {
                return 'Verified';
            }
        },
        isClassVerified() {
            const roleName = this.userDetail?.role?.name;
            const isVerified = this.userDetail?.isVerified;
            if (isVerified == false || roleName === 'Umum') {
                return 'bg-red-100 text-red-800 border-red-500';
            } else {
                return 'bg-blue-100 text-blue-800 border-[#B1C5F6]';
            }
        },
        navigationLabel() {
            const roleName = this.userDetail?.role.name;
            return roleName === 'Siswa' ||
                roleName === 'Mahasiswa' ||
                roleName === 'Umum'
                ? 'Education'
                : 'Organization';
        },
    },
    methods: {
        navigateToCompetition(value) {
            this.$router.push({
                name: 'Profile View',
                query: { type: value },
            });
        },
        handleSubmit() {
            // Handle form submission
            this.showModalProfile = false;
        },
        addEducation() {
            // Handle adding new education
        },
        showModalA() {
            this.showModalAbout = true;
        },
        showModalS() {
            this.showModalSkill = true;
        },
        closeModal() {
            this.showModalProfile = false;
            this.showModalAbout = false;
            this.showModalSkill = false;
            this.showModalEducation = false;
        },
    },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
