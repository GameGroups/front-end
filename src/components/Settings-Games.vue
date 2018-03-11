<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Games</h2>
      <p>The games you have added are listed below</p>
    </div>
    <div class="hr"></div>

    <div class="row filters max-width-center">
      <div class="col-md-12">
        <button class="btn btn-primary" data-toggle="modal" data-target="#addGameModal">Add a Game</button>
      </div>
    </div>

    <div class="row data max-width-center">
      <div class="col-md-12 game-row-container">
        <div class="game-row" v-for="sub in subs" :key="sub.subscriptionId">
          <div class="name-container">{{sub.gameName}}</div>
          <div v-on:click="prepare(sub)" data-toggle="modal" data-target="#confirmModal" class="svg-container">
            <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete {{this.gameName}} from your games?</p>
        </div>
        <div class="modal-footer">
          <button v-on:click="deleteGame" type="button" class="btn btn-primary" data-dismiss="modal">Yes, Delete</button>
          <button v-on:click="clear" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>

    <div class="modal fade" id="addGameModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="gameModalLabel">Add a Game</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete {{this.gameName}} from your games?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Yes, Delete</button>
            <button type="button" class="btn btn-danger" >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Axios from 'axios';
import Vue from 'vue';

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
      hasSubs: false,
      gameName: '',
      subId: '',
      error: null,
      games: []
    }
  },
  methods: {
    prepare: function (sub) {
      this.gameName = sub.gameName;
      this.subId = sub.subscriptionId;
    },
    getGames: function () {
      Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/games')
        .then(response => {
          this.games = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    prepareDropdown: function () {
      for (let i = 0; i < this.games.length; i++) {
        for (let j = 0; j < this.subs.length; i++) {
          if (this.games[i] === this.subs[i]) {
            this.games.$remove(i);
          }
        }
      }
    },
    clear: function () {
      this.gameName = '';
      this.subId = '';
      console.log('clear' + this.gameName);
      console.log('clear' + this.subId);
    },
    deleteGame: function () {
      alert(this.subId);
      let config = {
        headers: { 'Authorization': this.token }
      };
      Axios.delete('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/' + this.subId)
        .then(response => {
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/forentity/' + this.token.sub)
            .then(response => {
              if (response.data.length > 0) {
                // console.log(response.data)
                this.hasSubs = true;
                this.subs = response.data
              } else {
                this.hasSubs = false;
                this.subs = response.data
              }
            })
            .catch(e => {
              console.log(e)
            });
          this.clear();
        })
        .catch(e => {
          console.log(e);
          this.clear();
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
  ready: function () {
    var self = this;
    jquery(window).resize(function () {
      self.$refs.thisherechart.drawChart();
    })
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
              // console.log(response.data)
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
  .max-width-center {
    max-width: 40em;
    margin: 0 auto;
  }
  .game-row {
    background: rgba(243, 243, 243, 0.68);
    padding: .2em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    align-content: center;
  }
  .game-row:nth-child(even) {
    background: rgba(107, 107, 107, 0.12);
  }
  .data {
    margin: 1em auto 4em auto;
  }
  svg {
    fill: #b3525c;
    float: right;
    height: 2em;
    margin-left: auto;
  }
  .svg-container {
    margin-left: auto;
  }
  .svg-container:hover {
    cursor: pointer;
  }
  .name-container {
    margin-left: 10px;
  }
  .game-row-container {
    border: 1px solid #cacaca;
    padding: 0;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
</style>
