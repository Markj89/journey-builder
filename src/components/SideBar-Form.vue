<template>
  <div>
    <div class="container">
      <div class="row">
        <h1 class="bd-content-title blue-text"><strong>Contact Customer Success for Advice</strong></h1>
      </div>
      <div class="row">
      </div>
      <div class="row">
        <h3 class="sidebar-h3">More on how our journeys work</h3>
        <iframe width="560" height="250" src="https://www.youtube.com/embed/0x1FMpwzryE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>

<script>
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
    email_address: {},
    message: {}
  },
  methods: {
    submit() {}
  }
}
</script>
