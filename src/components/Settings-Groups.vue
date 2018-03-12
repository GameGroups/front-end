<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Groups</h2>
      <p>Your groups are listed below. Click a group name to view the group's profile.</p>
    </div>
    <div class="hr"></div>

    <div class="row data max-width-center">
      <div class="col-md-12 game-row-container">
        <div class="group-row" v-for="group in groups" :key="group.groupId">
          <router-link to="#"><div class="name-container">{{group.groupName}}</div></router-link>
          <div class="member-status" v-if="group.isAdmin">Admin</div>

          <router-link :to="{ path: '/groups/' + group.groupId}">
          <div v-if="group.isAdmin" class="svg-container">
            <svg class="edit-svg" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M888 1184l116-116-152-152-116 116v56h96v96h56zm440-720q-16-16-33 1l-350 350q-17 17-1 33t33-1l350-350q17-17 1-33zm80 594v190q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-14 14-32 8-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-126q0-13 9-22l64-64q15-15 35-7t20 29zm-96-738l288 288-672 672h-288v-288zm444 132l-92 92-288-288 92-92q28-28 68-28t68 28l152 152q28 28 28 68t-28 68z"/></svg>
          </div>
          </router-link>

          <router-link to="#" v-bind:class="{'margin-left-svg': !group.isAdmin}">
          <div v-on:click="prepare(group)" data-target="#confirmModal" data-toggle="modal"  v-bind:class="{'svg-container': true, 'margin-left-svg': !group.isAdmin}">
            <svg class="x-svg" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
          </div>
          </router-link>
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
            <p>Are you sure you want to leave the group '{{this.groupName}}'?</p>
          </div>
          <div class="modal-footer">
            <button v-on:click="leaveGroup" type="button" class="btn btn-primary" data-dismiss="modal">Yes, Delete</button>
            <button id="btn-cancel" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
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
  name: 'MyGroups',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - My Groups', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      groups: [],
      groupName: '',
      groupId: '',
      memberId: ''
    }
  },
  methods: {
    prepare: function (group) {
      this.groupName = group.groupName;
      this.groupId = group.groupId;
      console.log(this.groupName + ' ' + this.groupId);
    },
    clear: function () {
      this.groupName = '';
      this.groupId = '';
      this.memberId = '';
    },
    leaveGroup: function () {
      let config = {
        headers: { 'Authorization': this.token }
      };
      Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.groupId + '/members')
        .then(response => {
          if (response.data.length > 0) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].userId === this.token.sub) {
                this.memberId = response.data[i].groupMemberId;
              }
            }
            Axios.delete('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.groupId + '/members/' + this.memberId)
              .then(response => {
                Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/foruser/' + this.token.sub)
                  .then(response => {
                    if (response.data.length > 0) {
                      this.groups = response.data;
                      var x = document.getElementById('btn-cancel');
                      x.click();
                      this.clear();
                    }
                  })
                  .catch(e => {
                    console.log(e)
                  });
              })
              .catch(e => {
                console.log(e);
              })
          }
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
        Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/foruser/' + this.token.sub, config)
          .then(response => {
            if (response.data.length > 0) {
              // console.log(response.data)
              this.groups = response.data;
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
  }
  .max-width-center {
    max-width: 40em;
    margin: 0 auto;
  }
  .game-row-container {
    border: 1px solid #cacaca;
    padding: 0;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  svg {
    fill: #b3525c;
    float: right;
    height: 1.8em;
    margin-left: auto;
  }
  .member-status {
    margin-left: auto;
    margin-right: 1em;
  }
  .svg-container:hover {
    cursor: pointer;
    .x-svg {
      fill: #9e0000;
    }
  }
  .name-container {
    margin-left: 10px;
  }
  .name-container:hover {
    cursor: pointer;
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
    margin: 2em auto 4em auto;
  }
  .edit-svg {
    fill: grey;
    margin-right: .5em;
  }
  .edit-svg:hover {
    fill: black;
  }
  .margin-left-svg {
    margin-left: auto;
  }

  @media only screen and (max-width: 440px)  {
    .content {
      margin: .7em;
    }
  }
</style>
