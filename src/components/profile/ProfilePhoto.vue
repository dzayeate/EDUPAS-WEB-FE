<template>
    <div class="profile-photo relative" :class="classPhoto">
        <div class="w-32 h-32 rounded-full overflow-hidden relative">
            <img
                :src="photoUrl"
                alt="Profile Photo"
                @click="triggerFileUpload"
                class="object-cover w-full h-full cursor-pointer"                
            />
            <div
                class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                @click="triggerFileUpload"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </div>
        </div>
        <input
            type="file"
            ref="fileInput"
            accept="image/jpeg, image/jpg, image/png"
            @change="handleFileChange"
            class="hidden"
        />
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {   
    data() {
        return {
            photoUrl: '',
        };
    },
    computed: {
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        classPhoto() {
            if (this.photoUrl === '') {
                return 'hidden'
            }
        }
    },
    watch: {
        userDetail: {
            immediate: true,
            handler(newVal) {
                const url = newVal?.biodate?.image?.previewUrl;
                if (url) {
                    this.photoUrl = url;
                } else {
                    this.photoUrl = 'https://via.placeholder.com/150';
                }
            },
        },
    },
    // created() {        
    //     const url = this.userDetail?.biodate?.image?.previewUrl;
    //     if (url) {
    //         this.photoUrl = url;
    //     } else {
    //         this.photoUrl = 'https://via.placeholder.com/150';
    //     }
    // },
    methods: {
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        async handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
                if (file.size > maxSizeInBytes) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Ukuran file terlalu besar max 2MB',
                        icon: 'error',
                    });
                    // alert('Please upload an image smaller than 2MB.');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.photoUrl = e.target.result;
                };
                reader.readAsDataURL(file);

                const formData = new FormData();
                formData.append('image', file);

                const idBiodate = this.userDetail?.biodate.id;                    
                
                const editData = {
                    id: idBiodate,
                    data: formData
                }
                await this.$store.dispatch('user/updateBiodate', editData);
            }
        },
    },
};
</script>

<style scoped></style>
