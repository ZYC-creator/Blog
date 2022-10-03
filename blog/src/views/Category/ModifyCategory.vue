<template>

    <div style="background-color: white;height: 40rem;">
        <el-scrollbar height="40rem">
            <div style="width: 40%;height:50%;margin-left: 20%;padding-top: 5%;">

                <el-form :model="form" label-width="120px">
                    <el-form-item label="分类">
                        <el-input v-model="form.category" placeholder="请输入分类" />
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
        const id = useRoute().params.id
        let form = reactive({
            id,
            category:'',
        })
        return {
            form
        }
    },
    async beforeCreate() {
        const category = useRoute().params.category
        await axios.get(`/getCategory?category=${category}`).then((res) => {
            this.$data.form.category = res.data.results[0].category
        })
    },
    setup() {
        const Modify = (form: any) => {
            axios.post('/modifyCategory', form).then((res) => {
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