<template>
  <div v-if="showFrom" class="bg-white fixed z-30 top-0 w-full h-[100vh]">
    <div class="w-full h-[100vh] h-max-[100%] flex">
      <div class="bg-colorPurple w-1/2 hidden lg:block">
        <p
          class="font-medium text-[28px] leanding-[36px] mt-[200px] w-[90%] ms-[20px] text-white"
        >
          Join and explore many interesting events, get experience and prizes in
          them
        </p>
      </div>
      <StepTwo
        v-if="step === 1"
        @stepTwoHandler="stepTwoHandler"
        @skipHandler="skipHandler"
        :roleName="data.roleName"
      />
      <StepThree
        v-else
        @stepTwoHandler="stepTwoHandler"
        @skipHandler="skipHandler"
        :roleName="data.roleName"
      />
    </div>
  </div>
  <div id="home" class="px-[16px] md:px-[42px] py-[24px]">
    <HeaderView />
  </div>
  <div id="competition" class="px-[16px] md:px-[42px] py-[24px]">
    <div class="text-center mb-[24px]">
      <h2 class="font-medium text-[28px] leading-[36px]">
        Upcoming Competition
      </h2>
      <p class="font-normal text-[16px] leading-[24px]">
        Temukan event menarik dan asah skill mu!
      </p>
    </div>
    <form class="max-w-md mx-auto">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-colorText sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-[#616161]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-3 pe-10 text-sm text-black border border-[#C2C2C2] rounded-lg bg-[#F5F5FF] placeholder-[#757575] focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          placeholder="Search Event"
          required
        />
      </div>
    </form>
    <div class="flex justify-center items-center gap-4 py-[54px]">
      <label class="text-[14px]">Filter: </label>
      <div
        v-for="(v, i) in filter"
        :key="i"
        class="py-[6px] px-[10px] shadow-md font-normal text-[12px] leading-[16px] cursor-pointer"
      >
        {{ v }}
      </div>
    </div>
    <div class="flex gap-6 justify-center">
      <EventCard
        v-for="(v, i) in contests"
        :key="i"
        :slug="v.slug"
        :image="v.image"
        :title="v.title"
        :description="v.description"
        :discount="v.discount"
      />
    </div>
  </div>
  <div id="locate" class="py-[54px] text-center">
    <h2 class="font-medium text-[28px] leading-[38px] mb-[24px]">
      Competition Locate
    </h2>
    <div class="flex justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.201018565748!2d107.59162083730583!3d-6.866498637864936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6be3e8a0c49%3A0x730028bf4627def4!2sUniversitas%20Pasundan!5e0!3m2!1sen!2sid!4v1717856647607!5m2!1sen!2sid"
        class="w-[90%]"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
import HeaderView from "@/components/header/HeaderView.vue";
import StepTwo from "@/components/register/StepTwo.vue";
import StepThree from "@/components/register/StepThree.vue";
import EventCard from "@/components/card/EventCard.vue";
import { GET_CONTESTS } from "@/store/contest.module";
import { useMeta } from "vue-meta";
import Cookies from "js-cookie";

export default {
  components: {
    HeaderView,
    EventCard,
    StepTwo,
    StepThree,
  },
  setup() {
    useMeta({ title: "Home" });
  },
  data() {
    return {
      isLoading: true,
      filter: [
        "Title Content",
        "Title Content",
        "Title Content",
        "Title Content",
        "Title Content",
        "Title Content",
      ],
      data: {
        roleName: "umum",
      },
      isSkipped: false,
      step: 1,
    };
  },
  async mounted() {
    await this.getData();
  },
  computed: {
    contests() {
      return this.$store.getters.contests;
    },
    userDetail() {
      const userDetail = this.$store.getters.userDetail;
      return userDetail;
    },
    showFrom() {
      return (
        this.userDetail &&
        !this.isSkipped &&
        (!this.userDetail.biodate.address ||
          !this.userDetail.biodate.birthDate ||
          !this.userDetail.biodate.field ||
          !this.userDetail.biodate.firstName ||
          !this.userDetail.biodate.lastName ||
          !this.userDetail.biodate.gender ||
          !this.userDetail.biodate.instutionName ||
          !this.userDetail.biodate.phone ||
          !this.userDetail.biodate.proof ||
          !this.userDetail.biodate.province ||
          !this.userDetail.biodate.pupils ||
          !this.userDetail.biodate.regencies)
      );
    },
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch(GET_CONTESTS);
        this.isSkipped = Cookies.get("isSkipped");
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    stepTwoHandler(data) {
      this.data.roleName = data.roleName;
      if (this.data.roleName) {
        this.step = 2;
      }
    },
    skipHandler() {
      Cookies.set("isSkipped", true, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      this.isSkipped = true;
    },
  },
  watch: {
    async userDetail() {
      await this.getData();
    },
  },
};
</script>
