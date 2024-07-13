<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <CardPerson
          v-for="(member, index) in teamMembers"
          :key="index"
          :image="member.image"
          :name="member.name"
          :status="member.status"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardPerson from "@/components/card/CardPerson.vue";

export default {
  components: {
    CardPerson,
  },
  data() {
    return {
      teamMembers: [
        { image: "kunci.png", name: "Kunci" },
        { image: "kunci.png", name: "Kunci" },
        { image: "kunci.png", name: "Kunci" },
      ],
    };
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
