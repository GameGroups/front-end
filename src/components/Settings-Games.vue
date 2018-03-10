<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Games</h2>
      <p>The games you have added are listed below</p>
    </div>
    <div class="hr"></div>

    <div class="row filters">
      <div class="col-md-12">
        <button class="btn btn-primary">Add a Game</button>
      </div>
    </div>

    <div class="row data">
      <div class="col-md-12">
        <template v-for="sub in subs">
          <div :key="sub.subscriptionId" style="display: inline-block">{{sub.gameName}}</div>
          <svg :key="sub.gameId" class="rotate" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"/></svg>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Axios from 'axios';

export default {
  name: 'MyGames',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - My Games', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      subs: [],
      hasSubs: false
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
  beforeMount: function () {
    if (this.loggedIn) {
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Couldn't get the session:", err, err.stack);
          return;
        }
        this.token = jwtDecode(jwtToken);
        this.user = this.$cognitoAuth.getCurrentUser();

        let config = {
          headers: { 'Authorization': jwtToken }
        };
        Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/forentity/' + this.token.sub)
          .then(response => {
            if (response.data.length > 0) {
              this.hasSubs = true;
              this.subs = response.data
            }
          })
          .catch(e => {
            console.log(e)
          });
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
</style>
