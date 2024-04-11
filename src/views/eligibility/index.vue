<template>
  <div>
    <!-- 查询考试资格 -->
        <el-form class="login" ref="loginForm" :model="loginForm" label-width="80px">
          <h2>查询考试资格</h2>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="loginForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="adnumber">
            <el-input type="adnumber" v-model="loginForm.adnumber"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input class="captcha" v-model="captcha"></el-input>
            <el-image class="img" :src="img" @click="refreshImg"></el-image>
          </el-form-item>
          <el-form-item>
            <el-button class="button" type="primary" @click="validateForm">登录</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
  name: 'EligibilityIndex',
  data () {
    return {
      loginForm: {
        name: '', // 姓名
        adnumber: '' // 学号
      },
      cname: '', // 用户填写的姓名
      cadnumber: '', // 用户填写的学号
      captcha: '', // 用户填写的验证码
      code: '', // 返回的code
      img: '' // 验证码图片
    }
  },
  methods: {
    // 刷新验证码
    refreshImg () {
      this.$http.get('http://localhost:8080/captcha')
        .then(res => {
          console.log(res)
          this.img = `data:image/gif;base64,${res.data.img}`
          this.code = res.data.code
          console.log(this.code)
        })
    },
    // 校验
    validateForm () {
      // 校验验证码是否错误
      if (this.captcha === '') {
        this.$message.error('请输入验证码')
        return false
      } else if (this.captcha !== this.code) {
        this.$message.error('验证码错误')
        this.refreshImg()
        this.captcha = ''
        return false
      }
      // 校验姓名学号是否为空
      if (this.loginForm.name === '') {
        this.$message.error('姓名不能为空')
        return false
      }
      if (this.loginForm.adnumber === '') {
        this.$message.error('学号不能为空')
        return false
      }
      // 如果全部校验成功，调用后端接口进行登录操作
      this.login()
    },
    // 姓名学号校验
    check () {
      if (
        this.loginForm.name !== this.cname &&
        this.loginForm.adnumber !== this.cadnumber
      ) {
        return false
      }
    },
    // 登录操作
    login () {
      this.$http.post('http://localhost:8080/qualification', this.loginForm, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          // console.log(res)
          this.cname = res.data.name
          this.cadnumber = res.data.adnumber
          this.check()
          if (res.data.isprem === '是') {
            alert('您拥有考试资格')
          } else if (res.data.isprem === '否') {
            alert('您并未获得考试资格')
          }
        })
        .catch(error => {
          console.log(error)
          alert('登录失败,姓名或学号输入有误')
          this.refreshImg()
          this.loginForm.name = ''
          this.loginForm.adnumber = ''
          this.captcha = ''
        })
    }
  },
  mounted () {
    this.refreshImg()
  }
}
</script>

<style>
el-container {
  height: 100%;
}
.sidebar {
  height: 100%;
  /* background-color: #f6f6f7; */
}
.sidebar .link {
  margin: 20px auto;
  width: 299px;
  height: 100%;
  border: none;
  font-weight: 700;
}
el-menu-item {
  font-size: 16px;
}
.el-main {
  width: 400px;
  height: 700px;
  background: #fafbfe;
}
.login {
  width: 300px;
  height: 300px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;
}
.login h2 {
  text-align: center;
  margin-bottom: 30px;
}
.captcha {
  float: left;
  width: 140px !important;
}
.img {
  width: 80px;
}
.button{
  position: absolute;
  left: 75px;
}
</style>
