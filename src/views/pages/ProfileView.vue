<template>
  <div class="px-[16px] md:px-[42px] py-[24px]">
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
          Education
        </a>
        <a
          @click.prevent="navigateToCompetition('certification')"
          :class="`${
            $route.query.type === 'certification'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          Licenses & Certifications
        </a>
      </div>
    </div>
    <div class="flex items-center gap-4 py-[24px]">
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
              <div class="flex flex-col mb-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile Picture"
                  class="w-32 h-32 rounded-full mb-4 mt-[-60px] ml-[20px]"
                />
                <div class="flex justify-between items-center">
                  <h2 class="text-2xl font-semibold">
                    Ray Gineung Pratidina Zunaedi
                    <span
                      class="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                      >Verified</span
                    >
                  </h2>
                  <img
                    @click="showModalProfile = true"
                    :src="require('@/assets/icons/icon-edit.svg')"
                    alt="Edit"
                    class="cursor-pointer"
                  />
                </div>
                <p class="text-lg text-gray-600">Universitas Pasundan</p>
              </div>
              <div
                class="text-gray-600 pb-6 border-b border-b-1 border-b-gray-200"
              >
                <p>Mahasiswa</p>
                <p>Bandung, West Java, Indonesia</p>
                <a href="#" class="text-blue-500"
                  >Anda belum mendaftar untuk sebuah lomba! Bergabunglah dengan
                  salah satunya</a
                >
              </div>
              <ProfileView
                v-if="!$route.query.type || $route.query.type === 'profile'"
                @showModalAbout="showModalAbout = true"
                @showModalSkill="showModalSkill = true"
              />
              <ActivityView v-else-if="$route.query.type === 'activities'" />
              <EducationView
                v-else-if="$route.query.type === 'education'"
                @showModalEducation="showModalEducation = true"
              />
              <CertificationView
                v-else-if="$route.query.type === 'certification'"
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
      <EditEducation v-else-if="showModalEducation" @closeModal="closeModal" />
    </transition>
  </div>
</template>

<script>
import ProfileView from "@/components/profile/ProfileView.vue";
import ActivityView from "@/components/profile/ActivityView.vue";
import EducationView from "@/components/profile/EducationView.vue";
import CertificationView from "@/components/profile/CertificationView.vue";
import EditProfile from "@/components/modal/EditProfile.vue";
import EditAbout from "@/components/modal/EditAbout.vue";
import EditSkill from "@/components/modal/EditSkill.vue";
import EditEducation from "@/components/modal/EditEducation.vue";

export default {
  components: {
    ProfileView,
    ActivityView,
    EducationView,
    CertificationView,
    EditProfile,
    EditAbout,
    EditSkill,
    EditEducation,
  },
  data() {
    return {
      showModalProfile: false,
      showModalAbout: false,
      showModalSkill: false,
      showModalEducation: false,
    };
  },
  async mounted() {
    await this.getData();
  },
  computed: {},
  methods: {
    async getData() {
      try {
      } catch (err) {
        console.log(err);
      }
    },
    navigateToCompetition(value) {
      this.$router.push({
        name: "Profile View",
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
