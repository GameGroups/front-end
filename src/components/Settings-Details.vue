<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Details</h2>
      <p>Change your email or password below</p>
    </div>
    <div class="hr"></div>
    <div v-if="this.successMsg" class="alert alert-success">{{this.successMsg}}</div>
    <div v-if="this.warningMsg" class="email-warning alert alert-warning"><svg class="exclamation-svg" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"/></svg>
      {{this.warningMsg}}</div>
    <div id="accordion" role="tablist" aria-multiselectable="true">
      <div class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h5 class="mb-0">
              Username: {{this.token['cognito:username']}}
          </h5>
        </div>
      </div>

      <div class="card">
      <a v-on:click="showEmail = !showEmail, resetEmailForm()" class="collapsed accord-a" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <div class="card-header can-edit" role="tab" id="headingTwo">
          <svg v-bind:class="{rotate: showEmail}" width="20" height="15" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/></svg>
          <h5 class="mb-0">
            Change Email
          </h5>
        </div>
      </a>
      <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
        <div class="card-block">
          <p>Enter your password to confirm changes</p>
          <form class="email-form" @submit.prevent="changeEmail(password)" >
            <div v-if="this.changeEmailErr" class="alert alert-danger">{{this.changeEmailErr.message}}</div>
            <span class="form-label no-padding">Your Email: </span>
            <span>{{yourEmail}}</span>

            <div class="form-group required new-email">
              <span class="form-label no-padding">New Email</span>
              <input v-model="newEmail" v-validate="'required|email'" type="text" :class="{'form-control': true, 'input-error': errors.has('New Email') }" name="New Email" required>
              <i v-show="errors.has('New Email')"></i>
              <p v-show="errors.has('New Email')" class="help-error">{{ errors.first('New Email') }}</p>
            </div>

            <div class="form-group required">
              <span class="form-label no-padding">Enter your password</span>
              <input v-model="password"  v-validate="'required'" type="password" :class="{'form-control': true, 'input-error': errors.has('Password') }" name="Password" required>
              <i v-show="errors.has('Password')"></i>
              <p v-show="errors.has('Password')" class="help-error no-padding">{{ errors.first('Password') }}</p>
            </div>
            <div class="btn-div">
              <button class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
      <div class="card">
        <a v-on:click="showStatus = !showStatus, resetVerifyForm()" class="collapsed accord-a" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseTwo">
          <div class="card-header can-edit" role="tab" id="headingFour">
            <svg v-bind:class="{rotate: showStatus}" width="20" height="15" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/></svg>
            <h5 class="mb-0">
              Email Status:
              <span class="alert-success email-status" v-if="emailStatus">Verified</span>
              <span class="alert-danger email-status" v-if="!emailStatus">Unverified</span>
            </h5>
          </div>
        </a>
        <div id="collapseFour" class="collapse" role="tabpanel" aria-labelledby="headingTwo">
          <div class="card-block">
            <template v-if="emailStatus">
              <p>Your email is verified - No action is required.</p>
            </template>
            <template v-if="!emailStatus">
              <p>Your email is unverified - Please enter the verification code that was sent to your email below to confirm your email. Click
                <span class="code-link" v-on:click="resendCode()"><u>here</u></span> to resend code.
                <span id="code-sent" class="alert-success">New code sent!</span></p>
              <form class="password-form" @submit.prevent="verifyEmail(veriCode)" >
                <div v-if="this.verifyEmailErr" class="alert alert-danger">{{this.verifyEmailErr.message}}</div>
                <div class="form-group required">
                  <span class="form-label no-padding">Verification Code</span>
                  <input v-model="veriCode"  v-validate="'required'" type="text" :class="{'form-control': true, 'input-error': errors.has('Verification Code') }" name="Verification Code" required>
                  <i v-show="errors.has('Verification Code')"></i>
                  <p v-show="errors.has('Verification Code')" class="help-error no-padding">{{ errors.first('Verification Code') }}</p>
                </div>
                <div class="btn-div">
                  <button class="btn btn-primary">Submit</button>
                </div>
              </form>
            </template>
          </div>
        </div>
      </div>
      <div class="card">
        <a v-on:click="showPass = !showPass, resetPassForm()" class="collapsed accord-a" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <div class="card-header can-edit" role="tab" id="headingThree">
          <svg v-bind:class="{rotate: showPass}" width="20" height="15" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/></svg>
          <h5 class="mb-0">
              Change Password
          </h5>
        </div>
        </a>
        <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree">
          <div class="card-block">
              <p>New password must be a minimum 8 characters and contain: 1 uppercase letter, 1 number</p>
            <form class="password-form" @submit.prevent="changePassword(currentPassword, newPassword)" >
              <div v-if="this.changePassErr" class="alert alert-danger">{{this.changePassErr.message}}</div>
              <div class="form-group required">
                <span class="form-label no-padding">Current Password</span>
                <input v-model="currentPassword"  v-validate="'required|min:8'" type="password" :class="{'form-control': true, 'input-error': errors.has('Current Password') }" name="Current Password" required>
                <i v-show="errors.has('Current Password')"></i>
                <p v-show="errors.has('Current Password')" class="help-error no-padding">{{ errors.first('Current Password') }}</p>
              </div>

              <div class="form-group required new-pass">
                <span class="form-label no-padding">New Password</span>
                <input v-model="newPassword" v-validate="'required|verify_password|min:8|confirmed:Confirm Password'" type="password" :class="{'form-control': true, 'input-error': errors.has('New Password') }" name="New Password" required>
                <i v-show="errors.has('New Password')"></i>
                <p v-show="errors.has('New Password')" class="help-error">{{ errors.first('New Password') }}</p>
              </div>

              <div class="form-group required">
                <span class="form-label no-padding">Confirm Password</span>
                <input v-model="confirmPass" type="password" :class="{'form-control': true, 'input-error': errors.has('Password') }" name="Confirm Password" required>
              </div>
              <div class="btn-div">
                <button class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import config from '../../config/dev.env'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

Vue.use(VeeValidate);

VeeValidate.Validator.extend('verify_password', {
  getMessage: field => `Password must contain at least: 1 uppercase letter, 1 number)`,
  validate: value => {
    var strongRegex = new RegExp('^(?=.*\\d)(?=.*[A-Z])');
    return strongRegex.test(value);
  }
});

export default {
  name: 'Details',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Details', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      showEmail: false,
      showPass: false,
      showStatus: false,
      currentPassword: '',
      newPassword: '',
      confirmPass: '',
      error: null,
      successMsg: '',
      newEmail: '',
      password: '',
      veriCode: '',
      emailStatus: null,
      warningMsg: '',
      yourEmail: '',
      changeEmailErr: null,
      verifyEmailErr: null,
      changePassErr: null
    }
  },
  methods: {
    showDelete (evt) {
      let el = evt.target
      setTimeout(() => {
        el.classList.remove('show-delete')
      }, 3000)
    },
    resetMenus: function () {
      this.showEmail = false;
      this.showPass = false;
      this.showStatus = false;
      this.error = null;
      this.$validator.reset();

      let x = document.getElementById('collapseTwo');
      let y = document.getElementById('collapseThree');
      let z = document.getElementById('collapseFour');
      x.className = 'collapse';
      y.className = 'collapse';
      z.className = 'collapse';

      window.scrollTo(0, 0);
    },
    resetPassForm: function () {
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPass = '';

      this.changePassErr = null;
      this.successMsg = '';
      this.warningMsg = '';
      this.$validator.reset();
    },
    resetEmailForm: function () {
      this.newEmail = '';
      this.password = '';

      this.changeEmailErr = null;
      this.successMsg = '';
      this.warningMsg = '';
      this.$validator.reset();
    },
    resetVerifyForm: function () {
      this.veriCode = '';

      this.verifyEmailErr = null;
      this.successMsg = '';
      this.warningMsg = '';
      this.$validator.reset();
    },
    resendCode: function () {
      this.$cognitoAuth.resendVerificationCode('email', (err, result) => {
        if (err) {
          this.verifyEmailErr = err;
        } else {
          var x = document.getElementById('code-sent')
          x.className = 'alert-success show';
          setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
        }
      })
    },
    changePassword: function (currentPass, newPass) {
      this.$cognitoAuth.changePassword(currentPass, newPass, err => {
        if (err) {
          if (err.code === 'NotAuthorizedException') {
            this.changePassErr = err;
            this.changePassErr.message = 'Could not change password. Confirm your current password was entered correctly.'
          }
          this.changePassErr = err;
        } else {
          this.resetMenus();
          this.resetPassForm();
          this.successMsg = 'Password changed successfully!';
        }
      })
    },
    changeEmail: function (password) {
      const attributeList = [];
      let email = {
        Name: 'email',
        Value: this.newEmail
      };
      attributeList.push(email);

      const cognitoUser = this.$cognitoAuth.getCurrentUser();
      const authenticationData = {
        Username: cognitoUser.getUsername(),
        Password: password
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const poolData = {
        UserPoolId: 'us-east-2_aRo6Xa58p',
        ClientId: config.COGNITO_CLIENT_ID
      };
      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: cognitoUser.getUsername(),
        Pool: userPool
      };
      cognitoUser.authenticateUser(authenticationDetails, {
        onFailure: (err) => {
          if (err.code === 'NotAuthorizedException') {
            this.changeEmailErr = err;
            this.changeEmailErr.message = 'Could not change email: Confirm your password was entered correctly.'
          }
          this.changeEmailErr = err;
        },
        onSuccess: (result) => {
          cognitoUser.updateAttributes(attributeList, (err) => {
            if (err) {
              this.changeEmailErr = err;
            } else {
              let refreshToken = cognitoUser.getSignInUserSession().getRefreshToken();
              cognitoUser.refreshSession(refreshToken, (err, session) => {
                if (err) {
                  this.changeEmailErr = err;
                } if (session) {
                  this.token = jwtDecode(session.getIdToken().jwtToken);
                  this.yourEmail = this.token.email;
                  this.emailStatus = this.token.email_verified;
                  this.resetMenus();
                  this.resetEmailForm();
                  this.successMsg = 'Your email has been changed successfully.';
                  this.warningMsg = 'Click email status below to verify your email!';

                  /* cognitoUser.getUserAttributes((err, result) => {
                    if (err) {
                      alert(err);
                      return;
                    }
                    for (var i = 0; i < result.length; i++) {
                      if (result[i].getName() === 'email') {
                        this.yourEmail = result[i].getValue();
                      }
                      if (result[i].getName() === 'email_verified') {
                        this.emailStatus = (result[i].getValue() === true);
                      }
                    }
                  }); */
                }
              })
            }
          });
        }
      })
    },
    verifyEmail: function (veriCode) {
      let cognitoUser = this.$cognitoAuth.getCurrentUser();
      cognitoUser.getSession((err, session) => {
        if (err) {
          this.verifyEmailErr = err;
          alert(err);
        } else {
          let refreshToken = cognitoUser.getSignInUserSession().getRefreshToken();
          cognitoUser.verifyAttribute('email', veriCode, {
            onFailure: (err) => {
              this.verifyEmailErr = err;
            },
            onSuccess: (result) => {
              cognitoUser.refreshSession(refreshToken, (err, session) => {
                if (err) {
                  this.verifyEmailErr = err;
                }
                this.token = jwtDecode(session.getIdToken().jwtToken);
                this.emailStatus = this.token.email_verified;
                this.resetMenus();
                this.resetVerifyForm();
                this.successMsg = 'Email verified successfully!';
              })
            }
          });
        }
      })
    }
  },
  created: function () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("Login: Couldn't get the session:", err, err.stack);
      } else {
        this.loggedIn = loggedIn;
        if (!loggedIn) {
          this.$router.replace(this.$route.query.redirect || '/login');
        }
      }
    });
  },
  beforeMount: function () {
    if (this.loggedIn) {
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Couldn't get the session:", err, err.stack);
          return;
        }
        this.token = jwtDecode(jwtToken);
        this.user = this.$cognitoAuth.getCurrentUser();
        this.emailStatus = this.token.email_verified;
        this.yourEmail = this.token.email;
      });
    } else {
      this.$router.replace(this.$route.query.redirect || '/login');
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .content {
    margin: 35px;
  }
  .container-fluid {
    padding: 0
  }
  .instructions {
    padding: 0 15px;
  }
  .hr {
    border-bottom: 1px solid #b5b5b5;
    margin-bottom: 25px;
  }
  #accordion {
    max-width: 800px;
    margin: 0 auto;
  }
  .rotate, .rotate2 {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
  }
  h5 {
    display: inline-block;
    font-size: initial;
  }
  .can-edit:hover {
    background: #d7d8d9;
  }
  .accord-a {
    color: black;
    text-decoration: none;
  }
  .instructions {
    padding-left: 25px;
    list-style-type: square;
    margin-bottom: 0;
  }
  .instructions>li {
    margin-bottom: 10px;
  }
  .card-block {
    padding: 25px;
  }
  .form-label {
    padding-left: 11px;
    font-weight: bold;
    font-size: .9em;
  }
  .no-padding {
    padding: 0;
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
  .password-form, .email-form {
    max-width: 350px;
    margin: 0 auto;
  }
  .email-form {
    margin-top: 25px;
  }
  .new-pass {
    margin-top: 35px;
  }
  .new-email {
    margin-top: 20px;
  }
  .btn-div {
    text-align: center;
  }
  .email-status {
    padding: 2px 8px;
    margin-left: 5px;
    border-radius: 3px;
  }
  .exclamation-svg {
    position: relative;
    top: 11px;
    left: -7px;
    padding: 5px;
    height: 2em;
    fill: #c3bb1bd4;
  }
  .email-warning {
    padding-top: 0;
  }
  .code-link {
    color: #007bff;
  }
  .code-link:hover {
    color: #0056b3;
    cursor: pointer;
    text-decoration: underline;
  }
  #code-sent {
    visibility: hidden;
    padding: 0.1em .7em;
    margin-left: .4em;
  }
  #code-sent.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }

  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }

  @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }

  @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }

  @media only screen and (max-width: 440px)  {
    .content {
      margin: .7em;
    }
  }
</style>
