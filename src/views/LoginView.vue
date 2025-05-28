<template>
  <div class="min-h-screen flex flex-col main-login">
    <!-- 顶部 Logo -->
    <div class="text-left mt-5 ml-10">
      <img src="@/assets/images/logo2.png" alt="Logo" style="height: 60px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
// 幻灯片图片（替换为你的实际图片路径）
const carouselImages = [
];

// 表单数据
const formData = ref({
  username: "",
  password: "",
});
const rememberMe = ref(false);
const loading = ref(false);

// 表单验证规则
const rules = {
  username: {
    required: true,
    message: "请输入用户名",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: "blur",
  },
};

// 登录逻辑
const handleLogin = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    router.push("/");
  }, 1500);
};
</script>

<style scoped>
.main-login {
  background: url("@/assets/images/bg1.png") no-repeat center center;
}
</style>
