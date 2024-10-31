<template>
	<div class="container mx-auto">
		<fwb-table>
			<fwb-table-head>
				<fwb-table-head-cell>ID</fwb-table-head-cell>
				<fwb-table-head-cell>User Name</fwb-table-head-cell>
				<fwb-table-head-cell>Category</fwb-table-head-cell>
				<fwb-table-head-cell>Price</fwb-table-head-cell>
				<fwb-table-head-cell>Add</fwb-table-head-cell>
				<!-- <fwb-table-head-cell>
					<span class="sr-only">Edit</span>
					<span class="sr-only">Delete</span>
				</fwb-table-head-cell> -->
			</fwb-table-head>
			<fwb-table-body>
				<fwb-table-row v-for="employee in employees" :key="employee.id">
					<fwb-table-cell>{{ employee.name }}</fwb-table-cell>
					<fwb-table-cell>{{ employee.name }}</fwb-table-cell>
					<fwb-table-cell>{{ employee.name }}</fwb-table-cell>
					<fwb-table-cell>{{ employee.name }}</fwb-table-cell>
					<fwb-table-cell>
						<fwb-a href="#"> Edit </fwb-a>
						<fwb-a href="#"> Delete </fwb-a>
					</fwb-table-cell>
				</fwb-table-row>
			</fwb-table-body>
		</fwb-table>
	</div>
</template>

<script setup>
import {
	FwbA,
	FwbTable,
	FwbTableBody,
	FwbTableCell,
	FwbTableHead,
	FwbTableHeadCell,
	FwbTableRow,
} from "flowbite-vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const employees = computed(() => store.getters.getEmployees);

console.log("employees:::::", employees.value);

onMounted(() => {
	store
		.dispatch("fetchEmployees")
		.then(() => {
			// Log employees sau khi fetch để kiểm tra
			console.log("employees after fetch:", employees.value);
		})
		.catch((error) => {
			console.error("Error fetching employees:", error);
		});
});
</script>
