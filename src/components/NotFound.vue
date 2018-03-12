<template>
  <div class="404 row">
    <div class="d-flex col-md-12">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="404-icon" x="0px" y="0px" viewBox="0 0 52.974 52.974" style="enable-background:new 0 0 52.974 52.974;" xml:space="preserve" width="512px" height="512px"><g><path d="M49.467,3.51c-4.677-4.679-12.291-4.681-16.97,0l-9.192,9.192c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0   l9.192-9.192c1.88-1.88,4.391-2.915,7.07-2.915c2.681,0,5.191,1.036,7.071,2.916s2.916,4.391,2.916,7.071   c0,2.68-1.036,5.19-2.916,7.07L36.033,31.088c-3.898,3.898-10.244,3.898-14.143,0c-0.391-0.391-1.023-0.391-1.414,0   s-0.391,1.023,0,1.414c2.34,2.339,5.412,3.509,8.485,3.509s6.146-1.17,8.485-3.509L49.467,20.48   c2.258-2.258,3.502-5.271,3.502-8.485C52.969,8.781,51.725,5.768,49.467,3.51z" fill="#FF8A00"/><path d="M26.84,40.279l-7.778,7.778c-1.88,1.88-4.391,2.916-7.071,2.916c-2.68,0-5.19-1.036-7.071-2.916   c-3.898-3.898-3.898-10.243,0-14.142l11.314-11.314c3.899-3.898,10.244-3.896,14.142,0c0.391,0.391,1.023,0.391,1.414,0   s0.391-1.023,0-1.414c-4.677-4.679-12.291-4.681-16.97,0L3.505,32.502c-2.258,2.258-3.501,5.271-3.501,8.485   c0,3.214,1.244,6.227,3.502,8.484s5.271,3.502,8.484,3.502c3.215,0,6.228-1.244,8.485-3.502l7.778-7.778   c0.391-0.391,0.391-1.023,0-1.414S27.231,39.889,26.84,40.279z" fill="#FF8A00"/></g></svg>
      <h1 class="message">{{ message }}</h1>
      <p class="text-muted">{{ text }}</p>
      <router-link class="btn btn-info" to="/">Go Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo: {
    title: '404 Page Not Found', // Set a title
    titleTemplate: '%s', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      // message: '404 - Page not found!',
      // text: 'Looks like we couldn\'t find this page. Please click below to return to the home page.'
    };
  },
  props: {
    message: {
      default: '404 - Page not found!'
    },
    text: {
      default: 'Looks like we couldn\'t find this page. Please click below to return to the home page.'
    }
  },
  mounted: function () {
    console.log('Passed message: ', this.message);
    console.log('Passed text: ', this.text);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .404 {
    display: flex;
  }

  div {
    text-align: center;
    margin-top: 1.5rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .message {
    padding-top: 1.5rem;
    color: #446f82;
  }

  svg {
    width: 8rem;
    height: 7.5rem;
  }

</style>
