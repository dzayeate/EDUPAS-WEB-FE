<template>
  <div class="flex flex-col min-h-screen">
    <NavbarView />
    <div class="flex-grow">
      <router-view />
    </div>
    <FooterView />
  </div>
</template>

<script>
import NavbarView from "@/components/navbar/NavbarView.vue";
import FooterView from "@/components/footer/FooterView.vue";

export default {
  components: {
    NavbarView,
    FooterView
  },
  computed: {

  },
  async beforeMount() {
    await this.getData();
    // this.$store.dispatch(GET_USER)
  },  
  methods: {
    async getData() {      

    },
  },
};
</script>
