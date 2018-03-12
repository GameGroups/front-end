<template>
  <div class="hello row">
    <div class="d-flex col-md-12">
      <h1 class="text-success">{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Hello World', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data: function () {
    return {
      msg: 'Hello World!'
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .hello {
    div {
      margin-top: 10%;
      justify-content: center;
    }
  }

</style>
