<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="0">LOGO</el-menu-item>
                    <div class="flex-grow" />
                    <router-link :to="{name:'HomePage',params:{username:username}}">
                        <el-menu-item index="1">首页</el-menu-item>
                    </router-link>
                    <el-menu-item index="2">留言板</el-menu-item>
                    <!-- <el-menu-item index="3">好友</el-menu-item> -->
                    <div style="width: 10rem;"></div>
                    <el-menu-item-group index="3">
                        <el-input v-model="input2" style="height:50%;width: 100%;" placeholder="关键词搜索"
                            :suffix-icon="Search" clearable="true" />
                    </el-menu-item-group>
                    <el-menu-item-group index="4">
                        <el-button type="primary" @click="search(input2)">搜索</el-button>
                    </el-menu-item-group>
                    <div style="width: 40rem;"></div>
                    <el-sub-menu index="5" v-if="username">
                        <template #title>{{username}}</template>
                        <el-menu-item index="5-1" v-if="username==='zyc'" @click="admin(username)">博客管理</el-menu-item>
                        <router-link to="/HomePage"><el-menu-item index="5-2" @click="quit">退出</el-menu-item></router-link>
                    </el-sub-menu>
                    <el-menu-item v-else>
                        <router-link to="/login">登录</router-link>&nbsp;
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-main style="height:43rem;opacity: 0.8;">
                <el-scrollbar height="100%">
                    <div style="padding-bottom: 1rem;">
                        <span>分类</span>&nbsp;
                        <el-button type="info" text @click="allArticle" style="color: black;">全部</el-button>
                        <el-button v-for="items in category" :key="items.id" text type="info" style="color: black;"
                            @click="search(items.category)">{{items.category}}</el-button>
                    </div>
                    <el-card v-for="items in article" :key="items.id">
                        <template #header>
                            <div>
                                <span>作者:{{items.author}}</span>&nbsp;
                                <span>创作日期:{{items.createtime}}</span>&nbsp;
                                <span>文章分类:{{items.category}}</span>&nbsp;
                                <span>文章浏览量:{{items.views}}</span>
                            </div>
                        </template>
                        <el-link @click="detail(items.id,items.views,username)" type="primary"
                            style="text-decoration: underline;">
                            {{items.title}}</el-link>
                        <div style="overflow: hidden;white-space:nowrap;text-overflow:ellipsis">{{items.content}}</div>
                    </el-card>
                </el-scrollbar>
            </el-main>
            <el-footer style="height:2.5rem;text-align: center;">
                <a href="https://github.com/ZYC-creator?tab=repositories" target="_blank" style="color: black;">GitHub</a>|
                <a href="#" style="color: black;">个人中心</a>
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
export default defineComponent({
    name: 'HomePageComponent',
    data() {
        let username = useRouter().currentRoute.value.params.username
        let article = ref()
        let category = ref()
        return {
            username,
            input2: '',
            article,
            category
        }
    },
    async beforeCreate() {
        await axios.get('/article').then((res) => {
            this.$data.article = res.data.results

        }).catch((err) => {
            alert(err)
        })
        await axios.get('/category').then((res) => {
            this.$data.category = res.data.results
        })
    },
    methods:{
        allArticle:function () {
            axios.get('/article').then((res) => {
                const data = res.data
                this.$data.article = data.results

            })
                .catch((err) => {
                    alert(err)
                })
        },
        search:function (input2: string) {
            input2 = input2.replaceAll('+','%2B')
            .replaceAll('#','%23').replaceAll(' ','%20')
            .replaceAll('/','%2F').replaceAll('?','%3F')
            .replaceAll('&','%26').replaceAll('=','%3D')
            axios.get(`/searchArticle?content=${input2}`).then((res) => {
                this.$data.article = res.data.results
            })
                .catch((err) => {
                    alert(err)
                })
        },
        quit: function(){
            this.$data.username = ''
        }
    },
    beforeUpdate() {
        this.allArticle,
        this.search
    },
    setup(){
        const activeIndex = ref('1')
        const $router = useRouter()
        const detail = (id: number,views:number,username:any) => {
            views = views+1
            axios. post('/addViews',{views,id})
            $router.push({ path: `/detail/${id}/${username}` })
        }
        const admin = (username:any) => {
            $router.push({ path: `/admin/${username}` })
        }
        return {
            activeIndex,
            Search,
            detail,
            admin
        }
    }
})
</script>