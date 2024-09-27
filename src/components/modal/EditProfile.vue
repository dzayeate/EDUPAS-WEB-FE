<template>
    <div class="fixed z-20 inset-0 overflow-y-auto">
        <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
                >&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-5/12"
            >
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                    <div class="sm:flex sm:items-start">
                        <div
                            class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full md:ml-0"
                        >
                            <h3
                                class="text-lg leading-6 font-medium text-gray-900"
                                id="modal-title"
                            >
                                Edit Info
                            </h3>
                            <div class="mt-2 text-sm mx-auto">
                                <form
                                    @submit.prevent="handleSubmit"
                                    class="w-full"
                                >
                                    <div class="flex flex-row gap-4">
                                        <div class="w-6/12">
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label
                                                    class="text-gray-700 text-sm"
                                                    for="firstName"
                                                    >Nama Depan</label
                                                >
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    v-model="data.firstName"
                                                    class="border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label
                                                    class="block text-gray-700 text-sm"
                                                    for="lastName"
                                                    >Nama Belakang</label
                                                >
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    v-model="data.lastName"
                                                    class="border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label
                                                    class="block text-gray-700 text-sm"
                                                    for="phone"
                                                    >No. Telephone</label
                                                >
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    v-model="data.phone"
                                                    @input="validatePhone"
                                                    class="border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label
                                                    class="block text-gray-700 text-sm"
                                                    for="birthDate"
                                                    >Tanggal Lahir</label
                                                >
                                                <input
                                                    type="date"
                                                    id="birthDate"
                                                    v-model="data.birthDate"
                                                    @input="validateDate"
                                                    class="border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div class="w-6/12 text-sm">
                                            <div
                                                class="flex flex-col gap-1 mb-1"
                                            >
                                                <label for="province"
                                                    >Provinsi</label
                                                >
                                                <multiselect
                                                    v-model="data.province"
                                                    :options="optionsProvincies"
                                                    :searchable="true"
                                                    :placeholder="
                                                        userDetail
                                                            ? userDetail
                                                                  ?.biodate
                                                                  .province
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
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label for="regencies"
                                                    >Kabupaten / Kota*</label
                                                >
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
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label for="address"
                                                    >Alamat*</label
                                                >
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
                                    <h3
                                        v-if="
                                            !['Umum'].includes(
                                                userDetail?.role.name,
                                            )
                                        "
                                        class="text-lg leading-6 font-medium text-gray-900 mb-2 mt-5"
                                    >
                                        {{ titleForm }}
                                    </h3>
                                    <div
                                        class="flex flex-row gap-4"
                                        v-if="!isUmum"
                                    >
                                        <div class="w-6/12">
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label
                                                    class="text-gray-700 text-sm"
                                                    for="institutionName"
                                                    >Nama Instansi</label
                                                >
                                                <input
                                                    type="text"
                                                    id="institutionName"
                                                    v-model="
                                                        data.institutionName
                                                    "
                                                    class="border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label
                                                    class="text-gray-700 text-sm"
                                                    for="pupils"
                                                    >{{ labelPupils }}</label
                                                >
                                                <input
                                                    type="text"
                                                    id="pupils"
                                                    v-model="data.pupils"
                                                    class="border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-col gap-1 mb-2"
                                            >
                                                <label
                                                    class="text-gray-700 text-sm"
                                                    for="field"
                                                >
                                                    {{ labelField }}
                                                </label>
                                                <input
                                                    v-if="isStudentOrCollege"
                                                    type="text"
                                                    id="field"
                                                    v-model="data.field"
                                                    class="border-[#C2C2C2] focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-sm text-black border rounded-[6px] placeholder-[#757575] focus:outline-none"
                                                />
                                                <textarea
                                                    v-else-if="isOther"
                                                    id="field"
                                                    rows="3"
                                                    v-model="data.field"
                                                    class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                                    placeholder="Alasan Bergabung"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div
                                            class="w-6/12 my-auto mx-auto"
                                            v-if="!isProof"
                                        >
                                            <a :href="userDetail?.biodate.proof"
                                                >Download
                                                <span class="underline"
                                                    >File Pendukung</span
                                                ></a
                                            >
                                        </div>
                                    </div>
                                    <div class="flex justify-end">
                                        <button
                                            type="button"
                                            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                            @click="$emit('closeModal')"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                            :disabled="
                                                !dateIsValid ||
                                                !phoneIsValid ||
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
    components: { Multiselect },
    data() {
        return {
            isLoading: false,
            prov: '',
            phoneIsValid: true,
            dateIsValid: true,
            data: {
                firstName: '',
                lastName: '',
                birthDate: '',
                phone: '',
                address: '',
                province: '',
                regencies: '',
                institutionName: '',
                field: '',
                pupils: '',
            },
        };
    },
    created() {
        // Inisialisasi data dengan userDetail jika tersedia
        if (this.userDetail) {
            this.data.firstName = this.userDetail?.biodate.firstName || '';
            this.data.lastName = this.userDetail?.biodate.lastName || '';
            this.data.phone = this.userDetail?.biodate.phone || '';
            this.data.birthDate = this.userDetail?.biodate.birthDate || '';
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
        this.fetchOptionsProvincies();
    },
    computed: {
        ...mapGetters('region', ['optionsProvincies', 'optionsRegencies']),
        userDetail() {
            return this.$store.getters['user/userDetail'];
        },
        titleForm() {
            const role = this.userDetail?.role.name;
            if (role == 'Siswa' || role == 'Mahasiswa') {
                return 'Pendidikan';
            } else {
                return 'Perusahaan';
            }
        },
        labelPupils() {
            const role = this.userDetail?.role.name;
            if (role == 'Siswa') {
                return 'NISN';
            } else if (role == 'Mahasiswa') {
                return 'PDDIKTI';
            } else {
                return 'Bidang Perusahaan';
            }
        },
        labelField() {
            const role = this.userDetail?.role.name;
            if (role == 'Siswa') {
                return 'Bidang Studi';
            } else if (role == 'Mahasiswa') {
                return 'Jurusan';
            } else {
                return 'Alasan Bergabung';
            }
        },
        isUmum() {
            const role = this.userDetail?.role.name;
            return role === 'Umum';
        },
        isStudentOrCollege() {
            const role = this.userDetail?.role.name;
            return role === 'Siswa' || role === 'Mahasiswa';
        },
        isOther() {
            const role = this.userDetail?.role.name;
            return role === 'Eo' || role === 'Perusahaan' || role === 'Sponsor';
        },
        isProof() {
            const proof = this.userDetail?.biodate.proof;
            return proof === null;
        },
        isFormValid() {
            if (this.userDetail?.role.name === 'Umum') {
                return (
                    this.data.firstName &&
                    this.data.phone &&
                    this.data.birthDate &&
                    this.data.address &&
                    this.dateIsValid === true &&
                    this.phoneIsValid === true
                );
            } else {
                return (
                    this.data.firstName &&
                    this.data.phone &&
                    this.data.birthDate &&
                    this.data.address &&
                    this.dateIsValid === true &&
                    this.phoneIsValid === true &&
                    this.data.institutionName &&
                    this.data.pupils &&
                    this.data.field
                );
            }
        },
    },
    methods: {
        ...mapActions('region', [
            'fetchOptionsProvincies',
            'fetchOptionsRegencies',
        ]),
        async handleSubmit() {
            if (this.prov && this.data.province == '') {
                this.data.province = this.prov;
            } else {
                this.data.province = this.data.province.name;
            }
            try {
                const formData = new FormData();

                for (const key in this.data) {
                    formData.append(key, this.data[key]);
                }

                const idBiodate = this.userDetail?.biodate.id;

                const editData = {
                    id: idBiodate,
                    data: formData,
                };
                await this.$store.dispatch('user/updateBiodate', editData);
                setTimeout(() => {
                    window.location.reload();
                }, 250);
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text:
                        err?.response?.data?.message || 'Something went wrong.',
                    icon: 'error',
                });
            }
        },
        addEducation() {
            // Handle adding new education
        },
        onProvinceChange(province) {
            this.data.regencies = null; // Reset selected city when province changes
            if (province) {
                this.fetchOptionsRegencies(this.data.province.id);
            }
        },
        validatePhone() {
            const phoneRegex = /^[0-9]*$/;
            if (
                !phoneRegex.test(this.data.phone) ||
                this.data.phone.length > 12 ||
                this.data.phone.length == 0
            ) {
                this.phoneIsValid = false;
            } else {
                this.phoneIsValid = true;
            }
        },
        validateDate() {
            const selectedDate = new Date(this.data.birthDate);
            const today = new Date();
            if (selectedDate >= today || this.data.birthDate == '') {
                this.dateIsValid = false;
            } else {
                this.dateIsValid = true;
            }
        },
    },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
