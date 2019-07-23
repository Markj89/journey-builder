<template>
<div class="vue-modal-mask">
  <div class="vue_modal" id="" ref="" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-text="label" class="modal-title"></h1>
          <button type="button" class="modal-close" v-on:click.stop="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">

              <b-tabs content-class="mt-4" @setContent="setContent">
                <b-row class="my-1" v-for="item in modalContent" v-bind:key="index">
                  <b-col md="12" v-if="modal === 'End'">
                    <p>{{item}}</p>
                  </b-col>
                </b-row>
                
                <b-tab :title="changeTabs(`${index}`)"  active v-for="(item, index) in modalContent" v-bind:key="index">
                  <b-form @submit="onSubmit" @reset="onReset">

                    <b-container v-if="modal === 'Delay'">
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="5">
                            <datepicker placeholder="Select Date" :value="date" v-model="date" name="delay" :format="format"></datepicker>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-container>

                    <b-container v-if="modal === 'DelayUntil'">
                      <b-form-group>
                        <b-row class="my-1">
                          <label class="label">Date Range</label>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="5">
                            <datepicker placeholder="Date Range" :value="dateFrom" v-model="dateFrom" name="dateFrom" :format="format"></datepicker>
                          </b-col>
                          <b-col sm="5">
                            <datepicker placeholder="Date Range" :value="dateTo" v-model="dateTo" name="dateTo" :format="format"></datepicker>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-container>

                    <b-container v-if="modal === 'ChangeTag'">
                      <b-row class="my-2">
                        <b-col sm="5">
                          <b-form-group>
                            <label class="label">Add</label>
                            <v-autocomplete :items.sync="item" :key="`${item.text}`" v-model="item.text" :auto-select-one-item="false" :component-item='template' :get-label="getLabel" @update-items="updateItems" placeholder=""></v-autocomplete>
                          </b-form-group>
                        </b-col>
                        <b-col sm="5">
                          <b-form-group>
                            <label class="label">Remove</label>
                            <v-autocomplete :items.sync="item" :key="`${item.text}`" v-model="item.text" :auto-select-one-item="false" :component-item='template' :get-label="getLabel" @update-items="updateItems" placeholder=""></v-autocomplete>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-container>

                    <b-container v-if="modal === 'ChangeSubscription'">
                      <b-row class="my-2">
                        <b-col sm="12">
                          <b-form-group>
                            <label class="label">Choose Your Subscription</label>
                            <v-autocomplete :items.sync="item" :key="`${item.text}`" v-model="item.text" :auto-select-one-item="false" :component-item='template' :get-label="getLabel" @update-items="updateItems" placeholder=""></v-autocomplete>
                          </b-form-group>
                        </b-col>
                        <b-col sm="12">
                          <b-form-group>
                          <select class="mb-3 custom-select" :name="`${index}`" >
                            <option selected value="null">Please Choose Your Subscription</option>
                            <option value="Subscribed">Subscribed</option>
                            <option value="Unsubscribed">Unsubscribed</option>
                          </select>
                        </b-form-group>
                        </b-col>
                      </b-row>
                    </b-container>

                    <b-container v-if="modal === 'NewSubscription' || modal === 'SegmentEvent' || modal === 'TableFieldUpdated' || modal === 'YesNo' || modal === 'Split'">
                      <b-row class="my-1">
                        <b-form-group>
                            <select class="mb-3 custom-select" :name="`${index}`" >
                              <option v-for="d in item" v-bind:value="`${d.value}`"> {{ d.text }} </option>
                            </select>
                        </b-form-group>
                      </b-row>
                    </b-container>

                    <b-container v-if="modal === 'ContactField' || modal === 'SubscriptionChanged' || modal === 'TagEvent' || modal === 'CampaignOpened' || modal === 'Case'">
                      <b-col sm="9">
                        <b-form-group>
                          <v-autocomplete :items.sync="item" :key="`${item.text}`" v-model="item.text" :auto-select-one-item="false" :component-item='template' :get-label="getLabel" @update-items="updateItems" placeholder="Choose your fields"></v-autocomplete>
                      </b-form-group>
                      </b-col>
                    </b-container>

                    <b-container v-if="modal === 'TotalRevenue'" v-for="d in item" :key="`${d}`">
                      <b-col sm="9">
                        <b-form-group>
                          <b-form-input type="number" placeholder="Enter the accurate amount" :key="`${item.label}`" :value="`${d.text}`" v-model="d.text"></b-form-input>
                          <span class="mt-2">$ {{ formatPrice(`${d.text}`) }}</span>
                        </b-form-group>
                      </b-col>
                    </b-container>

                    <a class="link" v-if="modal === 'LinkClicked'" v-for="d in item" v-bind:href="`${d.value}`" target="_blank">{{ d.text }}</a>

                    <b-container v-if="modal === 'WebPageEvent'" v-for="d in item" :key="d">
                      <b-col sm="9">
                        <b-list-group>
                          <b-list-group-item><a class="link" v-bind:href="`${d.value}`" target="_blank">{{ d.text }}</a></b-list-group-item>
                        </b-list-group>
                      </b-col>
                    </b-container>

                    <div class="d-block text-center" slot="modal-title" v-if="modal === 'ApiEvent'">
                      <a v-for="d in item" v-bind:href="`${d.value}`" target="_blank">{{ d.text }}</a>
                    </div>

                    <b-container v-if="modal === 'SendEmail'" style="overflow: scroll; height: 400px; postion:relative; display:block;">

                      <b-form-group>
                        <span>Contact Header</span>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Name</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="text" placeholder="Name" v-model="item[0]['name']" :value="item[0]['name']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Text</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="text" placeholder="Text" v-model="item[1]['text']" :value="item[1]['text']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Preheader</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="text" placeholder="Preheader" v-model="item[2]['preheader']" :value="item[2]['preheader']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">From</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="text" placeholder="From" v-model="item[3]['from']" :value="item[3]['from']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Email Address</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="email" placeholder="Email Address" v-model="item[4]['email']" :value="item[4]['email']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Reply-To</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="email" placeholder="Reply-To" v-model="item[5]['reply']" :value="item[5]['reply']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <span>Contact Body</span>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Brand</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="text" placeholder="Brand" v-model="item[6]['brand']" :value="item[6]['brand']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Message</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="item[7]['textarea']" :value="item[7]['textarea']"></b-form-textarea>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Address</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="text" placeholder="Brand" v-model="item[8]['address']" :value="item[8]['address']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Language</label>
                          </b-col>
                          <b-col sm="7">
                            <b-form-input type="text" placeholder="Brand" v-model="item[9]['language']" :value="item[9]['language']"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-container>

                    <b-container v-if="modal === 'SendMessage'">
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Name</label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-input type="text" placeholder="### ###-####"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Message</label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="item[1]['text']" :value="item[1]['text']"></b-form-textarea>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-container>

                    <b-container v-if="modal === 'SendPushMessage'">
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Name</label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-input type="text" placeholder="To identify this message later"></b-form-input>
                          </b-col>
                          <b-col sm="3">
                            <label class="label">Select Push Application</label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-select class="mb-3" placeholder="Please select an option">
                              <option :value="null">Please select an option</option>
                              <option v-for="d in item" v-bind:value="`${d.value}`"> {{ d.text }} </option>
                            </b-form-select>
                          </b-col>

                          <b-col sm="3">
                            <label class="label">Message Text</label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-textarea id="textarea" rows="3" max-rows="6" placeholder=""></b-form-textarea>
                          </b-col>
                          <b-col sm="3">
                            <label class="label">Custom Data</label> <small><i>(Optional, JSON string)</i></small>
                          </b-col>
                          <b-col sm="9">
                            <b-form-textarea id="textarea" rows="3" max-rows="6" placeholder=""></b-form-textarea>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-container>

                    <b-container v-if="modal === 'HttpPost'">
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Url</label>
                          </b-col>
                          <b-col sm="9">
                            <b-form-input type="url" placeholder="http://example.com"></b-form-input>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="3">
                            <label class="label">Format</label>
                          </b-col>
                          <b-col sm="9">
                            <select class="mb-3 custom-select" placeholder="Please select an option">
                              <option v-for="d in item" v-bind:value="`${d.text}`"> {{ d.text }} </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-container>

                    <b-container v-if="modal === 'TriggerWorkflow'">
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="5">
                            <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                              2015 IRCE
                            </b-form-checkbox>
                          </b-col>
                          <b-col sm="5">
                            <select class="mb-3 custom-select" placeholder="Please select an option">
                              <option v-for="d in item" v-bind:value="`${d.value}`"> {{ d.text }} </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="5">
                            <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                              2018 August Re-Engagement
                            </b-form-checkbox>
                          </b-col>
                          <b-col sm="5">
                            <select class="mb-3 custom-select" placeholder="Please select an option">
                              <option v-for="d in item" v-bind:value="`${d.text}`"> {{ d.text }} </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="5">
                            <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                              Better Email
                            </b-form-checkbox>
                          </b-col>
                          <b-col sm="5">
                            <select class="mb-3 custom-select" placeholder="Please select an option">
                              <option v-for="d in item" v-bind:value="`${d.text}`"> {{ d.text }} </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="5">
                            <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                              Deliverability
                            </b-form-checkbox>
                          </b-col>
                          <b-col sm="5">
                            <select class="mb-3 custom-select" placeholder="Please select an option">
                              <option v-for="d in item" v-bind:value="`${d.text}`"> {{ d.text }} </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                      <b-form-group>
                        <b-row class="my-1">
                          <b-col sm="5">
                            <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted">
                              Downloaded eBooks - August 2018 Re-engagement
                            </b-form-checkbox>
                          </b-col>
                          <b-col sm="5">
                            <select class="mb-3 custom-select" placeholder="Please select an option">
                              <option v-for="d in item" v-bind:value="`${d.text}`"> {{ d.text }} </option>
                            </select>
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-container>
                  </b-form>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
        <div class="modal-footer modal_buttons">
          <div class="left">
            <b-button type="submit" class="submit save btn">Save</b-button>
            <b-button type="reset" class="submit clear btn">Clear</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
<style scoped lang="scss">
  .vue_modal {
    border: 1px solid rgba(254, 254, 254, .5);
    position: fixed;
    top: 0;
    left: 0;
    padding: 15px 30px;
    width: 100%;
    height: 100%;
    outline: 0;
    vertical-align: middle;
    box-sizing: border-box;
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
      .modal-close {
        padding: 1rem;
        margin: -1rem -1rem -1rem auto;
        border: none;
        box-sizing: border-box;
        cursor: pointer;
        color: #000;
        font-size: 1.8rem;
        font-weight: 500;
        display: contents;
        position: relative;
        span {
          font-size: 1.8rem;
        }
      }
    }
    .modal-dialog {
      position: relative;
      width: auto;
      margin: .5rem;
      pointer-events: none;
      @media (min-width: 576px) {
        max-width: fit-content;
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
          .v-autocomplete {
            z-index: 100000;
          }
          .vdp-datepicker__calendar {
            z-index: 100000;
          }
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

<script>
import Autocomplete from './Autocomplete.vue';
import Datepicker from 'vuejs-datepicker';
import {mapState} from 'vuex';

const state = {
  date1: new Date()
};

export default {
  name: 'modal',
  components : {
    Datepicker
  },
  props: {
    showModal: Boolean,
    modal: {
      type: String
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      format: 'MMMM d yyyy',
      selected: null,
      showChoices: true,
      state: state,
      date: null,
      dateFrom: null,
      dateTo: null,
      choicesSelect: null,
      modalContent: [],
      items: [],
      template: Autocomplete,
      item: null,
    };
  },
  beforeMount() {
    this.$store.dispatch('getDummyData');
  },
  computed: {
    ...mapState([
      'dummyData'
    ]),
    set(modalContent) {
      this.$store.commit('setContent', modalContent);
   },
   setContent() {
     for (let i = 0; i < this.dummyData.length; i++) {
       if (this.dummyData[i]['value'] === this.modal) {
         return this.modalContent = Object.assign({}, this.dummyData[i]['content']);
       }
     }
     return null;
   }
  },
  methods: {
    changeTabs(name) {
      switch (name) {
        case 'publishing':
         return 'Publishing';
          break;
        case 'eccommerce':
         return 'Eccommerce';
         break;
        case 'healthWellness':
         return 'Health & Wellness';
         break;
        case 'travelTourism':
         return 'Travel & Tourism';
         break;
      }
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    update: function(text) {
      this.items.filter(function(p) {
      	return new RegExp(text).test(p)
      });
    },
    getLabel(item) {
      return item.text;
    },
    updateItems(text) {
      yourGetItemsMethod(text).then((response) => {
        this.items = response;
      });
    },
    saveModal() {
      this.close();
    },
    close() {
      this.$emit('closeModal');
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
    }
  }
};
</script>
