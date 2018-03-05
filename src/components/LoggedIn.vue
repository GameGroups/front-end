<template>
  <div class="logged-in row" v-if="$store.state.loggedIn">
    <div class="col-md-12">
      <h2>Your Games:</h2>
      <div v-for="game in games">
        <img class="gameLogo" :src="game.logo"/>
      </div>
      <div class="hr"></div>
      <h2>Your Groups:</h2>
      <div class="groupsContainer">
        <p v-if="groups.length == 0">You haven't joined any groups. Click the groups link at the top to get started!</p>
        <router-link class="r-link" to="#">
          <div class="groupCard" v-for="group in groups">
            <div class="groupName">
              <b>{{group.groupName}}</b>
            </div>
            <div>
              <div>
                <img class="groupImg" src="http://via.placeholder.com/150x100"/>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import store from '../store';
import cognitoUser from 'amazon-cognito-identity-js'

export default {
  name: 'LoggedIn',
  metaInfo: {
    title: 'GameGroups',
    titleTemplate: '%s - Dashboard',
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  data: function () {
    return {
      loggedIn: false,
      games: [{
        gameID: 1,
        game: 'Guild Wars 2',
        logo: require('../assets/GW2_Logo.png')
      }],
      groups: []
    }
  },
  methods: {
    logout: function () {
      this.$cognitoAuth.logout();
      this.$router.replace(this.$route.query.redirect || '/');
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
        this.user = this.$cognitoAuth.getCurrentUser();
        var config = {
          headers: { 'Authorization': jwtToken }
        };
        Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/foruser/' + this.token.sub, config)
          .then(response => {
            this.groups = response.data
          })
          .catch(e => {
            console.log(e)
          })
      });
    } else {
      this.$router.replace(this.$route.query.redirect || '/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .logged-in {
    padding-top: 2rem;
  }
  .gameLogo {
    height: 5.5em;
  }
  .hr {
    margin: 15px 0;
    border-bottom: 1px solid #b5b5b5;
    width: 95vw;
  }
  .groupsContainer {
    display: flex;
  }
  .groupCard {
    align-items: center;
    margin: 10px 5px;
    font-size: .8em;
    background: #e0dfdf;
    border-radius: 8px;
    width: 12em;
    height: 12em;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    border: 1px solid black;
  }
  .groupName {
    height: 33%;
    padding: .5em;
    background: black;
    color: #f7c82e
  }
  .groupImg {
    max-width: 150px;
    max-height: 100px;
  }
  .r-link {
    display: flex;
    text-decoration: none;
  }
</style>
