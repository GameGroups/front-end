<template>
  <div class="reset row">
    <div class="col-md-12 form-container">
      <h2>Success!</h2>
      <div class="flex-wrap">
        <p>Your password has been reset successfully. Click
          <router-link to="/login"><a href="#">Here</a></router-link> to login.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPasswordSuccess',
  metaInfo: {
    title: 'GameGroups',
    titleTemplate: '%s - Reset Password Success',
    htmlAttrs: {
      lang: 'en',
      amp: undefined
    }
  },
  data () {
    return {
      error: null
    };
  },
  methods: {
  },
  onCreate () {
    window.location(0, 0)
  }
}
</script>

<style scoped lang="scss" type="text/scss" >
  .reset {
    margin: 2.2em;
  }
</style>
