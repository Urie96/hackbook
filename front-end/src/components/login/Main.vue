<template>
  <div class="main">
    <el-card shadow="always">
      <div slot="header">欢迎登录</div>
      <div style="padding-top: 10px"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="手机号"
            prefix-icon="el-icon-mobile-phone"
            autofocus
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input
            clearable
            show-password
            type="password"
            v-model="ruleForm.pass"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="width: 100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import md5 from 'js-md5';

export default {
  props: ['redirect'],
  data() {
    const validatePhone = (rule, value, cb) => {
      if (value.trim() === '') {
        cb(new Error('请输入手机号'));
        return;
      }
      const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        cb(new Error('手机号格式不正确'));
        return;
      }
      cb();
    };
    const validatePass = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请输入密码'));
        return;
      }
      if (value.length < 6 || value.length > 16) {
        cb(new Error('密码长度为6-16位'));
        return;
      }
      this.$refs.ruleForm.validateField('phone');
      cb();
    };
    return {
      ruleForm: {
        phone: '',
        pass: '',
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('login', {
              phone: this.ruleForm.phone,
              password: md5(this.ruleForm.pass),
            })
            .then(({ user }) => {
              window.loginUser = user;
              this.$router.replace(this.redirect || '/');
            })
            .catch((err) => {
              this.$message({
                message: err.message,
                type: 'error',
              });
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  background-color: #f6f8fa;
}
.main > .el-card {
  width: 100%;
  max-width: 400px;
}
</style>