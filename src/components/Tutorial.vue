<template>
  <div class="vue-modal-mask">
    <div class="vue-modal-tutorial" tabindex="-1" role="dialog">
      <div class="vue-modal-dialog">
        <div class="vue-modal-content">
          <div class="vue-modal-header">
            <h1 class="vue-modal-title">Welcome to our Journey Builder Demo!</h1>
          </div>
          <div class="vue-modal-body">
            <p class="vue-modal-paragraph">Pick your industry and watch a quick video on how to get started.</p>
            <div class="image-slider" tag="div">
              <transition-group name="fade" tag="div">
                <div v-for="number in [currentNumber]" :key="number">
                  <!--<img :src="currentImage" v-on:mouseover="stopRotation" v-on:mouseout="startRotation" />-->
                  <img :src="currentImage" :alt="alt" />
                </div>
              </transition-group>
            </div>
            <div class="vue-modal-footer modal_buttons">
              <a @click="prev" v-if="currentNumber !== 0" href='#'>Previous</a> || <a @click="next" v-if="currentNumber !== 2" href='#'>Next</a>
            </div>
            <div class="vue-modal-footer modal_buttons" name="fade">
              <button class="btn_maropost" v-if="currentNumber === 2" v-on:click.stop="close" aria-label="Close">Lets Do This...</button>
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
      images: [
        'https://www.maropost.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-01-at-4.05.33-PM.png',
        'https://www.maropost.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-01-at-4.06.20-PM.png',
        'https://www.maropost.com/wp-content/uploads/2019/07/Screen-Shot-2019-07-01-at-4.06.33-PM.png'
      ],
      alt: 'Journey Builder',
      currentNumber: 0,
      timer: null
    };
  },
  props: {
    showTutorialModal: Boolean,
  },
  mounted() {
    //this.startRotation();
  },
  methods: {
    // Some Timer functions for later date
    /*startRotation() {
      this.timer = setInterval(this.next, 3000);
    },
    stopRotation() {
      clearTimeout(this.timer);
      this.timer = null;
    },*/
    next() {
      this.currentNumber += 1
    },
    prev() {
      this.currentNumber -= 1
    },
    close() {
      this.$emit('closeTutorialModal');
      this._isDestroyed = true;
    }
  },
  computed: {
    currentImage() {
      return this.images[Math.abs(this.currentNumber) % this.images.length];
    }
  }
}
</script>

<style scoped lang="scss">
  $maropost_blue: #0171ac;
  .vue-modal-tutorial {
  	background-color: #fff;
    width: 700px;
    border-radius: 2px;
    border: 1px solid rgba(254, 254, 254, .5);
  	padding: 15px 30px;
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
    }
    .vue-modal-dialog {
      margin: 0 auto;
      font-family: Helvetica, Arial, sans-serif;
      .vue-modal-body {
        margin: 20px 0;
        .image-slider {
          height: 400px;
          position: relative;
        }
        .vue-modal-paragraph {
          margin: 1rem 0;
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
