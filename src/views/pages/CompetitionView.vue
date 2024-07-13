<template>
  <div id="competition" class="px-[16px] md:px-[42px] py-[24px]">
    <div class="flex justify-between items-center">
      <h2 class="font-medium text-[28px] leading-[36px]">Competition</h2>
      <div class="flex gap-6">
        <a
          @click.prevent="navigateToCompetition('list')"
          :class="`${
            $route.query.type !== 'calendar'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          Competition List
        </a>
        <a
          @click.prevent="navigateToCompetition('calendar')"
          :class="`${
            $route.query.type === 'calendar'
              ? 'text-customBlue border-b-[1px] border-customBlue'
              : 'text-black'
          } cursor-pointer`"
        >
          Calendar
        </a>
      </div>
    </div>
    <div class="flex items-center gap-4 py-[24px]">
      <div class="relative w-1/4">
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
          class="block w-full p-2 pe-10 text-sm text-black border border-[#C2C2C2] rounded-lg bg-[#FFFF] placeholder-[#757575] focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          placeholder="Search"
          required
        />
      </div>

      <select
        id="competition-type"
        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 focus:outline-none"
      >
        <option selected>Competition Type</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
      <select
        id="competition-topics"
        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 focus:outline-none"
      >
        <option selected>Competition Topics</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
      <select
        id="competition-location"
        class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 focus:outline-none"
      >
        <option selected>Locate</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
    <div>
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
  </div>
</template>

<script>
import HeaderView from "@/components/header/HeaderView.vue";
import EventCard from "@/components/card/EventCard.vue";
import { GET_CONTESTS } from "@/store/contest.module";

export default {
  components: {
    HeaderView,
    EventCard,
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
  computed: {
    contests() {
      return this.$store.getters.contests;
    },
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch(GET_CONTESTS);
      } catch (err) {
        console.log(err);
      }
    },
    navigateToCompetition(value) {
      this.$router.push({
        name: "CompetitionView",
        query: { type: value },
      });
    },
  },
};
</script>
