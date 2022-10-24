<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">Logo</el-menu-item>
                    <router-link :to="{name:'HomePage',params:{username:username}}"><el-menu-item index="2">
                        首页
                    </el-menu-item></router-link>
                    <el-menu-item index="3">留言板</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="13rem" style="margin-left: 1.3rem;">
                    <el-scrollbar height="45rem">
                        <el-row>
                            <el-col>
                                <el-menu active-text-color="#ffd04b" background-color="#545c64"
                                    class="el-menu-vertical-demo" default-active="2" text-color="#fff">
                                  <router-link to="/deleteArticle" style="color: white"><el-menu-item index="1">文章管理</el-menu-item></router-link>
                                  <router-link to="/deleteCategory" style="color: white"><el-menu-item index="2">分类管理</el-menu-item></router-link>
                                  <router-link to="/deleteUsers" style="color: white"><el-menu-item index="3">用户管理</el-menu-item></router-link>
                                    <!-- <router-link to="/articleStatistic"><el-menu-item index="4">
                                        文章浏览统计
                                    </el-menu-item></router-link> -->
                                </el-menu>
                            </el-col>
                        </el-row>
                    </el-scrollbar>

                </el-aside>
                <el-container>
                    <el-main>
                        <router-view />
                    </el-main>
                    <el-footer style="height:2.5rem;text-align: center;">
                        <a href="https://github.com/ZYC-creator?tab=repositories" target="_blank" style="color: black;">GitHub</a>|
                        <a href="#" style="color: black;">个人主页</a>
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

<style>
a {
  text-decoration: none;
}

</style>