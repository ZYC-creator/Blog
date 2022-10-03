<template>
    <el-scrollbar height="40rem">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="category" label="分类" width="180" />
            <el-table-column prop="category" label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="Delete(scope.row.category)">删除</el-button>&nbsp;
                    <router-link :to="{name:'modifyCategory',params:{ category:scope.row.category,id:scope.row.id}}">
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
    name: 'DeleteCategory',
    setup() {
        let tableData = ref()
        axios.get('/category').then((res) => {
            tableData.value = res.data.results
        })
        const Delete = (category: string) => {
            axios.delete('/deleteCategory', { params: { category: category } }).then((res) => {
                if (res.data.status === 200) {
                    alert('删除成功')
                    axios.get('/category').then((res) => {
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