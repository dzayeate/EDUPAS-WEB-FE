<template>
    <div class="flex flex-row justify-between border-b-2 pb-5 mb-6">
        <h3 class="font-medium text-2xl font-openSans">User</h3>
    </div>
    <TableView
        :columns="columns"
        :rows="rows"
        @edit="handleEdit"
        @delete="handleDelete"
        @view="handleView"
        @update="handleUpdate"
    />
</template>
<script>
import TableView from '@/components/table/TableView.vue';

export default {
    components: {
        TableView
    },
    data() {
        return {
            columns: [
                { label: 'No', field: 'id' },
                { label: 'Nama', field: 'name' },
                { label: 'Email', field: 'email' },
                { label: 'Jenis Kelamin', field: 'gender' },
                { label: 'Status', field: 'status' },
            ],
            rows: [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 30,
                    gender: 'Pria',
                    status: 'Selesai',
                },
                {
                    id: 2,
                    name: 'John Doe',
                    email: 30,
                    gender: 'Pria',
                    status: 'Selesai',
                },
                {
                    id: 3,
                    name: 'John Doe',
                    email: 30,
                    gender: 'Pria',
                    status: 'Selesai',
                },                
            ],
        };
    },
    methods: {
        handleEdit(row) {
            console.log('Edit row:', row);
        },
        handleDelete(row) {
            console.log('Delete row:', row);
            this.rows = this.rows.filter((r) => r.id !== row.id);
        },
        handleView(row) {
            console.log('View row:', row);
        },
        handleUpdate(row) {
            console.log('Update row:', row);
        },
    },
};
</script>
