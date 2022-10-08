<template>
    <div style="width: 30rem;height:25rem;margin-top: 10%;margin-left: 30%;background-color: white;">
        <h3 style="text-align: center;padding-top: 2rem;">注册</h3>
        <el-form :model="form" label-width="100px" style="max-width: 460px;padding-right: 2rem;">
            <el-form-item label="昵称">
                <el-input v-model="form.username" placeholder="请输入昵称" />
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
                        format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                </el-col>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="form.password" placeholder="请再次输入密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 50%;">注册</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
  
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'RegisterComponent',
    setup() {
        const form = reactive({
            username: '',
            gender: '',
            birthday: '',
            password: '',
        })
        const $router = useRouter();
        const onSubmit = () => {
            axios.post('/register', form)
                .then((res) => {
                    alert(res.data)
                    $router.push({ path: '/login' })
                })
                .catch((err) => {
                    alert(err);
                });
        }
        return {
            form,
            onSubmit
        }
    }
})
</script>
  