<template>
  <div id="app">
    <DataTable :data="payments" :columns="columns" />
  </div>
</template>

<script>
import DataTable from "./components/DataTable.vue";

export default {
  name: "app",

  components: {
    DataTable
  },

  data() {
    return {
      columns: [
        {
          field: "Name",
          label: "Name"
        },
        {
          field: "Description",
          label: "Description",
          edit: true
        },
        {
          field: "Date",
          label: "Date",
          type: "date"
        },
        {
          field: "Amount",
          label: "Amount"
        }
      ]
    };
  },

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

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
</style>
