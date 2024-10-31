<template>
	<fwb-dropdown>
		<fwb-list-group>
			<fwb-list-group-item class="hover:bg-gray-200 cursor-pointer">
				Profile
			</fwb-list-group-item>
			<fwb-list-group-item class="hover:bg-gray-200 cursor-pointer">
				Settings
			</fwb-list-group-item>
			<fwb-list-group-item class="hover:bg-gray-200 cursor-pointer">
				Messages
			</fwb-list-group-item>
			<fwb-list-group-item
				class="hover:bg-gray-200 cursor-pointer"
				@click="handleLogout"
			>
				Logout
			</fwb-list-group-item>
		</fwb-list-group>
	</fwb-dropdown>
</template>

<script setup>
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from "flowbite-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const handleLogout = async () => {
	await store.dispatch("logout");
	router.push("/");
};
</script>

<style scoped>
.hover\:bg-gray-200:hover {
	background-color: #e5e7eb;
}
.cursor-pointer {
	cursor: pointer;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
	name: "MenuNavbar",
	computed: {
		...mapGetters(["getUser"]),
	},
};
</script>
