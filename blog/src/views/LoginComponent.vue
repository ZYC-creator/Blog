<template>
    <div class="box">
        <h3 style="text-align: center;">登录</h3>
        <el-form :label-position="labelPosition" label-width="50px" :model="formLabelAlign"
            style="max-width: 460px;padding-top: 2rem;padding-right: 2rem;">
            <el-form-item label="姓名">
                <el-input v-model="formLabelAlign.name" placeholder="请输入用户名" clearable="true" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" clearable="true" />
            </el-form-item>
            <el-form-item>
                <el-link type="primary">忘记密码</el-link>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Login" style="width: 100%;">登录</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Register" style="width: 100%;">注册</el-button>
            </el-form-item>
        </el-form>
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
        const formLabelAlign = reactive({
            name: '',
            password: '',
        })
        let msg: Array<string> = [];
        const Register = () => {
            $router.push({ path: '/register' })
        }
        const Login = () => {
            axios.post("http://localhost:8080/login", formLabelAlign)
                .then((res) => {
                    if (res.data.results != 0) {
                        $router.push({ name: 'HomePage',params:{username:formLabelAlign.name} })
                    }
                    else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
        return {
            msg,
            labelPosition,
            formLabelAlign,
            Register,
            Login,
        }
    },
})
</script>

<style>
.box {
    width: 20%;
    height: 23rem;
    border: 1px solid white;
    margin: 0 auto;
    margin-top: 10rem;
    background-color: white;
}
</style>
