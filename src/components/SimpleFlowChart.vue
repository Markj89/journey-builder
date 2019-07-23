<template>
<div class="flowchart-container" @mousemove="handleMove" @mouseup="handleUp" @mousedown="handleDown">
  <svg width="100%" :height="`${height}vh`" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <flowchart-link v-bind.sync="link" v-for="(link, index) in lines" :key="`link${index}`" @deleteLink="linkDelete(link.id)">
    </flowchart-link>
  </svg>

  <flowchart-modal v-if="showModal && modal === `${node.modal}`" v-for="(node, index) in diagram.nodes" :key="`node${node.id}`" v-bind.sync="node" @openModal="showModal" @closeModal="showModal = false">
  </flowchart-modal>
  <flowchart-node v-bind.sync="node" v-for="(node, index) in diagram.nodes" :key="`node${node.id}` + 1" :ref="`node${node.id}`" v-bind:class="`workflow_${node.type}`" :options="nodeOptions" @linkingStart="linkingStart(node.id)"
    @linkingStop="linkingStop(node.id)" @nodeSelected="nodeSelected(node.id, $event)">
    <slot :node="node"></slot>
  </flowchart-node>
</div>
</template>

<script>
import FlowChartLink from './FlowChartLink.vue';
import FlowChartNode from './FlowChartNode.vue';
import { getMousePosition } from './../ux/position';
import FlowChartModal from './FlowChartModal.vue';
import EventBus from './../ux/eventBus';

export default {
  name: 'VueFlowchart',
  components: {
    'flowchart-link': FlowChartLink,
    'flowchart-node': FlowChartNode,
    'flowchart-modal': FlowChartModal,
  },
  props: {
    diagram: {
      type: Object,
      default () {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140,
          nodes: [],
          links: [],
        };
      },
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      showModal: false,
      delay: 700,
      modal: '',
      clicks: 0,
      action: {
        linking: false,
        dragging: false,
        scrolling: false,
        selected: 0,
      },
      mouse: {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
      },
      draggingLink: null,
      rootDivOffset: {
        top: 0,
        left: 0,
      },
      lines: [],
    };
  },
  computed: {
    nodeOptions() {
      return {
        centerY: this.diagram.centerY,
        centerX: this.diagram.centerX,
        scale: this.diagram.scale,
        offsetTop: this.rootDivOffset.top,
        offsetLeft: this.rootDivOffset.left,
        selected: this.action.selected,
      };
    },
  },
  watch: {
    diagram: {
      handler() {
        this.$nextTick(this.setLines);
      },
      deep: true,
      immediate: true,
    },
    draggingLink: {
      handler: 'setLines',
      deep: true,
      //immediate: true,
    },
    showModal: {
      handler() {
        this.$nextTick(this.openModal);
      }
    }
  },
  mounted() {
    this.rootDivOffset.top = this.$el ? this.$el.offsetTop : 0;
    this.rootDivOffset.left = this.$el ? this.$el.offsetLeft : 0;
  },
  created() {
    EventBus.$on('openModal', (data) => {
      this.modal = data;
      return this.showModal = true;
    });
  },
  methods: {
    openModal(data) {},
    closeModal() {
      this.showModal = false;
    },
    setLines() {
      const lines = this.diagram.links.map(link => {
        const fromNode = this.findNodeWithID(link.from);
        const toNode = this.findNodeWithID(link.to);

        let x, y, cy, cx, ex, ey;
        x = this.diagram.centerX + fromNode['x'];
        y = this.diagram.centerY + fromNode.y;
        [cx, cy] = this.getPortPosition('bottom', x, y);

        x = this.diagram.centerX + toNode['x'];
        y = this.diagram.centerY + toNode.y;
        [ex, ey] = this.getPortPosition('top', x, y);

        return {
          start: [cx, cy],
          end: [ex, ey],
          id: link.id,
        };
      })

      if (this.draggingLink && (this.draggingLink.mx || this.draggingLink.my)) {
        let x, y, cy, cx;
        const fromNode = this.findNodeWithID(this.draggingLink.from);
        x = this.diagram.centerX + fromNode.x;
        y = this.diagram.centerY + fromNode.y;
        [cx, cy] = this.getPortPosition('bottom', x, y);
        // push temp dragging link, mouse cursor postion = link end postion

        lines.push({
          start: [cx, cy],
          end: [this.draggingLink.mx, this.draggingLink.my],
        });
      }
      this.lines = lines;
      EventBus.$emit('dAttr', lines);
    },
    findNodeWithID(id) {
      return this.diagram.nodes.find((item) => {
        return id === item['id'];
      })
    },
    getPortPosition(type, x, y) {
      if (type === 'top') {
        return [x + 20 / 4, y + 45];
      } else if (type === 'bottom') {
        return [x + 140 * 0.5, y + 40];
      }
    },
    linkingStart(index) {
      this.action.linking = true;
      this.draggingLink = {
        from: index,
        mx: 0,
        my: 0,
      };
    },
    linkingStop(index) {
      if (this.draggingLink && this.draggingLink.from !== index) { // Add new Link
        const existed = this.diagram.links.find(link => { // Check link existence
          return link.from === this.draggingLink.from && link.to === index;
        });

        if (!existed) {
          let maxID = Math.max(0, ...this.diagram.links.map(link => {
            return link.id;
          }));

          const newLink = {
            id: maxID + 1,
            from: this.draggingLink.from,
            to: index,
          };
          this.diagram.links.push(newLink);
          this.$emit('linkAdded', newLink);
        }
      }
      this.draggingLink = null;
    },
    linkDelete(id) {
      const deletedLink = this.diagram.links.find(item => {
        return item.id === id;
      });
      if (deletedLink) {
        this.diagram.links = this.diagram.links.filter(item => {
          return item.id !== id;
        });
        this.$emit('linkBreak', deletedLink);
      }
    },
    nodeSelected(id, e) {
      this.action.dragging = id;
      this.action.selected = id;
      this.$emit('nodeClick', id);
      this.mouse.lastX = e.pageX || e.clientX + document.documentElement.scrollLeft;
      this.mouse.lastY = e.pageY || e.clientY + document.documentElement.scrollTop;

      e.preventDefault();
    },
    handleMove(e) {
      if (this.action.linking) {
        [this.mouse.x, this.mouse.y] = getMousePosition(this.$el, e);
        [this.draggingLink.mx, this.draggingLink.my] = [this.mouse.x, this.mouse.y];

        if (typeof [this.draggingLink.mx, this.draggingLink.my] === 'undefined') {
          return false;
        }
      }
      if (this.action.dragging) {
        this.mouse.x = e.pageX || e.clientX + document.documentElement.scrollLeft;
        this.mouse.y = e.pageY || e.clientY + document.documentElement.scrollTop;

        let diffX = this.mouse.x - this.mouse.lastX;
        let diffY = this.mouse.y - this.mouse.lastY;

        this.mouse.lastX = this.mouse.x;
        this.mouse.lastY = this.mouse.y;
        this.moveSelectedNode(diffX, diffY);
      }
      if (this.action.scrolling) {
        [this.mouse.x, this.mouse.y] = getMousePosition(this.$el, e);
        let diffX = this.mouse.x - this.mouse.lastX;
        let diffY = this.mouse.y - this.mouse.lastY;

        this.mouse.lastX = this.mouse.x;
        this.mouse.lastY = this.mouse.y;

        this.diagram.centerX += diffX;
        this.diagram.centerY += diffY;

        // this.hasDragged = true
      }
    },
    handleUp(e) {
      const target = e.target || e.srcElement;
      if (this.$el.contains(target)) {
        if (typeof target.className !== 'string' || target.className.indexOf('node-input') < 0) {
          this.draggingLink = null;
        }
        if (typeof target.className === 'string' && target.className.indexOf('node-delete') > -1) {
          this.nodeDelete(this.action.dragging);
        }
      }
      this.action.linking = false;
      this.action.dragging = null;
      this.action.scrolling = false;
    },
    handleDown(e) {
      const target = e.target || e.srcElement;
      if ((target === this.$el || target.matches('svg, svg *')) && e.which === 1) {
        this.action.scrolling = true;
        [this.mouse.lastX, this.mouse.lastY] = getMousePosition(this.$el, e);
        this.action.selected = null;
      }
      this.$emit('canvasClick', e);
    },
    moveSelectedNode(dx, dy) {
      let index = this.diagram.nodes.findIndex(item => {
        return item.id === this.action.dragging;
      });

      let left = this.diagram.nodes[index].x + dx / this.diagram.scale;
      let top = this.diagram.nodes[index].y + dy / this.diagram.scale;

      this.$set(this.diagram.nodes, index, Object.assign(this.diagram.nodes[index], {
        x: left,
        y: top,
      }));
    },
    nodeDelete(id) {
      this.diagram.nodes = this.diagram.nodes.filter(node => {
        return node.id !== id;
      });
      this.diagram.links = this.diagram.links.filter(link => {
        return link.from !== id && link.to !== id;
      });
      this.$emit('nodeDelete', id);
    }
  },
};
</script>

<style scoped lang="scss">
.flowchart-container {
    margin: 0;
    background: #ddd;
    position: relative;
    //overflow: hidden;
    svg {
        cursor: grab;
    }
}
</style>
