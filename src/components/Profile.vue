<template>
  <div class="profile row">
    <div class="d-flex col-md-12">
      <h1>Profile Page</h1>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'Profile',
  metaInfo: {
    title: 'GameGroups',
    titleTemplate: '%s - ' + store.state.currentUser.nickname,
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  data () {},
  beforeMount: function () {
    store.dispatch('getUser');
    console.log(store.state.currentUser);
  }
}
</script>

<style scoped lang="scss" type="text/scss">

</style>
