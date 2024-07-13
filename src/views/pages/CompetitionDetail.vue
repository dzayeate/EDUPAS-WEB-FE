<template>
  <div id="competition" class="px-[16px] md:px-[42px] py-[24px]">
    <div class="flex justify-between items-center">
      <div class="flex gap-6">
        <a
          @click.prevent="navigateToCompetition('about')"
          :class="`${
            !$route.query.type || $route.query.type === 'about'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          About Competition
        </a>
        <a
          @click.prevent="navigateToCompetition('registration')"
          :class="`${
            $route.query.type === 'registration'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          Registration
        </a>
        <a
          @click.prevent="navigateToCompetition('schedule')"
          :class="`${
            $route.query.type === 'schedule'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          Schedule
        </a>
        <a
          @click.prevent="navigateToCompetition('contributors')"
          :class="`${
            $route.query.type === 'contributors'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          Competition Contributors
        </a>
        <a
          @click.prevent="navigateToCompetition('organizers')"
          :class="`${
            $route.query.type === 'organizers'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          Organizers
        </a>
      </div>
    </div>
    <div class="flex items-center gap-4 py-[24px]">
      <div class="flex gap-6">
        <AboutView v-if="!$route.query.type || $route.query.type === 'about'" />
        <RegisterView v-if="$route.query.type === 'registration'" />
        <ScheduleView v-if="$route.query.type === 'schedule'" />
        <OrganizerView v-if="$route.query.type === 'organizers'" />
        <ContributorView v-if="$route.query.type === 'contributors'" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from "@/components/header/HeaderView.vue";
import AboutView from "@/components/competition/AboutView.vue";
import RegisterView from "@/components/competition/RegisterView.vue";
import ScheduleView from "@/components/competition/ScheduleView.vue";
import OrganizerView from "@/components/competition/OrganizerView.vue";
import ContributorView from "@/components/competition/ContributorView.vue";

export default {
  components: {
    HeaderView,
    AboutView,
    RegisterView,
    ScheduleView,
    OrganizerView,
    ContributorView,
  },
  data() {
    return {
      filter: [
        "Title Content",
        "Title Content",
        "Title Content",
        "Title Content",
        "Title Content",
        "Title Content",
      ],
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
        name: "Competition Detail",
        query: { type: value },
      });
    },
  },
};
</script>
