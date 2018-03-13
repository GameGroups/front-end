<template>
  <div class="logged-in row" v-if="loggedIn">
    <div class="col-md-12">
      <h2 class="games-h2">Explore Groups</h2>
      <p>Filter by a game by selecting an icon below</p>
      <div class="gamesContainer">
        <template  v-for="game in games" v-if="game.gameId == 'f0b738d4-0165-4425-8bb0-6ca863c77a19'">
          <img v-on:click="filterGame(game), gameName = game.gameName" :key="game.gameId" class="gameLogo" src="https://s3.us-east-2.amazonaws.com/gamegroups/Guild_Wars_2_logo.svg"/>
        </template>
      </div>

      <div class="hr"></div>
      <div class="groupsContainer">
        <div class="row">
          <p class="filter-row" v-if="this.gameName">Filtered by: {{this.gameName}} <button v-on:click="getAllGroups" class="btn btn-danger btn-clear-filter">Clear Filter</button></p>
          <div class="groupCard" :key="group.groupId" v-for="group in groups">
            <router-link class="r-link" :to="{ path: '/group/' + group.groupId, props: {groupID: group.groupId}}">
              <div class="imgContainer">
                <div style="height: 100%">
                  <img class="groupImg" src="http://via.placeholder.com/150x150"/>
                </div>
              </div>
              <div class="group-info-container">
                <div class="groupName">
                  <b>{{group.groupName}}</b>
                </div>
                <p class="elipses">
                  {{group.groupDescription}}
                </p>
                <div class="attributes-container">
                  <div class="skill-level">
                    <svg class="medal" viewBox="0 0 460.731 460.731" ><polygon points="165.72,64.159 295.016,64.159 318.278,0.006 142.461,0.006"/><path d="M69.702,64.159l82.457,190.631c17.731-15.124,39.83-25.215,64.143-28.126L157.375,64.15L134.115,0L69.702,64.159z"/><path d="M326.634,0.006l-23.259,64.153l-58.894,162.387c24.346,2.75,46.519,12.708,64.344,27.7l82.204-190.086L326.634,0.006z"/><path d="M230.792,460.731c62.736,0,113.583-50.851,113.583-113.566c0-31.081-12.499-59.202-32.713-79.716 c-0.974-0.981-2.02-1.903-3.029-2.861c-1.014-0.949-2.04-1.883-3.065-2.797c-17.421-15.257-39.47-25.339-63.83-27.659 c-1.351-0.124-2.737-0.124-4.1-0.209c-1.365-0.076-2.721-0.176-4.098-0.208c-0.916-0.012-1.811-0.137-2.739-0.137 c-1.208,0-2.376,0.137-3.577,0.185c-1.376,0.028-2.741,0.116-4.11,0.2c-1.356,0.093-2.745,0.093-4.089,0.221 c-24.327,2.509-46.294,12.771-63.6,28.168c-1.04,0.918-2.076,1.832-3.071,2.798c-1.012,0.966-2.028,1.932-3.002,2.941 c-19.859,20.449-32.138,48.313-32.138,79.074C117.214,409.881,168.07,460.731,230.792,460.731z"/></svg>
                    {{group.skillLevel}}
                  </div>
                  <div class="time-commitment">
                    <svg class="stopwatch" viewBox="0 0 512 512"><path d="M511.5,112c0,29.938-11.906,57-31.063,77.094c-27.156-73.406-89.063-129.875-165.813-149.406 C335.156,15.594,365.344,0,399.5,0C461.375,0,511.5,50.125,511.5,112z M196.359,39.688C175.828,15.594,145.641,0,111.5,0 C49.641,0-0.5,50.125-0.5,112c0,29.938,11.922,57,31.063,77.094C57.719,115.688,119.641,59.219,196.359,39.688z M463.5,272 c0,50.531-18.031,96.813-48,132.875V464c0,26.5-21.5,48-48,48c-24.563,0-44.594-18.531-47.438-42.344 c-20.344,6.656-42,10.344-64.563,10.344s-44.234-3.688-64.563-10.344C188.094,493.469,168.063,512,143.5,512c-26.5,0-48-21.5-48-48 v-59.125c-29.953-36.063-48-82.344-48-132.875c0-114.875,93.125-208,208-208S463.5,157.125,463.5,272z M431.5,272 c0-97.063-78.969-176-176-176c-97.047,0-176,78.938-176,176c0,97.031,78.953,176,176,176C352.531,448,431.5,369.031,431.5,272z M271.5,128h-32v144c0,2.813,0.734,5.563,2.141,8l64.016,110.844l27.688-16L271.5,267.719V128z"/></svg>
                    {{group.timeCommitment}}
                  </div>
                  <div class="group-region">
                    <svg class="globe" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5-103 385.5-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103zm274 521q-2 1-9.5 9.5t-13.5 9.5q2 0 4.5-5t5-11 3.5-7q6-7 22-15 14-6 52-12 34-8 51 11-2-2 9.5-13t14.5-12q3-2 15-4.5t15-7.5l2-22q-12 1-17.5-7t-6.5-21q0 2-6 8 0-7-4.5-8t-11.5 1-9 1q-10-3-15-7.5t-8-16.5-4-15q-2-5-9.5-11t-9.5-10q-1-2-2.5-5.5t-3-6.5-4-5.5-5.5-2.5-7 5-7.5 10-4.5 5q-3-2-6-1.5t-4.5 1-4.5 3-5 3.5q-3 2-8.5 3t-8.5 2q15-5-1-11-10-4-16-3 9-4 7.5-12t-8.5-14h5q-1-4-8.5-8.5t-17.5-8.5-13-6q-8-5-34-9.5t-33-.5q-5 6-4.5 10.5t4 14 3.5 12.5q1 6-5.5 13t-6.5 12q0 7 14 15.5t10 21.5q-3 8-16 16t-16 12q-5 8-1.5 18.5t10.5 16.5q2 2 1.5 4t-3.5 4.5-5.5 4-6.5 3.5l-3 2q-11 5-20.5-6t-13.5-26q-7-25-16-30-23-8-29 1-5-13-41-26-25-9-58-4 6-1 0-15-7-15-19-12 3-6 4-17.5t1-13.5q3-13 12-23 1-1 7-8.5t9.5-13.5.5-6q35 4 50-11 5-5 11.5-17t10.5-17q9-6 14-5.5t14.5 5.5 14.5 5q14 1 15.5-11t-7.5-20q12 1 3-17-4-7-8-9-12-4-27 5-8 4 2 8-1-1-9.5 10.5t-16.5 17.5-16-5q-1-1-5.5-13.5t-9.5-13.5q-8 0-16 15 3-8-11-15t-24-8q19-12-8-27-7-4-20.5-5t-19.5 4q-5 7-5.5 11.5t5 8 10.5 5.5 11.5 4 8.5 3q14 10 8 14-2 1-8.5 3.5t-11.5 4.5-6 4q-3 4 0 14t-2 14q-5-5-9-17.5t-7-16.5q7 9-25 6l-10-1q-4 0-16 2t-20.5 1-13.5-8q-4-8 0-20 1-4 4-2-4-3-11-9.5t-10-8.5q-46 15-94 41 6 1 12-1 5-2 13-6.5t10-5.5q34-14 42-7l5-5q14 16 20 25-7-4-30-1-20 6-22 12 7 12 5 18-4-3-11.5-10t-14.5-11-15-5q-16 0-22 1-146 80-235 222 7 7 12 8 4 1 5 9t2.5 11 11.5-3q9 8 3 19 1-1 44 27 19 17 21 21 3 11-10 18-1-2-9-9t-9-4q-3 5 .5 18.5t10.5 12.5q-7 0-9.5 16t-2.5 35.5-1 23.5l2 1q-3 12 5.5 34.5t21.5 19.5q-13 3 20 43 6 8 8 9 3 2 12 7.5t15 10 10 10.5q4 5 10 22.5t14 23.5q-2 6 9.5 20t10.5 23q-1 0-2.5 1t-2.5 1q3 7 15.5 14t15.5 13q1 3 2 10t3 11 8 2q2-20-24-62-15-25-17-29-3-5-5.5-15.5t-4.5-14.5q2 0 6 1.5t8.5 3.5 7.5 4 2 3q-3 7 2 17.5t12 18.5 17 19 12 13q6 6 14 19.5t0 13.5q9 0 20 10.5t17 19.5q5 8 8 26t5 24q2 7 8.5 13.5t12.5 9.5l16 8 13 7q5 2 18.5 10.5t21.5 11.5q10 4 16 4t14.5-2.5 13.5-3.5q15-2 29 15t21 21q36 19 55 11-2 1 .5 7.5t8 15.5 9 14.5 5.5 8.5q5 6 18 15t18 15q6-4 7-9-3 8 7 20t18 10q14-3 14-32-31 15-49-18 0-1-2.5-5.5t-4-8.5-2.5-8.5 0-7.5 5-3q9 0 10-3.5t-2-12.5-4-13q-1-8-11-20t-12-15q-5 9-16 8t-16-9q0 1-1.5 5.5t-1.5 6.5q-13 0-15-1 1-3 2.5-17.5t3.5-22.5q1-4 5.5-12t7.5-14.5 4-12.5-4.5-9.5-17.5-2.5q-19 1-26 20-1 3-3 10.5t-5 11.5-9 7q-7 3-24 2t-24-5q-13-8-22.5-29t-9.5-37q0-10 2.5-26.5t3-25-5.5-24.5q3-2 9-9.5t10-10.5q2-1 4.5-1.5t4.5 0 4-1.5 3-6q-1-1-4-3-3-3-4-3 7 3 28.5-1.5t27.5 1.5q15 11 22-2 0-1-2.5-9.5t-.5-13.5q5 27 29 9 3 3 15.5 5t17.5 5q3 2 7 5.5t5.5 4.5 5-.5 8.5-6.5q10 14 12 24 11 40 19 44 7 3 11 2t4.5-9.5 0-14-1.5-12.5l-1-8v-18l-1-8q-15-3-18.5-12t1.5-18.5 15-18.5q1-1 8-3.5t15.5-6.5 12.5-8q21-19 15-35 7 0 11-9-1 0-5-3t-7.5-5-4.5-2q9-5 2-16 5-3 7.5-11t7.5-10q9 12 21 2 8-8 1-16 5-7 20.5-10.5t18.5-9.5q7 2 8-2t1-12 3-12q4-5 15-9t13-5l17-11q3-4 0-4 18 2 31-11 10-11-6-20 3-6-3-9.5t-15-5.5q3-1 11.5-.5t10.5-1.5q15-10-7-16-17-5-43 12zm-163 877q206-36 351-189-3-3-12.5-4.5t-12.5-3.5q-18-7-24-8 1-7-2.5-13t-8-9-12.5-8-11-7q-2-2-7-6t-7-5.5-7.5-4.5-8.5-2-10 1l-3 1q-3 1-5.5 2.5t-5.5 3-4 3 0 2.5q-21-17-36-22-5-1-11-5.5t-10.5-7-10-1.5-11.5 7q-5 5-6 15t-2 13q-7-5 0-17.5t2-18.5q-3-6-10.5-4.5t-12 4.5-11.5 8.5-9 6.5-8.5 5.5-8.5 7.5q-3 4-6 12t-5 11q-2-4-11.5-6.5t-9.5-5.5q2 10 4 35t5 38q7 31-12 48-27 25-29 40-4 22 12 26 0 7-8 20.5t-7 21.5q0 6 2 16z"/></svg>
                    {{group.region}}
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import Axios from 'axios';

export default {
  name: 'Groups',
  metaInfo: {
    title: 'GameGroups',
    titleTemplate: '%s - Groups',
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
      gameName: '',
      groups: [],
      games: []
    }
  },
  methods: {
    logout: function () {
      this.$cognitoAuth.logout();
      this.$router.replace(this.$route.query.redirect || '/');
    },
    filterGame (game) {
      this.groups = [];
      console.log(game.gameId)
      Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/subscriptions/forgame/' + game.gameId)
        .then(response => {
          this.groups = response.data;
        })
        .catch(e => {
          console.log(e)
        });
    },
    getAllGroups () {
      this.gameName = '';
      this.groups = [];
      Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups')
        .then(response => {
          this.groups = response.data;
        })
        .catch(e => {
          console.log(e)
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
  beforeMount () {
    if (this.loggedIn) {
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Dashboard: Couldn't get the session:", err, err.stack);
          return;
        }
        this.token = jwtDecode(jwtToken);
        console.log(jwtToken);
        this.user = this.$cognitoAuth.getCurrentUser();
        let config = {
          headers: { 'Authorization': jwtToken }
        };
        Axios.all([
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/games'),
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups')
        ])
          .then(Axios.spread((games, groups) => {
            this.games = games.data;
            this.groups = groups.data;
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
    height: 5.5em;
    &:hover {
      cursor: pointer;
    }
  }
  .hr {
    margin: 15px 0;
    border-bottom: 1px solid #b5b5b5;
    width: 95vw;
  }
  .groupsContainer {
    display: flex;
    max-width: 800px;
    flex-direction: column;
    margin: 0 auto;
    flex-wrap: nowrap;
    margin-bottom: 35px;
  }
  .groupCard {
    width: 100%;
    margin-bottom: .5rem;
    font-size: .8em;
    background: #e0dfdf;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid #cccccc;
  }
  .groupName {
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .groupImg {
    height: 6rem;
  }
  .r-link {
    color: grey;
    display: flex;
    text-decoration: none;
    flex-direction: row;
  }
  .imgContainer {
    padding: .5rem;
  }
  .gamesContainer {
    display: flex;
    align-items: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  .gamesTitle {
    display: flex;
    align-items: center;
  }
  .edit {
    height: 2.3em;
    fill: grey;
  }
  .edit:hover {
    cursor: pointer;
    fill: grey;
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
  .group-info-container {
    padding: .5rem;
  }
  .attributes-container {
    display: flex;
    flex-direction: row;
  }
  .elipses {
    margin-bottom: 5px;
    padding-bottom: 5px;
    min-height: 3rem;
    max-height:3rem;
    overflow:hidden;
    text-overflow: ellipsis;
    content: "";
    background: -webkit-linear-gradient(top, #000 25%, #e0dfe0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .globe, .stopwatch {
    height: 2em;
    margin-right: .2rem;
    margin-left: 1rem;
  }
  .medal {
    height: 2em;
  }
  .group-region, .skill-level, .time-commitment {
    display: flex;
    align-items: center;
  }
  .filter-row {
    width: 100%;
    background: #272727;
    padding: .5rem 1rem;
    border-radius: 3px;
    color: #f4c92e;
    border: 1px solid black;
    margin-bottom: .5rem;
  }
  .btn-clear-filter {
    float: right;
  }

  ::-webkit-scrollbar {
    height: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
    border: 1px solid #bdbcbc;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888888;
    border-radius: 10px;
    border-top: 1px solid #bdbcbc;
    border-bottom: 1px solid #bdbcbc;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #a6a5a5;
  }

  @media only screen and (max-width: 440px)  {
    .globe, .stopwatch {
      height: 1.4em;
      margin-right: .2rem;
      margin-left: .5rem;
    }
    .medal {
      height: 1.4em;
    }
  }
</style>
