<template>
  <div class="logged-in row" v-if="$store.state.loggedIn">
    <div class="col-md-12">
      <h3>Your Games:</h3>
      <div v-for="game in games">
        <img class="gameLogo" :src="game.logo"/>
      </div>
      <div class="hr"></div>
      <h3>Your Groups:</h3>
      <div class="groupsContainer">
        <div class="groupCard" v-for="group in groups">
          <div >
            <b>{{group.groupName}}</b>
          </div>
          <div>Members: {{group.numMembers}}<br/>
            {{group.region}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import jwtDecode from 'jwt-decode';

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
      loggedIn: false
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
    if (!store.state.loggedIn) {
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
    height: 4.5em;
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
    flex-wrap: wrap;
    align-items: center;
    margin: 10px 5px;
    font-size: .8em;
    background: #e0dfdf;
    // padding: 10px;
    border-radius: 8px;
    width: 120px;
    min-height: 120px;
    justify-content: center;
    text-align: center;
    overflow: hidden;
  }
</style>
