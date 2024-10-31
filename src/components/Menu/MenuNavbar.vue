<template>
	<fwb-dropdown :text="user[0].toUpperCase()">
		<fwb-list-group>
			<fwb-list-group-item class="hover:bg-gray-200 cursor-pointer">
				{{ user }}
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
import { computed } from "vue";

const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.getUser);

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
