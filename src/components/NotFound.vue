<template>
  <div class="404 row">
    <div class="d-flex col-md-12">
      <h1 class="text-success">{{ msg }}</h1>
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
  data () {
    return {
      msg: '404 - Page not found!'
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .404 {
    div {
      margin-top: 10%;
      justify-content: center;
    }
  }

</style>
