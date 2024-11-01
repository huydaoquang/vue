<template>
	<div id="app">
		<Navbar />
		<!-- Thêm Navbar nếu bạn có -->
		<div class="container mx-auto">
			<router-view />
		</div>
		<!-- Sử dụng router-view để hiển thị các view -->
	</div>
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue"; // Nếu bạn có Navbar, import nó

export default {
	name: "App",
	components: {
		Navbar,
	},
};
</script>

<style></style>
