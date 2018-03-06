<template>
  <div class="profile row">
    <div class="profile-header col-md-12">
      <div class="profile-picture">
        <img class="img-fluid" src="http://via.placeholder.com/150x150" />
      </div>

      <div class="primary-info">
        <h2 class="displayname">{{ $store.state.currentUser.nickname }}</h2>
        <blockquote class="tagline">{{ $store.state.currentUser['custom:tagline'] ? $store.state.currentUser['custom:tagline'] : ''  }}</blockquote>

        <ul class="user-stats">
          <li class="skill-level">{{ $store.state.currentUser['custom:skill-level'] ? $store.state.currentUser['custom:skill-level'] : 'No skill level set -' }}</li>
          <li class="time-commitment">{{ $store.state.currentUser['custom:time-commitment'] ? $store.state.currentUser['custom:time-commitment'] : ' No time commitment set - ' }}</li>
          <li class="time-region">{{ $store.state.currentUser['custom:region'] ? $store.state.currentUser['custom:region'] : 'Somewhere' }}</li>
        </ul>
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

    <div class="interaction-bar col-md-12"></div>

    <div class="profile-bio col-md-9">
      <h5>Bio:</h5>
      <p class="bio">{{ $store.state.currentUser['custom:bio'] ? $store.state.currentUser['custom:bio'] : 'No bio has been set.' }}</p>
    </div>

    <div class="groups-sidebar col-md-3"></div>
  </div>
</template>

<script>
import store from '../store';

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
  data: function () { return {}; },
  beforeCreate: function () {
    // Make API call to get appropriate user for a username
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
      justify-content: flex-start;
      padding: 0;

      li {
        display: inline;
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
    height: 1.75rem;
    background: #666;
  }

  .profile-bio {
    h5 {
      margin: .5rem 0 .25rem 0;
    }
  }

  .groups-sidebar {
    background: red;
    height: 50vh;
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
  }
</style>
