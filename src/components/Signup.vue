<template>
  <div class="sign-up row  col-centered">
    <div class="col-sm-6 col-sm-offset-6 form-col">
      <h2>Sign Up</h2>
      <p class="instructions">Fields marked with an asterisk " <span class="red">*</span> " are required</p>

      <div class="alert alert-danger" v-if="error">
        <p v-if="error" class="error">{{ error.message }}</p>
      </div>

      <form @submit.prevent="prepare">
       <div class="form-group required">
         <span class="form-label">Username</span><br/>
          <label class="control-label"></label>
          <input type="text" name="username" class="form-control" placeholder="Enter your Username" v-model="user.username" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Display Name</span><br/>
          <label class="control-label"></label>
          <input type="text" name="nickname" class="form-control" placeholder="Enter your Display Name" v-model="user.nickname" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Email</span><br/>
          <label class="control-label"></label>
          <input type="text" name="email" class="form-control" placeholder="Enter your Email" v-model="user.email" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Password</span><br/>
          <label class="control-label"></label>
          <input type="password" class="form-control" placeholder="Enter your Password" v-model="user.password" required>
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
          <span class="form-label noPadding">Tagline</span><br/>
          <input type="text" name="tagline" class="form-control optionalInput" placeholder="Enter your Tag Line" v-model="customAttr.tagline" />
        </div>
        <div class="form-group">
          <span class="form-label noPadding">Bio</span><br/>
          <textarea name="bio" class="form-control optionalInput" placeholder="Enter your Bio" v-model="customAttr.bio" />
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
          this.error = err
          console.error(err)
        } else {
          console.log('Signup successful:', result)
          this.$router.replace({path: '/confirm', query: {username: this.username}})
        }
      })
    }
  }
}
/* window.onload = function () {
  var x = document.getElementById('#game1');
  if (x.selectedIndex === 0) {
    document.getElementById('#game2').style.display = 'none';
  }
} */
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
    margin-bottom: 25px;
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
</style>
