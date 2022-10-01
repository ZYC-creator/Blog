<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">Logo</el-menu-item>
                    <el-menu-item index="2">
                        首页
                    </el-menu-item>
                    <el-menu-item index="3">留言板</el-menu-item>
                    <el-sub-menu>
                        <template #title>分类</template>
                        <el-menu-item index="3-1">Java</el-menu-item>
                        <el-menu-item index="3-2">C</el-menu-item>
                        <el-menu-item index="3-3">Javascript</el-menu-item>
                        <el-menu-item index="3-4">C++</el-menu-item>
                        <el-menu-item index="3-5">Python</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="13rem" style="margin-left: 1.3rem;">
                    <el-scrollbar height="45rem">
                        <el-row>
                            <el-col>
                                <el-menu active-text-color="#ffd04b" background-color="#545c64"
                                    class="el-menu-vertical-demo" default-active="2" text-color="#fff">
                                    <el-sub-menu index="1">
                                        <template #title>
                                            <span>文章管理</span>
                                        </template>
                                            <el-menu-item index="1-1">发表文章</el-menu-item>
                                            <el-menu-item index="1-2">修改文章</el-menu-item>
                                            <el-menu-item index="1-3">删除文章</el-menu-item>
                                    </el-sub-menu>
                                    <el-sub-menu index="2">
                                        <template #title>分类管理</template>
                                        <el-menu-item index="2-1">新增分类</el-menu-item>
                                            <el-menu-item index="2-2">修改分类</el-menu-item>
                                            <el-menu-item index="2-3">删除分类</el-menu-item>
                                    </el-sub-menu>
                                    <el-sub-menu index="3">
                                        <template #title>用户管理</template>
                                        <el-menu-item index="3-1">新增用户</el-menu-item>
                                            <el-menu-item index="3-2">修改用户</el-menu-item>
                                            <el-menu-item index="3-3">删除用户</el-menu-item>
                                    </el-sub-menu>
                                    <el-menu-item index="4">
                                        文章浏览统计
                                    </el-menu-item>
                                </el-menu>
                            </el-col>
                        </el-row>
                    </el-scrollbar>

                </el-aside>
                <el-container>
                    <el-main>Main</el-main>
                    <el-footer style="border: 1px rgb(234, 233, 233) solid;height:2.5rem;text-align: center;">
                        <a href="https://github.com/ZYC-creator?tab=repositories" target="_blank">GitHub</a>|
                        <a href="#">个人主页</a>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'AdminComponent',
    setup() {
        const $useRoute = useRoute()
        const username = $useRoute.params.username
        return {
            username
        }
    }
})
</script>