<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-menu-item index="0">LOGO</el-menu-item>
                    <div class="flex-grow" />
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">个人主页</el-menu-item>
                    <el-menu-item index="3">留言板</el-menu-item>
                    <el-menu-item index="4">好友</el-menu-item>
                    <el-sub-menu index="5">
                        <template #title>分类</template>
                        <el-menu-item index="5-1">Java</el-menu-item>
                        <el-menu-item index="5-2">C</el-menu-item>
                        <el-menu-item index="5-3">Javascript</el-menu-item>
                        <el-menu-item index="5-4">C++</el-menu-item>
                        <el-menu-item index="5-5">Python</el-menu-item>
                        <el-sub-menu index="5-6">
                            <template #title>item four</template>
                            <el-menu-item index="5-6-1">item one</el-menu-item>
                            <el-menu-item index="5-6-2">item two</el-menu-item>
                            <el-menu-item index="5-6-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <div style="width: 60rem;"></div>
                    <el-sub-menu index="6" v-if="username" >
                        <template #title>{{username}}</template>
                        <el-menu-item index="6-1" @click="admin">博客管理</el-menu-item>
                        <el-menu-item index="6-2">退出</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else>
                        <router-link to="/login">登录</router-link>&nbsp;<router-link to="/register">注册</router-link>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="border: 1px solid rgb(234, 233, 233);height:43rem">
                <el-scrollbar>
                    <el-card v-for="items in article" :key="items.id">
                        <template #header>
                            <div class="card-header">
                                <span>{{items.title}}</span>
                                <el-button class="button" text>Operation button</el-button>
                            </div>
                        </template>
                        <div>{{items.content}}</div>
                        <el-card style="margin-top:5%">
                        <template #header>
                            <div class="card-header">
                                <h3>评论</h3>
                            </div>
                        </template>
                        <div>{{items.content}}</div>

                    </el-card>
                    </el-card>
                </el-scrollbar>

            </el-main>
            <el-footer style="border: 1px rgb(234, 233, 233) solid;height:2.5rem;text-align: center;">
                <a href="https://github.com/ZYC-creator?tab=repositories" target="_blank">GitHub</a>|
                <a href="#">个人主页</a>
            </el-footer>
        </el-container>
    </div>
</template>
<script lang="ts">
import axios from 'axios';
import { onMounted, ref, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'DetailComponent',
    setup() {
        const activeIndex = ref('1')
        const $router = useRouter()
        const handleSelect = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        const $route = useRoute()
        const id = $route.params.id
        console.log(id);
        
        const username = $route.params.username
        console.log(username);
        
        const article = ref()
        onMounted(() => {
            axios.get(`/article?id=${id}`).then((res) => {
                article.value = res.data.results
                console.log(article.value);
            })
                .catch((err) => {
                    alert(err)
                })
        })
        const admin = ()=>{
            $router.push({path:`/admin/${username}`})
        }
        return {
            activeIndex,
            article,
            username,
            admin,
            handleSelect,
        }
    }
})

</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}
</style>