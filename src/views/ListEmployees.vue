<template>
    <div v-if="isLoading" class="loading-indicator flex justify-center items-center h-screen">
		<fwb-spinner color="blue" size="12"/>
	</div>
	<div v-else class="flex flex-col gap-5 mt-5">
        <!-- search -->
        <form @submit.prevent="onSearch">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input  
                    v-model="searchQuery" 
                    type="search" 
                    id="default-search" 
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search employees..." 
                    required 
                />
                <button 
                    @click="clearSearch" 
                    type="button"
                    class="text-white absolute end-24 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Clear
                </button>
                <button 
                    @click="onSearch" 
                    type="submit" 
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
            </div>
        </form>

        <!-- table  -->
		<fwb-table>
			<fwb-table-head>
				<fwb-table-head-cell>ID</fwb-table-head-cell>
				<fwb-table-head-cell>User Name</fwb-table-head-cell>
				<fwb-table-head-cell>Price</fwb-table-head-cell>
				<fwb-table-head-cell>Category</fwb-table-head-cell>
				<fwb-table-head-cell>
                    <a @click="addEmployee" class="relative p-0.5 cursor-pointer inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                        <span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                        <span class="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                            <span class="relative text-white">Add Employees</span>
                        </span>
                    </a>
                </fwb-table-head-cell>
			</fwb-table-head>
			<fwb-table-body>
				<fwb-table-row v-for="employee in employees" :key="employee.id">
					<fwb-table-cell>{{ employee.id }}</fwb-table-cell>
					<fwb-table-cell>{{ employee.name }}</fwb-table-cell>
					<fwb-table-cell>{{ employee.salary }}</fwb-table-cell>
					<fwb-table-cell>{{ employee.name }}</fwb-table-cell>
					<fwb-table-cell class="flex gap-5">
                        <a  class="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group cursor-pointer">
                            <span class="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                            <span class="absolute inset-0 w-full h-full bg-white rounded-md "></span>
                            <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
                            <span class="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">Edit </span>
                        </a>
                        <a  @click="deleteEmployee(employee.id)" class="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group cursor-pointer">
                            <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                            <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                                <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                                <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                            </span>
                            <span class="relative text-white">Delete </span>
                        </a>
					</fwb-table-cell>
				</fwb-table-row>
			</fwb-table-body>
		</fwb-table>

        <!-- pagination -->
        <fwb-pagination v-model="currentPage" :total-pages="100" show-icons></fwb-pagination>



        <fwb-modal v-if="isShowModal" @close="closeModal" position="top-center">
            <template #header>
            <div class="flex items-center text-lg">
                Terms of Service
            </div>
            </template>
            <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
            </p>
            </template>
            <template #footer>
            <div class="flex justify-between">
                <fwb-button @click="closeModal" color="alternative">
                Decline
                </fwb-button>
                <fwb-button @click="closeModal" color="green">
                I accept
                </fwb-button>
            </div>
            </template>
        </fwb-modal>
        
	</div>
</template>

<script  setup>
import {
    FwbSpinner,
    FwbButton, 
    FwbModal,
	FwbTable,
	FwbTableBody,
	FwbTableCell,
	FwbTableHead,
	FwbTableHeadCell,
	FwbTableRow,
} from "flowbite-vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { FwbPagination } from 'flowbite-vue'
import { ref } from 'vue'

const isShowModal = ref(false)
const currentPage = ref(1)
const searchQuery = ref('');
const newEmployee = ref({
    name: 'test',
    salary: '23432423'
});

const store = useStore();
const employees = computed(() => store.getters.getEmployees.employees);
const isLoading = computed(() => store.state.isLoading);
console.log("employees:::::", employees);

function closeModal () {
    isShowModal.value = false
}
// function showModal () {
//     isShowModal.value = true
// }

const onSearch = () => {
	store.dispatch("fetchEmployees", { searchQuery: searchQuery.value.trim(), page: 1, limit: 10 });
};

const clearSearch = () => {
    searchQuery.value = ""; 
    store.dispatch("fetchEmployees", { page: 1, limit: 20 });
};

const deleteEmployee = async (id) => {
    try {
        await store.dispatch("deleteEmployee", id);
        // Sau khi xóa, gọi lại fetchEmployees để cập nhật UI
        onSearch();
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
};

const addEmployee = async () => {
    try {
        await store.dispatch("addEmployee", newEmployee.value);
        // newEmployee.value = { name: '', salary: '' }; 
        onSearch();
    } catch (error) {
        console.error("Error adding employee:", error);
    }
};

onMounted(() => {
	store
		.dispatch("fetchEmployees",{ page:  1, limit: 10 })
		.then(() => {
			// Log employees sau khi fetch để kiểm tra
			console.log("employees after fetch:", employees);
		})
		.catch((error) => {
			console.error("Error fetching employees:", error);
		});
});
</script>
