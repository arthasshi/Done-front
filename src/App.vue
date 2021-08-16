<template>
  <div id="app">
    <router-view v-if="$route.path != '/'"></router-view>
    <div class="reg-container" v-else>
      <el-button class="admin-login" type="text" @click="go2Home()"
        >Simulate Admin Login</el-button
      >
      <el-form
        :model="regForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="reg-form"
      >
        <el-form-item label="name" prop="username">
          <el-input v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item label="birth" prop="birth">
          <el-form-item prop="birth">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="choose date"
              v-model="regForm.birth"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="phone" prop="phone">
          <el-input v-model="regForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item label="address" prop="address">
          <el-input v-model="regForm.address"></el-input>
        </el-form-item>
        <el-form-item label="photo">
          <el-upload
            class="upload"
            ref="upload"
            :action="uploadUrl"
            :auto-upload="false"
            :file-list="fileList"
          >
            <el-button size="small" type="primary"
              >choose you driver lisence</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >regist</el-button
          >
          <el-button @click="resetForm('ruleForm')">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { regist } from "@/api/user";
export default {
  data() {
    return {
      regForm: {
        username: "",
        birth: "",
        phone: "",
        email: "",
        address: ""
      },
      fileList: [],
      uploadUrl: "", //the upload url for upload component
      rules: {
        username: [
          { required: true, message: "your name", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "length between 1 and 20",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "your phone", trigger: "blur" },
          {
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "your phone", trigger: "blur" },
          {
            type: "email",
            trigger: "blur"
          }
        ],
        address: [{ required: true, message: "your address", trigger: "blur" }],
        birth: [
          {
            required: true,
            message: "choose your birth day",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //submit when it's pass validate
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          regist(this.regForm).then(res => {
            if (res.code == 200) {
              this.$message.success("注册成功");
              this.uploadUrl = `/user/${res.data}/file`;
              this.$nextTick(() => {
                console.log("in next tick");
                this.$refs.upload.submit();
                this.resetForm("ruleForm");
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //reset the form for next add
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
    },
    //go to the user list page
    go2Home() {
      this.$router.push("/home");
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  .reg-container {
    width: 100%;
    height: 100vh;
    @extend %col;
    justify-content: center;
    position: relative;
    .reg-form {
      width: 400px;
      .upload {
        @extend %row;
        justify-content: flex-start;
      }
    }
    .admin-login {
      position: absolute;
      top: 20px;
      right: 40px;
    }
  }
}
</style>
