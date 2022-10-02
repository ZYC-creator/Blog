<template>
    <el-scrollbar height="40rem">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="author" label="作者" width="180" />
            <el-table-column prop="title" label="标题" width="180" />
            <el-table-column prop="category" label="分类" />
            <el-table-column prop="createtime" label="发表日期" />
            <el-table-column prop="title" label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="Delete(scope.row.title)">删除</el-button>&nbsp;
                    <router-link :to="{name:'modifyArticle',params:{ title:scope.row.title}}">
                        <el-button type="primary">修改</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, onUpdated, ref } from 'vue';
export default defineComponent({
    name: 'DeleteUsers',
    setup() {
        let tableData = ref()
        axios.get('/article').then((res) => {
            tableData.value = res.data.results

        })
        const Delete = (title: string) => {
            axios.delete('/deleteArticle', { params: { title: title } }).then((res) => {
                if (res.data.status === 200) {
                    alert('删除成功')
                    axios.get('/article').then((res) => {
                        tableData.value = res.data.results
                    })
                }
            })
        }
        onUpdated(() => {
            Delete
        })
        return {
            tableData,
            Delete,
        }
    },
})
</script>