<template>
  <div class="vue-modal-mask" name="fade">
    <div class="vue-modal-tutorial" tabindex="-1" role="dialog">
      <div class="vue-modal-dialog">
        <div class="vue-modal-content" id="1" v-if="tabNumber === 1">
          <div class="vue-modal-header">
            <h1 class="vue-modal-title">Welcome to our Journey Builder Demo!</h1>
          </div>
          <div class="vue-modal-body">
            <p class="vue-modal-paragraph">Here is a quick video to get you started with the basics.</p>

            <div class="tutorial-video">
              <b-embed type="iframe" aspect="16by9" src="https://www.youtube.com/embed/6a-SYDN9-tg" allowfullscreen></b-embed>
            </div>
            <div class="vue-modal-footer modal_buttons" name="fade">
              <button class="btn-white right" @click="next">Next</button>
            </div>
          </div>
        </div>
        <div class="vue-modal-content" id="2" v-if="tabNumber === 2">
          <div class="vue-modal-header">
            <h1 class="vue-modal-title">Time for the good stuff…</h1>
          </div>
          <div class="vue-modal-body">
            <p class="vue-modal-paragraph">Now that you have the basics down, pick your industry and we will show an example that benefit you and your customers.</p>
            <div class="vue-modal-industry">
              <div class="industry-list" v-for="industry in industries">
                <button class="industry-button" :aria-label="`${industry}`" v-on:click="whichIndustry(`${industry}`)" name="fade">{{industry}}</button>
              </div>
            </div>

            <div class="tutorial-video">
              <b-embed type="iframe" aspect="16by9" :src="emitVideoOfIndustry" allowfullscreen></b-embed>
            </div>
            <div class="vue-modal-footer modal_buttons" name="fade">
              <button class="btn-white left" @click="prev">Previous</button>
              <button class="btn_maropost right" v-on:click.stop="close" v-on:click="emitToParent(`${chosenIndustry}`)" v-if="hide" name="fade" aria-label="Close">Lets Do This!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tutorial',
  data() {
    return {
      alt: 'Journey Builder',
      currentNumber: 0,
      industries: [
        "Publishing",
        "Ecommerce",
        "Health & Wellness",
        "Travel & Tourism"
      ],
      industryVideo: [
        { "Publishing" : "https://www.youtube.com/embed/EDUl83iRSpI" }, // Under the Hood: Landing Pages
        { "Ecommerce" : "https://www.youtube.com/embed/G7AJ9f-bY68" },  // Under the Hood: Content Hoods
        { "Health & Wellness" : "https://www.youtube.com/embed/ih0yhgY8fck" }, // Under the Hood: Pull from URL
        { "Travel & Tourism" : "https://www.youtube.com/embed/oryIIzuNfgY" } // Under the Hood: Priority Send
      ],
      chosenIndustry: '',
      industryData: '',
      hide: false,
      tabNumber: 1,
      video: ""
    };
  },
  methods: {
    next() {
      this.tabNumber++;
    },
    prev() {
      this.tabNumber--;
    },
    whichIndustry(industry) {
      if (typeof industry !== "undefined") {
        this.chosenIndustry = industry;
        this.$emit('setIndustry', this.chosenIndustry);
        this.hide = true;
      }
    },
    emitToParent(data) {
      if (typeof data !== "undefined") {
        this.industryData = data;
        this.$emit('setContent', this.industryData);
      }
    },
    close() {
      this.$emit('closeTutorialModal');
      this._isDestroyed = true;
    }
  },
  computed: {
    emitVideoOfIndustry() {
      this.video = "https://www.youtube.com/embed/6a-SYDN9-tg"; // Default

      for (let i = 0; i < this.industryVideo.length; i++) {
        let industries = this.industryVideo[i];
        for (let segment in industries) {
          if ( industries.hasOwnProperty(this.chosenIndustry) ) {
            this.video = industries[segment];
          }
        }
      }

      return this.video;
    }
  }
}
</script>

<style scoped lang="scss">
  $maropost_blue: #03B6FC;
  .vue-modal-tutorial {
  	background-color: #fff;
    width: 720px;
    border-radius: 8px;
    -webkit-box-shadow: 0px 6px 20px #00000026;
    -moz-box-shadow: 0px 6px 20px #00000026;
    box-shadow: 0px 6px 20px #00000026;
  	padding: 45px 25px;
  	margin: 0 auto;
  	display: table;
  	position: absolute;
  	left: 0;
  	top: 5%;
    right: 0;
    bottom: 0;
  	height: auto;
  	overflow: visible;
    vertical-align: middle;
    box-sizing: border-box;
    .vue-modal-title {
      font-size: 1.9rem;
      color: $maropost_blue;
      letter-spacing: 1px;
      font-weight: bold;
    }
    .vue-modal-dialog {
      margin: 0 auto;
      font-weight: 5080;
      .vue-modal-body {
        margin: 20px 0;
        .image-slider {
          height: 400px;
          position: relative;
        }
        .tutorial-video {
          margin-bottom: 15px;
        }
        .vue-modal-paragraph {
          margin: 1rem 0;
          font-size: 16px;
          color: #525252;
          font-family: $open_sans 'Semibold', sans-serif;
        }
        .vue-modal-industry {
          margin: 10px;
          .industry-list {
            display: inline-block;
            .industry-button {
              padding: 5px 15px;
              background-color: #fff;
              font-weight: 500;
              border: 1px solid #DEDEDE;
              letter-spacing: 1px;
              border-radius: 40px;
              outline: none;
              margin: 5px;
              transition: all 0.5s;
              -webkit-box-shadow: 0 3px 20px rgba(0,0,0,0.16);
              -moz-box-shadow: 0 3px 20px rgba(0,0,0,0.16);
              box-shadow: 0 3px 20px rgba(0,0,0,0.16);
              &:hover {
                background-color: #3B3B3B;
                color: #fff;
              }
            }
          }
        }
      }
      img {
        position: relative;
        display: inline-block;
      }
      .modal-close {
        box-sizing: border-box;
        cursor: pointer;
        color: #000;
        font-size: 1.8rem;
        font-weight: 500;
        display: block;
        position: relative;
        border: transparent;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
    display: block;
    width: auto;
    visibility: visible;
    opacity: 1;
    position: absolute;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    visibility: hidden;
    display: block;
    width: auto;
  }
</style>
