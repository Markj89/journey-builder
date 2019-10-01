<template>
  <div>
    <h1 class="bd-content-title blue-text"><strong>Simplifying Your Cross-Channel Engagement</strong></h1>

    <p>Most marketing teams are using a multi-channel strategy, leveraging two or more of these channels, but not focusing on creating consistent messaging from one to the next.</p>
    <p>Effective cross-channel engagement is possible; understanding your customers and using that understanding to create meaningful journeys is the first step, followed by getting the right tools in place.
    <a href="https://www.maropost.com/" class="link">Maropost</a> automates marketing processes, leveraging data to maximize efficiency across the journey and provide a personal experience for every customer.</p>


    <form id="subscribe" method="" @submit.prevent="submit" role="form">
      <div class="first-user" :class="{ 'form-group--error': $v.email_address.$error, 'form-group--loading': $v.email_address.$pending }">
        <label for="email" class="label">Business Email</label>
        <input type="email" name="email" id="email" v-model="$v.email_address.$model" class="form-control" :class="{'input': true, 'is-danger': $v.email_address.$invalid }" placeholder="Enter Your Email to Subscribe" novalidate>
        <b-alert variant="danger" fade v-if="!$v.email_address.required" :show="!$v.email_address.required">
          Your Business Email is required
        </b-alert>
        <b-alert variant="danger" fade v-if="!$v.email_address.$email" :show="$v.email_address.$invalid">Please provide a proper email!</b-alert>
      </div>
      <div class="first-user">
        <button class="btn submit btn-submit" type="submit" :disabled="submitStatus === 'PENDING'">Subscribe</button>
        <b-alert :show="submitStatus === 'OK'" variant="success" dismissible fade v-if="submitStatus === 'OK'">Thanks for your submission!</b-alert>
        <b-alert :show="submitStatus === 'ERROR'" variant="danger" dismissible fade v-if="submitStatus === 'ERROR'">Please Fill Out All Fields Above.</b-alert>
        <b-alert :show="submitStatus === 'PENDING'" variant="primary" dismissible fade v-if="submitStatus === 'PENDING'">Sending...</b-alert>
      </div>
    </form>

    <button href="#" name="button" class="btn-secondary btn_maropost submit btn-submit">Contact Support</button>

    <h3 class="bd-content-title"><strong>Or contact us directly!</strong></h3>
    <ul class="list-unstyled">
      <li>Phone: <a href="tel:`${phone}`" class="link">{{ phone }}</a></li>
      <li>Email: <a href="mailto:`${email_placholder}`" class="link">{{ email_placholder }}</a></li>
    </ul>
  </div>
</template>

<style lang="scss">
  .bd-content {
    overflow: scroll;
    height: 100%;
    display: block;
  }
</style>
<script>
import axios from 'axios';

import { required, email } from 'vuelidate/lib/validators';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'SideBar-Content',
  data() {
    return {
      email_address: '',
      phone: '1.888.438.3152 Ext: 1',
      email_placholder: 'sales@maropost.com',
      submitStatus: null
    };
  },
  props: {
    chosenIndustry : {
      type: String
    }
  },
  computed: {
    isRequired() {
      return true;
    }
  },
  mounted() {},
  validations: {
    email_address: {
      email,
      required: true,
      async isUnique(value) {
        // standalone validator ideally should not assume a field is required
        if (value === '') return true

        // simulate async call, fail for all logins with even length
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(typeof value === 'string' && value.length % 2 !== 0)
          }, 350 + Math.random() * 300)
        })
      }
    }
  },
  methods: {
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {

        // Do your submit logic here
        this.submitStatus = 'PENDING';
        const opts = {
          method: 'POST',
          headers: { 'Access-Control-Allow-Origin': '*' },
          crossdomain: true,
          useCredentails: true,
          body: {
            email: this.email_address,
            //industry: this.
          }
        };

        this.$store.dispatch('subscriptionData', opts).then((res) => {
          setTimeout(() => {
            console.log(res);

            this.$ga.event({
              eventCategory: 'Subscribe',
              eventAction: 'submit',
              eventValue: opts
            });

            this.submitStatus = 'OK';
          }, 500);
        }).catch((err) => {
          this.submitStatus = 'ERROR';
        });

      }
    }
  }
}
</script>
