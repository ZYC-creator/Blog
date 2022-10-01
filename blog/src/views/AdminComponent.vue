<template>
    <div class="common-layout">
        <el-container>
            <el-header>

                <el-menu class="el-menu-demo" mode="horizontal"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
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
                    <el-menu-item index="3" disabled>Info</el-menu-item>
                    <el-menu-item index="4">Orders</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="15rem">
                    <el-scrollbar height="45rem">
                        <el-row >
                        <el-col >
                            <el-menu active-text-color="#ffd04b" background-color="#545c64"
                                class="el-menu-vertical-demo" default-active="2" text-color="#fff">
                                <el-sub-menu index="1">
                                    <template #title>
                                        <el-icon>
                                            <location />
                                        </el-icon>
                                        <span>Navigator One</span>
                                    </template>
                                    <el-menu-item-group title="Group One">
                                        <el-menu-item index="1-1">item one</el-menu-item>
                                        <el-menu-item index="1-2">item two</el-menu-item>
                                    </el-menu-item-group>
                                    <el-menu-item-group title="Group Two">
                                        <el-menu-item index="1-3">item three</el-menu-item>
                                    </el-menu-item-group>
                                    <el-sub-menu index="1-4">
                                        <template #title>item four</template>
                                        <el-menu-item index="1-4-1">item one</el-menu-item>
                                    </el-sub-menu>
                                </el-sub-menu>
                                <el-menu-item index="2">
                                    <el-icon>
                                        <icon-menu />
                                    </el-icon>
                                    <span>Navigator Two</span>
                                </el-menu-item>
                                <el-menu-item index="3" disabled>
                                    <el-icon>
                                        <document />
                                    </el-icon>
                                    <span>Navigator Three</span>
                                </el-menu-item>
                                <el-menu-item index="3" disabled>
                                    <el-icon>
                                        <document />
                                    </el-icon>
                                    <span>Navigator Three</span>
                                </el-menu-item>
                                <el-menu-item index="3" disabled>
                                    <el-icon>
                                        <document />
                                    </el-icon>
                                    <span>Navigator Three</span>
                                </el-menu-item>
                                <el-menu-item index="3" disabled>
                                    <el-icon>
                                        <document />
                                    </el-icon>
                                    <span>Navigator Three</span>
                                </el-menu-item>
                                <el-menu-item index="3" disabled>
                                    <el-icon>
                                        <document />
                                    </el-icon>
                                    <span>Navigator Three</span>
                                </el-menu-item>
                                <el-menu-item index="4">
                                    <el-icon>
                                        <setting />
                                    </el-icon>
                                    <span>Navigator Four</span>
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