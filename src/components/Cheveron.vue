<template>
  <div class="bc-cheveron">
    <svg v-show="asc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>
    <svg v-show="!asc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M8.7 14.7a1 1 0 0 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 11.42l-3.3 3.3z"/></svg>
  </div>
</template>

<script>
export default {
  name: "Cheveron",

  props: {
    asc: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.bc-cheveron {
  position: absolute;
  top: 2px;
  right: 0;
}
</style>