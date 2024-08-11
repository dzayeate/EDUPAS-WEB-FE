<template>
        <div
          pt="5px"
          pb="5px"
          maxW="1080px"
          mx="auto"
          :px="['0.7em', '1em', '1em', 'auto']"
        >
          <router-view />
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
    },
    async created() {
        const userId = localStorage.getItem("userId") || "";
        if (userId) {
            const params = { search: userId };
            await this.$store.dispatch('user/getUserDetail', params);
        }
    },
  };
  </script>
  