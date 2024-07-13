<template>
  <Loading :active="isLoading" />
  <div v-if="!isLoading">
    <img
      class="py-[12px]"
      :src="require('@/assets/images/header1.png')"
      alt=""
    />
    <div class="flex flex-col gap-2 py-[12px]">
      <h2 class="font-medium text-[28px] leanding-[36px]">
        {{ contestDetail.title }}
      </h2>
      <div class="flex gap-8">
        <div class="flex flex-col gap-2 w-full text-[14px]">
          <p class="py-[12px] text-justify">
            {{ contestDetail.description }} Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Eos provident animi dicta qui minus
            quidem maxime repudiandae deleniti obcaecati dignissimos, modi vero
            doloribus suscipit nemo soluta. Architecto at quos sint, placeat
            doloribus vel quia cumque animi enim hic nisi obcaecati? Debitis,
            doloremque. Maiores modi laborum facere, earum fuga minima delectus?
          </p>
          <div class="flex border-t border-t-[#C2C2C2] py-[12px] w-full">
            <div class="w-1/2">
              <div class="flex flex-col gap-2 py-[12px]">
                <h3 class="font-medium text-[14px] uppercase">SCHEDULE DATE</h3>
                <div class="flex items-center gap-2">
                  <img
                    :src="require('@/assets/icons/icon-date.svg')"
                    alt=""
                    class="w-contain"
                  />
                  Date
                </div>
                <div class="flex items-center gap-2">
                  <img
                    :src="require('@/assets/icons/icon-time.svg')"
                    alt=""
                    class="w-contain"
                  />
                  Time
                </div>
                <div class="flex items-center gap-2">
                  <img
                    :src="require('@/assets/icons/icon-locate.svg')"
                    alt=""
                    class="w-contain"
                  />
                  Locate
                </div>
                <div class="flex items-center gap-2">
                  <img
                    :src="require('@/assets/icons/icon-platform.svg')"
                    alt=""
                    class="w-contain"
                  />
                  Platform
                </div>
              </div>
              <div class="flex flex-col gap-2 py-[12px]">
                <h3 class="font-semibold text-[14px uppercase">SPEAKERS</h3>
                <div
                  v-for="(v, i) in contestDetail.speakers"
                  :key="i"
                  class="flex items-center gap-2"
                >
                  <img
                    :src="require('@/assets/icons/icon-person.svg')"
                    alt=""
                    class="w-contain"
                  />
                  {{ v }}
                </div>
              </div>
            </div>
            <div class="w-1/2">
              <div class="flex flex-col gap-2 py-[12px] w-1/2">
                <h3 class="font-semibold text-[14px] uppercase">BENEFITS</h3>
                <div
                  v-for="(v, i) in contestDetail.benefits"
                  :key="i"
                  class="flex items-center gap-2"
                >
                  <img
                    :src="require('@/assets/icons/icon-gift.svg')"
                    alt=""
                    class="w-contain"
                  />
                  {{ v }}
                </div>
              </div>
              <div class="flex flex-col gap-2 py-[12px]">
                <h3 class="font-semibold text-[14px uppercase">ORGANIZE</h3>
                <div
                  v-for="(v, i) in contestDetail.organize"
                  :key="i"
                  class="flex items-center gap-2"
                >
                  <img
                    :src="require('@/assets/icons/icon-peoples.svg')"
                    alt=""
                    class="w-contain"
                  />
                  {{ v }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4 w-1/3">
          <h3 class="font-semibold text-[14px]">Syarat dan ketentuan</h3>
          <div class="px-[20px]">
            <ul>
              <li
                v-for="(v, i) in splitString(contestDetail.rule)"
                :key="i"
                class="list-disc text-justify text-[14px]"
              >
                {{ v }}
              </li>
            </ul>
          </div>
          <div
            class="flex flex-col gap-2 shadow-lg py-[7px] px-[18px] rounded-[8px]"
          >
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2 w-full">
                <img
                  :src="require('@/assets/icons/icon-date.svg')"
                  alt=""
                  class="w-contain"
                />
                {{ formatDate(contestDetail.startDate) }} -
                {{ formatDate(contestDetail.endDate) }}
              </div>
              <div class="flex items-center gap-2">
                <img
                  :src="require('@/assets/icons/icon-time.svg')"
                  alt=""
                  class="w-contain"
                />
                {{ extractTime(contestDetail.startDate) }} -
                {{ extractTime(contestDetail.endDate) }}
              </div>
              <div class="flex items-center gap-2">
                <img
                  :src="require('@/assets/icons/icon-peoples.svg')"
                  alt=""
                  class="w-contain"
                />
                {{ contestDetail.registers?.length || 0 }} Orang terdaftar
              </div>
            </div>
            <div class="border-b border-b-[#C2C2C2] w-full my-[6px]"></div>
            <div class="flex flex-col gap-2">
              <p class="text-[16px] font-semibold">Rp.000.000</p>
              <button
                class="bg-colorPurple text-white w-full py-[6px] rounded-[6px] hover:opacity-[0.8]"
              >
                Register
              </button>
              <button
                class="bg-[#EDEDED] text-[#9E9E9E] w-full py-[6px] rounded-[6px] hover:opacity-[0.8]"
              >
                Unggah Berkas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from "@/components/header/HeaderView.vue";
import Loading from "vue3-loading-overlay";
import { GET_CONTESTS, GET_CONTEST_DETAIL } from "@/store/contest.module";

export default {
  components: {
    HeaderView,
    Loading,
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
    };
  },
  async mounted() {
    await this.getData();
  },
  computed: {
    contestDetail() {
      return this.$store.getters.contestDetail;
    },
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch(GET_CONTESTS);
        await this.$store.dispatch(GET_CONTEST_DETAIL, this.$route.params.slug);
        this.isLoading = false;
      } catch (err) {
        console.log(err);
      }
    },
    splitString(v) {
      // Mengganti karakter pemisah khusus (\m) dengan newline (\n)
      const normalizedString = v.replace(/\\m/g, "\n");

      // Memisahkan string berdasarkan newline (\n)
      const resultArray = normalizedString.split("\n");

      // Mengembalikan array yang dihasilkan
      return resultArray;
    },
    formatDate(v) {
      // Membuat objek Date dari string input
      const date = new Date(v);

      // Mendefinisikan nama bulan dalam bahasa Indonesia
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      // Mengambil tanggal dan nama bulan
      const day = date.getDate();
      const month = months[date.getMonth()];

      // Mengembalikan string dalam format "10 Juni"
      return `${day} ${month}`;
    },
    extractTime(v) {
      // Membuat objek Date dari string input
      const date = new Date(v);

      // Mengambil jam dan menit
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      // Mengembalikan waktu dalam format "HH:MM"
      return `${hours}:${minutes}`;
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
