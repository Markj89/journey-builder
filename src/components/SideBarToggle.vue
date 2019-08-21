<template>
  <div class="sidebar-position" v-bind:class="isClicked" v-if="JourneyEnd === false">
    <i class="fas" v-bind:class="active"></i>
    <input type="checkbox" name="handleClick" class="sidebar-button" v-model="checked" @click="handleClick" />
  </div>
</template>

<style lang="scss">
  .sidebar-position {
    position: absolute;
    z-index: 200000;
    background-color: #03B6FC;
    vertical-align: center;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    top: 6%;
    left: -6%;
    width: 30px;
    transition: all 400ms ease-out;
    -webkit-transition: all 400ms ease-out;
    -moz-transition: all 400ms ease-out;
    transform: translate(-1%, -50%);
    -webkit-transform: translate(-1%, -50%);
    -moz-transform: translate(-1%, -50%);
    &.go-right {
      background-color: $white;
    }
    .sidebar-button {
      width: 100%;
      height: 50px;
      opacity: 0;
      border: none;
      cursor: pointer;
      border-left: 1px solid #D4D4D4;
      &:checked {
        background-color: $white;
      }
    }
    .fas {
      font-size: 1.4rem;
      cursor: pointer;
    }
    .fa-chevron-right {
      color: $blue_light;
      position: absolute;
      bottom: 15px;
      right: 10px;
    }
    .fa-chevron-left {
      color: $white;
      position: absolute;
      bottom: 15px;
      right: 10px;
    }
  }
</style>

<script>
import { TweenMax, Power3 } from 'gsap';

export default {
  name: 'Sidebar-Toggle',
  data() {
    return {
      checked: false,
      right: '',
      isClicked: null,
      active: 'fa-chevron-left',
      opened: 'fa-chevron-left',
      closed: 'fa-chevron-right'
    };
  },
  props: {
    JourneyEnd : {
      type: Boolean
    }
  },
  watch: {
    JourneyEnd: {
      handler(val) {
        this.JourneyEnd = val;
        console.log(this.JourneyEnd);

        if (this.JourneyEnd === true) {
          this.$store.dispatch('toggleSidebar');

          this.active = this.opened;
          this.isClicked = null;
        }
      },
      deep: true,
      immediate: true
    },
  },
  computed: {
    open() {
      return this.$store.state.ui.sidebarOpen;
    }
  },
  methods: {
    handleClick() {
      this.$store.dispatch('toggleSidebar');
      if (this.checked === true) {
        this.active = this.opened;
        this.isClicked = null;
      } else {
        this.active = this.closed;
        this.isClicked = 'go-right';
      }
    }
  }
}
</script>
