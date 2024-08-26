<template>
    <div
        class="fixed z-20 inset-0 overflow-y-auto flex items-center justify-center"
    >
        <div class="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div
            class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-3/12"
        >
            <div class="bg-white w-full px-5 py-5">                
                <form @submit.prevent="handleSubmit" class="space-y-4">                    
                    <div class="flex flex-col gap-2">
                        <label class="text-gray-700 text-sm" for="url"
                            >Link Gdrive</label
                        >
                        <input
                            type="text"
                            id="url"
                            v-model="data.url"
                            class="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black rounded-md"
                        />
                    </div>                        
                    <div class="flex justify-end mt-6 text-sm">
                        <button
                            type="button"
                            class="bg-gray-500 text-white px-3 py-2 rounded-md mr-2"
                            @click="$emit('closeModal')"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-customBlue text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="
                                !isFormValid
                            "
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {
                registrationId: '',
                url: ''
            }
        }
    },
    computed: {
        isFormValid() {
            return this.data.url
        },
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
        registration() {
            return this.$store.getters['user/registration'];
        },
        slug() {
            return this.$route.params.slug;
        },
        registerId() {
            const matchedRegistration = this.registration?.find(
                (registration) => registration.competitionId === this.slug,
            );
            const competitionId = matchedRegistration ? matchedRegistration.id : null;
            return competitionId        
        },
    },
    methods: {
        async handleSubmit() {
            this.data.registrationId = this.registerId
            await this.$store.dispatch('user/submission', this.data);                
        }
    }
}
</script>