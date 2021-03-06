<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Games</h2>
      <p>The games you have added are listed below</p>
    </div>
    <div class="hr"></div>

    <div class="row filters max-width-center">
      <div class="col-md-12">
        <button v-on:click="getGames()" class="btn btn-primary" data-toggle="modal" data-target="#addGameModal">Add a Game</button>
      </div>
    </div>

    <div class="row data max-width-center">
      <div class="col-md-12 game-row-container">
        <div class="group-row" v-for="sub in subs" :key="sub.subscriptionId">
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
          <p>Are you sure you want to delete '{{this.gameName}}' from your games?</p>
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
          <div class="modal-body game-modal-body">
            <p class="alert alert-danger add-game-err" v-if="addGameErr">{{this.addGameErr}}</p>
            <select v-if="games != null && games.length > 0" v-model="gameId" id="games-select" class="form-control game-select">
              <option selected value="">Select a game...</option>
              <option :key="game.gameId" v-for="game in games" :value="game.gameId">{{game.gameName}}</option>
            </select>
            <p v-else>You've added all games already!</p>
          </div>
          <div class="modal-footer">
            <button  v-if="games != null && games.length > 0" v-on:click="addGame(gameId)" type="button" class="btn btn-primary" >Add Game</button>
            <button id="add-cancel" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
import veeValidate from 'vee-validate';

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
      games: [],
      gameId: '',
      addGameErr: null
    }
  },
  methods: {
    prepare: function (sub) {
      this.gameName = sub.gameName;
      this.subId = sub.subscriptionId;
    },
    getSubs: function () {
      this.subs = null;
      Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/forentity/' + this.token.sub)
        .then(response => {
          this.subs = response.data
        })
        .catch(e => {
          console.log(e)
        });
    },
    getGames: function () {
      this.addGameErr = null;
      this.games = null;
      Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/games')
        .then(response => {
          this.games = response.data
          this.prepareDropdown();
        })
        .catch(e => {
          console.log(e)
        });
    },
    prepareDropdown: function () {
      for (let i = 0; i < this.games.length; i++) {
        for (let j = 0; j < this.subs.length; j++) {
          if (this.games[i].gameId === this.subs[j].gameId) {
            this.games.splice(i, 1)
          }
        }
      }
    },
    clear: function () {
      this.gameName = '';
      this.subId = '';
    },
    deleteGame: function () {
      let config = {
        headers: { 'Authorization': this.token }
      };
      Axios.delete('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/' + this.subId)
        .then(response => {
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/forentity/' + this.token.sub)
            .then(response => {
              this.gameId = '';
              this.getGames();
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
    },
    addGame: function (gameId) {
      if (gameId !== '') {
        let config = {
          headers: {'Content-Type': 'application/json'}
        };
        const rbody = { gameId: this.gameId, entityId: this.token.sub };

        Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/games/' + this.gameId)
          .then(response => {
            if (response.data.length > 0) {
              Axios.post('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions', rbody)
                .then(response => {
                  let x = document.getElementById('add-cancel');
                  x.click();
                  this.addGameErr = null;
                  this.subs = null;
                  document.getElementById('games-select').innerHTML = '';
                  this.getSubs();
                  this.getGames();
                  this.gameId = '';
                })
                .catch(e => {
                  this.addGameErr = e;
                })
            }
          })
          .catch(e => {
            this.addGameErr = 'Game could not be added or does not exist';
            console.log(e)
          });
      } else {
        this.addGameErr = 'Select a game to add'
      }
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
  .group-row {
    background: rgba(243, 243, 243, 0.68);
    padding: .2em;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    align-content: center;
  }
  .group-row:nth-child(even) {
    background: rgba(107, 107, 107, 0.12);
  }
  .data {
    margin: 1em auto 4em auto;
  }
  svg {
    fill: #b3525c;
    float: right;
    height: 1.8em;
    margin-left: auto;
  }
  .svg-container {
    margin-left: auto;
  }
  .svg-container:hover {
    cursor: pointer;
    svg {
      fill: #9e0000;
    }
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
  .game-select {
    max-width: calc(100% - 4em);
    margin: 0 auto;
  }
  .add-game-err {
    max-width: calc(100% - 4em);
    margin: 0 auto 1rem auto;
  }

  @media only screen and (max-width: 440px)  {
    .content {
      margin: .7em;
    }
  }
</style>
