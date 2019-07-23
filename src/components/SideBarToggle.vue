<template>
  <div class="sidebar sidebarToggle">
    <nav class="sidebar-nav">
      <div class="row flex-xl-nowrap">
        <div class="col-12 col-md-12 col-xl-12 bd-sidebar">
          <div class="bd-content">
            <h1 class="bd-content-title blue-text"><strong>Simplifying Your Cross-Channel Engagement</strong></h1>

            <p>Most marketing teams are using a multi-channel strategy, leveraging two or more of these channels, but not focusing on creating consistent messaging from one to the next.</p>
            <p>Effective cross-channel engagement is possible; understanding your customers and using that understanding to create meaningful journeys is the first step, followed by getting the right tools in place.
            <a href="https://www.maropost.com/" class="link">Maropost</a> automates marketing processes, leveraging data to maximize efficiency across the journey and provide a personal experience for every customer.</p>

            <h3 class="bd-content-title"><strong>Or contact us directly!</strong></h3>
            <ul class="list-unstyled">
              <li>Phone: <a :href="`${phone}`" class="link">{{ phone }}</a></li>
              <li>Email: <a :href="`${email}`" class="link">{{ email }}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sidebarHighlight">
        <h4 class="white-text">Are you a customer?</h4>
        <div class="col-md-3">
          <span class="white-text">Click here to contact support with any questions around your custom journeys</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'SideBarToggle',
    data() {
      return {
        phone: '1.888.438.3152 Ext: 1',
        email: 'sales@maropost.com'
      }
    }
  }
</script>

<style>
.sidebarToggle {
  background-image: url('../assets/sidebarToggleBackground.png');
}
</style>
