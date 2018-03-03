<template>
  <div class="sign-up row  col-centered">
    <div class="col-sm-6 col-sm-offset-6 form-col">
      <h2>Create a Group</h2>
      <div class="instructions-container" v-if="seen">
        <ul class="instructions"><li>Fields marked with an asterisk " <span class="red">*</span> " are required</li>
        </ul>
      </div>
      <div class="alert alert-danger" v-if="error">
        <ul class="errorList error" v-if="error">
          <li class="errorLi error" v-if="error">{{ error.message }}</li>
        </ul>
      </div>
      <form @submit.prevent="validateBeforeSubmit">
       <div class="form-group required">
         <span class="form-label">Group Name</span><br/>
          <label class="control-label"></label>
          <input v-validate="'required|alpha_dash'" type="text" name="Group Name" :class="{'form-control': true, 'input-error': errors.has('Group Name') }" v-model="group.groupName" required>
          <i v-show="errors.has('Group Name')"></i>
          <p v-show="errors.has('Group Name')" class="help-error">{{ errors.first('Group Name') }}</p>
        </div>
        <div class="form-group required">
          <span class="form-label">Region</span><br/>
          <label class="control-label"></label>
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Region') }" id="listRegion" name="Region" v-model="group.region" required>
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
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Skill Level') }" id="listSkill" name="Skill Level" v-model="group.skill" required>
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
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Time Commitment') }" id="listTime" name="Time Commitment" v-model="group.timeCommitment" required>
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
          <span class="form-label noPadding">Bio (Limit: 500 Characters)</span><br/>
          <textarea v-validate="'max:500'" :class="{'optionalInput': true, 'form-control': true, 'input-error': errors.has('Bio') }" name="Bio" v-model="group.groupDescription" />
          <i v-show="errors.has('Bio')"></i>
          <p v-show="errors.has('Bio')" class="help-error">{{ errors.first('Bio') }}</p>
        </div>
        <div class="btnContainer">
            <button class="btn btn-primary">Create Group</button>
            <button class="btn btn-light" @click="Cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import Axios from 'axios';
import store from '../store';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

export default {
  name: 'CreateGroup',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Create Group', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      error: null,
      errorArray: [],
      seen: true,
      group: {
        groupName: '',
        // games: [{gameID: 1, name: guild wars 2, logo: url}]
        region: '',
        skill: '',
        timeCommitment: '',
        groupDescription: ''
      },
      postBody: {
        groupName: '',
        groupDescription: ''
      }
    };
  },
  methods: {
    validateBeforeSubmit () {
      this.errorArray = [];
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.prepare();
        } else {
          this.seen = false;
          window.scrollTo(0, 0);
          this.errorArray.push('Please correct the highlighted fields!');
        }
      })
    },
    prepare () {
      // Remove this code when the post request accepts the additional data
      this.postBody.groupName = this.group.groupName;
      this.postBody.groupDescription = this.group.groupDescription;
      this.createGroup();
    },
    createGroup () {
      // store.state.loggedIn
      alert(store.state.loggedIn);
      // alert(this.$cognitoAuth.)
      this.$cognitoAuth.getIdToken((err, loggedIn) => {
        if (err) {

        } else {
          // Test URL
          // Axios.post('http://httpbin.org/post', { 
          Axios.post('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups', {
          // use the line below when the post request accepts the additional data
          // body: this.group
            body: this.postBody,
            Headers: {
              'x-amz-security-token': loggedIn
            }
          })
            .then(response => {
              console.log('Signup successful:', response);
              this.$router.replace({ path: '/group', query: { groupName: this.groupName } }); // route to group profile page
            })
            .catch(e => {
              this.seen = false;
              window.scrollTo(0, 0);
              this.error = e;
              console.error(e);
            });
        }
      });
    },
    Cancel () {
      if (confirm('Are you sure?')) { this.$router.replace({ path: '/dashboard' }) }; // route to dashboard !!!STOP THE VALIDATE AND SUBMIT FROM HAPPENING!!!
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
  .form-group .required .control-label:before {
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
