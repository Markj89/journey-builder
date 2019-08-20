<template>
  <div>
    <div class="container">
      <div class="row">
        <h1 class="bd-content-title blue-text"><strong>Contact Customer Success for Advice</strong></h1>
      </div>
      <!--<div class="row">
        <form id="support" @submit.prevent="submit" role="form">
          <div class="first-user"  :class="{ 'form-group--error': $v.email_address.$error, 'form-group--loading': $v.email_address.$pending }">
            <label for="email" class="label">Business Email</label>
            <input type="email" name="email" id="email" v-model="$v.email_address.$model" class="form-control" :class="{'input': true, 'is-danger': $v.email_address.$invalid }" placeholder="Enter Your Email Address" novalidate>
            <b-alert variant="danger" fade v-if="!$v.email_address.required" :show="!$v.email_address.required">
              Your Business Email is required
            </b-alert>
            <b-alert variant="danger" fade v-if="!$v.email_address.$email" :show="$v.email_address.$invalid">Please provide a proper email!</b-alert>
          </div>

          <div class="first-user" :class="{ 'form-group--error': $v.message.$error, 'form-group--loading': $v.message.$pending }">
            <label for="message" class="label">Message</label>
            <textarea placeholder="Hello World" name="message" id="message" v-model="$v.message.$model" class="form-control" rows="6" novalidate></textarea>
          </div>

          <div class="first-input">
            <button class="btn submit btn-submit" type="submit" value="Submit" :disabled="submitStatus === 'PENDING'">Book A Demo</button>
            <b-alert show variant="success" dismissible fade v-if="submitStatus === 'OK'">
              Thanks for your submission!

            </b-alert>
            <b-alert show variant="danger" dismissible fade v-if="submitStatus === 'ERROR'">
              Please Fill Out All Fields Above.
            </b-alert>
            <b-alert show variant="primary" dismissible fade v-if="submitStatus === 'PENDING'">
              Sending...
            </b-alert>
          </div>
        </form>
      </div>-->
      <div class="row">
        <h3 class="sidebar-h3">More on how our journeys work</h3>
        <iframe width="560" height="250" src="https://www.youtube.com/embed/0x1FMpwzryE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState, mapGetters, mapActions} from 'vuex';

export default {
  name: 'SideBar-Form',
  data() {
    return {
      email_address: '',
      message: '',
      submitStatus: null
    };
  },
  validations: {
    email_address: {
      required
    },
    message: {
      required
    }
  },
  methods: {
    submit() {}
  }
}
</script>
