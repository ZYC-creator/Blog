<template>
    <el-scrollbar height="40rem">
    <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="username" label="姓名" width="180"  />
    <el-table-column prop="gender" label="性别" width="180" />
    <el-table-column prop="birthday" label="出生日期" />
    <el-table-column prop="username" label="操作">
        <template v-slot="scope">
            <el-button type="primary" @click="Delete(scope.row.username)">删除</el-button>&nbsp;
            <router-link :to="{name:'modifyUsers',params:{username:scope.row.username}}"><el-button type="primary">修改</el-button></router-link>
        </template>
    </el-table-column>
  </el-table>
</el-scrollbar>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent,onUpdated,ref } from 'vue';
export default defineComponent({
    name:'DeleteUsers',
    setup() {
        let tableData = ref()
        axios.get('/users').then((res)=>{
            tableData.value = res.data.results
            
        })
        const Delete = (username:string)=>{
            axios.delete('deleteUsers',{params:{username:username}}).then((res)=>{
                if(res.data.status === 200){
                    alert('删除成功')
                    axios.get('/users').then((res)=>{
                        tableData.value = res.data.results
                    })
                }
            })
        }
        onUpdated(()=>{
            Delete
        })
        return {
            tableData,
            Delete,
        }
    },
})
</script>