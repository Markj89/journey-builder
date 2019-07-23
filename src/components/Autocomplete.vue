<template>
  <div>
    <div>
      <b v-model="item.text">#{{item.text}}</b>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  props: {
    item: {
      required: false
    },
    searchText: { required: true }
  }
}
</script>
