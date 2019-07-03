<template>
<div>
  <div class="modal" id="" ref="" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-text="label" class="modal-title"></h1>
          <button type="button" class="close" v-on:click.stop="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <p v-html="body"></p>
          </div>
        </div>
        <div class="modal-footer modal_buttons">
          <div class="left">
            <button class="submit save btn"@click="saveModal">Save</button>
            <button class="submit clear btn" @click="Clear">Clear</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<style scoped lang="scss">
  .overlay {
    background: #00000094;
    display: flex;
    justify-content: center;
    z-index: 999;
    transition: opacity 0.2s ease;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;

    width: 100%;
    height: 100%;
    outline: 0;
    &.fade {
      transition: opacity .15s linear;
    }
    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
      border-top-left-radius: .3rem;
      border-top-right-radius: .3rem;
      .close {
        padding: 1rem;
        margin: -1rem -1rem -1rem auto;
        border: none;
        span {
          font-size: 22px;
        }
      }
    }
    .modal-dialog {
      position: relative;
      width: auto;
      margin: .5rem;
      pointer-events: none;
      @media (min-width: 576px) {
        max-width: 500px;
        margin: 1.75rem auto;
      }
      .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: .3rem;
        outline: 0;
        .modal-body {
          position: relative;
          flex: 1 1 auto;
          padding: 1rem;
        }
      }
      .modal-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
        border-top: 1px solid #dee2e6;
        border-bottom-right-radius: .3rem;
        border-bottom-left-radius: .3rem;
      }
    }
  }
</style>

<script>
export default {
  name: 'modal',
  props: {
    showModal: Boolean,
    label: {
      type: String,
    },
    body:{
      type: String
    }
  },
  data() {
    return {
      subscriptions: {
        publishing: [
          {text: 'Newsletter', value: 'newsletter', subscribed: true},
          {text: 'Blog', value: 'blog', subscribed: true},
        ],
        eccommerce: [
          {text: 'Newsletter', value: 'newsletter', subscribed: true},
          {text: 'Blog', value: 'blog', subscribed: true},
        ],
        healthWellness: [
          {text: 'Newsletter', value: 'newsletter', subscribed: true},
          {text: 'Blog', value: 'blog', subscribed: true},
        ],
        travelTourism: [
          {text: 'Newsletter', value: 'newsletter', subscribed: true},
          {text: 'Blog', value: 'blog', subscribed: true},
        ]
      },
      selected: 'contact_field',
      options: [
        { text: 'First Name', value: 'first_name' },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Phone', value: 'phone' },
        { text: 'Fax', value: 'fax' },
        { text: 'Order Date', value: 'order_date' },
        { text: 'Order ID', value: 'order_id' },
        { text: 'City Centre', value: 'city_centre' },
        { text: 'Harinder', value: 'harinder' },
      ]
    };
  },
  methods: {
    saveModal() {
      this.close();
    },
    close() {
      this.$emit('closeModal');
      //this.label = '';
      //this.body = '';
    },
    Clear() {},
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (this.show && e.keyCode == 27) {
        this.close();
      }
    });
  }
};
</script>
