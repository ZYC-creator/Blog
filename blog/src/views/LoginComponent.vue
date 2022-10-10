<template>
    <div class="box" >
        <el-tabs type="border-card">
    <el-tab-pane label="登录">
        <el-form :label-position="labelPosition" label-width="60px" :model="loginForm"
            style="max-width: 460px;height: 16.5rem;padding-top: 2rem;padding-right: 2rem;" :rules="loginFormRules">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="loginForm.name" placeholder="请输入用户名" clearable="true" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" clearable="true" show-password="true" />
            </el-form-item>
            <el-form-item>
                <el-link type="primary">忘记密码</el-link>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Login" style="width: 100%;">登录</el-button>
            </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="注册">
        <el-form :model="form" label-width="30%" style="max-width: 460px;height: 18.5rem;" :rules="registerFormRules">
            <el-form-item label="昵称" prop="username">
                <el-input v-model="form.username" placeholder="请输入昵称" clearable="true" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="form.gender" placeholder="请选择性别" clearable="true" >
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="date">
                <el-col :span="11">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="Pick a date" style="width: 10rem"
                        format="YYYY/MM/DD" value-format="YYYY-MM-DD" clearable="true" />
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" clearable="true" show-password="true" />
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordConfirm">
                <el-input type="password" placeholder="请再次输入密码" clearable="true" show-password="true" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 50%;">注册</el-button>
            </el-form-item>
        </el-form>
    </el-tab-pane>
  </el-tabs>
    </div>
    
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'LoginComponent',
    setup() {
        const labelPosition = ref('right')
        const $router = useRouter()
        const loginForm = reactive({
            name: '',
            password: '',
        })
        const form = reactive({
            username: '',
            gender: '',
            birthday: '',
            password: '',
        })
        let msg: Array<string> = [];
        const Login = () => {
            axios.post("http://localhost:8080/login", loginForm)
                .then((res) => {
                    if (res.data.results != 0) {
                        $router.push({ name: 'HomePage', params: { username: loginForm.name } })
                    }
                    else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
        const onSubmit = () => {
            axios.post('/register', form)
                .then((res) => {
                    alert(res.data)
                })
                .catch((err) => {
                    alert(err);
                });
        }

        const loginFormRules = {
            username: [
                {
                    message: '请输入用户名', trigger: 'blur'
                }
            ],
            password: [
                {  message: '请输入密码', trigger: 'blur' },
            ]
        }
        const registerFormRules = {
            username: [
                {
                    required: true, message: '请输入用户名', trigger: 'blur'
                }
            ],
            gender:[
                {
                    required:true,message:'请选择性别',trigger:'blur'
                }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ],
            date:[
                {required:true,message:'请选择日期',trigger:'blur'}
            ],
            passwordConfirm:[
                {
                    required:'true',message:'请确认密码',trigger:'true'
                }
            ]
        }
        return {
            loginFormRules,
            registerFormRules,
            msg,
            form,
            labelPosition,
            loginForm,
            onSubmit,
            Login,
        }
    },
})
</script>

<style>
.box {
    width: 25%;
    height: 23rem;
    border: 1px solid white;
    margin: 0 auto;
    margin-top: 10rem;
    background-color: white;
    opacity: 0.8;
}
</style>
