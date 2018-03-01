<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Profile</h2>
      <p>Edit your information below, and enter your password to confirm changes</p>
    </div>
    <div class="hr"></div>

    <div class="col-sm-6 col-sm-offset-6 form-col">
    <div class="alert-success" v-if="successMsg.length > 0">{{successMsg}}</div>
    <form @submit.prevent="update">
      <div class="form-group">
        <input type="text" name="nickname" v-model="user.nickname" class="form-control" placeholder="nickname" required>
      </div>
      <div class="form-group">
        Enter Password to confirm changes
        <input type="password" name="password" v-model="user.password" class="form-control" placeholder="password" required>
      </div>
      <button class="btn btn-primary">Sign Up</button>
    </form>
    <p>token nickname {{this.token.nickname}}</p>
  </div>
  </div>
</template>

<script>
import Vue from 'vue';
import jwtDecode from 'jwt-decode';
import { AWSCognito } from 'aws-sdk'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

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
      error: null,
      successMsg: '',
      user: {
        nickname: '',
        password: ''
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
      const cognitoUser = this.$cognitoAuth.getCurrentUser();

      const authenticationData = {
        Username: cognitoUser.getUsername(),
        Password: this.user.password
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      const poolData = { UserPoolId: 'us-east-2_aRo6Xa58p',
        ClientId: '6r5l1vmua09uqgp11i5gs880je'
      };
      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: cognitoUser.getUsername(),
        Pool: userPool
      };
      // const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          let refreshToken = cognitoUser.getSignInUserSession().getRefreshToken();
          /* Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer */

          cognitoUser.updateAttributes(attributeList, function (err, result) {
            if (err) {
              // this.error = err
              console.error(err)
            } else {
              this.successMsg = 'Profile updated successfully!'
              cognitoUser.refreshSession(refreshToken, function (err, result) {
                if (err) {
                  console.log(err);
                }
                console.log('idToken + ' + result.idToken.jwtToken);
                console.log('access token + ' + result.getAccessToken().getJwtToken());
              })
            }
          });
        },
        onFailure: function (err) {
          if (err.name === 'NotAuthorizedException') {
            this.error = 'Error: User could not be authenticated. Confirm that your password was entered correctly.'
          } else {
            this.error = err;
          }
        }
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
    margin-bottom: 25px;
  }
</style>
