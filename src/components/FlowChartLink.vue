<template>
  <g @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave">
    <path :d="checkLine" :style="pathStyle" marker-end="url(#arrow)"></path>
    <!--<path :d="dAttr" :style="pathStyle"></path>-->
    <a v-if="show.delete" @click="deleteLink">
      <text text-anchor="middle" :transform="arrowTransform" font-size="22">&times;</text>
    </a>
    <!--<path d="M 20, -130 L 15, -140 L 10 -130 z" :style="arrowStyle" :transform="arrowTransform"></path>-->
    <!--<path v-else d="M -1 -1 L 0 1 L 1 -1 z"
      :style="arrowStyle"
      :transform="arrowTransform"></path>-->
  </g>
</template>

<script>
export default {
  name: 'FlowChartLink',
  props: {
    start: {
      type: Array,
      required: false
    },
    end: {
      type: Array,
      required: false
    },
    id: Number,
  },
  data() {
    return {
      show: {
        delete: false,
      }
    };
  },
  methods: {
    handleMouseOver() {
      if (this.id) {
        this.show.delete = true;
      }
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
    caculateCenterPoint() {
      // caculate arrow position: the center point between start and end
      const dx = (this.end[0] - this.start[0]) / 2;
      const dy = (this.end[1] - this.start[1]) / 2;
      return [this.start[0] + dx, this.start[1] + dy];
    },
    caculateRotation() {
      // caculate arrow rotation
      const angle = Math.atan2(this.end[0] - this.start[0], this.end[1] - this.start[1]);
      const degree = angle * 180 / Math.PI;
      return degree < 0 ? degree + 360 : degree;
    },
    deleteLink() {
      this.$emit('deleteLink');
    }
  },
  mounted() {
  },
  computed: {
    pathStyle() {
      return {
        stroke: 'rgb(2, 2, 2)',
        strokeWidth: 2.73205,
        fill: 'none',
      }
    },
    arrowStyle() {
      return {
        stroke: 'rgb(2, 2, 2)',
        strokeWidth: 2.73205,
        fill: 'rgb(2, 2, 2)',
      }
    },
    arrowTransform() {
      const [arrowX, arrowY] = this.caculateCenterPoint();
      const degree = this.caculateRotation();
      return `translate(${arrowX}, ${arrowY}) rotate(${degree})`;
    },
    dAttr: function() {
      let cx = this.start[0], cy = this.start[1], ex = this.end[0], ey = this.end[1];
      let x1, y1, x2, y2;

      /*if (this.start[0] >= this.end[0]) {
        xl = cx, y1 = cy + 50, x2 = ex, y2 = ey - 50;
      } else {
        x1 = cx, y1 = cy, x2 = ex, y2 = ey;
      }*/
      x1 = cx + 200, y1 = cy, x2 = ex, y2 = ey;

      //let x1 = cx, y1 = cy + 50, x2 = ex, y2 = ey - 50;
      //x1 = cx, y1 = cy, x2 = ex, y2 = ey;
      return `M ${cx}, ${cy} L ${x1 - 100}, ${y1}, ${x2 - 100}, ${y2}, ${ex}, ${ey}`;

      //return `M ${cx}, ${cy} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`;
    },
    checkLine() {
      let newLine;
      let firstStartLine = this.start[0], secondStartLine = this.start[1], firstEndLine = this.end[0], secondEndLine = this.end[1];
      let line1, line2, line3, line4;

      if (secondStartLine <= secondEndLine || firstStartLine <= firstEndLine) {
        line1 = firstStartLine + 200, line2 = secondStartLine, line3 = firstEndLine, line4 = secondEndLine;
        newLine = `M ${firstStartLine}, ${secondStartLine} L ${line1 - 100}, ${line2}, ${line3 - 100}, ${line4}, ${firstEndLine}, ${secondEndLine}`;
      } else if (secondStartLine >= secondEndLine || firstStartLine >= firstEndLine) {
        line1 = firstStartLine, line2 = secondStartLine, line3 = firstEndLine, line4 = secondEndLine;
        newLine = `M ${firstStartLine}, ${secondStartLine} C ${line1}, ${line2}, ${line3}, ${line4}, ${firstEndLine}, ${secondEndLine}`;
      }
      return newLine;
    }
  }
}
</script>

<style scoped lang="scss">
g {
  cursor: pointer;
  marker#triangle {
    fill: rgb(2, 2, 2);
    stroke: rgb(2, 2, 2);
    stroke-width: 2;
  }
}
</style>
