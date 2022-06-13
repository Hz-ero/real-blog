<script setup lang='ts'>
import type { FormInstance } from "element-plus";
import { client } from "@/client";
import { mainStore } from "@/store";
const Store = mainStore();
const Router = useRouter();

const ruleFormRef = ref<FormInstance>();

const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the username"));
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  }
};

const ruleForm = reactive({
  pass: "",
  username: "",
});

const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  pass: [{ validator: validatePass, trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      console.log(ruleForm);
    } else {
      console.log("error submit!");
      return false;
    }
  });
  let { username, pass } = toRefs(ruleForm);
  let ret = await client.callApi("admin/Login", {
    username: username.value,
    password: pass.value,
  });
  if (!ret.isSucc) {
    console.error("login failed", ret.err);
    formEl.resetFields();
    return;
  }
  Store.currentAdmin = ret.res;
  localStorage.setItem("JWT_TOKEN", ret.res.__Token);
  Router.replace("/");
};
</script>

<template>
  <div
    class="backPage"
    flex
    bg-gray-100
    justify-center
    items-center
    h-screen
    w-screen
  >
    <div flex shadow-2xl pt-10 pb-6 rounded px-14 w-300px bg-white>
      <el-form
        flex-grow
        size="large"
        label-position="top"
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="220px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.number="ruleForm.username" />
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item pt-3>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import "@/style/base.scss";
</style>