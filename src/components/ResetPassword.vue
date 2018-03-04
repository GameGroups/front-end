<template>
  <div class="reset row">
    <div class="col-md-12 form-container">
      <h2>Reset Password</h2>
      <div class="flex-wrap">
      <p v-if="!keySent" class="instructions-p">Enter your username to reset your password</p>
        <p v-if="keySent" class="instructions-p">A verification code has been sent to the email associated with your account. Enter the code and a new password below.</p>

      <div class="alert alert-danger" v-if="error">
          <p class="errorLi error" v-if="error">{{ error.message }}</p>
      </div>

      <form @submit.prevent="reset">
        <div v-if="!keySent" class="form-group required">
          <input v-validate="'required'" placeholder="Username" type="text" name="Username" :class="{'form-control': true, 'input-error': errors.has('Username') }" v-model="username" required>
          <i v-show="errors.has('Username')"></i>
          <p v-show="errors.has('Username')" class="help-error">{{ errors.first('Username') }}</p>
        </div>

        <div v-if="keySent" class="form-group required">
          <span class="form-label noPadding">Verification Code</span><br/>
          <input v-validate="'required'" type="text" name="Verification code" :class="{'form-control': true, 'input-error': errors.has('Verification code') }" required>
          <i v-show="errors.has('Verification code')"></i>
          <p v-show="errors.has('Verification code')" class="help-error">{{ errors.first('Verification code') }}</p>
        </div>

        <div v-if="keySent" class="form-group required">
          <span class="form-label noPadding">New Password</span><br/>
          <input v-validate="'required'" type="text" name="Verification code" :class="{'form-control': true, 'input-error': errors.has('Verification code') }" required>
          <i v-show="errors.has('Verification code')"></i>
          <p v-show="errors.has('Verification code')" class="help-error">{{ errors.first('Verification code') }}</p>
        </div>

        <div v-if="keySent" class="form-group required">
          <span class="form-label noPadding">Confirm Password</span><br/>
          <input v-validate="'required'" type="text" name="Verification code" :class="{'form-control': true, 'input-error': errors.has('Verification code') }" required>
          <i v-show="errors.has('Verification code')"></i>
          <p v-show="errors.has('Verification code')" class="help-error">{{ errors.first('Verification code') }}</p>
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
  data () {
    return {
      username: '',
      error: null,
      keySent: false
    };
  },
  methods: {
    reset () {
      this.$cognitoAuth.forgotPassword(this.username, (err, result) => {
        if (err) {
          if (err.code === 'UserNotFoundException') {
            this.error = err;
            this.error.message = 'Error: Password could not be changed. Confirm your username was entered correctly'
          }
        }
        if (result) {
          // this.$router.replace(this.$route.query.redirect || '/confirm_reset_password');
          this.keySent = true;
          this.error = null;
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
</style>
