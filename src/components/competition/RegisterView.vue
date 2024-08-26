<template>
    <!-- <Loading :active="isLoading" /> -->
    <div v-if="isRegister">
        <div class="flex flex-col py-[12px]">
            <h2 class="font-medium text-[28px] leanding-[36px]">
                {{ contestDetail?.name }}
            </h2>
            <div class="flex gap-8">
                <div class="flex flex-col gap-2 w-full text-[14px]">
                    <p class="py-[12px] text-justify">
                        {{ contestDetail?.description }}
                    </p>
                    <div
                        class="flex border-t border-t-[#C2C2C2] py-[12px] w-full"
                    >
                        <div class="w-full">
                            <div class="w-full mb-[8px]">
                                <h2
                                    class="font-medium text-customBlue text-[28px] leanding-[36px]"
                                >
                                    Register your team
                                </h2>
                                <span
                                    class="font-normal text-[14px] leanding-[20px] text-[#616161]"
                                    >Complete the registration form below</span
                                >
                            </div>
                            <div class="flex w-full gap-6">
                                <div
                                    class="w-1/2 flex flex-col gap-2 py-[12px]"
                                >
                                    <div class="flex flex-col gap-2 mb-[8px]">
                                        <label for="teamLeader"
                                            >Ketua Tim</label
                                        >
                                        <input
                                            id="teamLeader"
                                            type="text"
                                            placeholder="Nama Ketua Tim"
                                            disabled
                                            :class="`border-[#C2C2C2] disabled:cursor-not-allowed disabled:text-gray-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                                            v-model="name"
                                        />
                                    </div>
                                    <div class="flex flex-col gap-2 mb-[8px]">
                                        <label for="domisili">Institusi</label>
                                        <input
                                            id="domisili"
                                            type="text"
                                            placeholder="Masukan Institusi"
                                            disabled
                                            :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500`"
                                            v-model="institusi"
                                        />
                                    </div>
                                    <div class="flex flex-col gap-2 mb-[8px]">
                                        <label for="phoneNumber"
                                            >No. Telp</label
                                        >
                                        <input
                                            id="phoneNumber"
                                            type="text"
                                            placeholder="Nomer telephone"
                                            disabled
                                            :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500`"
                                            v-model="data.phoneNumber"
                                        />
                                    </div>
                                    <div class="flex mb-[8px]">
                                        <input
                                            id="link-checkbox"
                                            type="checkbox"
                                            v-model="isAgree1"
                                            class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-[6px] focus:ring-blue-500 focus:ring-2 cursor-pointer"
                                        />
                                        <label
                                            for="link-checkbox"
                                            class="ms-2 text-[14px] font-normal text-[#404040] cursor-pointer"
                                            >Saya menyatakan bahwa informasi
                                            yang saya berikan adalah benar dan
                                            dapat dipertanggung jawabkan</label
                                        >
                                    </div>
                                    <div class="flex mb-[8px]">
                                        <input
                                            id="link-checkbox"
                                            type="checkbox"
                                            v-model="isAgree2"
                                            class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-[6px] focus:ring-blue-500 focus:ring-2 cursor-pointer"
                                        />
                                        <label
                                            for="link-checkbox"
                                            class="ms-2 text-[14px] font-normal text-[#404040] cursor-pointer"
                                            >Saya setuju untuk mematuhi semua
                                            aturan dan regulasi yang ditetapkan
                                            oleh penyelenggara kompetisi</label
                                        >
                                    </div>
                                </div>
                                <div
                                    class="w-1/2 flex flex-col gap-2 py-[12px]"
                                >
                                    <div
                                        class="flex flex-col gap-2"
                                        v-if="contestDetail?.isTeam == 1"
                                    >
                                        <div
                                            class="flex flex-col gap-2 mb-[8px]"
                                        >
                                            <label for="teamLeader"
                                                >Nama Tim</label
                                            >
                                            <input
                                                id="teamLeader"
                                                type="text"
                                                placeholder="Nama Tim"
                                                :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                                                v-model="data.nameTeam"
                                            />
                                        </div>
                                        <div
                                            class="flex flex-col gap-2 mb-[8px]"
                                        >
                                            <label for="teamLeader"
                                                >Jumlah Anggota</label
                                            >
                                            <input
                                                id="teamLeader"
                                                type="text"
                                                placeholder="Jumlah Anggota"
                                                :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                                                v-model="data.teamSize"
                                            />
                                        </div>
                                        <div
                                            v-for="(
                                                member, index
                                            ) in data.teamMembers"
                                            :key="index"
                                            :class="`${
                                                index !== 4 ?? 'mb-2'
                                            } flex flex-col gap-2`"
                                        >
                                            <div
                                                class="flex items-center gap-4"
                                            >
                                                <label :for="'member' + index"
                                                    >Nama Anggota Tim -
                                                    {{ index + 1 }}</label
                                                >
                                                <button
                                                    v-if="
                                                        data.teamMembers
                                                            .length > 1
                                                    "
                                                    type="button"
                                                    @click="
                                                        removeMemberHandler(
                                                            index,
                                                        )
                                                    "
                                                    class="text-red-600 hover:opacity-[0.8] text-[12px]"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                            <input
                                                :id="'member' + index"
                                                type="text"
                                                placeholder="Nama Anggota Tim"
                                                :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                                                v-model="data.teamMembers[index]"
                                            />
                                        </div>
                                        <div class="mb-2">
                                            <button
                                                v-if="data.teamMembers.length < Math.min(data.teamSize, 4)"
                                                type="button"
                                                @click="addMemberHandler"
                                                class="w-fit flex gap-2 text-[14px] items-center border border-1 rounded-[6px] py-[6px] px-[12px] hover:opacity-[0.8]"
                                            >
                                                Tambah Anggota
                                                <img
                                                    class="w-[20px] h-[20px]"
                                                    :src="
                                                        require('@/assets/icons/icon-plus-circle.svg')
                                                    "
                                                />
                                            </button>
                                            <span
                                                class="font-normal text-[12px] text-[#616161]"
                                                >Max 4 anggota*
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="firstName"
                                            >Upload Dokumen Pendukung</label
                                        >
                                        <div>
                                            <div
                                                v-if="!files.length"
                                                class="flex flex-col"
                                            >
                                                <div class="w-full">
                                                    <label
                                                        for="fileInput"
                                                        @dragover="dragover"
                                                        @dragleave="dragleave"
                                                        @drop="drop"
                                                        :class="`cursor-pointer relative w-full p-0 ${
                                                            isDragging
                                                                ? 'opacity-[0.8]'
                                                                : ''
                                                        }`"
                                                    >
                                                        <input
                                                            type="file"
                                                            multiple
                                                            name="file"
                                                            id="fileInput"
                                                            class="hidden"
                                                            @change="onChange"
                                                            ref="file"
                                                            accept=".pdf"
                                                        />
                                                        <div
                                                            :class="`${
                                                                isDragging
                                                                    ? 'border-green-400'
                                                                    : 'border-gray-400'
                                                            } flex justify-center items-center border border-dashed w-full h-24 rounded`"
                                                        >
                                                            <img
                                                                :src="
                                                                    require('@/assets/icons/icon-empty-file.svg')
                                                                "
                                                                class="inline-block mr-2.5"
                                                                alt="Icon"
                                                            />
                                                            <span
                                                                class="text-gray-400 inline-block text-xs"
                                                                >Drag and drop
                                                                files or click
                                                                to upload</span
                                                            >
                                                        </div>
                                                    </label>
                                                    <p
                                                        class="text-xs text-gray-400 mt-1"
                                                    >
                                                        Maximum file size: 5Mb
                                                        and Format file .pdf
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Note: Only add the code block below -->
                                        <div
                                            class="preview-container"
                                            v-if="files.length"
                                        >
                                            <div
                                                v-for="file in files"
                                                :key="file.name"
                                                class="preview-card"
                                            >
                                                <div>
                                                    <img
                                                        class="preview-img"
                                                        :src="
                                                            generateURL(file) ||
                                                            require('@/assets/icons/icon-empty-file.svg')
                                                        "
                                                    />
                                                    <p>
                                                        {{
                                                            truncateName(
                                                                file.name,
                                                            )
                                                        }}
                                                        -
                                                        {{
                                                            Math.round(
                                                                file.size /
                                                                    1000,
                                                            ) + 'kb'
                                                        }}
                                                    </p>
                                                </div>
                                                <div>
                                                    <button
                                                        class="ml-2"
                                                        type="button"
                                                        @click="
                                                            remove(
                                                                files.indexOf(
                                                                    file,
                                                                ),
                                                            )
                                                        "
                                                        title="Remove file"
                                                    >
                                                        <b>×</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end">
                                <button
                                    :class="`${
                                        !isFormValid
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:opacity-[0.8]'
                                    } bg-blue-600 text-white px-4 py-2 rounded-md w-fit`"
                                    @click="handleSubmit"
                                    :disabled="!isFormValid"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderView from '@/components/header/HeaderView.vue';
import Loading from 'vue3-loading-overlay';
import Swal from 'sweetalert2';

export default {
    components: {
        HeaderView,
        Loading,
    },
    data() {
        return {
            isLoading: true,
            isDragging: false,
            files: [],
            file: '',
            name: '',
            institusi: '',
            isAgree1: false,
            isAgree2: false,
            userId: '',
            data: {
                competitionId: '',
                domicile: '',
                phoneNumber: '',
                nameTeam: '',
                isTeam: false,
                teamSize: '',
                teamMembers: [],
            },
        };
    },
    created() {
        // Inisialisasi data jika userDetail sudah ada saat created
        this.initializeUserData();

        // Periksa juga contestDetail untuk set isTeam
        if (this.contestDetail?.isTeam == 1) {
            this.data.isTeam = true;
        }        
    },
    watch: {
        userDetail: {
            handler: 'initializeUserData',
            immediate: true,
        },
        'data.teamSize'(newSize) {
            this.adjustTeamMembers(newSize);
        },
    },
    computed: {
        contestDetail() {
            return this.$store.getters['contest/contestDetail'];
        },
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        isFormValid() {
            const activities = this.userDetail?.activities?.map(
                (activity) => activity.competitionId,
            );
            const competitionId = this.$route.params.slug;

            if (!this.contestDetail?.isTeam == 1) {
                return (
                    this.name &&
                    this.institusi &&
                    this.data.phoneNumber &&
                    this.files.length &&
                    this.isAgree1 == true &&
                    this.isAgree2 == true &&
                    !activities?.includes(competitionId)
                );
            } else {
                return (
                    this.name &&
                    this.institusi &&
                    this.data.phoneNumber &&
                    this.files.length &&                    
                    this.data.teamMembers &&
                    this.isAgree1 == true &&
                    this.isAgree2 == true &&
                    !activities?.includes(competitionId)
                );
            }
        },
        isRegister() {
            const activities = this.userDetail?.activities?.map(activity => activity.competitionId);
            const competitionId = this.$route.params.slug;
            
            return !activities?.includes(competitionId)
        }
    },    
    methods: {        
        initializeUserData() {
            if (this.userDetail) {
                this.name =
                    this.userDetail?.biodate.firstName +
                        ' ' +
                        this.userDetail?.biodate.lastName || '';
                this.nameTeam =
                    this.userDetail?.biodate.firstName +
                        ' ' +
                        this.userDetail?.biodate.lastName || '';
                this.data.phoneNumber = this.userDetail?.biodate.phone || '';
                this.institusi = this.userDetail?.biodate.institutionName || '';
                this.data.domicile =
                    this.userDetail?.biodate.institutionName || '';
                this.imagePreview =
                    this.userDetail?.biodate.image?.previewUrl || '';
            }
        },
        async handleSubmit() {
            this.userId = localStorage.getItem('userId');
            this.data.competitionId = this.contestDetail.id;

            try {
                if (this.isFormValid) {
                    const formData = new FormData();

                    this.files.forEach((file) => {
                        formData.append('supportingDocuments', file);
                    });

                    for (const key in this.data) {
                        formData.append(key, this.data[key]);
                    }

                    await this.$store.dispatch(
                        'user/registerCompetition',
                        formData,
                    );
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text:
                        err?.response?.data?.message || 'Something went wrong.',
                    icon: 'error',
                });
            }
        },
        handleUploaded(data) {
            const base64str = data.url.substring(data.url.indexOf(',') + 1);
            const decoded = atob(base64str);
            const decodedmaxFileSize = decoded.length / 1024 ** 2;

            if (decodedmaxFileSize > this.maxFileSize) {
                this.message = 'File size too large.';
                setTimeout(() => {
                    this.message = '';
                }, 3000);
            } else {
                this.imagePreview = data
                    .getCroppedCanvas()
                    .toDataURL('image/png');
                // Handle uploaded event from AvatarCropper
                const croppedCanvas = data.getCroppedCanvas();
                croppedCanvas.toBlob((blob) => {
                    this.croppedImageBlob = blob; // Store the cropped image blob
                }, 'image/png');
            }
            this.isUploading = false;
        },
        onChange() {
            const self = this;
            let incomingFiles = Array.from(this.$refs.file.files);
            const fileExist = self.files.some((r) =>
                incomingFiles.some(
                    (file) => file.name === r.name && file.size === r.size,
                ),
            );
            const fileRequired = incomingFiles.some((file) =>
                [
                    'image/jpg',
                    'image/jpeg',
                    'image/png',
                    'application/pdf',
                ].includes(file.type),
            );

            if (!fileRequired) {
                Swal.fire({
                    title: 'Upload File',
                    text: 'Format file must .pdf, .jpg, .jpeg, or .png.',
                    icon: 'warning',
                });
                return;
            }

            if (incomingFiles.length > 1 || self.files.length == 1) {
                Swal.fire({
                    title: 'Upload File',
                    text: 'Upload file must be 1 items.',
                    icon: 'warning',
                });
                return;
            }

            if (fileExist) {
                self.showMessage = true;
                Swal.fire({
                    title: 'Upload File',
                    text: 'New upload contains files that already exist.',
                    icon: 'warning',
                });
                return;
            }

            self.files.push(...incomingFiles);
        },
        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.onChange();
            this.isDragging = false;
        },
        remove(i) {
            this.files.splice(i, 1);
        },
        handleError(message) {
            setTimeout(() => {
                this.message = '';
            }, 3000);
            this.isUploading = false;
        },
        generateURL(file) {
            let fileSrc = URL.createObjectURL(file);
            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);
            return ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)
                ? fileSrc
                : require('@/assets/icons/icon-empty-file.svg');
        },
        truncateName(fileName) {
            const extension = fileName.substring(fileName.lastIndexOf('.'));
            const name = fileName.substring(0, fileName.lastIndexOf('.'));
            if (name.length <= 4) return fileName;

            const truncated = `${name.substring(0, 2)}..${name.substring(
                name.length - 2,
            )}${extension}`;
            return truncated;
        },
        adjustTeamMembers(newSize) {
            const maxSize = 4;
            const size = Math.min(Number(newSize), maxSize);

            if (size > this.data.teamMembers.length) {
                // Menambahkan anggota hingga sesuai dengan teamSize
                while (this.data.teamMembers.length < size) {
                    this.data.teamMembers.push('');
                }
            } else if (size < this.data.teamMembers.length) {
                // Mengurangi anggota hingga sesuai dengan teamSize
                this.data.teamMembers.splice(size);
            }
        },
        addMemberHandler() {
            const maxSize = 4;
            if (this.data.teamMembers.length < maxSize) {
                this.data.teamMembers.push('');
                this.data.teamSize = this.data.teamMembers.length; // Update teamSize untuk mencerminkan perubahan
            } else {
                alert('You can only add up to 4 members.');
            }
        },
        removeMemberHandler(index) {
            if (this.data.teamMembers.length > 1) {
                this.data.teamMembers.splice(index, 1);
                this.data.teamSize = this.data.teamMembers.length; // Update teamSize untuk mencerminkan perubahan
            } else {
                alert('You must have at least one member.');
            }
        },
    },
};
</script>

<style scoped>
.main {
    display: flex;
    flex-grow: 1;
    align-items: center;
    height: 100vh;
    justify-content: center;
    text-align: center;
}

.dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
}

.preview-container {
    display: flex;
}

.preview-card {
    display: flex;
    border: 1px solid #a2a2a2;
    padding: 5px;
    margin-left: 5px;
}

.preview-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #a2a2a2;
    background-color: #a2a2a2;
}
</style>
