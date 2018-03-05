<template>
  <div class="reset row">
    <div class="col-md-12 form-container">
      <h2>Reset Password</h2>
      <div class="flex-wrap">
        <p class="instructions-p">A verification code has been sent to the email associated with your account. Enter the code and a new password below.</p>

        <div class="alert alert-danger" v-if="error">
          <p class="errorLi error" v-if="error">{{ error.message }}</p>
        </div>

        <form @submit.prevent="confirm">
          <div class="form-group required">
            <span class="form-label noPadding">Verification Code</span><br/>
            <input v-validate="'required'" type="text" name="Verification code" :class="{'form-control': true, 'input-error': errors.has('Verification code') }" v-model="veriCode" required>
            <i v-show="errors.has('Verification code')"></i>
            <p v-show="errors.has('Verification code')" class="help-error">{{ errors.first('Verification code') }}</p>
          </div>

          <div class="form-group required password-group">
            <span class="form-label noPadding">New Password</span><br/>
            <input v-model="password" v-validate="'required|verify_password|min:8|confirmed:Confirm Password'" type="password" name="New password" :class="{'form-control': true, 'input-error': errors.has('New password') }" required>
            <i v-show="errors.has('New password')"></i>
            <p v-show="errors.has('New password')" class="help-error">{{ errors.first('New password') }}</p>
          </div>

          <div class="form-group required">
            <span class="form-label noPadding">Confirm Password</span><br/>
            <input v-model="confirmPass" v-validate="'required'" type="password" name="Confirm Password" :class="{'form-control': true, 'input-error': errors.has('Confirm Password') }" required>
            <i v-show="errors.has('Confirm Password')"></i>
            <p v-show="errors.has('Confirm Password')" class="help-error">{{ errors.first('Confirm Password') }}</p>
          </div>

          <div class="btnContainer">
            <button class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

VeeValidate.Validator.extend('verify_password', {
  getMessage: field => `Password must contain at least: 1 uppercase letter, 1 number)`,
  validate: value => {
    var strongRegex = new RegExp('^(?=.*\\d)(?=.*[A-Z])');
    return strongRegex.test(value);
  }
});

export default {
  name: 'ResetPassword',
  metaInfo: {
    title: 'GameGroups',
    titleTemplate: '%s - Reset Password',
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  props: ['username'],
  data () {
    return {
      error: null,
      veriCode: '',
      password: '',
      confirmPass: ''
    };
  },
  methods: {
    confirm () {
      this.$cognitoAuth.confirmPassword(this.username, this.veriCode, this.password, (err, result) => {
        if (err) {
          this.error = err;
          console.log(err)
        } else {
          this.$router.replace(this.$route.query.redirect || '/reset_password_success');
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss" >
  .reset {
    margin: 2.2em;
  }
  .form-container {
  }
  .input-error {
    border-color: red;
    box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.23);
    -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.23);
  }
  .help-error {
    font-size: .8em;
    padding-right: 10px;
    color: #bd0101;
  }
  .errorList {
    padding-left: 25px;
    margin-bottom: 0;
    list-style-type: square;
  }
  .errorLi {
    line-height: 1.2;
    margin-bottom: 10px;
  }
  input {
    max-width: 22em;
  }
  .instructions-p {
    margin-bottom: 2.7em;
  }
  .form-label {
    padding-left: 11px;
    font-weight: bold;
    font-size: .9em;
  }
  .noPadding {
    padding: 0;
  }
  .password-group {
    margin-top: 2.5em;
  }
  .alert-danger {
    display: inline-block;
  }
</style>
