<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-menu-item index="0">LOGO</el-menu-item>
                    <div class="flex-grow" />
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">留言板</el-menu-item>
                    <el-menu-item index="3">好友</el-menu-item>
                    <el-sub-menu index="4">
                        <template #title>分类</template>
                        <el-menu-item index="2-1">Java</el-menu-item>
                        <el-menu-item index="2-2">C</el-menu-item>
                        <el-menu-item index="2-3">Javascript</el-menu-item>
                        <el-menu-item index="2-5">C++</el-menu-item>
                        <el-menu-item index="2-6">Python</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <div style="width: 10rem;"></div>
                    <el-menu-item-group index="5">
                        <el-input v-model="input2" style="height:50%;width: 100%;" placeholder="Please Input"
                            :suffix-icon="Search" />
                    </el-menu-item-group>
                    <el-menu-item-group index="6">
                        <el-button type="primary" @click="search(input2)">搜索</el-button>
                    </el-menu-item-group>
                    <div style="width: 40rem;"></div>
                    <el-sub-menu index="7" v-if="username">
                        <template #title>{{username}}</template>
                        <el-menu-item index="7-1" v-if="username==='zyc'" @click="admin">博客管理</el-menu-item>
                        <el-menu-item index="7-2">退出</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else>
                        <router-link to="/login">登录</router-link>&nbsp;<router-link to="/register">注册</router-link>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="border: 1px solid rgb(234, 233, 233);height:43rem">
                <el-scrollbar height="100%">
                    <el-card v-for="items in article" :key="items.id">

                        <template #header>

                            <div>
                                <span>作者:{{items.author}}</span>&nbsp;
                                <span>创作日期:{{items.createtime}}</span>&nbsp;
                                <span>文章分类:{{items.category}}</span>&nbsp;
                                <span>文章浏览量:{{items.views}}</span>
                            </div>
                        </template>
                        <el-link @click="detail(items.id)" type="primary" style="text-decoration: underline;">
                            {{items.title}}</el-link>
                        <div style="overflow: hidden;white-space:nowrap;text-overflow:ellipsis">{{items.content}}</div>
                    </el-card>
                </el-scrollbar>
            </el-main>
            <el-footer style="border: 1px rgb(234, 233, 233) solid;height:2.5rem;text-align: center;">
                <a href="https://github.com/ZYC-creator?tab=repositories" target="_blank">GitHub</a>|
                <a href="#">个人中心</a>
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
export default defineComponent({
    name: 'HomePageComponent',
    data() {
        return {
            input2: '',
        }
    },
    setup() {
        const $route = useRoute()
        const username = $route.params.username
        const activeIndex = ref('1')
        const $router = useRouter()
        const handleSelect = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        const article = ref()

        onMounted(() => {
            axios.get('/article').then((res) => {
                const data = res.data
                article.value = data.results

            })
                .catch((err) => {
                    alert(err)
                })
        })
        const search = (input2: string) => {
            if (input2 === ' ') {
                console.log('空');

            }
            axios.get(`/searchArticle?content=${input2}`).then((res) => {
                const data = res.data
                article.value = data.results
            })
                .catch((err) => {
                    alert(err)
                })
        }
        onUpdated(() => {
            search
        })
        const detail = (id: number) => {
            $router.push({ path: `/detail/${id}/${username}` })
        }
        const admin = ()=>{
            $router.push({path:`/admin/${username}`})
        }
        return {
            username,
            article,
            activeIndex,
            handleSelect,
            search,
            detail,
            admin,
            Search
        }

    }
})
</script>