<template>
  <table class="bc-data-table">
    <thead class="bc-table-header">
      <tr class="normal">
        <th v-for="(col, i) in columns" :key="`heading_${i}`">
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody class="bc-table-body">
      <tr v-for="(item, i) in data" :key="`row_${i}`" class="normal">
        <td v-for="(col, i) in columns" :key="`col_${i}`">
          {{ item[col.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "DataTable",

  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      default: () => (this.data.length ? Object.keys(this.data[0]) : [])
    }
  },

  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
table.bc-data-table {
  border: 1px solid #f7f4fa;
  border-collapse: collapse;
  border-spacing: 0;

  tr.normal {
    td,
    th {
      padding: 0.35rem 1rem;
    }
  }

  thead.bc-table-header {
    th {
      border-bottom: 2px solid #f7f4fa;
      text-align: left;
      text-transform: uppercase;
    }

    th:not(:last-child) {
      border-right: 1px solid #f7f4fa;
    }
  }

  tbody.bc-table-body {
    tr:nth-child(even) {
      background-color: #f7f7f7;
    }
  }
}
</style>
