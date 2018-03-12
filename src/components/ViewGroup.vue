<template>
  <div class="profile row">
    <div class="profile-header col-md-12">
      <div class="profile-picture">
        <img class="img-fluid" src="http://via.placeholder.com/150x150" />
      </div>

      <div class="primary-info">
        <h2 class="displayname">{{ group.groupName }} <span class="region d-none d-md-inline d-block">[{{ group.region }}]</span></h2>
        <!--<blockquote class="tagline">&#34;{{ group['custom:tagline'] ? group['custom:tagline'] : ''  }}&#34;</blockquote>-->
        <ul class="group-stats">
          <li class="skill-level">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 460.731 460.731" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 460.731 460.731" v-html="skillLevelHTML"></svg>
            <span>{{ group.skillLevel ? group.skillLevel : 'No skill level set -' }}</span>
          </li>

          <li class="time-commitment">
            <svg class="centerSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 512 512" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 512 512" v-html="availabilityHTML"></svg>
            {{ group.timeCommitment ? group.timeCommitment : ' No time commitment set - ' }}
          </li>

          <!--<li class="region">-->
            <!--&lt;!&ndash;<svg class="centerSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 1000 1000" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 1000 1000" v-html="regionHTML"></svg>&ndash;&gt;-->
            <!--{{ group['custom:region'] ? group['custom:region'] : 'Somewhere' }}-->
          <!--</li>-->
        </ul>

        <div class="join-button" v-if="!isInGroup">
          <button class="btn btn-primary" v-on:click="joinGroup">Join Group</button>
        </div>
        <div class="join-button" v-else>
          <p class="text-success">You are a member</p>
        </div>
      </div>
    </div>

    <div class="interaction-bar col-md-12">
      <!--<a v-if="this.$router.currentRoute.params.id !== this.group.groupName" class="btn btn-primary">Send Friend Request</a>-->
    </div>

    <div class="col-md-12">
      <ul class="nav nav-tabs" id="profile-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab" aria-controls="info" aria-selected="true">Info</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="members-tab" data-toggle="tab" href="#members" role="tab" aria-controls="members" aria-selected="false">Members ({{ this.$data.members.length }})</a>
        </li>
      </ul>
    </div>

    <div class="tab-content col-md-12" id="tab-content">
      <div class="tab-pane fade show active" id="info" role="tabpanel" aria-labelledby="info-tab">
        <h5>Description:</h5>
        <p class="bio">{{ group.groupDescription ? group.groupDescription : 'No description has been set.' }}</p>
      </div>

      <div class="tab-pane fade" id="members" role="tabpanel" aria-labelledby="members-tab">
        <ul class="col-md-12">
          <li v-if="!members">
            <p>This group has no members.</p>
          </li>
          <li v-else v-for="(member, index) in members" :key="`member-${index}`">
            <!--<img class="img-fluid" src="http://via.placeholder.com/50x50" />-->
            <svg v-on:click="leaveGroup" v-if="member.username === $store.state.currentUser['cognito:username']" class="x-svg" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>
            <router-link tag="img" class="img-fluid" src="http://via.placeholder.com/50x50" :to="{ path: '/user/' + member.username }"></router-link>
            <div>
              <router-link tag="a" :to="{ path: '/user/' + member.username }">{{ member.username }}</router-link>
              <!--<h6 class="text-muted">{{ group.memberCount }} Members</h6>-->
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--<div class="profile-bio col-md-9">-->
      <!--<h5>Description:</h5>-->
      <!--<p class="bio">{{ group.groupDescription ? group.groupDescription : 'No description has been set.' }}</p>-->
    <!--</div>-->
  </div>
</template>

<script>
import store from '../store';
import svgData from '../components/SVGPath.js';
import config from '../../config/dev.env'
import {CognitoIdentityServiceProvider} from 'aws-sdk'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import jwtDecode from 'jwt-decode';
import NotFound from './NotFound.vue';
import Axios from 'axios';

export default {
  name: 'Profile',
  metaInfo () {
    return {
      title: 'GameGroups',
      titleTemplate: '%s - ' + this.$data.group.groupName,
      htmlAttrs: {
        lang: 'en',
        amp: undefined
      }
    };
  },
  data: function () {
    return {
      group: '',
      members: '',
      isInGroup: false,
      skillLevelHTML: svgData.svgData.SKILL_LEVEL,
      availabilityHTML: svgData.svgData.AVAILABILITY,
      regionHTML: svgData.svgData.REGION
    };
  },
  beforeCreate: function () {
    // Make API call to get appropriate user for a username
    console.log('Current group: ', this.$router.currentRoute.params.id);
    Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.$router.currentRoute.params.id)
      .then(groupResponse => {
        this.$data.group = groupResponse.data[0];
        console.log('Group: ', groupResponse.data[0]);
        if (groupResponse.data.length > 0) {
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.$router.currentRoute.params.id + '/members')
            .then(membersResponse => {
              if (membersResponse.data.length > 0) {
                // console.log('Members:', membersResponse);
                this.$data.members = membersResponse.data.filter(function (value) {
                  return value.username !== '';
                });

                this.$data.isInGroup = (this.$data.members.filter(item => item.username === store.state.currentUser['cognito:username']).length !== 0);

                console.log('Members: ', this.$data.members);
              } else {
                console.log('There are no members');
              }
            })
            .catch(e => {
              console.error(e);
            });
        } else {
          console.log('Couldn\'t find a user with the username: "', this.$router.currentRoute.params.id, '"');
          this.$router.replace({ path: '/404', component: NotFound });
        }
      })
      .catch(e => {
        console.error(e);
      });
  },
  methods: {
    joinGroup: function () {
      console.log(this.$store.state.currentUser['cognito:username'] + ' is joining group ' + this.group.groupName + '(' + this.group.groupId + ')');
      // document.querySelector('.join-button .btn').classList.add('d-none');
      Axios.post('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.$router.currentRoute.params.id + '/members', {
        'userId': this.$store.state.currentUser.sub,
        'username': this.$store.state.currentUser['cognito:username']
      })
        .then(joinResponse => {
          // Update groups
          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.$router.currentRoute.params.id + '/members')
            .then(membersResponse => {
              if (membersResponse.data.length > 0) {
                this.$data.members = membersResponse.data.filter(function (value) {
                  return value.username !== '';
                });

                console.log(this.$data.members)
                this.$data.isInGroup = (this.$data.members.filter(item => item.username === store.state.currentUser['cognito:username']).length !== 0);
              }
            })
            .catch(e => {
              console.log(e);
            })
        })
        .catch(e => {
          console.error(e);
        });
    },
    leaveGroup: function () {
      let config = {};
      if (this.$store.state.loggedIn) {
        this.$cognitoAuth.getIdToken((err, jwtToken) => {
          if (err) {
            console.log("Couldn't get the session:", err, err.stack);
            return;
          }

          config = {
            headers: { 'Authorization': jwtToken }
          };

          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.$router.currentRoute.params.id + '/members')
            .then(response => {
              if (response.data.length > 0) {
                console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                  if (response.data[i].userId === store.state.currentUser.sub) {
                    this.memberId = response.data[i].groupMemberId;
                  }
                }
                Axios.delete('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.$router.currentRoute.params.id + '/members/' + this.memberId)
                  .then(response => {
                    Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/foruser/' + store.state.currentUser.sub)
                      .then(response => {
                        if (response.data.length > 0) {
                          Axios.get('https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/' + this.$router.currentRoute.params.id + '/members')
                            .then(membersResponse => {
                              if (membersResponse.data.length > 0) {
                                this.$data.members = membersResponse.data.filter(function (value) {
                                  return value.username !== '';
                                });

                                console.log(this.$data.members)
                                this.$data.isInGroup = (this.$data.members.filter(item => item.username === store.state.currentUser['cognito:username']).length !== 0);
                              }
                            })
                            .catch(e => {
                              console.log(e);
                            })
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
        });
      } else {
        this.$router.replace(this.$route.query.redirect || '/login');
      }
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .profile-header {
    display: flex;
    padding: 2.5rem 0 2.5rem 0;
    background: #232323;
    color: #ccc;
    overflow: hidden;

    .primary-info {
      display: flex;
      flex-direction: column;
      width: 75%;
    }
    .secondary-info { width: 25%; }

    .profile-picture {
      margin: 0 1rem 0 1rem;
    }

    .displayname {
      margin-bottom: 0;
      padding-bottom: .25rem;
    }

    .group-stats {
      display: flex;
      justify-content: flex-start;
      padding: 0;
      align-items: center;

      li {
        display: inline;
      }

      .skill-level, .time-commitment, .region {
        padding-right: .5rem;

        svg {
          width: 1.25rem;
          height: 100%;
        }
      }
    }

    .tagline {
      padding-left: .5rem;
      border-left: 5px solid rgba(6, 6, 6, 1);
    }

    .top-games-title {
      text-align: right;
      padding-right: 1rem;
    }

    .top-games {
      display: flex;
      justify-content: flex-end;
      padding-right: 1rem;
    }
  }

  .interaction-bar {
    background: #666;

    .btn-primary {
      color: white;
      margin: .5rem 0 .5rem 0;

      &:hover {
       color: white;
      }
    }
  }

  .bio {
    margin-top: 1rem;
  }

  .profile-bio, .groups-sidebar {
    h5 {
      margin: .5rem 0 0 0;
      font-weight: bold;
    }
  }

  .groups-sidebar {
    height: 60vh;
    overflow-y: scroll;

    .groups-list {
      padding: 1rem 0 0 0;

      li {
        display: flex;
        // height: 50px;
        margin-bottom: 1rem;

        h6, img {
          cursor: pointer;
        }

        img {
          padding-right: .5rem;
          height: 50px;
        }
      }
    }
  }

  .votes {
    display: flex;
    flex-direction: row;
  }

  .upvotes .votes { color: green; }
  .downvotes .votes { color: red; }

  .upvotes, .downvotes {
    padding-right: 1rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  .group-stats { fill: #ccc !important; }

  .upvotes svg { fill: green; }
  .downvotes svg { fill: red; }

  #profile-tabs {
    li {
      margin: 0;
    }
  }

  .tab-content {
    margin-top: 1rem;
  }

  #friends {
    display: flex;
    flex-direction: column;

    p, .sadface {
      display: flex;
      justify-content: center;
    }
  }

  .join-button {
    margin-top: auto;

    p {
      margin: 0;
    }
  }

  .root > div > div:nth-child(3) {
    padding: 0;
  }

  #members {
    ul {
      padding-left: 0 !important;
      // display: flex;

      li {
        display: flex;
        margin-right: 1rem;
        margin-bottom: .5rem;
        width: 100%;

        div {
          display: flex;
          align-self: center;
          padding-left: .5rem;
        }
      }

      .x-svg {
        width: 1.5rem;
        height: 1.5rem;
        align-self: center;
        margin-right: 1rem;
        fill: red;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 767px) {
    .profile-header {
      flex-direction: column;
      justify-content: center;
      padding: 1rem 0 1rem 0;
    }

    .primary-info {
      width: auto !important;
      display: flex;
      text-align: center;
      flex-direction: column;
    }

    .tagline {
      border-left: 0 !important;
    }

    .profile-picture {
      display: flex;
      justify-content: center;
      margin: .75rem 0 .75rem 0 !important;
    }

    .group-stats, .votes {
      display: flex;
      justify-content: center !important;
    }

    span.region {
      font-size: 1.7rem;
    }
  }

  @-webkit-keyframes fadeOutLeft {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  @keyframes fadeOutLeft {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  .fadeOutLeft {
    -webkit-animation-name: fadeOutLeft;
    animation-name: fadeOutLeft;
    animation-duration: .5s;
  }
</style>
