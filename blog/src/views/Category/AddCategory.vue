<template>
    <div style="background-color: white;height: 40rem;">
        <el-scrollbar height="40rem">
            <div style="width: 40%;height:50%;margin-left: 20%;padding-top: 5%;">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="分类">
                        <el-input v-model="form.category" placeholder="请输入分类" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Add(form)">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-scrollbar>
    </div>
</template>
    
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';
export default defineComponent({
    name: 'ModifyCategory',
    setup() {
        let form = reactive({
            category: '',
        })
        const Add = (form: any) => {
            axios.post('/addCategory', form).then((res) => {
                if (res.status === 200) {
                    alert('添加成功')
                }
            })
        }
        return {
            form,
            Add
        }
    }
})
</script>