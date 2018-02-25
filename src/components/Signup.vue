<template>
  <div class="sign-up row  col-centered">
    <div class="col-sm-6 col-sm-offset-6 form-col">
      <h2>Sign Up</h2>
      <div class="instructions-container" v-if="seen">
        <ul class="instructions"><li>Fields marked with an asterisk " <span class="red">*</span> " are required</li>
          <li>Password must have an uppercase character and numeric character</li>
        </ul>
      </div>

      <div class="alert alert-danger" v-if="error || passwordErr">
        <ul class="errorList error" v-if="passwordErr" v-html="passwordErr">{{ passwordErr }}</ul>
        <p v-if="error" class="error">{{ error.message }}</p>
      </div>

      <form @submit.prevent="prepare">
       <div class="form-group required">
         <span class="form-label">Username</span><br/>
          <label class="control-label"></label>
          <input type="text" name="username" class="form-control" v-model="user.username" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Display Name</span><br/>
          <label class="control-label"></label>
          <input type="text" name="nickname" class="form-control" v-model="user.nickname" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Email</span><br/>
          <label class="control-label"></label>
          <input type="text" name="email" class="form-control" v-model="user.email" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Password</span><br/>
          <label class="control-label"></label>
          <input type="password" class="form-control" v-model="user.password" required>
        </div>
        <div class="form-group required">
          <span class="form-label">Confirm Password</span><br/>
          <label class="control-label"></label>
          <input type="password" class="form-control" v-model="confirmPass" required>
        </div>
        <div class="form-group required">
          <span class="form-label">Region</span><br/>
          <label class="control-label"></label>
          <select class="form-control" id="listRegion" name="region" v-model="customAttr.region" required>
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
        </div>
        <div class="form-group required">
          <span class="form-label">Skill Level</span><br/>
          <label class="control-label"></label>
          <select class="form-control" id="listSkill" name="skill-level" v-model="customAttr.skill" required>
            <option value="">Select a Skill Level...</option>
            <option>Noob</option>
            <option>Casual</option>
            <option>Amateur</option>
            <option>Average</option>
            <option>Above Average</option>
            <option>Semi - Pro</option>
            <option>Pro</option>
          </select>
        </div>
        <div class="form-group required">
          <span class="form-label">Time Commitment</span><br/>
          <label class="control-label"></label>
          <select class="form-control" id="listTime" name="time-commitement" v-model="customAttr.timeCommitment" required>
            <option value="">Select when you game the most...</option>
            <option>Daily</option>
            <option>Weekdays</option>
            <option>Weekends</option>
            <option>Weekly</option>
            <option>Unsure</option>
          </select>
        </div>
        <span class="form-label noPadding">Select your top 3 games</span><br/>
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
        </div>
        <div class="form-group">
          <span class="form-label noPadding">Tagline (Limit: 256 Characters)</span><br/>
          <input type="text" name="tagline" class="form-control optionalInput" v-model="customAttr.tagline" />
        </div>
        <div class="form-group">
          <span class="form-label noPadding">Bio (Limit: 500 Characters)</span><br/>
          <textarea name="bio" class="form-control optionalInput" v-model="customAttr.bio" />
        </div>
        <div class="btnContainer">
            <button class="btn btn-info">Sign Up</button>
            <button class="btn btn-light">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
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
      passwordErr: null,
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
    prepare () {
      this.seen = true;
      let isValid = true;
      this.passwordErr = null;
      if (this.user.password !== this.confirmPass) {
        isValid = false;
        this.seen = false;
        window.scrollTo(0, 0);
        this.passwordErr = '<li>Passwords do not match, Please try again</li>';
        console.log(this.passwordErr);
        console.log(this.user.password);
        console.log(this.confirmPass);
      }
      if (!this.hasNumber(this.user.password)) {
        if (this.passwordErr == null) {
          this.passwordErr = '<li>Password did not conform with policy: Password must have numeric characters</li>';
        } else {
          this.passwordErr += '<li>Password did not conform with policy: Password must have numeric characters</li>';
        }
        isValid = false;
        this.seen = false;
        window.scrollTo(0, 0);
      }
      if (!this.hasUppercase(this.user.password)) {
        if (this.passwordErr == null) {
          this.passwordErr = '<li>Password did not conform with policy: Password must have uppercase characters</li>';
        } else {
          this.passwordErr += '<li>Password did not conform with policy: Password must have uppercase characters</li>';
        }
        isValid = false;
        this.seen = false;
        window.scrollTo(0, 0);
      }
      if (isValid) {
        this.passwordErr = null;
        Vue.set(this.user, 'custom:region', this.customAttr.region);
        Vue.set(this.user, 'custom:skill-level', this.customAttr.skill);
        Vue.set(this.user, 'custom:time-commitment', this.customAttr.timeCommitment);
        Vue.set(this.user, 'custom:tagline', this.customAttr.tagline);
        Vue.set(this.user, 'custom:bio', this.customAttr.bio);
        // Vue.delete(this.$data, this.$data.region);
        // this.$data.region = 'testing';
        this.signup();
      }
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
  }
  .instructions>li {
    margin-bottom: 10px;
  }
  .instructions-container {
    padding: 12px 20px;
    background: #e9ecef;
    margin-bottom: 25px;
    border-radius: 0.25rem;
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
  }
</style>
