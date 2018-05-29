<template>
  <div id="login">
    <h1 class="login-title">艺笺设计-后台管理</h1>
    <div class="login-form-wrap">
      <el-form :model="loginForm"
               :rules="loginRules"
               ref="loginForm">
        <el-form-item prop="name">
          <el-input type="text"
                    :maxlength="11"
                    placeholder="请输入用户名"
                    v-model="loginForm.name">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    :maxlength="16"
                    placeholder="请输入密码"
                    v-model="loginForm.password">
        </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('loginForm')"
                     :disabled="btnDisabled"
                     v-loading.fullscreen.lock="loading">
                     立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [
          { required: true, message: '未填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '未填写密码', trigger: 'blur' }
        ]
      },
      message: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
    ]),
    btnDisabled () {
      return this.loginForm.name === '' ||
            this.loginForm.password === ''
    }
  },
  mounted () {
    this.loginForm.phone = ''
  },
  methods: {
    changeView (type) {
      this.$emit('changeView', type)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loginFormParams = {
            name: this.loginForm.name,
            pwd: this.loginForm.password
          }
          if (this.message) {
            this.message.close()
          }
          this.loading = true
          this.login(loginFormParams)
            .then((info) => {
              // if (this.loginAndReload) {
              //   window.location.reload()
              // }
              this.loading = false
            })
            .catch((err) => {
              this.loading = false
              this.error(err.msg)
            })
        } else {
          return false
        }
      })
    },
    error (err) {
      this.message = this.$message({
        showClose: true,
        message: err,
        type: 'error'
      })
    },
    ...mapActions([
      'login'
    ])
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#login
  padding: 60px 0
  border-radius: 10px
  .login-title
    margin-top: 50px
    font-size: 38px
    color: $color-blue
    text-align: center
  .login-form-wrap
    margin: 40px auto 0
    width: 400px
  .login-options
    width: 400px
    margin: 0 auto
    display: flex
    justify-content: space-between
  .login-toregister, .login-toreset
    font-size: 14px
    color: $color-mid-grey
    border-bottom: 1px solid $color-light-grey
    padding: 0
    height: 14px
    line-height: 14px
    cursor: pointer
  .el-button
    width: 100%
    height: 40px
    font-size: 16px
    border-radius: 5px
    border: none
    background: #24b9ff
    &.is-disabled
      border: none
      background: #e5e5e5
      color: #ffffff
      &:hover
        background: #e5e5e5
        color: #ffffff
</style>