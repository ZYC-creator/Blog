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
                        <el-input v-model="form.category" placeholder="请输入姓名"/>
                    </el-form-item>
                    <el-form-item label="发表日期">
                        <el-col :span="11">
                            <el-date-picker v-model="form.createtime" type="date" placeholder="Pick a date"
                                style="width: 100%" :default-value="new Date(form.createtime)" format="YYYY-MM-DD" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="浏览量">
                        <el-input-number v-model="form.views" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Modify(form)">修改</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </el-scrollbar>
    </div>

</template>

<script lang="ts">
import { defineComponent, onUpdated, reactive } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'ModifyUsers',
    data() {
        let form = reactive({
            id:0,
            author: '',
            title: '',
            content: '',
            category:'',
            createtime: '',
            updatetime: '',
            views: 0,
        })
        return {
            form
        }
    },
    async beforeCreate() {
        const title = useRoute().params.title
        await axios.get(`/getArticle?title=${title}`).then((res) => {
            console.log(res.data);
            this.$data.form.id = res.data.results[0].id
            this.$data.form.author = res.data.results[0].author
            this.$data.form.title = res.data.results[0].title
            this.$data.form.content = res.data.results[0].content
            this.$data.form.category = res.data.results[0].category
            this.$data.form.createtime = res.data.results[0].createtime
            this.$data.form.updatetime = res.data.results[0].updatetime
            this.$data.form.views = res.data.results[0].views
        })
    },
    setup() {
        const Modify = (form: any) => {
            let time1 = new Date(form.createtime)
            let time2 = new Date(form.updatetime)
            let newTime1 = (time1.getFullYear()) + '-' + (time1.getMonth() + 1) + '-' + time1.getDate()
            let newTime2 = (time2.getFullYear()) + '-' + (time2.getMonth() + 1) + '-' + time2.getDate()
            form.createtime = newTime1
            form.updatetime = newTime2
            axios.post('/modifyArticle', form).then((res) => {
                if (res.status === 200) {
                    alert('修改成功')
                }
            })
        }
        onUpdated(() => {
            Modify
        })
        return {
            Modify
        }
    }
})
</script>