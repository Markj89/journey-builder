<template>
  <div class="flowchart-node dragme" :ref="`${type}`" :style="nodeStyle" @mousedown="handleMousedown" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" v-on:dblclick="modalClick(modal)" v-bind:class="{selected: options.selected === id}">
    <div class="node-port node-input" @mousedown="inputMouseDown" @mouseup="inputMouseUp" v-if="`${type}` === 'filter' || `${type}` === 'action' || `${type}` === 'delay' || `${type}` === 'end'"></div>
    <div class="node-main">
      <div class="icon" v-bind:style="{ 'background-image': 'url(' + icon + ')' }"></div>
      <h1 v-text="label" class="title node-label"></h1>
    </div>
    <div class="node-port node-output" @mousedown="outputMouseDown" v-if="`${type}` === 'action' ||`${type}` === 'trigger' || `${type}` === 'delay'"></div>
    <div class="node-port node-dbl-output" @mousedown="outputMouseDown" v-if="`${type}` === 'filter'"></div>
    <svg v-if="`${label}` === 'Yes/No' || `${label}` === '% Split'" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 107.5 70.52" xml:space="preserve" class="node-dbl-output" width="120px" height="100%" :style="doubleArrow">
      <symbol id="Arrow_3" viewBox="-11.59 -10.76 23.18 21.53">
        <g>
          <g>
            <g>
              <polygon fill="#EB2D34" points="-11.59,-10.76 -2.67,0 -11.59,10.76 11.59,0"/>
            </g>
          </g>
          <g>
            <g>
              <polygon fill="#231F20" points="-11.59,-10.76 -2.67,0 -11.59,10.76 11.59,0"/>
            </g>
          </g>
        </g>
      </symbol>
      <g>
        <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="0" y1="35.5" x2="41" y2="35.5"/>
        <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="40.59" y1="35.09" x2="71" y2="65.5"/>
  	     <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="40.59" y1="35.5" x2="71" y2="5.09"/>
        <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="70.5" y1="5.5" x2="100.5" y2="5.5"/>
        <line fill="none" stroke="#000000" stroke-miterlimit="10" x1="70.5" y1="65.5" x2="100.5" y2="65.5"/>
        <use xlink:href="#Arrow_3" width="23.18" height="21.53" x="-11.59" y="-10.76" transform="matrix(0.4745 0 0 -0.4887 102.0001 5.2609)" overflow="visible"/>
        <use xlink:href="#Arrow_3" width="23.18" height="21.53" x="-11.59" y="-10.76" transform="matrix(0.4745 0 0 -0.4887 102.0001 65.2609)" overflow="visible"/>
      </g>
    </svg>
    <div v-show="show.delete" class="node-delete">&times;</div>
  </div>
</template>

<script>
import EventBus from './../ux/eventBus';
export default {
  name: 'FlowChartNode',
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
    },
    doubleArrow() {
      return {
        stroke: 'rgb(2, 2, 2)',
        position: 'relative',
        top: '-80px',
        left: '80px',
        transform: `scale(${this.options.scale})`,
        strokeWidth: 2,
        fill: 'none',
      }
    }
  },
  methods: {
    modalClick(val) {
      console.log('Double Clicked ', val);
      EventBus.$emit('openModal', val);
    },
    handleMousedown(e) {
      const target = e.target || e.srcElement;
      if (target.className.indexOf('node-input') < 0 && target.className.indexOf('node-output') < 0 && target.className.indexOf('node-dbl-output') < 0) {
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
      console.log('linkingStart ', e);
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
  .node-dbl-output {
    bottom: #{-2+-62/-2}px;
    right: #{-2+18/-2}px;
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
