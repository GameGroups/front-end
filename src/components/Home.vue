<template>
  <div class="home row">
    <div class="col-md-12">
      <div class="topSection">
        <div class="row">
          <div class="col-md-6">
            <p class="font orangeFont medium"><strong>Game<span class="font blueFont medium">Groups</span></strong></p>
            <p class="font greyFont small">Find like-minded people to play games with</p>
            <router-link to="/signup"><button id="btnGroup" class="btn btn-primary">Create a Group Today</button></router-link>
            <svg id="pointRight" class="d-none d-lg-inline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 52 52" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 52 52" v-html="pointRightHTML"></svg>
          </div>
          <div class="groupFlexBox col-md-6">
            <div class="bgGrey d-none d-lg-flex">
              <svg class="d-none d-lg-inline" width="100" height="100"><rect x="10" y="10" width="5rem" height="5rem" style="fill:#7F7E7E" /></svg>
              <div class="d-none d-lg-inline exampleGroup">
                <span class="d-none d-lg-block font darkGreyFont bold">Your Group Here!</span>
                <span class="d-none d-lg-block font darkGreyFont">We play games seriously blah blah...</span>
                <svg class="d-none d-lg-inline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 460.731 460.731" xml:space="preserve" width="25" x="0px" y="0px" viewBox="0 0 460.731 460.731" v-html="skillLevelHTML"></svg>
                <span class="d-none d-lg-inline font redFont exampleGroupMedalText">Hardcore</span>
                <svg class="d-none d-lg-inline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 512 512" xml:space="preserve" width="25" x="0px" y="0px" viewBox="0 0 512 512" v-html="availabilityHTML"></svg>
                <span class="d-none d-lg-inline font greenFont exampleGroupMedalText">Daily</span>
                <svg class="d-none d-lg-inline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 1000 1000" xml:space="preserve" width="25" x="0px" y="0px" viewBox="0 0 1000 1000" v-html="regionHTML"></svg>
                <span class="d-none d-lg-inline font exampleGroupMedalText">US-EAST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bgLightGrey groupSection">
        <div class="row">
          <p class="padding-Left-3rem font medium darkGreyFont"><strong>Find Groups Based on...</strong></p>
        </div>
        <div class="row">
          <div class="col-md-4">
            <p class="font text-center small darkGreyFont bold">Skill Level</p>
            <svg class="centerSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 460.731 460.731" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 460.731 460.731" v-html="skillLevelHTML"></svg>
            <p class="font text-center middleSectionText">Find brand new to seasoned professionals</p>
          </div>
          <div class="col-md-4">
            <p class="font text-center small darkGreyFont bold">Availability</p>
            <svg class="centerSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 512 512" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 512 512" v-html="availabilityHTML"></svg>
            <p class="font text-center middleSectionText">Daily, weekly, or occasionally, find the availability that works for you</p>
          </div>
          <div class="col-md-4">
            <p class="font text-center small darkGreyFont bold">Region</p>
            <svg class="centerSVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 1000 1000" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 1000 1000" v-html="regionHTML"></svg>
            <p class="font text-center middleSectionText">Various regions to help fine tune groups for lower latency</p>
          </div>
        </div>
      </div>
      <div class="gameSection">
        <p class="font small darkGreyFont"><strong class="medium" style="display: block;">Current Games Available</strong> New games added constantly
        <div class="col-md-2 col-small-4">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 400 280" xml:space="preserve" x="0px" y="0px" viewBox="0 0 400 280" width="12rem" v-html="guildWars2HTML"></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';
import svgData from '../components/SVGPath.js';

export default {
  name: 'Home',
  metaInfo: {
    title: 'GameGroups', // Set a title
    titleTemplate: '%s - Home Page', // Title is now "GameGroups - Hello World"
    htmlAttrs: {
      lang: 'en',
      amp: undefined // "amp" has no value
    }
  },
  data () {
    return {
      loggedIn: false,
      guildWars2HTML: svgData.svgData.GUILD_WARS_2,
      pointRightHTML: svgData.svgData.POINT_RIGHT,
      skillLevelHTML: svgData.svgData.SKILL_LEVEL,
      availabilityHTML: svgData.svgData.AVAILABILITY,
      regionHTML: svgData.svgData.REGION
    };
  },
  created: function () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.err("Home: Couldn't get the session:", err, err.stack);
      } else {
        this.loggedIn = loggedIn;
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
  .home > div:first-child {
    margin: 35px 0;
  }
  .font {
    font-family: Oswald, Arial, Helvetica, sans-serif;
  }
  .medium {
    font-size: 2rem;
  }
  .small{
    font-size: 1.5rem;
  }
  .blueFont {
    color: #007EFF;
  }
  .orangeFont{
    color: #F7C82E;
  }
  .greyFont{
    color: #CFCCCB
  }
  .darkGreyFont{
    color: #535353
  }
  .greenFont {
    color: green;
  }
  .redFont{
    color: red;
  }
  .bgGrey {
    background-color: #D9D9D9
  }
  .bgLightGrey {
    background-color: #F9F9F9;
  }
  .centerSVG
  {
   margin-left:auto;
   margin-right:auto;
   display:block;
  }
  .bold {
    font-weight: bold;
  }
  .middleSectionText {
    margin-top: 1rem;
  }
  .exampleGroupMedalText{
    vertical-align: super;
  }
  .topSection {
    padding-left: 2rem;
  }
  .padding-Left-3rem {
    padding-left: 3rem;
  }
  .groupSection {
    margin: 3rem 0 3rem 0;
  }
  .gameSection{
    margin-left: 2rem;
  }
  .exampleGroup {
    padding: .5rem 1rem 0 1rem;
  }
  .groupFlexBox {
    display: flex;
    justify-content: flex-end;
    align-self: center;
  }
  #btnGroup {
    margin-bottom: 2rem;
  }
  #pointRight {
    margin-bottom: -.25rem;
    margin-left: 2rem;
  }
</style>
