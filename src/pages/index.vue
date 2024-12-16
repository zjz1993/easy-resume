<template>
  <div>首页<el-button type="primary" @click="goEditResume">去编辑简历12</el-button></div>
</template>
<script setup lang="ts">
import { ElButton } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
function goEditResume() {
	console.log("执行了");
	router.push("/resume");
}
</script>
