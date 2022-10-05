<template>

    <div style="background-color: white;height: 40rem;">
        <el-scrollbar height="40rem">
            <div style="width: 60%;height:50%;margin-left: 20%;padding-top: 5%;">

                <el-form :model="form" label-width="120px">
                    <el-form-item label="作者">
                        <el-input v-model="form.author" placeholder="请输入作者" />
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="form.title" placeholder="请输入标题" />
                    </el-form-item>
                    <el-form-item label="内容">
                        <v-md-editor height="400px" v-model="form.content" @upload-image="handleUploadImage"
                            :disabled-menus="[]">{{}}</v-md-editor>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-select v-model="form.category" class="m-2" placeholder="Select" size="large">
                            <el-option v-for="item in category" :key="item.id" :label="item.category"
                                :value="item.category" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发表日期">
                        <el-col :span="11">
                            <el-date-picker v-model="form.createtime" type="date" placeholder="Pick a date"
                                style="width: 100%" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="浏览量">
                        <el-input-number v-model="form.views" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Add(form)">发表</el-button>
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
    data() {
        let category: Array<any> = []
        let form = reactive({
            author: '',
            title: '',
            content: '',
            category: '',
            createtime: '',
            updatetime: '',
            views: 0,
        })
        return {
            category,
            context: ' ',//输入的数据
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                mark: true, // 标记
                superscript: true, // 上角标
                quote: true, // 引用
                ol: true, // 有序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                help: true, // 帮助
                code: true, // code
                subfield: true, // 是否需要分栏
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                undo: true, // 上一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                navigation: true // 导航目录
            },
            form
        };
    },
    beforeCreate() {
        axios.get('/category').then((res) => {
            this.$data.category = res.data.results
        })
    },
    methods: {
        Add: function (form: any) {
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
        },
        handleUploadImage: function (event: any, insertImage: any, files: any) {
            // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
            console.log(files);

            // 此处只做示例
            insertImage({
                url: `../Admin/views/assets/${files[0].name}`,
                desc: '七龙珠',
                // width: 'auto',
                // height: 'auto',
            });
        },
    },
})
</script>