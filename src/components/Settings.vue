<template>
  <div class="settings row">
    <div class="sidebar">
      <div class="icon-container" v-on:click="seen = false; profile = true">
        <img class="settings-icon" src="../assets/user.png"/><br/>
        <span class="settings-label">Profile</span>
      </div>
    </div>
    <div class="main-content" v-if="seen">
      <h2>Settings</h2>
      <p>Select an option to the left to edit your settings</p>
      <p>{{this.token}}</p>
      <p>{{this.user}}</p>
      <p>{{this.token['custom:region']}}</p>
    </div>
    <div class="profile-container" v-if="profile">
      <h2>Settings - Edit Profile</h2>
      <div class="instructions-container">
        <ul class="instructions"><li>Fields marked with an asterisk " <span class="red">*</span> " are required</li>
          <li>Enter your password at the end of the form to confirm changes</li>
        </ul>
      </div>
      <form @submit.prevent="prepare">
        <div class="form-group required">
          <span class="form-label">Display Name</span><br/>
          <label class="control-label"></label>
          <input v-model="this.token.nickname" type="text" name="nickname" class="form-control" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Email</span><br/>
          <label class="control-label"></label>
          <input v-model="this.token.email" type="text" name="email" class="form-control" required>
        </div>

        <div class="form-group required">
          <span class="form-label">Region</span><br/>
          <label class="control-label"></label>
          <select class="form-control" id="listRegion" required>
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
          <select class="form-control" id="listSkill" name="skill-level" required>
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
          <select class="form-control" id="listTime" name="time-commitement" required>
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
          <input type="text" name="tagline" class="form-control optionalInput" />
        </div>
        <div class="form-group">
          <span class="form-label noPadding">Bio (Limit: 500 Characters)</span><br/>
          <textarea name="bio" class="form-control optionalInput" />
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
import jwtDecode from 'jwt-decode';

export default {
  name: 'Signup',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Settings', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      loggedIn: false,
      seen: true,
      profile: false
    }
  },
  methods: {
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
        console.log(this.token);
      });
    } else {
      this.$router.replace(this.$route.query.redirect || '/login');
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .row {
    flex-wrap: initial;
  }
  .sidebar {
    min-height: 100vh;
    background: #3f5e86;
    color: #fff;
    text-align: center;
    padding: 25px 0;
  }
  .icon-container {
    padding: 10px 20px 10px 18px;
  }
  .icon-container:hover {
    background: #385271;
    cursor: pointer;
  }
  .settings-icon {
    height: 2.7em;
  }
  .settings-label {
    font-size: .8em;
  }
  .main-content, .profile-container {
    margin: 35px;
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
    max-width: 300px;
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
