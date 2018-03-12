<template>
  <div class="confirmation row">
    <div class="col-sm-3 col-sm-offset-3">
      <h2>Confirm Account</h2>
      <p>
        Enter your confirmation code which was emailed to you.
      </p>
      <div class="alert alert-danger" v-if="error">
        <p v-if="error" class="error">{{ error.message }}</p>
      </div>
      <form @submit.prevent="confirm">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter your username" v-model="username" required>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Enter your confirmation code" v-model="code" required>
        </div>
        <button class="btn btn-primary">confirm</button>
      </form>
      <div class="row marketing">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Confirm Account', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      username: this.$route.query.username,
      code: '',
      error: null
    }
  },
  methods: {
    confirm () {
      this.$cognitoAuth.confirmRegistration(this.username, this.code, (err, result) => {
        if (err) {
          this.error = err
          console.error(err)
        } else {
          this.$router.replace('/login')
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss"></style>
