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
                        <el-date-picker v-model="form.birthday" type="date" placeholder="Pick a date"
                            style="width: 100%" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                    </el-col>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.password" placeholder="请再次输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>
  
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios';
export default defineComponent({
    name: 'AddUsers',
    setup() {
        const form = reactive({
            username: '',
            gender: '',
            birthday: '',
            password: '',
        })
        const onSubmit = () => {
            axios.post('/register', form)
                .then((res) => {
                    if (res) {
                        alert('新增成功')
                    }

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
  