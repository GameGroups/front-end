<template>
  <nav class="navbar navbar-expand-md navbar-dark">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#"><svg class="header-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="500" height="500" viewBox="0 0 500 500">  <defs>    <filter id="color-overlay-1" filterUnits="userSpaceOnUse">      <feFlood flood-color="#030908"/>      <feComposite operator="in" in2="SourceGraphic"/>      <feBlend in2="SourceGraphic" result="solidFill"/>    </filter>    <filter id="color-overlay-2" filterUnits="userSpaceOnUse">      <feFlood flood-color="#f7c82e"/>      <feComposite operator="in" in2="SourceGraphic"/>      <feBlend in2="SourceGraphic" result="solidFill"/>    </filter>  </defs>  <g style="fill: #21363f; filter: url(#color-overlay-1)">    <rect x="18" y="19" width="463" height="463" rx="25" ry="25" id="rect-1" style="stroke: inherit; filter: none; fill: inherit" class="cls-1"/>  </g>  <use xlink:href="#rect-1" style="stroke: #000; filter: none; fill: none"/>  <path d="M300.609,266.238 L300.609,248.493 L340.155,248.493 L340.155,319.473 L320.213,319.473 L318.523,308.150 C314.240,317.052 306.862,321.501 296.384,321.501 C282.864,321.501 273.231,317.390 267.485,309.164 C261.739,300.941 258.866,289.280 258.866,274.181 L258.866,228.213 C258.866,212.779 261.993,201.004 268.246,192.892 C274.499,184.780 285.061,180.724 299.933,180.724 C314.240,180.724 324.494,184.218 330.691,191.202 C336.886,198.189 339.986,208.047 339.986,220.777 L339.986,229.565 L310.411,229.565 L310.411,218.411 C310.411,213.003 309.791,208.921 308.552,206.159 C307.311,203.399 304.552,202.018 300.271,202.018 C295.877,202.018 293.031,203.539 291.737,206.581 C290.440,209.623 289.793,213.848 289.793,219.256 L289.793,282.631 C289.793,288.039 290.609,292.293 292.244,295.391 C293.876,298.491 296.833,300.038 301.116,300.038 C309.001,300.038 312.946,294.123 312.946,282.293 L312.946,266.238 L300.609,266.238 ZM220.168,308.150 C215.885,317.052 208.507,321.501 198.029,321.501 C184.509,321.501 174.876,317.390 169.130,309.164 C163.384,300.941 160.511,289.280 160.511,274.181 L160.511,228.213 C160.511,212.779 163.637,201.004 169.890,192.892 C176.143,184.780 186.706,180.724 201.578,180.724 C215.885,180.724 226.138,184.218 232.336,191.202 C238.531,198.189 241.631,208.047 241.631,220.777 L241.631,229.565 L212.056,229.565 L212.056,218.411 C212.056,213.003 211.435,208.921 210.197,206.159 C208.956,203.399 206.196,202.018 201.916,202.018 C197.522,202.018 194.675,203.539 193.381,206.581 C192.085,209.623 191.438,213.848 191.438,219.256 L191.438,282.631 C191.438,288.039 192.254,292.293 193.888,295.391 C195.520,298.491 198.478,300.038 202.761,300.038 C210.646,300.038 214.591,294.123 214.591,282.293 L214.591,266.238 L202.254,266.238 L202.254,248.493 L241.800,248.493 L241.800,319.473 L221.858,319.473 L220.168,308.150 Z" class="cls-2"/></svg></a>
    <form class="form-inline my-2 my-lg-0 d-md-none" v-if="$store.state.loggedIn">
      <router-link to="/profile"><img src="http://via.placeholder.com/50x50" class="rounded float-left avatar" alt="Profile picture" v-if="$store.state.loggedIn"></router-link>
    </form>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item" tag="li" to="/">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Home</a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/dashboard" v-if="$store.state.loggedIn">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Dashboard</a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/groups">
          <a class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Groups</a>
        </router-link>

        <router-link class="logout-button nav-item btn btn-danger d-md-none" to="/logout" data-toggle="collapse" data-target=".navbar-collapse.show" v-if="$store.state.loggedIn">Logout</router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0 d-none d-md-flex" v-if="$store.state.loggedIn">
        <div class="logged-in-user">
          <router-link class="displayname" tag="span" to="/profile">{{ $store.state.currentUser.nickname }}</router-link>
          <span class="settings">
            <router-link to="/account-settings">Settings</router-link> |
            <router-link to="/logout">Logout</router-link>
          </span>
        </div>

        <router-link to="/profile"><img src="http://via.placeholder.com/50x50" class="rounded float-left avatar" alt="Profile picture" v-if="$store.state.loggedIn"></router-link>
      </form>
      <router-link class="nav-link btn-login" tag="button" to="/login" data-toggle="collapse" data-target=".navbar-collapse.show" v-else>Login</router-link>
      <router-link class="nav-item" to="/signup" v-if="!$store.state.loggedIn">
        <a class="nav-link btn-signup" data-toggle="collapse" data-target=".navbar-collapse.show">Sign Up</a>
      </router-link>
    </div>
  </nav>
</template>

<script>
import store from '../store';

export default {
  name: 'NavBar',
  data: function () {
    return {};
  },
  methods: {},
  mounted: function () {
    store.dispatch('getUser');
    console.log(store.state.currentUser);
    // console.log(store.currentUser);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">

  .navbar-dark .navbar-nav .active > .nav-link .btn-login
  {
    color:#CFCCCB
  }

  .btn-login {
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    color:#CFCCCB;
  }

  .btn-signup {
    color: #196e92;
  }

  nav {
    background: #0b0b0b;
  }
  .login {
    padding-top: 2rem;
  }

  .form-inline button {
    margin: 0 .5rem 0 .5rem;
  }

  p.error {
    margin: 0;
  }

  .marketing {
    margin-top: 1.5rem;
  }

  .header-logo {
    height: 3rem;
    width: 3rem;
  }

  .cls-1 {
    fill: #21363f;
    stroke: #000;
    stroke-width: 1px;
    filter: url(#color-overlay-1);
  }

  .cls-2 {
    fill: #fff;
    filter: url(#color-overlay-2);
    fill-rule: evenodd;
  }

  .logged-in-user {
    text-align: right;
    color: #CFCCCB;
    margin-right: 1rem;

    .displayname {
      font-weight: bold;
      font-size: 1.2rem;
      cursor: pointer;
    }

    .settings {
      margin-bottom: 0;
      display: block;
    }
  }

  .avatar {
    flex-direction: row !important;
  }

  @media (max-width: 767px) {
    .nav-link {
      padding-left: 0;
    }
  }
</style>
