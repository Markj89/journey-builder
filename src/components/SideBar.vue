<template>
  <div class="sidebar sidebarToggle">
    <sidebar-toggle v-bind:JourneyEnd="JourneyEnd"></sidebar-toggle>

    <nav class="sidebar-nav">
      <div class="row flex-xl-nowrap">
        <div class="col-12 col-md-12 col-xl-12 bd-sidebar">
          <div class="bd-content">
            <keep-alive>
              <sidebar-content v-if="toggle === false"></sidebar-content>
            </keep-alive>
            <keep-alive>
              <sidebar-form v-if="toggle === true"></sidebar-form>
            </keep-alive>
          </div>
        </div>
      </div>
      <div class="sidebarHighlight container">
        <div class="row">
          <div class="col-md-9">
            <h4 class="white-text title">Are you a customer?</h4>
            <span class="white-text">Click here to contact support with any questions around your custom journeys</span>
          </div>
          <div class="col-md-3">
            <div class="toggle-wrapper">
              <input type="checkbox" id="hide-checkbox" v-model="toggle">
              <label for="hide-checkbox" class="toggle">
                <span class="toggle-button">
                  <span class="white-toggle"></span>
                </span>
                <span class="blue-toggle"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { TweenMax, Power3 } from 'gsap';
import SideBarContent from './SideBar-Content.vue';
import SidebarToggle from './SideBarToggle.vue';
import SideBarForm from './SideBar-Form.vue';

export default {
  name: 'SideBar',
  components: {
    'sidebar-content': SideBarContent,
    'sidebar-toggle': SidebarToggle,
    'sidebar-form': SideBarForm
  },
  data() {
    return {
      toggle: false
    };
  },
  props: {
    JourneyEnd : {
      type: Boolean
    },
    chosenIndustry : {
      type: String
    }
  },
  mounted() {
    TweenMax.set(this.$el, {
      x: this.$el.offsetWidth
    });
  },
  computed: {
    open() {
      if (this.$store.state.ui.sidebarOpen === true || this.JourneyEnd === true) {
        return true;
      }
      return this.$store.state.ui.sidebarOpen;
    }
  },
  watch: {
    open: function(open) {
      const dX = open ? 0 : this.$el.offsetWidth
      TweenMax.to(this.$el, 0.2, {
        x: dX,
        ease: Power3.easeOut
      });
    }
  },
  methods: {
    onClick() {},
    toggleContent() {},
  }
}
</script>

<style lang="scss">
.sidebarToggle {
  background-image: url('../assets/sidebarToggleBackground.png');
  .sidebarHighlight {
    span.white-text {
      font-size: 0.8rem;
    }
  }
  .white-toggle {
    position: absolute;
    display: inline-block;
    background-color: #EAEAEA;
    border-radius: 50%;
    transition: 300ms;
    width: 45px;
    height: 45px;
  }
  .blue-toggle {
    position: absolute;
    display: inline-block;
    background-color: #03B6FC;
    border-radius: 50%;
    transition: 500ms;
    width: 45px;
    height: 45px;
    display: none;
  }
  .toggle-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    #hide-checkbox {
      opacity: 0;
      height: 0;
      width: 0;
      &:checked + .toggle .toggle-button {
        transform: translateX(45px);
        box-shadow: 0 0 35px 5px rgba(255, 255, 255);
      }
      &:checked + .toggle .toggle-button .white-toggle {
        transform: rotate(-45deg) translateX(0px);
        background-color: #03B6FC;

      }
      &:checked + .toggle .blue-toggle {
        animation: move 2s infinite;
        transform: none;
        box-shadow: none;
      }
    }
    .toggle {
      position: relative;
      cursor: pointer;
      display: inline-block;
      width: 93px;
      height: 45px;
      background: #fff;
      border-radius: 50px;
      transition: 500ms;
      overflow: hidden;
    }
    .toggle-button {
      position: absolute;
      display: inline-block;
      top: 0px;
      left: 4px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: #EAEAEA;
      overflow: hidden;
      box-shadow: 0 0 35px 4px rgba(255, 255, 255);
      transition: all 500ms ease-out;
      -moz-transition: all 500ms ease-out;
      -webkit-transition: all 500ms ease-out;
    }
    @keyframes travel {
      0% {
        transform: rotate(-45deg) translateX(70px);
        -moz-transform: rotate(-45deg) translateX(70px);
        -webkit-transform: rotate(-45deg) translateX(70px);
      }
      50% {
        transform: rotate(-45deg) translateX(-20px);
        -webkit-transform: rotate(-45deg) translateX(-20px);
        -moz-transform: rotate(-45deg) translateX(-20px);
        box-shadow: 5px 0px 6px 1px #FFF;
      }
      100% {
        transform: rotate(-45deg) translateX(-30px);
        -moz-transform: rotate(-45deg) translateX(-30px);
        -webkit-transform: rotate(-45deg) translateX(-30px);
        width: 2px;
        height: 2px;
        opacity: 0;
        box-shadow: none;
      }
    }
    @keyframes move {
      0% {
        transform: none;
        -moz-transform: none;
        -webkit-transform: none;
      }

      25% {
        transform: translateX(2px);
        -moz-transform: translateX(2px);
        -webkit-transform: translateX(2px);
      }

      100% {
        transform: translateX(-2px);
        -moz-transform: translateX(-2px);
        -webkit-transform: translateX(-2px);
      }
    }
  }
}

</style>
