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

               main
            </el-main>
            <el-footer style="border: 1px white solid;height:2.5rem;text-align: center;">
                <a href="https://github.com/ZYC-creator?tab=repositories" target="_blank">GitHub</a>|
                <a href="#">个人主页</a>
            </el-footer>
        </el-container>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
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