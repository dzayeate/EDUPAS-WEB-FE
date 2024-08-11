<template>
    <form
        @submit.prevent="handleSubmit"
        class="bg-white w-full flex justify-center overflow-y-auto py-8 px-8"
    >
        <div class="flex flex-col gap-2 w-full">
            <!-- Adjusted px value for padding -->
            <div>
                <h2 class="font-medium text-2xl leading-5 text-blue-600">
                    Get Started
                </h2>
                <!-- Adjusted text size and color -->
                <p class="font-normal text-base leading-9 text-blue-600">
                    Please enter your biodata
                </p>
            </div>
            <div class="flex items-center gap-4">
                <div class="border border-blue-600 flex-1"></div>
                <!-- Adjusted border color -->
                <div class="text-blue-600">or</div>
                <div class="border border-blue-600 flex-1"></div>
                <!-- Adjusted border color -->
            </div>

            <!-- Biodata -->
            <h2 class="text-[20px] font-semibold">Biodata</h2>
            <div class="flex w-full gap-8 text-sm">
                <div class="flex flex-col gap-4 w-1/2">
                    <div class="flex flex-col gap-2">
                        <label for="firstName">Nama Depan*</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Nama Depan"
                            :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.firstName"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="lastName">Nama Belakang*</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Nama Belakang"
                            :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.lastName"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="noTelp">No. Telepon*</label>
                        <input
                            id="noTelp"
                            type="text"
                            placeholder="Nomor Telepon"
                            @input="validatePhone"
                            class="border-[#C2C2C2] block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                            :class="
                                phoneIsValid
                                    ? 'focus:ring-blue-500 focus:border-blue-500'
                                    : 'focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500'
                            "
                            v-model="data.phone"
                        />
                    </div>
                    <div class="flex flex-col gap-2 w-fit">
                        <label class="block">Profile</label>
                        <avatar-cropper
                            :cropper-options="{
                                aspectRatio: 1,
                                autoCropArea: 1,
                                viewMode: 1,
                                movable: true,
                                zoomable: true,
                            }"
                            :mimes="'image/png, image/jpg, image/jpeg'"
                            :upload-handler="handleUploaded"
                            @uploaded="handleUploaded"
                            @error="handleError"
                            v-model="showCropper"
                        />
                        <div class="flex items-center">
                            <div class="flex flex-col">
                                <label
                                    :class="`cursor-pointer relative block hover:opacity-80`"
                                    @click="showCropper = true"
                                >
                                    <img
                                        :src="
                                            croppedImageBlob || userDetail
                                                ? imagePreview
                                                : require('@/assets/images/empty-file-image.svg')
                                        "
                                        class="w-40 h-40 rounded-md"
                                    />
                                    <img
                                        src="@/assets/icons/icon-plus.svg"
                                        class="absolute right-[-6px] bottom-[-6px] w-5 h-5 rounded-full bg-blue-500 text-white"
                                    />
                                </label>
                                <p class="text-center text-xs mt-1">
                                    (300 x 300)
                                </p>
                                <!-- Adjusted text size -->
                                <p class="text-center text-xs">
                                    Maximum file size: 2Mb
                                </p>
                                <!-- Adjusted text size -->
                            </div>
                            <p
                                v-if="message"
                                class="text-red-500 text-sm ml-2 my-auto"
                            >
                                {{ message }}
                            </p>
                            <p
                                v-if="croppedImageBlob"
                                @click.native="
                                    croppedImageBlob = '';
                                    imagePreview = '';
                                "
                                class="text-red-500 text-sm ml-2 my-auto cursor-pointer hover:opacity-[0.8]"
                            >
                                Clear
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 w-1/2">
                    <div class="flex flex-col gap-2">
                        <label for="birthDate">Tanggal Lahir*</label>
                        <div class="relative max-w-full">
                            <div
                                class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
                            >
                                <svg
                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="date"
                                id="birthDate"
                                class="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 focus:outline-none"
                                placeholder="Select date"
                                v-model="data.birthDate"
                                @input="validateDate"
                                :class="
                                    dateIsValid
                                        ? 'focus:ring-blue-500 focus:border-blue-500'
                                        : 'focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500'
                                "
                            />
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="institutionLevel">Jenis Kelamin*</label>
                        <multiselect
                            v-model="data.gender"
                            :options="optionsGender"
                            placeholder="Select"
                            :loading="isLoading"
                            :selectLabel="''"
                            :deselectLabel="''"
                            :selectedLabel="''"
                            :max-height="200"
                            class="multiselect-custom"
                        ></multiselect>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="province">Provinsi*</label>
                        <multiselect
                            v-model="data.province"
                            :options="optionsProvincies"
                            :searchable="true"
                            :placeholder="
                                userDetail
                                    ? userDetail?.biodate.province
                                    : 'Select'
                            "
                            label="name"
                            :loading="isLoading"
                            :selectLabel="''"
                            :deselectLabel="''"
                            :selectedLabel="''"
                            :max-height="200"
                            @select="onProvinceChange"
                            class="multiselect-custom"
                        ></multiselect>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="regencies">Kabupaten / Kota*</label>
                        <multiselect
                            v-model="data.regencies"
                            :options="optionsRegencies"
                            :searchable="true"
                            placeholder="Select"
                            :loading="isLoading"
                            :selectLabel="''"
                            :deselectLabel="''"
                            :selectedLabel="''"
                            :max-height="200"
                            :disabled="!data.province"
                            class="multiselect-custom"
                        ></multiselect>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="address">Alamat*</label>
                        <textarea
                            id="address"
                            rows="4"
                            v-model="data.address"
                            class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            placeholder="Alamat Lengkap"
                        ></textarea>
                    </div>
                </div>
            </div>

            <!-- Pendidikan -->
            <h2
                v-if="!['Umum'].includes(form.roleName)"
                class="text-[20px] font-semibold mt-5"
            >
                {{
                    ['Siswa', 'Mahasiswa'].includes(form.roleName)
                        ? 'Pendidikan'
                        : ['eo', 'sponsor', 'perusahaan'].includes(
                              form.roleName,
                          ) ?? 'Perusahaan'
                }}
            </h2>
            <div
                v-if="!['Umum'].includes(form.roleName)"
                class="flex w-full gap-8"
            >
                <div class="flex flex-col gap-4 w-1/2">
                    <div class="flex flex-col gap-2">
                        <label for="institutionName">Nama Instansi*</label>
                        <input
                            id="institutionName"
                            type="text"
                            placeholder="Nama Instansi"
                            :class="`${
                                !emailCorrected
                                    ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                                    : emailCorrected === 'Weak'
                                    ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                                    : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
                            } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.institutionName"
                        />
                    </div>
                    <div
                        v-if="['Siswa'].includes(form.roleName)"
                        class="flex flex-col gap-2"
                    >
                        <label for="pupils">NISN*</label>
                        <input
                            id="pupils"
                            type="text"
                            placeholder="NISN"
                            :class="`${
                                !emailCorrected
                                    ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                                    : emailCorrected === 'Weak'
                                    ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                                    : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
                            } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.pupils"
                        />
                    </div>
                    <div
                        v-else-if="['Mahasiswa'].includes(form.roleName)"
                        class="flex flex-col gap-2"
                    >
                        <label for="pupils">NIM*</label>
                        <input
                            id="pupils"
                            type="text"
                            placeholder="NIM"
                            :class="`${
                                !emailCorrected
                                    ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                                    : emailCorrected === 'Weak'
                                    ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                                    : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
                            } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.pupils"
                        />
                    </div>
                    <div
                        v-else-if="
                            ['Eo', 'Sponsor', 'Perusahaan'].includes(
                                form.roleName,
                            )
                        "
                        class="flex flex-col gap-2"
                    >
                        <label for="field">Bidang Perusahaan*</label>
                        <input
                            id="field"
                            type="text"
                            placeholder="Bidang Perusahaan"
                            :class="`${
                                !emailCorrected
                                    ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                                    : emailCorrected === 'Weak'
                                    ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                                    : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
                            } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.field"
                        />
                    </div>
                    <div
                        v-if="['Siswa'].includes(form.roleName)"
                        class="flex flex-col gap-2"
                    >
                        <label for="lastName">Bidang Studi*</label>
                        <input
                            id="field"
                            type="text"
                            placeholder="Bidang Studi"
                            :class="`${
                                !emailCorrected
                                    ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                                    : emailCorrected === 'Weak'
                                    ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                                    : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
                            } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.field"
                        />
                    </div>
                    <div
                        v-else-if="['Mahasiswa'].includes(form.roleName)"
                        class="flex flex-col gap-2"
                    >
                        <label for="field">Program Studi*</label>
                        <input
                            id="field"
                            type="text"
                            placeholder="Program Studi"
                            :class="`${
                                !emailCorrected
                                    ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                                    : emailCorrected === 'Weak'
                                    ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                                    : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
                            } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
                            v-model="data.field"
                        />
                    </div>
                    <div
                        v-else-if="
                            ['Eo', 'Sponsor', 'Perusahaan'].includes(
                                form.roleName,
                            )
                        "
                        class="flex flex-col gap-2"
                    >
                        <label for="reason">Alasan Bergabung*</label>
                        <textarea
                            id="reason"
                            rows="4"
                            v-model="data.reason"
                            class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                            placeholder="Alasan Bergabung"
                        ></textarea>
                    </div>
                </div>
                <div class="flex flex-col gap-4 w-1/2">
                    <div
                        v-if="['Siswa'].includes(form.roleName)"
                        class="flex flex-col gap-2"
                    >
                        <label for="proof">Upload Kartu Siswa*</label>
                        <div>
                            <div v-if="!files.length" class="flex flex-col">
                                <div class="w-full">
                                    <label
                                        for="fileInput"
                                        @dragover="dragover"
                                        @dragleave="dragleave"
                                        @drop="drop"
                                        :class="`cursor-pointer relative w-full p-0 ${
                                            isDragging ? 'opacity-[0.8]' : ''
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
                                            accept=".pdf,.jpg,.jpeg,.png"
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
                                                >Drag and drop files or click to
                                                upload</span
                                            >
                                        </div>
                                    </label>
                                    <p class="text-xs text-gray-400 mt-1">
                                        Maximum file size: 5Mb and Format file
                                        .pdf, .jpg, jpeg, and .png
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Note: Only add the code block below -->
                        <div class="preview-container" v-if="files.length">
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
                                        {{ truncateName(file.name) }} -
                                        {{
                                            Math.round(file.size / 1000) + 'kb'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        class="ml-2"
                                        type="button"
                                        @click="remove(files.indexOf(file))"
                                        title="Remove file"
                                    >
                                        <b>×</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="['Mahasiswa'].includes(form.roleName)"
                        class="flex flex-col gap-2"
                    >
                        <label for="proof">Upload Kartu Tanda Mahasiswa*</label>
                        <div>
                            <div v-if="!files.length" class="flex flex-col">
                                <div class="w-full">
                                    <label
                                        for="fileInput"
                                        @dragover="dragover"
                                        @dragleave="dragleave"
                                        @drop="drop"
                                        :class="`cursor-pointer relative w-full p-0 ${
                                            isDragging ? 'opacity-[0.8]' : ''
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
                                            accept=".pdf,.jpg,.jpeg,.png"
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
                                                >Drag and drop files or click to
                                                upload</span
                                            >
                                        </div>
                                    </label>
                                    <p class="text-xs text-gray-400 mt-1">
                                        Maximum file size: 5Mb and Format file
                                        .pdf, .jpg, jpeg, and .png
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Note: Only add the code block below -->
                        <div class="preview-container" v-if="files.length">
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
                                        {{ truncateName(file.name) }} -
                                        {{
                                            Math.round(file.size / 1000) + 'kb'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        class="ml-2"
                                        type="button"
                                        @click="remove(files.indexOf(file))"
                                        title="Remove file"
                                    >
                                        <b>×</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="
                            ['Eo', 'Sponsor', 'Perusahaan'].includes(
                                form.roleName,
                            )
                        "
                        class="flex flex-col gap-2"
                    >
                        <label for="proof">Upload Dokumen Pendukung*</label>
                        <div>
                            <div v-if="!files.length" class="flex flex-col">
                                <div class="w-full">
                                    <label
                                        for="fileInput"
                                        @dragover="dragover"
                                        @dragleave="dragleave"
                                        @drop="drop"
                                        :class="`cursor-pointer relative w-full p-0 ${
                                            isDragging ? 'opacity-[0.8]' : ''
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
                                            accept=".pdf,.jpg,.jpeg,.png"
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
                                                >Drag and drop files or click to
                                                upload</span
                                            >
                                        </div>
                                    </label>
                                    <p class="text-xs text-gray-400 mt-1">
                                        Maximum file size: 5Mb and Format file
                                        .pdf, .jpg, jpeg, and .png
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Note: Only add the code block below -->
                        <div class="preview-container" v-if="files.length">
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
                                        {{ truncateName(file.name) }} -
                                        {{
                                            Math.round(file.size / 1000) + 'kb'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        class="ml-2"
                                        type="button"
                                        @click="remove(files.indexOf(file))"
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
            <div class="flex justify-between items-center gap-4 pt-4">
                <!-- <a
          @click="skipHandler"
          class="text-customBlue cursor-pointer hover:opacity-[0.8] w-fit"
          >Lewati</a
        > -->
                <a
                    @click="backHandler"
                    class="text-customBlue cursor-pointer hover:opacity-[0.8] w-fit"
                >
                    Kembali
                </a>
                <button
                    type="submit"
                    :class="`${
                        !isFormValid || isLoadingForm
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:opacity-[0.8]'
                    } bg-blue-600 text-white px-4 py-2 rounded-md w-fit`"
                    :disabled="!isFormValid || isLoadingForm"
                >
                    {{ isLoadingForm ? 'Loading...' : 'Kirim' }}
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import Swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';
import AvatarCropper from 'vue-avatar-cropper';
import { mapActions, mapState, mapGetters } from 'vuex';
// import single_file_upload_for_vue from '@beaubus/single-file-upload-for-vue';
// Import any necessary Vuex modules or actions

export default {
    components: { AvatarCropper, Multiselect },
    props: {
        form: {
            type: Object,
            default: () => ({
                email: '',
                password: '',
                confirmPassword: '',
            }),
            //   required: true,
        },
    },
    data() {
        return {
            agree: false,
            isDragging: false,
            isLoadingForm: false,
            isUploading: false,
            showCropper: false,
            maxFileSize: 2,
            fileSize: 0,
            errorMessage: '',
            message: '',
            imagePreview: '',
            croppedImageBlob: '',
            files: [],
            file: '',
            selectedOption: '',
            optionsGender: ['Pria', 'Wanita'],
            isLoading: false,
            roleName: '',
            prov: '',
            phoneIsValid: true,
            dateIsValid: true,
            data: {
                firstName: '',
                lastName: '',
                birthDate: '',
                gender: '',
                phone: '',
                address: '',
                province: '',
                regencies: '',
                institutionName: '',
            },
        };
    },
    computed: {
        ...mapState('user', [
            'emailCorrected',
            'passwordStrength',
            'passwordConfirmed',
        ]),
        ...mapGetters('region', ['optionsProvincies', 'optionsRegencies']),
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        isFormValid() {
            if (!this.userDetail) {
                return (
                    this.data.firstName &&
                    this.data.phone &&
                    this.data.birthDate &&
                    this.data.gender &&
                    this.data.address &&
                    this.data.province &&
                    this.data.regencies &&
                    this.dateIsValid == true &&
                    this.phoneIsValid == true
                );
            } else {
                return (
                    this.data.firstName &&
                    this.data.phone &&
                    this.data.birthDate &&
                    this.data.gender &&
                    this.data.address &&
                    this.data.institutionName &&
                    this.data.pupils &&
                    this.data.field &&
                    this.dateIsValid == true &&
                    this.phoneIsValid == true
                );
            }
        },
    },
    created() {
        // Inisialisasi data dengan userDetail jika tersedia
        if (this.userDetail) {
            this.roleName = this.form.roleName;
            this.data.firstName = this.userDetail?.biodate.firstName || '';
            this.data.lastName = this.userDetail?.biodate.lastName || '';
            this.data.phone = this.userDetail?.biodate.phone || '';
            this.data.birthDate = this.userDetail?.biodate.birthDate || '';
            this.data.gender = this.userDetail?.biodate.gender || '';
            this.data.address = this.userDetail?.biodate.address || '';
            this.data.regencies = this.userDetail?.biodate.regencies || '';
            this.data.institutionName =
                this.userDetail?.biodate.institutionName || '';
            this.data.pupils = this.userDetail?.biodate.pupils || '';
            this.data.field = this.userDetail?.biodate.field || '';
            this.imagePreview =
                this.userDetail?.biodate.image?.previewUrl || '';
            this.prov = this.userDetail?.biodate.province;
        }
    },
    mounted() {
        this.roleName = this.form.roleName;
        this.fetchOptionsProvincies();
    },
    methods: {
        ...mapActions('region', [
            'fetchOptionsProvincies',
            'fetchOptionsRegencies',
        ]),
        onProvinceChange(province) {
            this.data.regencies = null; // Reset selected city when province changes
            if (province) {
                this.fetchOptionsRegencies(this.data.province.id);
            }
        },
        backHandler() {
            if (this.form.roleName) {
                this.form.roleName = '';
            }
            this.$emit('back-step');
        },
        validatePhone() {
            const phoneRegex = /^[0-9]*$/;
            if (!phoneRegex.test(this.data.phone) || this.data.phone.length > 12) {
                this.phoneIsValid = false
            } else {
                this.phoneIsValid = true
            }            
        },
        validateDate() {
            const selectedDate = new Date(this.data.birthDate);
            const today = new Date();
            if (selectedDate >= today) {
                this.dateIsValid = false
            } else {
                this.dateIsValid = true
            }            
        },
        async handleSubmit() {
            try {
                if (this.prov && this.data.province == '') {
                    this.data.province = this.prov;
                } else {
                    this.data.province = this.data.province.name;
                }

                if (this.isFormValid) {
                    this.isLoadingForm = true;
                    const formData = new FormData();

                    this.files.forEach((file) => {
                        formData.append('proof', file);
                    });

                    if (!this.userDetail) {
                        for (const key in this.form) {
                            formData.append(key, this.form[key]);
                        }
                    }

                    for (const key in this.data) {
                        formData.append(key, this.data[key]);
                    }

                    // Append the image blob if croppedImageBlob is available
                    if (this.croppedImageBlob) {
                        const randomNumber = Math.floor(Math.random() * 1000); // Adjust range as needed
                        const fileExtension = 'png';
                        const randomFileName = `avatar_${randomNumber}.${fileExtension}`;
                        formData.append(
                            'image',
                            this.croppedImageBlob,
                            randomFileName,
                        );
                    }

                    const idBiodate = this.userDetail?.biodate.id;
                    const role = {
                        roleName: this.roleName,
                    };

                    const editData = {
                        id: idBiodate,
                        data: formData,
                    };
                    if (this.userDetail) {
                        await this.$store.dispatch('user/updateRole', role);
                        await this.$store.dispatch(
                            'user/updateBiodate',
                            editData,
                        );
                    } else {
                        await this.$store.dispatch(
                            'auth/postRegister',
                            formData,
                        );
                    }
                }
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text:
                        err?.response?.data?.message || 'Something went wrong.',
                    icon: 'error',
                });
            } finally {
                this.isLoadingForm = false;
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
