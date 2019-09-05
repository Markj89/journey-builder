<template>
  <div class="flowchart-node dragme" :ref="`${type}`" :style="nodeStyle" @mousedown="handleMousedown" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" v-on:dblclick="modalClick(modal)" v-bind:class="{selected: options.selected === id}">
    <div class="node-port node-input" @mousedown="inputMouseDown" @mouseup="inputMouseUp" v-if="`${type}` === 'filter' || `${type}` === 'action' || `${type}` === 'delay' || `${type}` === 'end'"></div>
    <div class="node-main">
      <div class="icon" v-bind:style="{ 'background-image': 'url(' + icon + ')' }"></div>
      <h1 v-text="label" class="title node-label"></h1>
    </div>
    <div class="node-port node-output" @mousedown="outputMouseDown" v-if="`${type}` === 'action' ||`${type}` === 'trigger' || `${type}` === 'delay'"></div>
    <div v-show="show.delete" class="node-delete">&times;</div>

    <svg id="doubleLine" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" v-if="`${label}` === '% Split' || `${label}` === 'Yes/No'">
      <g>
        <!--<div class="node-port node-output node-dbl-output-one" @mousedown="outputMouseDown"></div>-->
        <g>
          <path d="M 194, 225 L 294, 225, 321, 275, 421, 275" style="stroke: rgb(2, 2, 2);stroke-width: 2.73205;fill: none;"></path>
        </g>
        <g>
          <path d="M 194, 225 L 294, 225, 320, 175, 420, 175" style="stroke: rgb(2, 2, 2); stroke-width: 2.73205; fill: none;"></path>
          <!--<div class="node-port node-output node-dbl-output-two" @mousedown="outputMouseDown"></div>-->
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import EventBus from './../ux/eventBus';
import FlowChartDoubleLink from './FlowChartDoubleLink.vue';

export default {
  name: 'FlowChartNode',
  components: {
    'flowchart-double-link': FlowChartDoubleLink
  },
  props: {
    id: {
      type: Number,
      default: 1000,
      validator(val) {
        return typeof val === 'number'
      }
    },
    x: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    type: {
      type: String,
      default: 'Default'
    },
    label: {
      type: String,
      default: 'input name'
    },
    icon: {
      type: String,
    },
    modal: {
      type: String,
    },
    options: {
      type: Object,
      default() {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140
        };
      }
    }
  },
  data() {
    return {
      show: {
        delete: false,
      }
    };
  },
  mounted() {},
  computed: {
    nodeStyle() {
      return {
        top: this.options.centerY + this.y * this.options.scale + 'px', // remove: this.options.offsetTop +
        left: this.options.centerX + this.x * this.options.scale + 'px', // remove: this.options.offsetLeft +
        transform: `scale(${this.options.scale})`,
      };
    }
  },
  methods: {
    modalClick(val) {
      EventBus.$emit('openModal', val);
      this.$emit('getModalData', val);
    },
    handleMousedown(e) {
      const target = e.target || e.srcElement;
      if (target.className.indexOf('node-input') < 0 && target.className.indexOf('node-output') < 0) {
        this.$emit('nodeSelected', e);
      }
      e.preventDefault();
    },
    handleMouseOver() {
      this.show.delete = true;
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
    outputMouseDown(e) {
      this.$emit('linkingStart');
      e.preventDefault(); // Comment out for test use
    },
    inputMouseDown(e) {
      e.preventDefault();
    },
    inputMouseUp(e) {
      this.$emit('linkingStop');
      //e.preventDefault();
    },
  }
}
</script>
<style scoped lang="scss">
$nodeSize: 12;
$portSize: 30;
$rightSize: -7;
$white: #fff;

.flowchart-node {
  margin: 0;
  cursor: move;
  z-index: 1;
  box-sizing: border-box;
  position: absolute;
  transform-origin: top left;
  -webkit-transform-origin: top left;
  .node-port {
    position: absolute;
    width: 15px;
    height: 15px;
    transform: translate(-50%);
    border: 1px solid #ccc;
    border-radius: 100px;
    background: white;
    &:hover {
      background: black;
      border: 1px solid $white;
    }
  }
  .node-input {
    top: 38px;
    left: 0px;
  }
  .node-output {
    bottom: #{-2+-62/-2}px;
    right: #{-2+18/-2}px;
  }
  #doubleLine {
    cursor: pointer;
    position: absolute;
    left: #{-5+-170/-2}px;
    top: 15px;
  }
  .node-dbl-output-one {
    top: #{-2+12/-2}px;
    right: #{-2+120/-2}px;
    z-index: 10000000;
    overflow: hidden;
  }
  .node-dbl-output-two {
    bottom: #{-2+14/-2}px;
    right: #{-2+120/-2}px;
    z-index: 10000000;
    overflow: hidden;
  }
  .node-delete {
    position: absolute;
    right: -6px;
    top: -6px;
    font-size: 15px;
    width: 17px;
    height: 17px;
    color: $white;
    cursor: pointer;
    background: black;
    border: 1px solid $white;
    border-radius: 100px;
    text-align: center;
    line-height: 1;
    font-weight: 800;
    &:hover {
      display: block;
      background: black;
      color: $white;
    }
  }
  .icon {
    background-repeat: no-repeat;
    background-size: auto 25px;
    background-position: center 13px
  }
}
</style>
