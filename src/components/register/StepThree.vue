<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-white w-full flex justify-center overflow-y-auto py-[24px]"
  >
    <div class="flex flex-col gap-6 w-full px-10">
      <!-- Adjusted px value for padding -->
      <div>
        <h2 class="font-medium text-2xl leading-9 text-blue-600 mb-2">
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
      <div class="flex w-full gap-8">
        <div class="flex flex-col gap-4 w-1/2">
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
              @uploading="handleUploading"
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
                      croppedImageBlob
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
                <p class="text-center text-xs mt-1">(300 x 300)</p>
                <!-- Adjusted text size -->
                <p class="text-center text-xs">Maximum file size: 5Mb</p>
                <!-- Adjusted text size -->
              </div>
              <p v-if="message" class="text-red-500 text-sm ml-2 my-auto">
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
              :class="`border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
              v-model="data.noTelp"
            />
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
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 focus:outline-none"
                placeholder="Select date"
                v-model="data.birthDate"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="institutionLevel">Jenis Kelamin*</label>
            <select
              id="institutionLevel"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 focus:outline-none"
              v-model="data.gander"
            >
              <option value="">Select</option>
              <option value="pria">Pria</option>
              <option value="wanita">Wanita</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="regencies">Kabupaten / Kota*</label>
            <select
              id="regencies"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 focus:outline-none"
              v-model="data.regencies"
            >
              <option value="">Select</option>
              <option value="siswa">Bandung</option>
              <option value="mahasiswa">Cimahi</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="province">province*</label>
            <select
              id="province"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-4 focus:outline-none"
              v-model="data.province"
            >
              <option value="">Select</option>
              <option value="Jawa Barat">Jawa Barat</option>
              <option value="Jawa Tengah">Jawa Tengah</option>
              <option value="Jawa Timur">Jawa Timur</option>
            </select>
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
        v-if="!['umum'].includes(data.roleName)"
        class="text-[20px] font-semibold"
      >
        {{
          ["siswa", "mahasiswa"].includes(data.roleName)
            ? "Pendidikan"
            : ["eo", "sponsor", "perusahaan"].includes(data.roleName) ??
              "Perusahaan"
        }}
      </h2>
      <div v-if="!['umum'].includes(data.roleName)" class="flex w-full gap-8">
        <div class="flex flex-col gap-4 w-1/2">
          <div class="flex flex-col gap-2">
            <label for="firstName">Nama Instansi*</label>
            <input
              id="firstName"
              type="text"
              placeholder="Nama Instansi"
              :class="`${
                !emailCorrected
                  ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                  : emailCorrected === 'Weak'
                  ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                  : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
              } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
              v-model="data.firstName"
            />
          </div>
          <div
            v-if="['siswa'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="firstName">NISN*</label>
            <input
              id="firstName"
              type="text"
              placeholder="NISN"
              :class="`${
                !emailCorrected
                  ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                  : emailCorrected === 'Weak'
                  ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                  : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
              } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
              v-model="data.firstName"
            />
          </div>
          <div
            v-else-if="['mahasiswa'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="firstName">NIM*</label>
            <input
              id="firstName"
              type="text"
              placeholder="NIM"
              :class="`${
                !emailCorrected
                  ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                  : emailCorrected === 'Weak'
                  ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                  : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
              } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
              v-model="data.firstName"
            />
          </div>
          <div
            v-else-if="['eo', 'sponsor', 'perusahaan'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="firstName">Bidang Perusahaan*</label>
            <input
              id="firstName"
              type="text"
              placeholder="Bidang Perusahaan"
              :class="`${
                !emailCorrected
                  ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                  : emailCorrected === 'Weak'
                  ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                  : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
              } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
              v-model="data.firstName"
            />
          </div>
          <div
            v-if="['siswa'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="lastName">Bidang Studi*</label>
            <input
              id="firstName"
              type="text"
              placeholder="Bidang Studi"
              :class="`${
                !emailCorrected
                  ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                  : emailCorrected === 'Weak'
                  ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                  : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
              } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
              v-model="data.lastName"
            />
          </div>
          <div
            v-else-if="['mahasiswa'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="lastName">Program Studi*</label>
            <input
              id="firstName"
              type="text"
              placeholder="Program Studi"
              :class="`${
                !emailCorrected
                  ? 'border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500'
                  : emailCorrected === 'Weak'
                  ? 'border-red-500 focus:ring-red-5000 focus:border-red-500'
                  : 'border-green-500 focus:ring-green-5000 focus:border-green-500'
              } block w-full p-2 text-sm text-black border  rounded-[6px] placeholder-[#757575] focus:outline-none`"
              v-model="data.lastName"
            />
          </div>
          <div
            v-else-if="['eo', 'sponsor', 'perusahaan'].includes(data.roleName)"
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
            v-if="['siswa'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="firstName">Upload Kartu Siswa*</label>
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
                        isDragging ? 'border-green-400' : 'border-gray-400'
                      } flex justify-center items-center border border-dashed w-full h-24 rounded`"
                    >
                      <img
                        :src="require('@/assets/icons/icon-empty-file.svg')"
                        class="inline-block mr-2.5"
                        alt="Icon"
                      />
                      <span class="text-gray-400 inline-block text-xs"
                        >Drag and drop files or click to upload</span
                      >
                    </div>
                  </label>
                  <p class="text-xs text-gray-400 mt-1">
                    Maximum file size: 5Mb and Format file .pdf, .jpg, jpeg, and
                    .png
                  </p>
                </div>
              </div>
            </div>
            <!-- Note: Only add the code block below -->
            <div class="preview-container" v-if="files.length">
              <div v-for="file in files" :key="file.name" class="preview-card">
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
                    {{ Math.round(file.size / 1000) + "kb" }}
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
            v-if="['mahasiswa'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="firstName">Upload Kartu Tanda Mahasiswa*</label>
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
                        isDragging ? 'border-green-400' : 'border-gray-400'
                      } flex justify-center items-center border border-dashed w-full h-24 rounded`"
                    >
                      <img
                        :src="require('@/assets/icons/icon-empty-file.svg')"
                        class="inline-block mr-2.5"
                        alt="Icon"
                      />
                      <span class="text-gray-400 inline-block text-xs"
                        >Drag and drop files or click to upload</span
                      >
                    </div>
                  </label>
                  <p class="text-xs text-gray-400 mt-1">
                    Maximum file size: 5Mb and Format file .pdf, .jpg, jpeg, and
                    .png
                  </p>
                </div>
              </div>
            </div>
            <!-- Note: Only add the code block below -->
            <div class="preview-container" v-if="files.length">
              <div v-for="file in files" :key="file.name" class="preview-card">
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
                    {{ Math.round(file.size / 1000) + "kb" }}
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
            v-if="['eo', 'sponsor', 'perusahaan'].includes(data.roleName)"
            class="flex flex-col gap-2"
          >
            <label for="firstName">Upload Dokumen Pendukung*</label>
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
                        isDragging ? 'border-green-400' : 'border-gray-400'
                      } flex justify-center items-center border border-dashed w-full h-24 rounded`"
                    >
                      <img
                        :src="require('@/assets/icons/icon-empty-file.svg')"
                        class="inline-block mr-2.5"
                        alt="Icon"
                      />
                      <span class="text-gray-400 inline-block text-xs"
                        >Drag and drop files or click to upload</span
                      >
                    </div>
                  </label>
                  <p class="text-xs text-gray-400 mt-1">
                    Maximum file size: 5Mb and Format file .pdf, .jpg, jpeg, and
                    .png
                  </p>
                </div>
              </div>
            </div>
            <!-- Note: Only add the code block below -->
            <div class="preview-container" v-if="files.length">
              <div v-for="file in files" :key="file.name" class="preview-card">
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
                    {{ Math.round(file.size / 1000) + "kb" }}
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
      <div class="flex justify-between items-center gap-4">
        <a
          @click="skipHandler"
          class="text-customBlue cursor-pointer hover:opacity-[0.8] w-fit"
          >Lewati</a
        >
        <button
          type="submit"
          :class="`${
            !isFormValid || isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:opacity-[0.8]'
          } bg-blue-600 text-white px-4 py-2 rounded-md w-fit my-[24px]`"
          :disabled="!isFormValid || isLoading"
        >
          {{ isLoading ? "Loading..." : "Submit" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
import { POST_USER } from "@/store/user.module";
import Swal from "sweetalert2";
// import single_file_upload_for_vue from '@beaubus/single-file-upload-for-vue';
// Import any necessary Vuex modules or actions

export default {
  components: { AvatarCropper },
  props: {
    email: String,
    password: String,
    confirmPassword: String,
    roleName: String,
  },
  data() {
    return {
      agree: false,
      isDragging: false,
      isLoading: false,
      isUploading: false,
      showCropper: false,
      maxFileSize: 2,
      fileSize: 0,
      errorMessage: "",
      message: "",
      imagePreview: "",
      croppedImageBlob: "",
      files: [],
      data: {
        image: "",
        firstName: "",
        lastName: "",
        noTelp: "",
        gander: "",
        birthDate: "",
        institutionName: "",
        institutionLevel: "",
        province: "",
        regencies: "",
        studyField: "",
        reason: "",
        file: [],
      },
    };
  },
  computed: {
    isFormValid() {
      return (
        this.data.firstName &&
        this.data.lastName &&
        this.data.institutionName &&
        this.data.institutionLevel &&
        this.data.province &&
        this.data.regencies &&
        this.data.studyField &&
        this.data.reason &&
        this.agree
      );
    },
  },
  mounted() {
    this.data.roleName = this.roleName;
  },
  methods: {
    async handleSubmit() {
      try {
        this.data.file = this.files;
        const files = this.data.file;
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("selectedFiles", file);
        });

        if (this.isFormValid) {
          this.isLoading = true;

          const formData = new FormData();
          for (const key in this.data) {
            formData.append(key, this.data[key]);
          }

          // Append the image blob if croppedImageBlob is available
          if (this.croppedImageBlob) {
            const randomNumber = Math.floor(Math.random() * 1000); // Adjust range as needed
            const fileExtension = "png";
            const randomFileName = `avatar_${randomNumber}.${fileExtension}`;
            formData.append("image", this.croppedImageBlob, randomFileName);
          }

          this.data.image = this.croppedImageBlob;

          await this.$store.dispatch(POST_USER, formData);

          Swal.fire({
            title: "Created",
            text: "Account created successfully.",
            icon: "success",
          }).then(() => {
            this.$router.push("/").then(() => {
              setTimeout(() => {
                window.location.reload(true);
              }, 0);
            });
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err?.response?.data?.message || "Something went wrong.",
          icon: "error",
        });
      } finally {
        this.isLoading = false;
      }
    },
    handleUploaded(data) {
      const base64str = data.url.substring(data.url.indexOf(",") + 1);
      const decoded = atob(base64str);
      const decodedmaxFileSize = decoded.length / 1024 ** 2;

      if (decodedmaxFileSize > this.maxFileSize) {
        this.message = "File size too large.";
        setTimeout(() => {
          this.message = "";
        }, 3000);
      } else {
        this.imagePreview = data.getCroppedCanvas().toDataURL("image/png");
        // Handle uploaded event from AvatarCropper
        const croppedCanvas = data.getCroppedCanvas();
        croppedCanvas.toBlob((blob) => {
          this.croppedImageBlob = blob; // Store the cropped image blob
        }, "image/png");
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
        ["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(
          file.type,
        ),
      );

      if (!fileRequired) {
        Swal.fire({
          title: "Upload File",
          text: "Format file must .pdf, .jpg, .jpeg, or .png.",
          icon: "warning",
        });
        return;
      }

      if (incomingFiles.length > 1 || self.files.length == 1) {
        Swal.fire({
          title: "Upload File",
          text: "Upload file must be 1 items.",
          icon: "warning",
        });
        return;
      }

      if (fileExist) {
        self.showMessage = true;
        Swal.fire({
          title: "Upload File",
          text: "New upload contains files that already exist.",
          icon: "warning",
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
        this.message = "";
      }, 3000);
      this.isUploading = false;
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return ["image/jpg", "image/jpeg", "image/png"].includes(file.type)
        ? fileSrc
        : require("@/assets/icons/icon-empty-file.svg");
    },
    truncateName(fileName) {
      const extension = fileName.substring(fileName.lastIndexOf("."));
      const name = fileName.substring(0, fileName.lastIndexOf("."));
      if (name.length <= 4) return fileName;

      const truncated = `${name.substring(0, 2)}..${name.substring(
        name.length - 2,
      )}${extension}`;
      return truncated;
    },
    skipHandler() {
      this.$emit("skipHandler");
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
