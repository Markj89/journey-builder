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

              <b-form @submit="onSubmit" @reset="onReset" v-for="(item, index) in modalContent" v-bind:key="index">
                <b-form-group id="fieldset-1"
                  v-if="modal === 'NewSubscription' || modal === 'CampaignOpened' || modal === 'SegmentEvent' || modal === 'FormEvent' || modal === 'ContactField' || modal === 'SubscriptionChanged' || modal === 'TagEvent' || modal === 'EndWorkflow'|| modal === 'ChangeSubscription' || modal === 'Case'">
                  <label class="label">Please Enter Your {{ label }}</label>
                  <multiselect v-model="value" :options="item" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                </b-form-group>

                <b-form-group id="fieldset-1" v-if="modal === 'LinkClicked'">
                  <b-tabs content-class="mt-2">
                    <b-tab title="Campaigns" active>
                      <b-form-input v-model="item.link" type="url" placeholder="http://example.com" :value="item.title"></b-form-input>
                    </b-tab>
                    <b-tab title="Preference Management">
                      <b-form-select v-model="selected" :options="dummyOptions">
                        <template slot="first">
                          <option :value="null" disabled>-- Please select an option --</option>
                        </template>
                      </b-form-select>
                      <b-form-radio v-model="selected" v-if="modal === 'LinkClicked'" name="trigger" value="A">Trigger For Any Links Clicked</b-form-radio>
                    </b-tab>
                  </b-tabs>
                </b-form-group>
                <b-form-group id="fieldset-1" v-if="modal === 'ProductPurchased' || modal === 'HttpPost'">
                  <label class="label">URL</label>
                  <b-form-input v-model="item.link" type="url" placeholder="http://example.com" :value="item.title"></b-form-input>

                  <b-form-radio v-model="selected" name="trigger" value="A" v-if="modal === 'ProductPurchased'">Trigger For All Products</b-form-radio>
                  <b-col class="my-3" v-if="modal === 'HttpPost'">
                    <b-form-select>
                      <template slot="first">
                        <option :value="null" disabled>-- Please select an option --</option>
                        <option :value="XML">XML</option>
                        <option :value="json">JSON</option>
                      </template>
                    </b-form-select>
                  </b-col>
                </b-form-group>

                <b-form-group id="fieldset-1" v-if="modal === 'TotalRevenue'">
                  <b-form-input type="number" v-model="item.title" placeholder="$" :key="`${item.title}`"></b-form-input>
                  <span class="mt-2">$ {{ formatPrice(`${item.title}`) }}</span>
                </b-form-group>

                <b-form-group id="fieldset-1" v-if="modal === 'ChangeContactField' || modal === 'ChangeTableField'">
                  <b-container>
                    <b-row class="my-1">
                      <b-col sm="6">
                        <b-form-select v-model="selected" :options="userOptions">
                          <template slot="first">
                            <option :value="null" disabled>-- Please Select fields --</option>
                          </template>
                        </b-form-select>
                      </b-col>
                      <b-col sm="5">
                        <b-form-select v-model="selected" :options="item[0]['Subscription']" v-if="modal === 'ChangeContactField'">
                          <template slot="first">
                            <option :value="null" disabled>-- Please Select Subscription --</option>
                          </template>
                        </b-form-select>
                        <b-form-input v-model="text" placeholder="" v-if="modal === 'ChangeTableField'"></b-form-input>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-form-group>

                <b-form-group id="fieldset-1" v-if="modal === 'ChangeTag'">
                  <b-container>
                    <b-row class="my-1">
                      <b-col sm="5">
                        <label class="label">Add</label>
                        <multiselect v-model="value" :options="item['Add']" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                      </b-col>
                      <b-col sm="5">
                        <label class="label">Remove</label>
                        <multiselect v-model="value" :options="item['Remove']" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-form-group>

                <b-container id="fieldset-1" v-if="modal === 'ApiEvent'">
                  <ul>
                    <pre class="language-json"><code><li>{{item}}</li></code></pre>
                  </ul>
                </b-container>

                <b-form-group id="fieldset-1" v-if="modal === 'SegmentEvent' || modal === 'YesNo' || modal === 'Split'">
                  <b-row class="my-1">
                    <b-col sm="12">
                      <label class="label">Segment</label>
                      <b-form-select class="mb-3" v-model="selected" :options="item">
                        <template slot="first">
                          <option :value="null" disabled>-- Please select an option --</option>
                        </template>
                      </b-form-select>
                    </b-col>

                    <b-col sm="12">
                      <datetime placeholder="Pick An Hour" format="h:i:s" width="100%" v-model="time" v-if="modal === 'SegmentEvent'"></datetime>
                    </b-col>

                  </b-row>
                </b-form-group>

                <b-form-group id="fieldset-1" v-if="modal === 'TableFieldUpdated'">
                  <b-tabs content-class="mt-2">
                    <b-tab title="Record Updated" active>
                      <b-form-select class="mb-3" v-model="selected" :options="item">
                        <template slot="first">
                          <option :value="null" disabled>-- Please select an option --</option>
                        </template>
                      </b-form-select>
                    </b-tab>
                    <b-tab title="Record Created">
                      <b-form-select v-model="selected" :options="dummyOptions">
                        <template slot="first">
                          <option :value="null" disabled>-- Please select an option --</option>
                        </template>
                      </b-form-select>
                      <b-form-radio v-model="selected" v-if="modal === 'LinkClicked'" name="trigger" value="A">Trigger For Any Links Clicked</b-form-radio>
                    </b-tab>
                  </b-tabs>
                </b-form-group>

                <b-form-group id="fieldset-1" v-if="modal === 'WebPageEvent'">
                  <b-container>
                    <b-tabs content-class="mt-4">
                      <b-row v-for="(key, index) in item" v-bind:key="index">
                        <b-tab :title="changeTabs(`${i}`)" active v-for="(k, i) in key" v-bind:key="i">
                          <b-form-input v-model="k.link" type="url" width="100%" placeholder="http://example.com" :value="k.title" v-if="i === 'pageViews' || i === 'linkClicks'"></b-form-input>

                          <b-form-select class="mb-3" v-model="selected" :options="k" v-if="i === 'funnels' || i === 'websites'">
                            <template slot="first">
                              <option :value="null" disabled>-- Please select an option --</option>
                            </template>
                          </b-form-select>
                        </b-tab>
                      </b-row>
                    </b-tabs>
                  </b-container>
                </b-form-group>

                <b-container v-if="modal === 'SendEmail'">
                  <b-form-group id="fieldset-1">
                    <b-form-group>
                      <span>Contact Header</span>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Name</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="text" placeholder="Name" v-model="item[0]['Name']" :value="item[0]['Name']"></b-form-input>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Subject</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="text" placeholder="Text" v-model="item[1]['Subject']" :value="item[1]['Subject']"></b-form-input>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Preheader</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="text" placeholder="Preheader" v-model="item[2]['Preheader']" :value="item[2]['Preheader']"></b-form-input>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">From Name</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="text" placeholder="From Name" v-model="item[3]['From Name']" :value="item[3]['From Name']"></b-form-input>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Email Address</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="email" placeholder="Email Address" v-model="item[4]['From Email']" :value="item[4]['From Email']"></b-form-input>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Reply-To</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="email" placeholder="Reply-To" v-model="item[5]['Reply-To']" :value="item[5]['Reply-To']"></b-form-input>
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
                          <b-form-select class="mb-3" v-model="selected" :options="item[6]['Brand']">
                            <template slot="first">
                              <option :value="null" disabled>-- Please select an option --</option>
                            </template>
                          </b-form-select>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Message</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="item[7]['Content']" :value="item[7]['Content']"></b-form-textarea>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Preview Link</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-checkbox id="checkbox-1" v-model="item[8]['Preview Link']" name="checkbox-1" :value="item[8]['Preview Link']" unchecked-value="not_accepted">{{ item[8]['Preview Link'] }}</b-form-checkbox>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Address</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="text" placeholder="Brand" v-model="item[9]['Address']" :value="item[9]['Address']"></b-form-input>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Language</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-input type="text" placeholder="Brand" v-model="item[10]['Language']" :value="item[10]['Language']"></b-form-input>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Campaign Tags</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-select class="mb-6" v-model="selected" :options="item[11]['Campaign Tags']">
                            <template slot="first">
                              <option :value="null" disabled>-- Please select an option --</option>
                            </template>
                          </b-form-select>
                        </b-col>
                      </b-row>
                    </b-form-group>
                    <b-form-group>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label class="label">Secure Suppression List</label>
                        </b-col>
                        <b-col sm="7">
                          <b-form-select class="mb-3" v-model="selected" :options="item[12]['Secure Suppression List']">
                            <template slot="first">
                              <option :value="null" disabled>-- Please select an option --</option>
                            </template>
                          </b-form-select>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-form-group>
                </b-container>

                <b-form-group v-if="modal === 'SendMessage'">
                  <b-form-group>
                    <b-row class="my-1">
                      <b-col sm="3">
                        <label class="label">Name</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-input type="text" placeholder="### ###-####" v-model="item[0]['Name']" value="item[0]['Name']"></b-form-input>
                      </b-col>
                    </b-row>
                  </b-form-group>
                  <b-form-group>
                    <b-row class="my-1">
                      <b-col sm="3">
                        <label class="label">Message</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-textarea id="textarea" rows="3" max-rows="6" v-model="item[1]['Message']" value="item[[1]'Message']"></b-form-textarea>
                      </b-col>
                    </b-row>
                  </b-form-group>
                </b-form-group>

                <b-container v-if="modal === 'SendPushMessage'">
                  <b-form-group>
                    <b-row class="my-1">
                      <b-col sm="3">
                        <label class="label">Name</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-input type="text" placeholder="To identify this message later"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="3">
                        <label class="label">Select Push Application</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-select v-model="selected" :options="item">
                          <template slot="first">
                            <option :value="null" disabled>-- Please select an option --</option>
                          </template>
                        </b-form-select>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="3">
                        <label class="label">Message Text</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-textarea id="textarea" rows="3" max-rows="6" placeholder=""></b-form-textarea>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="3">
                        <label class="label">Custom Data</label> <small><i>(Optional, JSON string)</i></small>
                      </b-col>
                      <b-col sm="9">
                        <b-form-textarea id="textarea" rows="3" max-rows="6" placeholder=""></b-form-textarea>
                      </b-col>
                    </b-row>

                  </b-form-group>
                </b-container>

                <b-form-group id="fieldset-1" v-if="modal === 'TriggerWorkflow'">
                  <b-container>
                    <b-row>
                      <b-col md="6">
                        <b-form-checkbox-group width="100%" :style="{ 'text-align': 'left'}" :options="item['checkboxes']" stacked>{{ boxes }}</b-form-checkbox-group>
                      </b-col>
                      <b-col md="5">
                        <b-form-select v-model="selected" :options="item['select']">
                          <template slot="first">
                            <option :value="null" disabled>-- Please select an option --</option>
                          </template>
                        </b-form-select>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-form-group>

                <b-container v-if="modal === 'SendToFacebook'">

                  <b-tabs content-class="mt-2">
                    <b-tab title="Mappings" active>
                      <div>
                        <b-container>
                          <b-row>
                            <b-col md="2">
                              <label class="label">FN</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][0]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="2">
                              <label class="label">LN</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][1]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col md="2">
                              <label class="label">GEN</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][2]['GEN']">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col md="2">
                              <label class="label">CT</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][3]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col md="2">
                              <label class="label">ST</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][4]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="2">
                              <label class="label">Country</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][5]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col md="2">
                              <label class="label">MADID</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][6]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col md="2">
                              <label class="label">APPUID</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][7]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>

                          <b-row>
                            <b-col md="2">
                              <label class="label">DOB</label>
                            </b-col>
                            <b-col md="6">
                              <b-form-select v-model="selected" :options="item['Mappings'][8]">
                                <template slot="first">
                                  <option :value="null" disabled>-- Please select an option --</option>
                                </template>
                              </b-form-select>
                            </b-col>
                          </b-row>
                        </b-container>
                      </div>
                    </b-tab>
                    <b-tab title="Audiences">
                      <div>
                        <b-row>
                          <b-col md="4">
                            <label class="label">Facbook Account</label>
                          </b-col>
                          <b-col md="6">
                            <b-form-select v-model="selected" :options="item['Audience'][0]">
                              <template slot="first">
                                <option :value="null" disabled>-- Please select an option --</option>
                              </template>
                            </b-form-select>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md="4">
                            <label class="label">Add Account</label>
                          </b-col>
                          <b-col md="6">
                            <b-form-input v-model="text" placeholder="Enter your Account"></b-form-input>
                          </b-col>
                        </b-row>
                      </div>
                    </b-tab>
                  </b-tabs>
                </b-container>

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

                <b-container v-if="modal === 'End'">
                  <p>This is the end of journey.</p>
                </b-container>
              </b-form>

            </div>
          </div>
        </div>
        <div class="modal-footer modal_buttons">
          <b-button type="submit" class="submit save btn" v-on:click.stop="close" aria-label="Close">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style><style scoped lang="scss">.vue_modal {
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
  .row {
    margin-bottom: 10px;
    margin-top: 10px;
  }
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

    h1 {
      margin-bottom: 0;
      line-height: 1.5;
      color: #03B6FC;
      font-weight: bold;
      font-family: 'Open Sans Semibold', sans-serif;
    }

    .modal-close {
      padding: 1rem;
      margin: -1rem 0rem -1rem auto;
      border: none;
      box-sizing: border-box;
      cursor: pointer;
      color: #000;
      font-size: 2.3rem;
      font-weight: 500;
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
    overflow: scroll;
    height: 100%;

    @media (min-width: 576px) {
      max-width: 700px;
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
      border: 1px solid rgba(0, 0, 0, .2);
      border-radius: .3rem;
      outline: 0;

      .modal-body {
        position: relative;
        flex: 1 1 auto;
        padding: 1rem;

        form {
          width: 100%;
        }

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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
  display: block;
  width: auto;
  visibility: visible;
  opacity: 1;
  position: absolute;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
  display: block;
  width: auto;
}

.calender-div {
  width: 100%;
  margin: 0 auto;
}

.datetime-picker {
  input {
    padding: 5px 15px;
    border-radius: 2px;
  }

  .okButton {}
}
</style>

<script>
import Datepicker from 'vuejs-datepicker';
import datetime from 'vuejs-datetimepicker';
import Multiselect from 'vue-multiselect';

const state = {
  date1: new Date()
};

export default {
  name: 'modal',
  components: {
    'datetime': datetime,
    'datepicker': Datepicker,
    'multiselect': Multiselect
  },
  props: {
    showModal: Boolean,
    modal: {
      type: String
    },
    label: {
      type: String,
    },
    modalContent: {
      type: Object
    },
  },
  data() {
    return {
      format: 'MMMM d yyyy',
      selected: null,
      state: state,
      date: null,
      dateFrom: null,
      dateTo: null,
      items: [],
      item: null,
      value: null,
      time: null,
      dummyOptions: [
        "Preference Again",
        "Thank You Again"
      ],
      userOptions: [
        'first_name',
        'last_name',
        'phone',
        'email',
        'fax',
        'website',
        'company'
      ]
    };
  },
  computed: {},
  methods: {
    changeTabs(name) {
      switch (name) {
        case 'pageViews':
          return 'Page Views';
          break;
        case 'linkClicks':
          return 'Link Clicks';
          break;
        case 'websites':
          return 'Website';
          break;
        case 'funnels':
          return 'Funnel';
          break;
      }
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.modalContent.push(tag);
      this.value.push(tag);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    update: function(text) {
      this.items.filter(function(p) {
        return new RegExp(text).test(p);
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
