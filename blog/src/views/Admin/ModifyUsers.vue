<template>
    <div style="background-color: white;height: 40rem;">
        <div style="width: 40%;height:50%;margin-left: 20%;padding-top: 5%;">
            <el-form :model="form" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="form.username" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.gender" placeholder="请选择性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-col :span="11">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="Pick a date" style="width: 100%"
                    :default-value="new Date(form.birthday)"
                        format="YYYY-MM-DD"/>
                </el-col>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input placeholder="请再次输入密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Modify(form)">修改</el-button>
            </el-form-item>
        </el-form>
        </div>
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
            username: '',
            gender: '',
            password: '',
            birthday: '',
        })
        return {
            form
        }
    },
     async beforeCreate() {
        const username = useRoute().params.username
        await axios.get(`/getUsers?username=${username}`).then((res) => {
            this.$data.form.username = res.data.results[0].username
            this.$data.form.password = res.data.results[0].password
            this.$data.form.gender = res.data.results[0].gender
            this.$data.form.birthday = res.data.results[0].birthday
        })
    },
    setup(){

        const Modify = (form:any)=>{
            var time = new Date(form.birthday)
            var newTime=(time.getFullYear()) + '-' + (time.getMonth() + 1) + '-' + time.getDate()
            form.birthday = newTime
            axios.post('/modifyUsers',form).then((res)=>{
                if(res.status === 200) {
                    alert('修改成功')
                }
            })
        }
        onUpdated(()=>{
            Modify
        })
        return {
            Modify
        }
    }
})
</script>