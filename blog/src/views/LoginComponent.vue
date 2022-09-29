<template>
    <div class="box">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
            <el-form-item label="姓名">
                <el-input v-model="formLabelAlign.name" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" />
            </el-form-item>
        <el-form-item>
            <el-link type="primary">忘记密码</el-link>
        </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="Login">登录</el-button>
                <el-button type="primary" @click="Register">注册</el-button>
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
        let msg:Array<string> = [];
        const Register = () => {
            $router.push({ path: '/register' })
        }
        const Login = ()=>{
            axios.post("http://localhost:8080/login",formLabelAlign)
            .then((res) => {
                if(res.data.results !=0){
                    alert('登录成功')
                    $router.push({path:'/HomePage'})
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

<style >
.box{
    width: 30%;
    height: 15rem;
    border: 1px solid black;
    margin: 0 auto;
    margin-top: 10rem;
}
</style>
