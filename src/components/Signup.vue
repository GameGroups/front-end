<template>
  <div class="sign-up row  col-centered">
    <div class="col-sm-6 col-sm-offset-6 form-col">
      <h2>Sign Up</h2>
      <p class="instructions">Fields marked with an asterisk are required</p>

      <div class="alert alert-danger" v-if="error">
        <p v-if="error" class="error">{{ error.message }}</p>
      </div>

      <form @submit.prevent="signup">
       <div class="form-group required">
          <label class="control-label"></label>
          <input type="text" name="username" class="form-control" placeholder="Enter your Username" v-model="username" required>
        </div>

        <div class="form-group required">
          <label class="control-label"></label>
          <input type="text" name="nickname" class="form-control" placeholder="Enter your Display Name" v-model="nickname" required>
        </div>

        <div class="form-group required">
          <label class="control-label"></label>
          <input type="text" name="email" class="form-control" placeholder="Enter your Email" v-model="email" required>
        </div>

        <div class="form-group required">
          <label class="control-label"></label>
          <input type="password" class="form-control" placeholder="Enter your Password" v-model="password" required>
        </div>
        <div class="form-group required">
          <label class="control-label"></label>
          <select class="form-control" id="listRegion" name="region" required>
            <option value="">Select a Region...</option>
            <option value="useastnorth">US - East (North)</option>
            <option value="useastsouth">US - East (South)</option>
            <option value="uscentral">US - Central</option>
            <option value="uscentralnorth">US - Central (North)</option>
            <option value="uscentralsouth">US - Central (South)</option>
            <option value="uswestnorth">US - West (North)</option>
            <option value="uswestsouth">US - West (South)</option>
          </select>
        </div>
        <div class="form-group required">
          <label class="control-label"></label>
          <select class="form-control" id="listSkill" name="skill-level" required>
            <option value="">Select a Skill Level...</option>
            <option value="noob">Noob</option>
            <option value="casual">Casual</option>
            <option value="amateur">Amateur</option>
            <option value="average">Average</option>
            <option value="aboveaverage">Above Average</option>
            <option value="semipro">Semi - Pro</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <div class="form-group required">
          <label class="control-label"></label>
          <select class="form-control" id="listTime" name="time-commitement" required>
            <option value="">Select when you game the most...</option>
            <option value="daily">Daily</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="weekly">Weekly</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
        <p>Select your top 3 Games</p>
        <div id="game1" class="form-group required">
          <label class="control-label">1. </label>
          <select class="form-control gameSelect" required>
            <option value="">Select a Game...</option>
            <option value="game1">Game 1</option>
            <option value="game2">Game 2</option>
            <option value="game3">Game 3</option>
          </select>
        </div>
        <div class="form-group required" id="game2">
          <label class="control-label">2. </label>
          <select class="form-control gameSelect" required>
            <option value="">Select a Game...</option>
            <option value="game1">Game 1</option>
            <option value="game2">Game 2</option>
            <option value="game3">Game 3</option>
          </select>
        </div>
        <div class="form-group required" id="game3">
          <label class="control-label">3. </label>
          <select class="form-control gameSelect" required>
            <option value="">Select a Game...</option>
            <option value="game1">Game 1</option>
            <option value="game2">Game 2</option>
            <option value="game3">Game 3</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" name="tagline" class="form-control optionalInput" placeholder="Enter your Tag Line" v-model="tagline" required>
        </div>
        <div class="form-group">
          <textarea name="bio" class="form-control optionalInput" placeholder="Enter your Bio" v-model="bio" required/>
        </div>
        <button class="btn btn-primary">Sign Up</button>
        <button class="btn btn-danger">Cancel</button>
      </form>

      <div class="marketing"></div>
    </div>
  </div>
</template>

<script>
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
      username: '',
      nickname: '',
      email: '',
      password: '',
      attributeList: [
        {
          name: 'custom:region',
          value: 'region'
        },
        {
          name: 'custom:skill-level',
          value: 'skill-level'
        },
        {
          name: 'custom:time-commitement',
          value: 'time-commitment'
        },
        {
          name: 'custion:tagline',
          value: 'tagline'
        },
        {
          name: 'custom:bio',
          value: 'bio'
        }
      ],
      error: null
    };
  },
  methods: {
    signup () {
      this.$cognitoAuth.signup(this.$data, (err, result) => {
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
    margin-bottom: 40px;
  }
  .gameSelect {
    max-width: calc(95% - 17px);
  }
  .optionalInput {
    width: calc(95% + 11px);
  }
</style>
