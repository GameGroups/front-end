<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Profile</h2>
      <p>Edit your information below</p>
    </div>
    <div class="hr"></div>

    <div class="col-sm-6 col-sm-offset-6 form-col form-container">
      <div class="alert-success" v-if="successMsg.length > 0">{{successMsg}}</div>
      <form @submit.prevent="update(user.password)">
        <div class="instructions-container">
          <ul class="instructions">
            <li>Fields marked with an asterisk " <span class="red">*</span> " are required</li>
          </ul>
          <svg class="exclamation-svg" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"/></svg>
          <b class="important">Important:</b> Enter your password to confirm changes
        </div>

        <div class="alert alert-danger" v-if="error || boolError">
          <ul class="errorList error" v-if="boolError">
            <li class="errorLi" v-for="error in errorArray" v-bind:key="error">{{ error }}</li>
          </ul>
          <ul class="errorList error" v-if="error">
            <li class="errorLi error" v-if="error">{{ error.message }}</li>
          </ul>
        </div>

        <div class="form-group required">
          <span class="form-label">Display Name</span><br/>
          <label class="control-label"></label>
          <input  v-validate="'required|alpha_dash'" :class="{'form-control': true, 'input-error': errors.has('Display Name') }" type="text" name="Display Name" v-model="user.nickname" required>
          <i v-show="errors.has('Display Name')"></i>
          <p v-show="errors.has('Display Name')" class="help-error">{{ errors.first('Display Name') }}</p>
        </div>

        <div class="form-group required">
          <span class="form-label">Region</span><br/>
          <label class="control-label"></label>
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Region') }" v-model="user.region" id="listRegion" name="Region" required>
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
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Skill Level') }" v-model="user.skill" id="listSkill" name="Skill Level" required>
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
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Time Commitment') }" v-model="user.time" id="listTime" name="Time Commitment" required>
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

        <span class="form-label">Select your top 3 games</span><br/>
        <div id="game1" class="form-group required">
          <label class="control-label">1. </label>
          <select v-validate="'required'" :class="{'form-control': true, 'gameSelect': true, 'input-error': errors.has('Game 1')}" v-model="user.game" name="Game 1" required>
            <option value="">Select a Game...</option>
            <option>Guild Wars 2</option>
          </select>
          <i v-show="errors.has('Game 1')"></i>
          <p v-show="errors.has('Game 1')" class="game-error help-error">{{ errors.first('Game 1') }}</p>
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

        <div class="form-group noAst">
          <span class="form-label noPadding">Tagline (Limit: 256 Characters)</span><br/>
          <textarea v-validate="'max:256'" :class="{'optionalInput': true, 'form-control': true, 'input-error': errors.has('Tagline') }" v-model="user.tagline" name="Tagline"/>
          <i v-show="errors.has('Tagline')"></i>
          <p v-show="errors.has('Tagline')" class="help-error">{{ errors.first('Tagline') }}</p>
        </div>
        <div class="form-group noAst">
          <span class="form-label noPadding">Bio (Limit: 500 Characters)</span><br/>
          <textarea v-validate="'max:500'" :class="{'optionalInput': true, 'form-control': true, 'input-error': errors.has('Bio') }" v-model="user.bio" name="Bio"/>
          <i v-show="errors.has('Bio')"></i>
          <p v-show="errors.has('Bio')" class="help-error">{{ errors.first('Bio') }}</p>
        </div>

        <div class="form-group noAst">
          <span class="form-label noPadding">Enter your password to confirm changes</span><br/>
          <input id="password" type="password" name="Password" v-model="user.password" :class="{'optionalInput': true, 'form-control': true, 'input-error': errors.has('Password') }" required>
        </div>
        <div class="submit-div">
          <button class="btn btn-primary">Update</button>
        </div>
      </form>
      <p>token nickname {{this.token.nickname}}</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import jwtDecode from 'jwt-decode';
import { AWSCognito } from 'aws-sdk'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

export default {
  name: 'Signup',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Account', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      boolError: false,
      error: null,
      errorArray: [],
      boolInstructions: true,
      successMsg: '',
      user: {
        nickname: '',
        password: '',
        region: '',
        skill: '',
        time: '',
        game: '',
        tagline: '',
        bio: ''
      }
    }
  },
  methods: {
    putError (msg) {
      this.boolError = true;
      this.errorArray.push(msg);
      this.boolInstructions = false;
    },
    update (password) {
      let errorMsg = '';
      let successMsg = '';
      const attributeList = [];
      let nickname = {
        Name: 'nickname',
        Value: this.user.nickname
      }; // tagline bio
      let region = {
        Name: 'custom:region',
        Value: this.user.region
      };
      let skill = {
        Name: 'custom:skill-level',
        Value: this.user.skill
      };
      let time = {
        Name: 'custom:time-commitment',
        Value: this.user.time
      };
      let tagline = {
        Name: 'custom:tagline',
        Value: this.user.tagline
      };
      let bio = {
        Name: 'custom:bio',
        Value: this.user.bio
      };
      attributeList.push(nickname, region, skill, time, tagline, bio);
      const cognitoUser = this.$cognitoAuth.getCurrentUser();

      const authenticationData = {
        Username: cognitoUser.getUsername(),
        Password: password
      };
      this.user.password = '';
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const poolData = { UserPoolId: 'us-east-2_aRo6Xa58p',
        ClientId: '6r5l1vmua09uqgp11i5gs880je'
      };
      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: cognitoUser.getUsername(),
        Pool: userPool
      };
      // const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          let refreshToken = cognitoUser.getSignInUserSession().getRefreshToken();
          /* Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer */

          cognitoUser.updateAttributes(attributeList, function (err, result) {
            if (err) {
              this.putError(err);
              this.boolError = true;
              this.boolInstructions = false;
              this.errorArray.push(err);
              console.error(err)
            } else {
              alert('success')
              cognitoUser.refreshSession(refreshToken, function (err, result) {
                if (err) {
                  console.log(err);
                }
                // console.log('idToken + ' + result.idToken.jwtToken);
                // console.log('access token + ' + result.getAccessToken().getJwtToken());
              })
            }
          });
        },
        onFailure: function (err) {
          if (err.name === 'NotAuthorizedException') {
            errorMsg = 'Error: Account could not be authenticated. Confirm that your password was entered correctly.';
            alert(errorMsg);
          } else {
            errorMsg = err;
            alert('other' + errorMsg);
          }
        }
      });
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
  beforeMount () {
    if (this.loggedIn) {
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Dashboard: Couldn't get the session:", err, err.stack);
          return;
        }

        this.token = jwtDecode(jwtToken);
        this.user.nickname = this.token.nickname;
        this.user.region = this.token['custom:region'];
        this.user.skill = this.token['custom:skill-level'];
        this.user.time = this.token['custom:time-commitment'];
        this.user.tagline = this.token['custom:tagline'];
        this.user.bio = this.token['custom:bio'];
        // console.log(this.token);
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
  .form-label {
    padding-left: 11px;
    font-weight: bold;
    font-size: .9em;
  }
  .noAst {
    padding-left: 11px;
  }
  .gameSelect {
    max-width: calc(95% - 17px);
  }
  .optionalInput {
    width: calc(95% + 11px);
  }
  .noPadding {
    padding: 0;
  }
  .form-container {
    max-width: 70vh;
  }
  .game-error {
    padding-left: 27px;
  }
  .instructions {
    padding-left: 25px;
    list-style-type: square;
    margin-bottom: 0;
  }
  .instructions>li {
    margin-bottom: 10px;
  }
  .instructions>li:first-child {
    margin-bottom: 3px;
  }
  .instructions-container {
    padding: 12px 20px;
    background: #e9ecef;
    margin-bottom: 25px;
    border-radius: 0.25rem;
    line-height: 1.2;
  }
  .important {
    color: #c3bb1bd4;
    display: inline-block;
    position: relative;
    left: -7px;
    margin-bottom: 5px;
  }
  .exclamation-svg {
    position: relative;
    top: 11px;
    left: -7px;
    padding: 5px;
    height: 2em;
    fill: #c3bb1bd4;
  }
  .submit-div {
    text-align: center;
  }
  .red {
    color: red;
  }

  @media only screen and (max-width: 440px)  {
    .sidebar-link {
      padding: 10px 10px 10px 8px;
    }
    .content {
      margin: 15px;
    }
    .form-container {
      padding: 0;
    }
    .form-control {
      width: 93%;
    }
  }
</style>
