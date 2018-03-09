<template>
  <div class="reset row">
    <div class="col-md-12 form-container">
      <h2>Reset Password</h2>
      <div class="flex-wrap">
      <p class="instructions-p">Enter your username to reset your password</p>

      <div class="alert alert-danger" v-if="error">
          <p class="errorLi error" v-if="error">{{ error.message }}</p>
      </div>

      <form @submit.prevent="reset">
        <div class="form-group required">
          <input v-validate="'required'" placeholder="Username" type="text" name="Username" :class="{'form-control': true, 'input-error': errors.has('Username') }" v-model="username" required>
          <i v-show="errors.has('Username')"></i>
          <p v-show="errors.has('Username')" class="help-error">{{ errors.first('Username') }}</p>
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
  data () {
    return {
      username: '',
      error: null
    };
  },
  methods: {
    reset () {
      this.$cognitoAuth.forgotPassword(this.username, (err, result) => {
        if (err) {
          if (err.code === 'UserNotFoundException') {
            this.error = err;
            this.error.message = 'Error: Password cannot be changed. Confirm your username was entered correctly'
          }
          this.error = err;
        }
        if (result) {
          this.$router.replace(this.$route.query.redirect || '/confirm_reset_password/' + this.username);
        }
      });
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
