<template>
  <div id="app" v-bind:class="{'sidebar-background': JourneyEnd === true }">
    <simple-flowchart :diagram.sync="diagram" @nodeClick="nodeClick" @nodeDelete="nodeDelete" @linkBreak="linkBreak" @linkAdded="linkAdded" @canvasClick="canvasClick" :height="100" />
    <sidebar-toggle v-if="JourneyEnd"></sidebar-toggle>
    <aside id="side_panel" class="sidebar draggable" v-bind:class="{'disable_sidebar disabled': JourneyEnd === true }">
      <div class="workflow_menu_block">
        <div class="workflow_menu_row" v-for="(key, item) in scene.nodes">
          <ul>
            <li class="sidebar-modal" v-bind:class="`${key.category}`">
              <a href="#" @click="addNode(key)" v-model="key.value" :value="key.value" class="sidebar-modal-link" v-bind:class="{'disabled': JourneyEnd === true }">{{ key.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="bottom right">
      <button class="btn save" @click="JourneyEnd = !JourneyEnd">Save</button>
      <button class="btn clear" @click="ClearCanvas">Clear</button>
      <button class="btn remove" @click="Exit"><i class="fal fa-sign-out"></i> Close</button>
    </div>
  </div>
</template>

<script>
// Layouts
import SimpleFlowchart from '@/SimpleFlowchart.vue';
import EndGame from '@/EndGame.vue';
import SideBarToggle from '@/SideBarToggle.vue';

export default {
  name: 'app',
  components: {
    'simple-flowchart': SimpleFlowchart,
    'end-game': EndGame,
    'sidebar-toggle': SideBarToggle
  },
  data() {
    return {
      JourneyEnd: false,
      diagram: {
        centerX: 1024,
        centerY: 140,
        scale: 1,
        nodes: [],
        links: [
          {
            id: 3,
            from: 2, // Node id the link start
            to: 2,  // Node id the link end
          }
        ]
      },
      scene: {
        nodes: [
          {text: 'New Subscription', value: 'NewSubscription', category: 'trigger', id: 0, x: 0, y: 0, icon:'https://app.maropost.com/assets/workflows/new_subscription-d41b48954abf7ca68bd18cf465e91b4380500ec7ae6c47ad26f57216a4ceaee9.png'},
          {text: 'Campaign Opened', value: 'CampaignOpened', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/campaign_opened-0a144c274806b0133b3ea00adccf10553d0f6e4f268cb896145729f5a8961f80.png'},
          {text: 'Link Clicked', value: 'LinkClicked', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/link_clicked-204617b80cc0d619828cf088d27b47ed2b9d583aa5e15bee3c661db67aa1b895.png'},
          {text: 'Product Purchased', value: 'ProductPurchased', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/product_purchased-1b628751574de5a657a5dd9db8961b350a7b0dff03d52d3a7d2c69cc258f6830.png'},
          {text: 'Total Revenue', value: 'TotalRevenue', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/total_revenue-74ccdc550774cab16d50d1a0ed8e9b6d86d0e09d16ce19ee2701f30983715448.png'},
          {text: 'Form Event', value: 'FormEvent', category: 'trigger', id: 0,  x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/form_event-42b283f0b65426cd76029d3c0f4588424b998aedd1155c96fddefd6c734c74f4.png'},
          {text: 'Api Event', value: 'ApiEvent', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/api_event-1d0dea6dac39402eea50c85914f1c91feecb69f0343a249484799dee00d6b014.png'},
          {text: 'Segment Event', value: 'SegmentEvent', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/segment_event-5b437ce7031c83349ceb7c17a5cc76a672145359ee5f496a1dec0c4858e54e1e.png'},
          {text: 'Contact Field', value: 'ContactField', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/contact_field_updated-f3d68f0142003a213f35169c79d52337b836531d305654b76e9bd84962388e3b.png'},
          {text: 'Table Field Updated', value: 'TableFieldUpdated', category: 'trigger', x: 0, y: 0, id: 0, icon: 'https://app.maropost.com/assets/workflows/contact_field_updated-f3d68f0142003a213f35169c79d52337b836531d305654b76e9bd84962388e3b.png'},
          {text: 'Subscription Changed', value: 'SubscriptionChanged', category: 'trigger', x: 0, y: 0, id: 0, icon: 'https://app.maropost.com/assets/workflows/subscription_changed-6c6a7ddbe0346be36bf23d616fc1ce6a0bcb365fdc74ebc074eaccc859e7dbba.png'},
          {text: 'Tag Event', value: 'TagEvent', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/subscription_changed-6c6a7ddbe0346be36bf23d616fc1ce6a0bcb365fdc74ebc074eaccc859e7dbba.png'},
          {text: 'Web Page Event', value: 'WebPageEvent', category: 'trigger', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/campaign_opened-0a144c274806b0133b3ea00adccf10553d0f6e4f268cb896145729f5a8961f80.png'},
          {text: 'Send Email', value: 'SendEmail', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/send_email-3bdd9e9144d0496b1a2055acbd48bfa671acb2d34aa047e190e51208fca1b60c.png'},
          {text: 'Send SMS', value: 'SendMessage', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/sms-7a33ad250c34e56716b9a08992f2d81e1366c1b25c4e6252e3b4918831696df8.png'},
          {text: 'Send Push Message', value: 'SendPushMessage', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/push-adcbfcca296326e30622f5de4e1ba66b9b568a3bcc571ee7f6ef0e3c1efec612.png'},
          {text: 'HTTP Post', value: 'HttpPost', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/http_post-a5ead9bdbec0afc759271b8fb1942e2015318b0b3f7f0d7f16a1a48aaf36e202.png'},
          {text: 'Trigger Journey', value: 'TriggerWorkflow', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/trigger_workflow-d77b18e66ba981cb4f10238bea6becce197125dd30c8c9658d5aed9e5aa1a87b.png'},
          {text: 'Send to Facebook', value: 'SendToFacebook', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/post_to_facebook-182f3cdcd37c52295964e9cb7fbcbeae713ffa77d1763af8afa51b44ba4f7610.png'},
          {text: 'End Journey', value: 'EndWorkflow', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/end_workflow-f876ba76b1d9414c23ccba2484b1012b61afb61780c954238d8704eb417db247.png'},
          {text: 'Change Contact Field', value: 'ChangeContactField', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/change_contact_field-f343f46072302566982e2c70a38c014e336f9efc74f5f54746fca831a06023fb.png'},
          {text: 'Change Table Field', value: 'ChangeTableField', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/change_contact_field-f343f46072302566982e2c70a38c014e336f9efc74f5f54746fca831a06023fb.png'},
          {text: 'Change Subscription', value: 'ChangeSubscription', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/change_subscription-d317a4f09feea83bc3a044a660a5819dd3f733580d3340691921d81be1b00ccd.png'},
          {text: 'Change Tags', value: 'ChangeTag', category: 'action', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/change_subscription-d317a4f09feea83bc3a044a660a5819dd3f733580d3340691921d81be1b00ccd.png'},
          {text: 'Yes/No', value: 'YesNo', category: 'filter', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/yes_no-3bc0704224fe2f30f3985675f5c2f3182ff4bad849119c42fd19d8c5cb6e7260.png'},
          {text: 'Case', value: 'Case', category: 'filter', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/case-c0ac169ca78a93ced386f8905c4f01d200ec9e4903e12681ff3a3d44d89a07c0.png'},
          {text: '% Split', value: 'Split', category: 'filter', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/percent_split-bd53f16e537238acaeba93277b2c40d0d90852b7f3c490f7f78b98fbeca7ec1b.png'},
          {text: 'A/B Split', value: 'AbSplit', category: 'filter', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/ab_split-01dc3e1ab59d29881665e8ab0937b8c96f8bdc637e3a320203dd08389db52213.png'},
          {text: 'Delay', value: 'Delay', category: 'delay', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/delay-56dfa0067189d43fb5fd957105c9451205c136a5836751aed7ac9d3729586a30.png'},
          {text: 'Delay until?', value: 'delay-until', category: 'delay', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/delay_until-c162aa3286192b26e3fb26162950fae455a97f9ca8bebcee612be004a2a93ce2.png'},
          {text: 'End', value: 'End', category: 'end', id: 0, x: 0, y: 0, icon: 'https://app.maropost.com/assets/workflows/end-6d5e74ea077bcb62705341f584087cab13c63075b516429e7de0fbdd31864819.png'}
        ]
      }
    };
  },
  mounted () {
    $("#side_panel").draggable();
  },
  computed: {},
  methods: {
    addNode(nodes) {
      this.diagram.nodes.push({
        id: this.diagram.nodes.length + 1,
        x: -400,
        y: 50,
        type: nodes['category'],
        label: nodes['text'],
        modal: nodes['value'],
        icon: nodes['icon']
      });
    },
    ClearCanvas(id) {
      console.log('Clear Canvas', id);
    },
    Exit(id) {
      console.log('Exit');
    },
    nodeClick(id) {
      console.log('node click', id);
    },
    nodeDelete(id) {
      console.log('node delete', id);
    },
    linkBreak(id) {
      console.log('link break', id);
    },
    linkAdded(link) {
      console.log('new link added:', link);
    },
    canvasClick(e) {
      console.log('canvas Click, event:', e);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  position: relative;
}
</style>
