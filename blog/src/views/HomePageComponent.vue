<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
                    <el-menu-item index="0">LOGO</el-menu-item>
                    <div class="flex-grow" />
                    <el-menu-item index="1">Processing Center</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Workspace</template>
                        <el-menu-item index="2-1">item one</el-menu-item>
                        <el-menu-item index="2-2">item two</el-menu-item>
                        <el-menu-item index="2-3">item three</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-header>
            <el-main style="border: 1px solid white;height:43rem">
                <el-scrollbar height="100%">
                    <el-card class="box-card" v-for="items in article" :key="items.id">
                        <template #header>
                            <div class="card-header">
                                <span>作者:{{items.author}}</span>&nbsp;
                                <span>创作日期:{{items.createtime}}</span>&nbsp;
                                <span>文章分类:{{items.category}}</span>&nbsp;
                                <span>文章浏览量:{{items.views}}</span>
                            </div>
                        </template>
                        <span @click="detail(items.id)">{{items.title}}</span>
                        <div >{{items.content}}</div>
                    </el-card>
                </el-scrollbar>
            </el-main>
            <el-footer style="border: 1px white solid;height:2.5rem;text-align: center;">
                <a href="https://github.com/ZYC-creator?tab=repositories" target="_blank">GitHub</a>|
                <a href="#">个人主页</a>
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'HomePageComponent',
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
        const detail = (id:number)=>{
            $router.push({path:`detail/${id}`})
        }
        return {
            username,
            article,
            activeIndex,
            handleSelect,
            detail,
        }

    }
})
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
</style>