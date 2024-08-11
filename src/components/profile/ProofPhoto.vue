<template>
    <div class="profile-photo relative" :class="classPhoto">
        <div class="w-40 h-32 overflow-hidden relative">
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
                <font-awesome-icon icon="edit" class="text-white text-2xl" />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

library.add(faEdit);

export default {
    components: {
        FontAwesomeIcon,
    },
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
