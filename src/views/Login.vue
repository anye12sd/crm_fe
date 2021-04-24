<template>
  <div class="login">
    <div class="wrap">
      <!-- <div class="wrap" :style="{ backgroundImage: `url(${img})` }" style="background: linear-gradient(90deg, #096dd9, #6ec9ff);"> -->
      <div class="wrap_bgImg">
        <img :src="img" />
        <div class="wrap_blur"></div>
      </div>
      <div class="wrap_content">
        <div class="left_img">
          <a-carousel>
            <div v-for="item in imgList" :key="item.src">
              <span class="fmimg" :style="{ backgroundImage: `url(${item.src})` }">
              </span>
            </div>
          </a-carousel>
        </div>
        <a-card class="content" :bordered="false" style="width: 37.5%">
          <div class="logo_pic"><span style="font-size: 26px">机汇云</span></div>
          <div class="logo" style="width: 100%; max-width: 100%; margin-bottom: 20px">
            <div class="logo_title">欢迎使用机汇云CRM</div>
            <div class="logo_subtitle">Welcome to JihuiYunCRM</div>
          </div>
          <a-form-model
            layout="horizontal"
            :model="formInline"
            @submit="handleSubmit"
            @submit.native.prevent
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            ref="ruleForm"
            class="rulemodel"
          >
            <a-form-model-item prop="register" label="登录系统">
              <a-select
                style="width: 100%"
                @change="handleChange"
                :default-value="jihuiText[0]"
                placeholder="登录系统"
                allowClear
              >
                <a-select-option v-for="(item, index) in jihuiText" :key="item" :value="index">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item prop="ownerCode" label="单位简称">
              <a-input v-model="formInline.ownerCode" placeholder="请输入单位简称">
                <a-icon slot="prefix" type="bank" style="color: rgba(0, 0, 0, 0.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="loginName" label="登录名">
              <a-input v-model="formInline.loginName" placeholder="请输入帐号">
                <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
              </a-input>
            </a-form-model-item>
            <a-form-model-item class="form_loginpassword" prop="loginPassword" label="密码">
              <a-input v-model="formInline.loginPassword" type="password" placeholder="请输入密码">
                <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
              </a-input>
            </a-form-model-item>
            <!-- <a-form-model-item prop="randCode" class="randcode" label="校验码">
            <a-input v-model="formInline.randCode" type="randCode" placeholder="请输入校验码">
              <a-icon slot="prefix" type="safety" style="color: rgba(0, 0, 0, 0.25)" />
            </a-input>
            <img
                :src="`${baseUrl}/alphveriImg${time}`"
                @click="checkCode"
                alt="校验码"
                style="height: 32px; width: 105px"
            />
            <img
                :src="`/v4/alphveriImg${time}`"
                @click="checkCode"
                alt="校验码"
                style="height: 32px; width: 105px"
            />
          </a-form-model-item> -->
            <a-form-model-item class="form_password">
              <a-button @click="ChangePassword">修改密码</a-button>
              <a-button @click="ForgetPassword">忘记密码</a-button>
            </a-form-model-item>
            <a-form-model-item class="form_submit">
              <a-button :loading="loading" type="primary" html-type="submit" block>登录</a-button>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/login';
import store from '@/store';

export default {
  data() {
    return {
      loading: false,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      formInline: {
        ownerCode: '',
        loginName: '',
        loginPassword: ''
        // randCode: ''
      },
      img: require('../../image/bkgd.jpg'),
      rules: {
        // ownerCode: [{ required: true, message: '请选择登录系统', trigger: 'blur' }],
        ownerCode: [{ required: true, message: '请输入单位简称', trigger: 'blur' }],
        loginName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        loginPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        // randCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      jihuiText: ['JiHuiCRM系统', 'JiHuiKEY系统', 'JiHuiDSS系统'],
      imgList: [{ src: require('../../image/leftimg.jpg') }]
    };
  },
  methods: {
    handleChange(e) {
      this.formInline.ownerCode = e;
    },
    handleSubmit() {
      // if (!this.formInline.randCode) {
      //     return this.$message.error({
      //         closeable: true,
      //         content: '验证码不能为空!',
      //         duration: 2
      //     });
      // }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = {
            loginName: this.formInline.loginName,
            loginPassword: this.formInline.loginPassword,
            ownerCode: this.formInline.ownerCode
          };
          this.loading = true;
          api
            .postLogin(data)
            .then((res) => {
              console.log(res);
              if (res.code === 0) {
                let token = 'Bearer' + ' ' + res.data.token;
                this.$message.success('登录成功！');
                this.$cookies.set('loginName', this.formInline.loginName);
                this.$cookies.set('crmToken', token);
                const router = res.data.routes
                localStorage.setItem('router', JSON.stringify(router))
                store.dispatch('generateRoutes', router)
                setTimeout(() => {
                  this.loading = false;
                  if (this.$route.query.redirect) {
                    console.log(33311, this.$route.query.redirect)
                    this.$router.replace({
                      path: this.$route.query.redirect
                    });
                  } else {
                    console.log(111)
                    this.$router.replace({ path: '/' });
                  }
                }, 1000);
              } else {
                this.$message.error(res.msg);
                this.loading = false;
              }
            })
            .catch((err) => {
              console.log(err)
              this.loading = false;
            });
        }
      });
    },
    ChangePassword() {},
    ForgetPassword() {}
  }
};
</script>

<style>
.login {
  height: 100vh;
  display: flex;
}
.wrap_bgImg {
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
}
.wrap_blur {
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
}
.logo_pic {
  color: #000;
  margin-bottom: 25px;
}
.logo_title {
  font-size: 33px;
  font-weight: 700;
}
.logo_subtitle {
  font-family: arial;
  font-size: 26.4px;
  margin-top: 8px;
  line-height: 1;
  color: #333;
}
.wrap_content {
  z-index: 5;
  width: 80%;
  max-width: 1200px;
  height: 77%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 0 20px #115daf;
}
.wrap_content .left_img {
  float: left;
  width: 62.5%;
  height: 100%;
  position: relative;
}
.wrap_content .left_img .ant-carousel,
.wrap_content .left_img .ant-carousel .slick-slider,
.wrap_content .left_img .ant-carousel .slick-slider .slick-list,
.wrap_content .left_img .ant-carousel .slick-slider .slick-list div {
  height: 100%;
}
.wrap_content .left_img span {
  color: #fff;
  display: block;
  font-size: 28px;
  line-height: 2.2;
  height: 100%;
}
.wrap_content .left_img .fmimg {
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #21242b;
  background-position: center;
}
.wrap_content .left_img span img {
  width: 100%;
  height: 100%;
}
.wrap_content .content {
  float: right;
  height: 100%;
  overflow-y: auto;
}
.wrap_content .ant-form-explain {
  position: absolute;
}
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

/* .wrap::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
} */

.content {
  position: relative;
  z-index: 3;
  padding: 5.8% 5.8% 0 5.8%;
  background-color: rgba(255, 255, 255, 1);
}
@media screen and (max-width: 1500px) {
  .wrap_content {
    width: 90%;
    height: 80%;
  }
  .content {
    padding: 4% 4% 0 4%;
  }
  .logo_title {
    font-size: 33px;
  }
  .logo_subtitle {
    font-size: 26.4px;
  }
}
@media screen and (max-width: 1300px) {
  .wrap_content {
    height: 75%;
  }
  .logo_title {
    font-size: 31.5px;
  }
  .logo_subtitle {
    font-size: 25px;
  }
}
@media screen and (max-width: 1239px) and (min-width: 1119px) {
  .logo_title {
    font-size: 31.5px;
  }
  .logo_subtitle {
    font-size: 25px;
  }
}
@media screen and (max-width: 1118px) and (min-width: 1066px) {
  .logo_title {
    font-size: 30.5px;
  }
  .logo_subtitle {
    font-size: 24.4px;
  }
}
@media screen and (max-width: 1065px) and (min-width: 1031px) {
  .logo_title {
    font-size: 29.5px;
  }
  .logo_subtitle {
    font-size: 23.4px;
  }
}
@media screen and (max-width: 1030px) and (min-width: 996px) {
  .logo_title {
    font-size: 28.5px;
  }
  .logo_subtitle {
    font-size: 22.4px;
  }
}
@media screen and (max-width: 1300px) {
  .logo_pic {
    margin-bottom: 15px;
  }
}
@media screen and (max-width: 995px) and (min-width: 961px) {
  .logo_title {
    font-size: 27.5px;
  }
  .logo_subtitle {
    font-size: 22px;
  }
}
@media screen and (max-width: 960px) and (min-width: 926px) {
  .logo_title {
    font-size: 26.5px;
  }
  .logo_subtitle {
    font-size: 21px;
  }
  .rulemodel .form_submit .ant-btn {
    height: 40px;
  }
}
@media screen and (max-width: 925px) and (min-width: 835px) {
  .logo_title {
    font-size: 25.5px;
  }
  .logo_subtitle {
    font-size: 20px;
  }
}
@media screen and (max-width: 834px) and (min-width: 802px) {
  .logo_title {
    font-size: 24.5px;
  }
  .logo_subtitle {
    font-size: 19.4px;
  }
}
@media screen and (max-width: 1300px) {
  .wrap_content {
    height: 75%;
  }
}
@media screen and (max-height: 800px) {
  .content {
    padding: 3% 3% 0 3%;
  }
}
@media screen and (max-width: 1200px) and (max-height: 750px) {
  .wrap_content {
    height: 80%;
  }
}
@media screen and (max-width: 1180px) and (max-height: 700px) {
  .wrap_content {
    height: 90%;
  }
}
.content .ant-card-body {
  padding: 0;
}
.logo {
  line-height: 1;
  text-align: left;
  color: #000;
}
.rulemodel .ant-form-item-label,
.rulemodel .ant-form-explain {
  text-align: left;
}
.form_password {
  text-align: right;
}
.form_submit .ant-col-18,
.form_password .ant-col-18 {
  width: 100%;
}
.ant-form-item {
  margin-bottom: 8.5px;
}
.form_submit.ant-form-item,
.form_password.ant-form-item {
  margin-bottom: 0;
}
.form_password .ant-btn {
  border: none;
  padding: 0;
  height: auto;
  box-shadow: none;
  color: #6c6c6c;
  font-size: 12px;
  margin-left: 10px;
}
.form_password .ant-btn:active,
.form_password .ant-btn:focus {
  background-color: transparent;
  box-shadow: none;
  background: none;
  border: none;
}
.form_password .ant-btn:hover {
  color: #40a9ff;
  box-shadow: none;
  background: none;
  border: none;
}
.form_password .ant-form-item-control {
  line-height: 1;
}
.rulemodel .ant-col {
  margin-bottom: 4px;
}
.rulemodel .ant-form-item-control {
  line-height: 36px;
}
.rulemodel .ant-select-selection,
.rulemodel .ant-input {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #d9d9d9;
}
.rulemodel .ant-select-focused .ant-select-selection,
.rulemodel .ant-select-selection:focus,
.rulemodel .ant-select-selection:active,
.rulemodel .ant-input:focus,
.rulemodel .ant-input:active,
.rulemodel .has-error .ant-input-affix-wrapper .ant-input:focus {
  box-shadow: 0 0 0 transparent;
  border-bottom: 1px solid #40a9ff;
}
.rulemodel .ant-form-vertical .ant-form-item-label,
.rulemodel .ant-col-24.ant-form-item-label,
.rulemodel .ant-col-xl-24.ant-form-item-label {
  padding-bottom: 0;
}
.rulemodel .form_submit .ant-btn {
  height: 45px;
}
.rulemodel .ant-form-explain {
  display: none;
}
.rulemodel .form_loginpassword,
.rulemodel .form_loginpassword .ant-form-item-control-wrapper {
  margin-bottom: 0;
}
</style>