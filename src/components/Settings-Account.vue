<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Profile</h2>
      <p>Edit your information below, and enter your password to confirm changes</p>
    </div>
    <div class="hr"></div>
    <form @submit.prevent="update">
      <div class="form-group">
        <input type="text" name="nickname" v-model="user.nickname" class="form-control" placeholder="nickname" required>
      </div>
      <button class="btn btn-primary">Sign Up</button>
    </form>
    <p>token nickname {{this.token.nickname}}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import jwtDecode from 'jwt-decode';
import { AWSCognito, CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, CognitoIdentityCredentials, WebIdentityCredentials } from 'amazon-cognito-identity-js';

export default {
  name: 'Signup',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Account', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      template: '#account-settings',
      user: {
        nickname: ''
      }
    }
  },
  methods: {
    update () {
      var attributeList = [];
      var attribute = {
        Name: 'nickname',
        Value: this.user.nickname
      };
      attributeList.push(attribute);
      var cognitoUser = this.$cognitoAuth.getCurrentUser();
      cognitoUser.getSession(function (err, result) {
        if (result) {
          cognitoUser.updateAttributes(attributeList, function (err, result) {

            if (err) {
              // this.error = err
              console.error(err)
            }
          });
        }
        if (err) {
          // this.error = err;
          console.error(err)
        }
        console.log(cognitoUser);
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
  beforeMount () {
    if (this.loggedIn) {
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Dashboard: Couldn't get the session:", err, err.stack);
          return;
        }

        this.token = jwtDecode(jwtToken);
        // console.log(this.token);
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
</style>
