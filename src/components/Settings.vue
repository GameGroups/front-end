<template>
  <div class="settings row">
    <div class="sidebar">
      <div v-on:click="path = '/myaccount/details'" v-bind:class="{ 'icon-container': true, 'isActive': path == '/myaccount/details' }">
        <router-link class="sidebar-link" to="/myaccount/details">
          <svg class="settings-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
          <p class="settings-label">Details</p>
        </router-link>
      </div>
      <div v-on:click="path = '/myaccount/profile'" v-bind:class="{ 'icon-container': true, 'isActive': path == '/myaccount/profile' }">
        <router-link class="sidebar-link" to="/myaccount/profile">
          <svg class="settings-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"/></svg>
          <p class="settings-label">Profile</p>
        </router-link>
      </div>
      <div v-on:click="path = '/myaccount/games'" v-bind:class="{ 'icon-container': true, 'isActive': path == '/myaccount/games' }">
        <router-link class="sidebar-link" to="/myaccount/games">
          <svg class="settings-icon" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M896 1088v-128q0-14-9-23t-23-9h-192v-192q0-14-9-23t-23-9h-128q-14 0-23 9t-9 23v192h-192q-14 0-23 9t-9 23v128q0 14 9 23t23 9h192v192q0 14 9 23t23 9h128q14 0 23-9t9-23v-192h192q14 0 23-9t9-23zm576 64q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm256-256q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm256 128q0 212-150 362t-362 150q-192 0-338-128h-220q-146 128-338 128-212 0-362-150t-150-362 150-362 362-150h896q212 0 362 150t150 362z"/></svg>          <p class="settings-label">Games</p>
        </router-link>
      </div>
      <div v-on:click="path = '/myaccount/groups'" v-bind:class="{ 'icon-container': true, 'isActive': path == '/myaccount/groups' }">
        <router-link class="sidebar-link" to="/myaccount/groups">
          <svg class="settings-icon" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M657 896q-162 5-265 128h-134q-82 0-138-40.5t-56-118.5q0-353 124-353 6 0 43.5 21t97.5 42.5 119 21.5q67 0 133-23-5 37-5 66 0 139 81 256zm1071 637q0 120-73 189.5t-194 69.5h-874q-121 0-194-69.5t-73-189.5q0-53 3.5-103.5t14-109 26.5-108.5 43-97.5 62-81 85.5-53.5 111.5-20q10 0 43 21.5t73 48 107 48 135 21.5 135-21.5 107-48 73-48 43-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-1024-1277q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm704 384q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5zm576 225q0 78-56 118.5t-138 40.5h-134q-103-123-265-128 81-117 81-256 0-29-5-66 66 23 133 23 59 0 119-21.5t97.5-42.5 43.5-21q124 0 124 353zm-128-609q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181z"/></svg>
          <p class="settings-label">Groups</p>
        </router-link>
      </div>
    </div>
    <div class="instructions" v-if="path === '/myaccount'">
      <h2>My Account</h2>
      <p>Select an icon to the left to edit options for that category</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import jwtDecode from 'jwt-decode';

export default {
  name: 'MyAccount',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - My Account', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      loggedIn: false,
      seen: true,
      profile: false,
      path: this.$route.path
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
  beforeMount () {
    if (this.loggedIn) {
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Dashboard: Couldn't get the session:", err, err.stack);
          return;
        }
        this.token = jwtDecode(jwtToken);
      });
    } else {
      this.$router.replace(this.$route.query.redirect || '/login');
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .row {
    flex-wrap: initial;
  }
  .sidebar {
    min-height: 100vh;
    background: #3f5e86;
    color: #fff;
    text-align: center;
    padding: 25px 0;
  }
  .icon-container {
  }
  .icon-container:hover {
    background: #385271;
    cursor: pointer;
  }
  .settings-icon {
    height: 2.7em;
    fill: #f3f3f3;
  }
  .settings-label {
    font-size: .8em;
    margin: 0;
    margin-top: -5px;
  }
  .main-content, .profile-container {
    margin: 35px;
  }
  .sidebar-link {
    color: white;
    padding: 10px 20px 10px 18px;
    display: inline-block;
  }
  .sidebar-link:hover {
    text-decoration: none;
  }
  .isActive {
    background: white;
  }
  .isActive > a > p {
    color: #3f5e86;
  }
  .isActive > a > svg {
    fill: #3f5e86
  }
  .isActive:hover {
    background: white;
  }
  /*.isActive:hover > a > svg {
    fill: #013373;
  }
  .isActive:hover > a > p {
    color: #013373;
  }*/
  .instructions {
    margin: 35px;
  }

  @media only screen and (max-width: 440px)  {
    .settings-icon {
      height: 1.7em;
    }
    .sidebar-link {
      padding: 10px 10px 10px 8px;
    }
  }
</style>
