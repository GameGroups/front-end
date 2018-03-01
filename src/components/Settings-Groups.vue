<template>
  <div class="content container-fluid">
    <div class="instructions">
      <h2>My Account - Groups</h2>
      <p>The groups you have created or are an admin for will appear below. Select one to edit the group's details</p>
    </div>
    <div class="hr"></div>
  </div>
</template>

<script>
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
      template: '#account-settings'
    }
  },
  methods: {
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
