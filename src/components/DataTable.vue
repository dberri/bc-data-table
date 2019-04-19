<template></template>

<script>
export default {
  name: "DataTable",

  computed: {
    payments() {
      return this.$store.state.payments;
    }
  },

  mounted() {
    this.$store.dispatch("fetchPayments");
  }
};
</script>

<style scoped lang="scss">
</style>
