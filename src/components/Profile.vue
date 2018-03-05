<template>
  <div class="profile row">
    <div class="d-flex col-md-12">
      <div class="profile-header">
        <div class="profile-picture">
          <img src="http://via.placeholder.com/150x150" />
        </div>

        <h2 class="displayname">{{ $store.state.currentUser.nickname }}</h2>

        <ul class="user-stats">
          <li class="skill-level">{{ $store.state.currentUser['custom:skill-level'] }}</li>
          <li class="time-commitment">{{ $store.state.currentUser['custom:time-commitment'] }}</li>
          <li class="time-region">{{ $store.state.currentUser['custom:region'] }}</li>
        </ul>
      </div>

      <div class="interaction-bar"></div>

      <div class="profile-bio"></div>

      <div class="groups-sidebar"></div>
    </div>
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

  }

</style>
