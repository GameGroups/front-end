<template>
  <div class="sign-up row">
    <div class="col-sm-3 col-sm-offset-3">
      <h2>Sign Up</h2>
      <p>Sign up for an account.</p>

      <div class="alert alert-danger" v-if="error">
        <p v-if="error" class="error">{{ error.message }}</p>
      </div>

      <form @submit.prevent="signup">
        <div class="form-group">
          <input type="text" name="username" class="form-control" placeholder="Enter your username" v-model="username" required>
        </div>

        <div class="form-group">
          <input type="text" name="nickname" class="form-control" placeholder="Enter your display name" v-model="nickname" required>
        </div>

        <div class="form-group">
          <input type="text" name="email" class="form-control" placeholder="Enter your email" v-model="email" required>
        </div>

        <div class="form-group">
          <input type="password" class="form-control" placeholder="Enter your password" v-model="password" required>
        </div>
        <button class="btn btn-primary">Sign Up</button>
      </form>

      <div class="marketing"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Sign Up', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      username: '',
      nickname: '',
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    signup () {
      this.$cognitoAuth.signup(this.$data, (err, result) => {
        if (err) {
          this.error = err
          console.error(err)
        } else {
          console.log('Signup successful:', result)
          this.$router.replace({path: '/confirm', query: {username: this.username}})
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss"></style>
