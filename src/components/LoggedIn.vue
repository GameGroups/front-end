<template>
  <div class="logged-in row" v-if="$store.state.loggedIn">
    <div class="col-md-12">
        <router-link to="/myaccount/games" class="gamesTitle">
          <div class="cog-div">
            <svg class="edit fa-spin-hover" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>
          </div>
          <h2 class="games-h2">Your Games</h2>
        </router-link>
      <div class="gamesContainer">
        <div class="game" :key="sub.subscriptionId" v-for="sub in gameSubs">
          <img v-if="sub.gameName == 'Guild Wars 2'" class="gameLogo" src="https://s3.us-east-2.amazonaws.com/gamegroups/Guild_Wars_2_logo.svg"/>
          <img v-else-if="sub.gameName == 'Postman'" class="gameLogo" src="https://s3.us-east-2.amazonaws.com/gamegroups/postman.png"/>
          <img v-else-if="sub.gameName == 'World of Warcraft'" class="gameLogo" src="https://s3.us-east-2.amazonaws.com/gamegroups/WoW_Cataclysm.png"/>
          <img v-else-if="sub.gameName == 'Monster Hunter World'" class="gameLogo" src="https://s3.us-east-2.amazonaws.com/gamegroups/mhw.png"/>
          <template v-else>
            <img class="gameLogo" src="http://via.placeholder.com/150x150"/>
            <p class="gameLabel">{{sub.gameName}}</p>
          </template>
        </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add a Game</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group required gamesList">
                <select v-validate="'required'" :class="{'form-control': true, 'input-error': errors.has('Games') }" name="Games" required>
                  <option value="">Select a Game...</option>
                  <option value="f0b738d4-0165-4425-8bb0-6ca863c77a19">Guild Wars 2</option>
                </select>
                <i v-show="errors.has('Games')"></i>
                <p v-show="errors.has('Games')" class="help-error">{{ errors.first('Games') }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div class="hr"></div>
      <router-link to="/myaccount/groups" class="gamesTitle">
        <div class="cog-div">
          <svg class="edit fa-spin-hover" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>
        </div>
      </router-link>
      <router-link to="/create_group" class="gamesTitle">
        <div class="cog-div plus-div">
          <svg class="plus" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"/></svg>
        </div>
      </router-link>
        <h2 class="games-h2">Your Groups</h2><br/>
      <div class="groupsContainer">
        <p v-if="!hasGroups">You haven't joined any groups. Click the groups link at the top to get started!</p>
          <div class="groupCard" :key="group.groupId" v-for="group in groups">
            <router-link class="r-link" :to="{ path: '/group/' + group.groupId, props: {groupID: group.groupId}}" v-on:click="say(asdf)">
            <div class="groupName ">
              <b>{{group.groupName}}</b>
            </div>
            <div class="imgContainer">
              <div style="height: 100%">
                <img class="groupImg" src="http://via.placeholder.com/150x150"/>
              </div>
            </div>
            </router-link>
          </div>
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
  props: ['show'],
  data: function () {
    return {
      loggedIn: false,
      hasGroups: false,
      hasGames: false,
      gw2Logo: require('../assets/GW2_Logo.png'),
      groups: [],
      gameSubs: []
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
        let config = {
          headers: { 'Authorization': jwtToken }
        };
        Axios.all([
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/foruser/' + this.token.sub, config),
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/forentity/' + this.token.sub, config)
        ])
          .then(Axios.spread((groups, gameSubs) => {
            this.groups = groups.data;
            if (this.groups.length > 0) {
              this.hasGroups = true;
            }
            this.gameSubs = gameSubs.data;
            if (this.gameSubs.length > 0) {
              this.hasGames = true;
            }
          }))
          .catch(e => {
            console.log(e)
          });
        /* Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/foruser/' + this.token.sub, config)
          .then(response => {
            this.groups = response.data
            if (this.groups.length > 0) {
              this.hasGroups = true;
            }
          })
          .catch(e => {
            console.log(e)
          })
        Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/forentity/d3b19d4d-5f74-48e4-a91c-97a317a42c77' + this.token.sub, config)
          .then(response => {
            this.gameSubs = response.data
            console.log('game subs ---------' + this.gameSubs)
            if (this.gameSubs.length > 0) {
              this.hasGames = true;
            }
          })
          .catch(e => {
            console.log(e)
          }) */
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
    height: 5em;
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
    height: 14em;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    border: 1px solid black;
  }
  .groupName {
    height: 3.8em;
    padding: .5em;
    background: black;
    color: #f7c82e;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  .groupImg {
    height: 100%;
    width: 100%;
  }
  .r-link {
    text-decoration: none;
  }
  .imgContainer {
    height: calc(100% - 3.8em);
  }
  .gamesContainer {
    display: flex;
    align-items: flex-start;
  }
  .gamesTitle {
    display: flex;
    align-items: center;
  }
  .edit, .plus {
    fill: black;
    height: 1.8em;
  }
  .cog-div {
    display: flex;
    padding: .2rem;
    background: lightgray;
    border: 1px solid #a2a2a2;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .plus-div {
    margin-left: -5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .cog-div:hover {
    cursor: pointer;

  }
  .minus {
    fill: #f35a5a;
    height: 4em;
  }
  .minus:hover {
    cursor: pointer;
    fill: red;
  }
  .game {
    margin-right: 15px;
  }
  .gamesList {
    margin: 1rem 0;
  }
  .games-h2 {
    display: inline-block;
    color: black;
    margin-bottom: 4px;
    &:hover {
      cursor: default;
    }
  }
  .gameLabel {
    font-size: .8em;
    max-width: 5.5em;
    margin: 0 auto;
    text-align: center;
  }
  .gamesTitle {
    display: inline-flex;
    text-decoration: none;
    margin-bottom: 15px;
  }
  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
  .cog-div:hover {
    .edit {
      -webkit-animation: spin 3s linear infinite ;
      -moz-animation: spin 3s linear infinite;
      -o-animation: spin 3s linear infinite;
      animation: spin 3s linear infinite;
    }

  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
</style>
