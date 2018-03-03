<template>
  <div class="home row">
    <div class="col-md-12">
      <div class="row">
        <div id="topLeftSection" class="col-md-6">
          <p class="font orangeFont medium"><strong>Game<span class="font blueFont medium">Groups</span></strong></p>
          <p class="font greyFont small">Find like-minded people to play games with.</p>
          <router-link to="/signup"><button id="btnGroup" class="btn btn-primary">Create a Group Today</button></router-link>
          <svg id="pointRight" class="hideOnMobile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 52 52" xml:space="preserve" width="52" x="0px" y="0px" viewBox="0 0 52 52" v-html="pointRightHTML"></svg>
        </div>
        <div class="bgLightGrey groupFlexBox hideOnMobile col-md-6">
          <svg class="hideOnMobile" width="100" height="100"><rect x="10" y="10" width="5rem" height="5rem" style="fill:#7F7E7E" /></svg>
          <div class="hideOnMobile" style="padding: .5rem 1rem 0 1rem">
            <span class="hideOnMobile font darkGreyFont bold">Your Group Here!</span>
            <br/>
            <span class="hideOnMobile font greyFont">We play games seriously blah blah...</span>
            <br/>
            <svg class="hideOnMobile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 460.731 460.731" xml:space="preserve" width="25" x="0px" y="0px" viewBox="0 0 460.731 460.731" v-html="skillLevelHTML"></svg>
            <span id="exampleGroupMedalTextSkill" class="hideOnMobile font exampleGroupMedalText">Hardcore</span>
            <svg class="hideOnMobile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 512 512" xml:space="preserve" width="25" x="0px" y="0px" viewBox="0 0 512 512" v-html="availabilityHTML"></svg>
            <span id="exampleGroupMedalTextAvailable" class="hideOnMobile font exampleGroupMedalText">Daily</span>
            <svg class="hideOnMobile" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 1000 1000" xml:space="preserve" width="25" x="0px" y="0px" viewBox="0 0 1000 1000" v-html="regionHTML"></svg>
            <span class="hideOnMobile font exampleGroupMedalText">US-EAST</span>
          </div>
        </div>
      </div>
      <div class="bgLightGrey">
        <div class="row">
          <div class="groupSection">
            <p class="font medium darkGreyFont"><strong>Find Goups Based on...</strong></p>
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
        </div>
      </div>
      <div class="groupSection">
        <p class="font small darkGreyFont"><strong class="medium">Current Games Available</strong> <br/> New games added constantly</p>
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
    margin-top: 1rem;
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
  .bgBlue {
    background-color: #007EFF
  }
  .bgGrey {
    background-color: #CFCCCB
  }
  .bgLightGrey {
    background-color: #F8F8F8;
    margin: 3rem 0 3rem 0
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
  #topLeftSection {
    padding-left: 3rem;
  }
  #btnGroup {
    margin-bottom: 2rem;
  }
  #pointRight {
    margin-bottom: -.25rem;
    margin-left: 2rem;
  }
  .groupFlexBox {
    display: flex;
    justify-content: flex-end;
    align-self: center;
  }
  #exampleGroupMedalTextSkill {
    color: red;
  }
  #exampleGroupMedalTextAvailable {
    color: green;
  }
  .groupSection {
    margin-left: 2rem;
  }
  @media screen and (min-width: 0px) and (max-width: 812px) {
    .hideOnMobile{
      display: none;
    }
  }
    @media screen and (min-width: 0px) and (max-width: 1076px) {
    .groupFlexBox {
      // margin-top: 7.5rem;
    }
  }
    @media screen and (min-width: 1077px) {
    .groupFlexBox {
      // margin-top: 5.25rem;
    }
  }
</style>
