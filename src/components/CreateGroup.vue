<template>
  <div class="sign-up row  col-centered">
    <div class="col-sm-6 col-sm-offset-6 form-col">
      <h2>Create a Group</h2>
      <div class="instructions-container" v-if="seen">
        <ul class="instructions">
          <li>Fields marked with an asterisk " <span class="red">*</span> " are required</li>
        </ul>
      </div>
      <div class="alert alert-danger" v-if="error">
        <ul class="errorList error" v-if="error">
          <li class="errorLi error" v-if="error">{{ error.message }}</li>
        </ul>
      </div>
      <form>
        <div class="form-group noAst">
          <span class="form-label">Profile Image</span>
          <label class="control-label"></label>
          <input v-on:change="handleFileSelect" v-validate="'image'" type="file" name="Profile Image" :class="{'form-control': true, 'input-error': errors.has('Profile Image') }" />
          <i v-show="errors.has('Profile Image')"></i>
          <p v-show="errors.has('Profile Image')" class="help-error">{{ errors.first('Profile Image') }}</p>
        </div>
        <div class="form-group noAst">
          <label v-if="image.show" class="control-label"></label>
          <img v-if="image.show" class="thumb" :src="image.src" :title="image.name"/>
        </div>
        <div class="form-group required">
          <span class="form-label">Group Name</span>
          <label class="control-label"></label>
          <input v-validate="'required|verify_groupName|max:50'" type="text" name="Group Name" :class="{'form-control': true, 'input-error': errors.has('Group Name') }" v-model="group.groupName" required>
          <i v-show="errors.has('Group Name')"></i>
          <p v-show="errors.has('Group Name')" class="help-error">{{ errors.first('Group Name') }}</p>
        </div>
        <div class="form-group required">
          <span class="form-label">Region</span>
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
          <span class="form-label">Skill Level</span>
          <label class="control-label"></label>
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Skill Level') }" id="listSkill" name="Skill Level" v-model="group.skillLevel" required>
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
          <span class="form-label">Time Commitment</span>
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
        <div class="form-group required">
          <span class="form-label">Select which game you play</span>
          <label class="control-label"></label>
          <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Game') }" id="Game" name="Game" v-model="group.game" required>
            <option value="">Select a Game...</option>
            <option>Guild Wars 2</option>
          </select>
          <i v-show="errors.has('Game')"></i>
          <p v-show="errors.has('Game')" class="help-error">{{ errors.first('Game') }}</p>
        </div>
        <!-- <div class="form-group required" id="game2">
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
          <span class="form-label">Bio (Limit: 500 Characters)</span>
          <label class="control-label"></label>
          <textarea v-validate="'max:500'" :class="{'form-control': true, 'input-error': errors.has('Bio') }" name="Bio" v-model="group.groupDescription" />
          <i v-show="errors.has('Bio')"></i>
          <p v-show="errors.has('Bio')" class="help-error">{{ errors.first('Bio') }}</p>
        </div>
        <div class="btnContainer">
          <button class="btn btn-primary" v-on:click.prevent="clickHandeler">Create Group</button>
          <button data-toggle="modal" data-target="#confirmModal" class="btn btn-light" v-on:click.prevent="clickHandeler">Cancel</button>
        </div>
        <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Confirm Cancel</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to cancel creating a group?</p>
              </div>
              <div class="modal-footer">
                <button v-on:click="cancel" type="button" class="btn btn-danger" data-dismiss="modal">Yes</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
              </div>
            </div>
          </div>
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

VeeValidate.Validator.extend('verify_groupName', {
  getMessage: field => `Group name must contain only: letters, numbers, spaces, apostrophes, underscores and dashes.`,
  validate: value => {
    var strongRegex = new RegExp('^[A-z0-9-_ \']+$');
    return strongRegex.test(value);
  }
});

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
        game: '',
        // games: [{gameID: 1, name: guild wars 2, logo: url}]
        region: '',
        skillLevel: '',
        timeCommitment: '',
        groupDescription: '',
        profileImage: 'http://via.placeholder.com/50x50',
        userId: '',
        username: ''
      },
      image: {
        show: false,
        src: '',
        name: ''
      }
    };
  },
  methods: {
    validateBeforeSubmit () {
      this.errorArray = [];
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createGroup();
        } else {
          this.seen = false;
          window.scrollTo(0, 0);
          this.errorArray.push('Please correct the highlighted fields!');
        }
      })
    },
    createGroup () {
      if (!store.state.loggedIn) { this.$router.replace({ path: '/login' }) }; // not logged. Send them to the login page
      this.$cognitoAuth.getIdToken((err, token) => {
        if (err) {
          console.log(err);
        } else {
          console.log(this.$store.state.currentUser);
          this.group.userId = this.$store.state.currentUser.sub;
          this.group.username = this.$store.state.currentUser['cognito:username'];
          // Axios.post('http://httpbin.org/post', this.group, {
          return Axios.post('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups', this.group, {
            headers: {
              'Authorization': token
            }
          })
            .then(response => {
              console.log('Create group successful:', response);
              var postData = {
                gameId: 'f0b738d4-0165-4425-8bb0-6ca863c77a19',
                entityId: response.data[0].groupId
              }
              // return Axios.post('http://httpbin.org/post', postData, {
              return Axios.post('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions', postData, {
                headers: {
                  'Authorization': token
                }
              })
            })
            .then(response => {
              console.log('subscription added successful:', response);
              this.$router.replace({ path: '/dashboard' }); // route to dashboard - they should see the created group here
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
    cancel () { 
      this.$router.replace({ path: '/dashboard' }); // route to dashboard
    },
    clickHandeler (event) {
      if (event.target.innerHTML === 'Create Group') this.validateBeforeSubmit();
    },
    handleFileSelect (evt) {
      this.image.show = false;
      var files = evt.target.files;
      if (files.length > 0) {
        var f = files[0];
        if (f.type.match('image.*')) {
          var reader = new FileReader();
          reader.onload = (function (theFile, data) {
            return function (e) {
              data.image.show = true;
              data.image.src = e.target.result;
              data.image.name = theFile.name;
            };
          })(f, this);
          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
          console.log(this.image);
        }
      }
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
   .form-group.required .control-label::before {
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
   .form-group.noAst .control-label::before {
    content:"* ";
    color:transparent;
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
    display: block;
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
  .thumb {
    height: 75px;
    border: 1px solid #000;
    margin: 10px 5px 0 0;
  }
</style>
