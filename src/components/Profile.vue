<template>
  <div class="profile row">
    <div class="profile-header col-md-12">
      <div class="profile-picture">
        <img class="img-fluid" src="http://via.placeholder.com/150x150" />
      </div>

      <div class="primary-info">
        <h2 class="displayname">{{ $store.state.currentUser.nickname }} <span class="region d-none d-md-inline d-block">[{{ $store.state.currentUser['custom:region'] }}]</span></h2>
        <blockquote class="tagline">&#34;{{ $store.state.currentUser['custom:tagline'] ? $store.state.currentUser['custom:tagline'] : ''  }}&#34;</blockquote>

        <ul class="user-stats">
          <li class="skill-level">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 460.731 460.731" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 460.731 460.731" v-html="skillLevelHTML"></svg>
            <span>{{ $store.state.currentUser['custom:skill-level'] ? $store.state.currentUser['custom:skill-level'] : 'No skill level set -' }}</span>
          </li>

          <li class="time-commitment">
            <svg class="centerSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 512 512" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 512 512" v-html="availabilityHTML"></svg>
            {{ $store.state.currentUser['custom:time-commitment'] ? $store.state.currentUser['custom:time-commitment'] : ' No time commitment set - ' }}
          </li>

          <!--<li class="region">-->
            <!--&lt;!&ndash;<svg class="centerSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 1000 1000" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 1000 1000" v-html="regionHTML"></svg>&ndash;&gt;-->
            <!--{{ $store.state.currentUser['custom:region'] ? $store.state.currentUser['custom:region'] : 'Somewhere' }}-->
          <!--</li>-->
        </ul>

        <div class="votes">
          <div class="upvotes">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 478.2 478.2" style="enable-background:new 0 0 478.2 478.2;" xml:space="preserve"><g> <path d="M457.575,325.1c9.8-12.5,14.5-25.9,13.9-39.7c-0.6-15.2-7.4-27.1-13-34.4c6.5-16.2,9-41.7-12.7-61.5 c-15.9-14.5-42.9-21-80.3-19.2c-26.3,1.2-48.3,6.1-49.2,6.3h-0.1c-5,0.9-10.3,2-15.7,3.2c-0.4-6.4,0.7-22.3,12.5-58.1 c14-42.6,13.2-75.2-2.6-97c-16.6-22.9-43.1-24.7-50.9-24.7c-7.5,0-14.4,3.1-19.3,8.8c-11.1,12.9-9.8,36.7-8.4,47.7 c-13.2,35.4-50.2,122.2-81.5,146.3c-0.6,0.4-1.1,0.9-1.6,1.4c-9.2,9.7-15.4,20.2-19.6,29.4c-5.9-3.2-12.6-5-19.8-5h-61 c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c8.9,0,17.2-2.8,24-7.6l23.5,2.8c3.6,0.5,67.6,8.6,133.3,7.3c11.9,0.9,23.1,1.4,33.5,1.4c17.9,0,33.5-1.4,46.5-4.2c30.6-6.5,51.5-19.5,62.1-38.6c8.1-14.6,8.1-29.1,6.8-38.3c19.9-18,23.4-37.9,22.7-51.9C461.275,337.1,459.475,330.2,457.575,325.1z M48.275,447.3c-8.1,0-14.6-6.6-14.6-14.6V270.1c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5c0,8.1-6.6,14.6-14.6,14.6h-61V447.3z M431.975,313.4c-4.2,4.4-5,11.1-1.8,16.3c0,0.1,4.1,7.1,4.6,16.7c0.7,13.1-5.6,24.7-18.8,34.6c-4.7,3.6-6.6,9.8-4.6,15.4c0,0.1,4.3,13.3-2.7,25.8c-6.7,12-21.6,20.6-44.2,25.4c-18.1,3.9-42.7,4.6-72.9,2.2c-0.4,0-0.9,0-1.4,0c-64.3,1.4-129.3-7-130-7.1h-0.1l-10.1-1.2c0.6-2.8,0.9-5.8,0.9-8.8V270.1c0-4.3-0.7-8.5-1.9-12.4c1.8-6.7,6.8-21.6,18.6-34.3c44.9-35.6,88.8-155.7,90.7-160.9c0.8-2.1,1-4.4,0.6-6.7c-1.7-11.2-1.1-24.9,1.3-29c5.3,0.1,19.6,1.6,28.2,13.5c10.2,14.1,9.8,39.3-1.2,72.7c-16.8,50.9-18.2,77.7-4.9,89.5c6.6,5.9,15.4,6.2,21.8,3.9c6.1-1.4,11.9-2.6,17.4-3.5c0.4-0.1,0.9-0.2,1.3-0.3c30.7-6.7,85.7-10.8,104.8,6.6c16.2,14.8,4.7,34.4,3.4,36.5c-3.7,5.6-2.6,12.9,2.4,17.4c0.1,0.1,10.6,10,11.1,23.3C444.875,295.3,440.675,304.4,431.975,313.4z"/></g></svg>
            <span class="votes">15</span>
          </div>

          <div class="downvotes">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="475.092px" height="475.092px" viewBox="0 0 475.092 475.092" style="enable-background:new 0 0 475.092 475.092;"  xml:space="preserve"><g> <path d="M442.822,209.562c1.715-6.283,2.57-12.847,2.57-19.702c0-14.655-3.621-28.361-10.852-41.112  c0.567-3.995,0.855-8.088,0.855-12.275c0-19.223-5.716-36.162-17.132-50.819v-1.427c0.191-26.075-7.946-46.632-24.414-61.669  C377.387,7.521,355.831,0,329.186,0h-31.977c-19.985,0-39.02,2.093-57.102,6.28c-18.086,4.189-39.304,10.468-63.666,18.842  c-22.08,7.616-35.211,11.422-39.399,11.422H54.821c-10.088,0-18.702,3.567-25.84,10.704C21.845,54.387,18.276,63,18.276,73.085  v182.728c0,10.089,3.566,18.698,10.705,25.837c7.142,7.139,15.752,10.705,25.84,10.705h78.228  c6.849,4.572,19.889,19.324,39.113,44.255c11.231,14.661,21.416,26.741,30.551,36.265c3.612,3.997,6.564,10.089,8.848,18.271  c2.284,8.186,3.949,16.228,4.998,24.126c1.047,7.898,3.475,16.516,7.281,25.837c3.806,9.329,8.944,17.139,15.415,23.422  c7.423,7.043,15.985,10.561,25.697,10.561c15.988,0,30.361-3.087,43.112-9.274c12.754-6.184,22.463-15.845,29.126-28.981  c6.663-12.943,9.996-30.646,9.996-53.103c0-17.702-4.568-35.974-13.702-54.819h50.244c19.801,0,36.925-7.23,51.394-21.7  c14.469-14.462,21.693-31.497,21.693-51.103C456.809,239.165,452.15,223.652,442.822,209.562z M85.942,104.219  c-3.616,3.615-7.898,5.424-12.847,5.424c-4.95,0-9.233-1.805-12.85-5.424c-3.615-3.621-5.424-7.898-5.424-12.851  c0-4.948,1.809-9.231,5.424-12.847c3.621-3.617,7.9-5.424,12.85-5.424c4.949,0,9.231,1.807,12.847,5.424  c3.617,3.616,5.426,7.898,5.426,12.847C91.368,96.317,89.56,100.598,85.942,104.219z M409.135,281.377  c-7.42,7.33-15.886,10.992-25.413,10.992H283.227c0,11.04,4.564,26.217,13.698,45.535c9.138,19.321,13.71,34.598,13.71,45.829  c0,18.647-3.046,32.449-9.134,41.395c-6.092,8.949-18.274,13.422-36.546,13.422c-4.951-4.948-8.572-13.045-10.854-24.276  c-2.276-11.225-5.185-23.168-8.706-35.83c-3.519-12.655-9.18-23.079-16.984-31.266c-4.184-4.373-11.516-13.038-21.982-25.98  c-0.761-0.951-2.952-3.806-6.567-8.562c-3.614-4.757-6.613-8.658-8.992-11.703c-2.38-3.046-5.664-7.091-9.851-12.136  c-4.189-5.044-7.995-9.232-11.422-12.565c-3.427-3.327-7.089-6.708-10.992-10.137c-3.901-3.426-7.71-5.996-11.421-7.707  c-3.711-1.711-7.089-2.566-10.135-2.566h-9.136V73.092h9.136c2.474,0,5.47-0.282,8.993-0.854c3.518-0.571,6.658-1.192,9.419-1.858  c2.76-0.666,6.377-1.713,10.849-3.14c4.476-1.425,7.804-2.522,9.994-3.283c2.19-0.763,5.568-1.951,10.138-3.571  c4.57-1.615,7.33-2.613,8.28-2.996c40.159-13.894,72.708-20.839,97.648-20.839h36.542c16.563,0,29.506,3.899,38.828,11.704  c9.328,7.804,13.989,19.795,13.989,35.975c0,4.949-0.479,10.279-1.423,15.987c5.708,3.046,10.231,8.042,13.559,14.987  c3.333,6.945,4.996,13.944,4.996,20.985c0,7.039-1.711,13.61-5.141,19.701c10.089,9.517,15.126,20.839,15.126,33.974  c0,4.759-0.948,10.039-2.847,15.846c-1.899,5.808-4.285,10.327-7.139,13.562c6.091,0.192,11.184,4.665,15.276,13.422  c4.093,8.754,6.14,16.468,6.14,23.127C420.277,265.525,416.561,274.043,409.135,281.377z"/></g></svg>
            <span class="votes">2</span>
          </div>
        </div>
      </div>

      <!--<div class="secondary-info">
        <p class="top-games-title">Top 3 Games:</p>
        <div class="top-games">
          <ol>
            <li>Game 1</li>
            <li>Game 2</li>
            <li>Game 3</li>
          </ol>
        </div>
      </div>-->
    </div>

    <div class="interaction-bar col-md-12">
      <a class="btn btn-primary">Send Friend Request</a>
    </div>

    <div class="profile-bio col-md-9">
      <h5>Bio:</h5>
      <p class="bio">{{ $store.state.currentUser['custom:bio'] ? $store.state.currentUser['custom:bio'] : 'No bio has been set.' }}</p>
    </div>

    <div class="groups-sidebar col-md-3">
      <h5>Groups:</h5>

      <ul class="groups-list">
        <li v-for="(group, index) in groups" :key="`group-${index}`">
          <!--<img class="img-fluid" src="http://via.placeholder.com/50x50" />-->
          <router-link tag="img" class="img-fluid" src="http://via.placeholder.com/50x50" :to="{ path: 'group/' + group.groupId }"></router-link>
          <div>
            <router-link tag="h6" :to="{ path: 'group/' + group.groupId }">{{ group.groupName }}</router-link>
            <!--<h6 class="text-muted">{{ group.memberCount }} Members</h6>-->
          </div>
        </li>

        <!--<li>
          <img class="img-fluid" src="http://via.placeholder.com/50x50" />
          <div>
            <h4>GroupName</h4>
            <h6 class="text-muted">1024 Members</h6>
          </div>
        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store';
import svgData from '../components/SVGPath.js';
import config from '../../config/dev.env'
import {CognitoIdentityServiceProvider} from 'aws-sdk'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import jwtDecode from 'jwt-decode';
import Axios from 'axios';

export default {
  name: 'Profile',
  metaInfo: {
    title: 'GameGroups',
    // titleTemplate: '%s - ' + (store.state.loggedIn ? store.state.currentUser.nickname : ''),
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  data: function () {
    return {
      groups: [
        /* { groupName: 'Group 1', memberCount: '1000' },
        { groupName: 'Group 2', memberCount: '6573' },
        { groupName: 'Group 3', memberCount: '1000000' },
        { groupName: 'Group 4', memberCount: '1000000' },
        { groupName: 'Group 5', memberCount: '1024' },
        { groupName: 'Group 6', memberCount: '1024' },
        { groupName: 'Group 7', memberCount: '1024' },
        { groupName: 'Group 8', memberCount: '1024' },
        { groupName: 'Group 9', memberCount: '1024' },
        { groupName: 'Group 10', memberCount: '1024' } */
      ],
      skillLevelHTML: svgData.svgData.SKILL_LEVEL,
      availabilityHTML: svgData.svgData.AVAILABILITY,
      regionHTML: svgData.svgData.REGION
    };
  },
  beforeCreate: function () {
    // Make API call to get appropriate user for a username
    this.$cognitoAuth.getIdToken((err, jwtToken) => {
      if (err) {
        console.log("Dashboard: Couldn't get the session:", err, err.stack);
      } else {
        Axios.get(
          'https://lxcrjbnnlj.execute-api.us-east-2.amazonaws.com/Develop/groups/foruser/' + jwtDecode(jwtToken).sub,
          {
            headers: {
              'Authorization': jwtToken
            }
          }
        )
          .then(response => {
            if (response.data.length > 0) {
              console.log(response);
              this.$data.groups = response.data;
            }
          })
          .catch(e => {
            console.log(e)
          });
      }
      // console.log(jwtToken);
      // this.token = jwtDecode(jwtToken);

      // state.currentUser = cognitoAuth.getCurrentUser();
    });
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .profile-header {
    display: flex;
    padding: 2.5rem 0 2.5rem 0;
    background: orange;
    overflow: hidden;

    .primary-info { width: 75%; }
    .secondary-info { width: 25%; }

    .profile-picture {
      margin: 0 1rem 0 1rem;
    }

    .displayname {
      margin-bottom: 0;
      padding-bottom: .25rem;
    }

    .user-stats {
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
    //background: red;
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

  .upvotes svg { fill: green; }
  .downvotes svg { fill: red; }

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

    .user-stats, .votes {
      display: flex;
      justify-content: center !important;
    }

    span.region {
      font-size: 1.7rem;
    }
  }
</style>
