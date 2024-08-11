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
                <v-icon name="fa-edit" class="text-white" scale="1.5" />
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
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaEdit } from "oh-vue-icons/icons";
import Swal from 'sweetalert2';

addIcons(FaEdit);

export default {
    components: {
        VIcon: OhVueIcon,
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
