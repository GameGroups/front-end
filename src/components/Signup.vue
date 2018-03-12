<template>
  <div class="sign-up row  col-centered">
    <div class="col-sm-6 col-sm-offset-6 form-col">
      <h2>Sign Up</h2>
      <div class="instructions-container" v-if="seen">
        <ul class="instructions"><li>Fields marked with an asterisk " <span class="red">*</span> " are required</li>
          <li>Password must have an uppercase character, numeric character, and minimum 8 characters</li>
        </ul>
      </div>

      <div class="alert alert-danger" v-if="error || passwordErr">
        <ul class="errorList error" v-if="passwordErr">
          <li class="errorLi" v-for="error in errorArray" v-bind:key="error">{{ error }}</li>
        </ul>
        <ul class="errorList error" v-if="error">
          <li class="errorLi error" v-if="error">{{ error.message }}</li>
        <!-- <p v-if="error" class="error">{{ error.message }}</p> -->
        </ul>
      </div>

      <form @submit.prevent="validateBeforeSubmit">
       <div class="form-group required">
         <span class="form-label">Username</span><br/>
          <label class="control-label"></label>
          <input v-validate="'required|alpha_dash'" type="text" name="Username" :class="{'form-control': true, 'input-error': errors.has('Username') }" v-model="user.username" required>
          <i v-show="errors.has('Username')"></i>
          <p v-show="errors.has('Username')" class="help-error">{{ errors.first('Username') }}</p>
        </div>

        <div class="form-group required">
          <span class="form-label">Display Name</span><br/>
          <label class="control-label"></label>
          <input v-validate="'required|alpha_dash'" :class="{'form-control': true, 'input-error': errors.has('Display Name') }" type="text" name="Display Name" v-model="user.nickname" required>
          <i v-show="errors.has('Display Name')"></i>
          <p v-show="errors.has('Display Name')" class="help-error">{{ errors.first('Display Name') }}</p>
        </div>

        <div class="form-group required">
          <span class="form-label">Email</span><br/>
          <label class="control-label"></label>
          <input v-validate="'required|email'" :class="{'form-control': true, 'input-error': errors.has('Email') }" type="text" name="Email" v-model="user.email" required>
          <i v-show="errors.has('Email')"></i>
          <p v-show="errors.has('Email')" class="help-error">{{ errors.first('Email') }}</p>
        </div>

        <div class="form-group required">
          <span class="form-label">Password</span><br/>
          <label class="control-label"></label>
          <input v-validate="'required|verify_password|min:8|confirmed:Confirm Password'" type="password" :class="{'form-control': true, 'input-error': errors.has('Password') }" v-model="user.password" name="Password" required>
          <i v-show="errors.has('Password')"></i>
          <p v-show="errors.has('Password')" class="help-error">{{ errors.first('Password') }}</p>
        </div>
        <div class="form-group required">
          <span class="form-label">Confirm Password</span><br/>
          <label class="control-label"></label>
          <input type="password" :class="{'form-control': true, 'input-error': errors.has('Password') }" v-model="confirmPass" name="Confirm Password" required>
        </div>
        <div class="form-group required">
          <span class="form-label">Region</span><br/>
          <label class="control-label"></label>
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Region') }" id="listRegion" name="Region" v-model="customAttr.region" required>
            <option value="">Select a Region...</option>
            <option>US - East</option>
            <option>US - West</option>
            <option>US - Central</option>
            <option>EU - East</option>
            <option>EU - West</option>
            <option>EU - Central</option>
            <option>Asia</option>
            <option>Oceania</option>
          </select>
          <i v-show="errors.has('Region')"></i>
          <p v-show="errors.has('Region')" class="help-error">{{ errors.first('Region') }}</p>
        </div>
        <div class="form-group required">
          <span class="form-label">Skill Level</span><br/>
          <label class="control-label"></label>
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Skill Level') }" id="listSkill" name="Skill Level" v-model="customAttr.skill" required>
            <option value="">Select a Skill Level...</option>
            <option>Noob</option>
            <option>Casual</option>
            <option>Amateur</option>
            <option>Average</option>
            <option>Above Average</option>
            <option>Semi - Pro</option>
            <option>Pro</option>
          </select>
          <i v-show="errors.has('Skill Level')"></i>
          <p v-show="errors.has('Skill Level')" class="help-error">{{ errors.first('Skill Level') }}</p>
        </div>
        <div class="form-group required">
          <span class="form-label">Time Commitment</span><br/>
          <label class="control-label"></label>
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Time Commitment') }" id="listTime" name="Time Commitment" v-model="customAttr.timeCommitment" required>
            <option value="">Select when you game the most...</option>
            <option>Daily</option>
            <option>Weekdays</option>
            <option>Weekends</option>
            <option>Weekly</option>
            <option>Unsure</option>
          </select>
          <i v-show="errors.has('Time Commitment')"></i>
          <p v-show="errors.has('Time Commitment')" class="help-error">{{ errors.first('Time Commitment') }}</p>
        </div>
        <!-- <span class="form-label noPadding">Select your top 3 games</span><br/>
        <div id="game1" class="form-group required">
          <label class="control-label">1. </label>
          <select class="form-control gameSelect" required>
            <option value="">Select a Game...</option>
            <option>Guild Wars 2</option>
          </select>
        </div>
        <div class="form-group required" id="game2">
          <label class="noAst">2. </label>
          <select class="form-control gameSelect" disabled>
            <option value="">Coming Soon...</option>
            <option>Game 1</option>
            <option>Game 2</option>
            <option>Game 3</option>
          </select>
        </div>
        <div class="form-group required" id="game3">
          <label class="noAst">3. </label>
          <select class="form-control gameSelect" disabled>
            <option value="">Coming Soon...</option>
            <option value="game1">Game 1</option>
            <option value="game2">Game 2</option>
            <option value="game3">Game 3</option>
          </select>
        </div> -->
        <div class="form-group noAst">
          <span class="form-label noPadding">Tagline (Limit: 256 Characters)</span><br/>
          <textarea v-validate="'max:256'" :class="{'optionalInput': true, 'form-control': true, 'input-error': errors.has('Tagline') }" name="Tagline" v-model="customAttr.tagline" />
          <i v-show="errors.has('Tagline')"></i>
          <p v-show="errors.has('Tagline')" class="help-error">{{ errors.first('Tagline') }}</p>
        </div>
        <div class="form-group noAst">
          <span class="form-label noPadding">Bio (Limit: 500 Characters)</span><br/>
          <textarea v-validate="'max:500'" :class="{'optionalInput': true, 'form-control': true, 'input-error': errors.has('Bio') }" name="Bio" v-model="customAttr.bio" />
          <i v-show="errors.has('Bio')"></i>
          <p v-show="errors.has('Bio')" class="help-error">{{ errors.first('Bio') }}</p>
        </div>
        <div class="btnContainer">
            <button class="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

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
  name: 'Signup',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Sign Up', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      error: null,
      passwordErr: false,
      errorArray: [],
      confirmPass: '',
      seen: true,
      user: {
        username: '',
        nickname: '',
        email: '',
        password: '',
        // games: [{gameID: 1, name: guild wars 2, logo: url}]
        // region: '',
        'custom:region': '',
        'custom:skill-level': '',
        'custom:time-commitment': '',
        'custom:tagline': '',
        'custom:bio': ''
      },
      customAttr: {
        region: '',
        skill: '',
        timeCommitment: '',
        tagline: '',
        bio: ''
      }
    };
  },
  methods: {
    validateBeforeSubmit () {
      this.errorArray = [];
      this.passwordErr = false;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.prepare();
        } else {
          this.seen = false;
          window.scrollTo(0, 0);
          this.passwordErr = true;
          this.errorArray.push('Please correct the highlighted fields!');
        }
      })
    },
    prepare () {
      this.passwordErr = null;
      Vue.set(this.user, 'custom:region', this.customAttr.region);
      Vue.set(this.user, 'custom:skill-level', this.customAttr.skill);
      Vue.set(this.user, 'custom:time-commitment', this.customAttr.timeCommitment);
      Vue.set(this.user, 'custom:tagline', this.customAttr.tagline);
      Vue.set(this.user, 'custom:bio', this.customAttr.bio);
      // Vue.delete(this.$data, this.$data.region);
      // this.$data.region = 'testing';
      this.signup();
    },
    signup () {
      this.$cognitoAuth.signup(this.$data.user, (err, result) => {
        if (err) {
          this.seen = false;
          window.scrollTo(0, 0);
          this.error = err;
          console.error(err);
        } else {
          console.log('Signup successful:', result);
          this.$router.replace({path: '/confirm', query: {username: this.username}})
        }
      })
    },
    hasNumber (myString) {
      return /\d/.test(myString);
    },
    hasUppercase (myString) {
      return /[A-Z]/.test(myString);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .col-centered{
    float: none;
    margin: 0 auto;
  }
  .sign-up {
    margin-top: 35px;
    max-width: 70vh;
    margin-bottom: 35px;
  }
  .form-group.required .control-label:before {
    content:"* ";
    color:red;
  }
  .form-control {
    width: 95%;
    display: inline;
  }
  .form-col {
    flex: initial;
    max-width: initial;
  }
  .inputs {
    max-width: 300px;
  }
  .instructions {
    padding-left: 25px;
    list-style-type: square;
    margin-bottom: 0;
  }
  .instructions>li {
    margin-bottom: 10px;
  }
  .instructions-container {
    padding: 12px 20px;
    background: #e9ecef;
    margin-bottom: 25px;
    border-radius: 0.25rem;
    line-height: 1.2;
  }
  .gameSelect {
    max-width: calc(95% - 17px);
  }
  .optionalInput {
    width: calc(95% + 11px);
  }
  .noAst {
    padding-left: 11px;
  }
  .btnContainer {
    text-align: center;
  }
  .btn-light {
    background: #a3a1a1;
    color: white;
  }
  .btn-light:hover {
    background: #b9b9b9;
  }
  .red {
    color: red;
  }
  .form-label {
    padding-left: 11px;
    font-weight: bold;
    font-size: .9em;
  }
  .noPadding {
    padding: 0;
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
  .input-error {
    border-color: red;
    box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.23);
    -webkit-box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.23);
  }
  .help-error {
    font-size: .8em;
    padding-left: 11px;
    padding-right: 10px;
    color: #bd0101;
  }
</style>
