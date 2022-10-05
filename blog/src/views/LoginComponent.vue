<template>
    <div class="box">
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px;padding-top: 2rem;padding-right: 2rem;">
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
        <el-dialog v-model="centerDialogVisible" title="提示" width="20%"  align-center>
                    <span>登录成功</span>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="toHome">确认</el-button>
                        </span>
                    </template>
                </el-dialog>
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
        let centerDialogVisible = ref(false)
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
                        centerDialogVisible.value = true
                        console.log(centerDialogVisible);
                        
                    }
                    else {
                        alert(res.data.msg)
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }
        const toHome = ()=>{
            centerDialogVisible.value = false
            $router.push({ path: `/HomePage/${formLabelAlign.name}` })
        }
        
        return {
            msg,
            labelPosition,
            formLabelAlign,
            centerDialogVisible,
            Register,
            Login,
            toHome,
        }
    },
})
</script>

<style>
.box {
    width: 30%;
    height: 15rem;
    border: 1px solid white;
    margin: 0 auto;
    margin-top: 10rem;
    background-color: white;
}
</style>
