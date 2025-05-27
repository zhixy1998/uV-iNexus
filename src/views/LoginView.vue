<template>
    <div class="min-h-screen flex flex-col main-login">
        <!-- 顶部 Logo -->
        <div class="text-left mt-5 ml-10">
            <img src="@/assets/images/logo2.png" alt="Logo" style="height: 60px" />
        </div>

        <!-- 主体内容（左右布局） -->
        <div class="main-content">
            <!-- 左侧幻灯片（轮播图） -->
            <div class="carousel-container">
                <n-carousel autoplay show-arrow draggable :interval="3000" class="custom-carousel">
                    <img v-for="(image, index) in carouselImages" :key="index" :src="image" class="carousel-img" />
                </n-carousel>
            </div>

            <!-- 右侧登录表单 -->
            <div class="form-container">
                <n-card title="用户登录" :bordered="false" size="large">
                    <n-form ref="formRef" :model="formData" :rules="rules">
                        <n-form-item path="username" label="用户名">
                            <n-input v-model:value="formData.username" placeholder="请输入用户名" />
                        </n-form-item>
                        <n-form-item path="password" label="密码">
                            <n-input v-model="formData.password" type="password" placeholder="请输入密码"
                                show-password-on="click" />
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" block :loading="loading" @click="handleLogin">
                                登录
                            </n-button>
                        </n-form-item>
                    </n-form>
                    <div class="form-footer">
                        <n-checkbox v-model:checked="rememberMe">
                            记住我
                        </n-checkbox>
                        <n-button text type="primary">
                            忘记密码？
                        </n-button>
                    </div>
                </n-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";
const message = useMessage();
const router = useRouter()
// 幻灯片图片（替换为你的实际图片路径）
const carouselImages = [
    "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
    "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
    "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
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
        message.success("登录成功！");
        loading.value = false;
        router.push("/");
    }, 1500);
};
</script>

<style scoped>
.main-login {
    background: url("@/assets/images/bg1.png") no-repeat center center;
}

.main-content {
    display: flex;
    justify-content: center;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.carousel-container {
    flex: 1;
    max-width: 600px;
}

.form-container {
    flex: 1;
    max-width: 400px;
}

.custom-carousel {
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
}

.carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
}
</style>