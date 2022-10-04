<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="0">LOGO</el-menu-item>
                    <div class="flex-grow" />
                    <router-link :to="{name:'HomePage',params:{username:username}}"><el-menu-item index="1">首页</el-menu-item></router-link>
                    <el-menu-item index="2">个人主页</el-menu-item>
                    <el-menu-item index="3">留言板</el-menu-item>
                    <!-- <el-menu-item index="4">好友</el-menu-item> -->
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
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span>{{article1.title}}</span>
                                <el-button class="button" text>Operation button</el-button>
                            </div>
                        </template>
                       
                        <v-md-preview  height="400px" :text="article1.content"></v-md-preview>
                        <!-- <el-card style="margin-top:5%">
                        <template #header>
                            <div class="card-header">
                                <h3>评论</h3>
                            </div>
                        </template>
                        <div>{{article1.content}}</div>

                    </el-card> -->
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
import { ref, defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'DetailComponent',
    data() {
        let article1 = reactive({
             title:'',
             content:'',

        })
        return {
            article1,
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                mark: true, // 标记
                superscript: true, // 上角标
                quote: true, // 引用
                ol: true, // 有序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                help: true, // 帮助
                code: true, // code
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                navigation: true // 导航目录
            }
        }
    },
    beforeCreate() {
        const $route = useRoute()
        const id = $route.params.id
        axios.get(`/articleDetail?id=${id}`).then((res) => {
                this.$data.article1.content = res.data.results[0].content
                this.$data.article1.title = res.data.results[0].title
            })
                .catch((err) => {
                    alert(err)
                })
    },
    setup() {
        const activeIndex = ref('1')
        const $router = useRouter()
        const $route = useRoute()
        const username = $route.params.username  
        const admin = ()=>{
            $router.push({path:`/admin/${username}`})
        }
        return {
            activeIndex,
            username,
            admin,
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