<template>
  
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="メール" prop="mail">
    <el-input type="email" v-model="ruleForm.mail" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="ユーザー名" prop="userId">
    <el-input type="username" v-model="ruleForm.userId" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="パスワード" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="再入力" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>

  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  
</el-form>
</template>
<script>
  export default {
    data() {
      var checkuserId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('ユーザー名を空白にはできません'));
        }
        setTimeout(() => {
 /*         if (!Number.isString(value)) {
            callback(new Error('请输入数字值'));
          } else */{
            if (5 > (value.trim().length) || (value.trim().length) > 10) {
              callback(new Error('ユーザー名は5桁から10桁の間に入力してください'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('パスワードを入力してください'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('もう一回入力してください'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('パスワード入力が不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          userId: ''
        },
        rules: {
          userId: [
            { validator: checkuserId, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
       
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>