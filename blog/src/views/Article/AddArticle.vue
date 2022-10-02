<template>

<div style="background-color: white;height: 40rem;">
        <el-scrollbar height="40rem">
            <div style="width: 40%;height:50%;margin-left: 20%;padding-top: 5%;">

                <el-form :model="form" label-width="120px">
                    <el-form-item label="作者">
                        <el-input v-model="form.author" placeholder="请输入作者" />
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="form.title" placeholder="请输入标题" />
                    </el-form-item>
                    <el-form-item label="内容">
                        <el-input v-model="form.content" placeholder="请输入内容" type="textarea" autosize />
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-input v-model="form.category" placeholder="请输入分类"/>
                    </el-form-item>
                    <el-form-item label="发表日期">
            <el-col :span="11">
                <el-date-picker v-model="form.createtime" type="date" placeholder="Pick a date" style="width: 100%" format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"/>
            </el-col>
        </el-form-item>
                    <el-form-item label="浏览量">
                        <el-input-number v-model="form.views" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Add(form)">修改</el-button>
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
    name: 'ModifyArticle',
    setup() {
        let form = reactive({
            author: '',
            title: '',
            content: '',
            category:'',
            createtime: '',
            updatetime: '',
            views: 0,
        })
        const Add = (form: any) => {
            let time1 = new Date(form.createtime)
            let time2 = new Date()
            let newTime1 = (time1.getFullYear()) + '-' + (time1.getMonth() + 1) + '-' + time1.getDate()
            let newTime2 = (time2.getFullYear()) + '-' + (time2.getMonth() + 1) + '-' + time2.getDate()
            form.createtime = newTime1
            form.updatetime = newTime2
            axios.post('/addArticle', form).then((res) => {
                if (res.status === 200) {
                    alert('发表成功')
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