<template>
  <table class="bc-data-table">
    <thead class="bc-table-header">
      <tr class="normal">
        <th
          v-for="(col, i) in columns"
          :key="`heading_${i}`"
          @click="sort(col.field)"
          :class="[{ active: currentSortField === col.field }]"
        >
          <span>{{ col.label }}</span>
          <cheveron
            v-show="
              currentSortField === col.field && currentSortDirection !== 0
            "
            :asc="sortDirections[currentSortDirection] === 'asc'"
          />
        </th>
      </tr>
    </thead>
    <tbody class="bc-table-body">
      <tr v-for="(item, i) in sortedData" :key="`row_${i}`" class="normal">
        <td v-for="(col, i) in columns" :key="`col_${i}`">
          {{ item[col.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { sortBy } from "lodash";
import Cheveron from "@/components/Cheveron";
export default {
  name: "DataTable",

  components: {
    Cheveron
  },

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
    return {
      currentSortField: null,
      currentSortDirection: 0,
      sortDirections: ["original", "asc", "desc"]
    };
  },

  computed: {
    sortedData() {
      if (this.currentSortDirection > 0) {
        return this.sortDirections[this.currentSortDirection] === "asc"
          ? this.sortIt()
          : this.sortIt().reverse();
      } else {
        return this.data;
      }
    }
  },

  methods: {
    sort(field) {
      if (field === this.currentSortField) {
        this.currentSortDirection++;
      } else {
        this.currentSortDirection = 1;
      }

      if (this.currentSortDirection === 3) {
        this.currentSortDirection = 0;
      }
      this.currentSortField = field;
    },

    sortIt() {
      if (
        this.columns.find(item => item.field === this.currentSortField).type ===
        "date"
      ) {
        return sortBy(this.data, [
          item => {
            return new Date(item[this.currentSortField]);
          }
        ]);
      }
      return sortBy(this.data, [this.currentSortField]);
    }
  }
};
</script>

<style scoped lang="scss">
$border-color: #f7f4fa;

table.bc-data-table {
  border: 1px solid $border-color;
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
      border-bottom: 2px solid $border-color;
      text-align: left;
      text-transform: uppercase;
      cursor: pointer;
      position: relative;
      padding-right: 24px;

      &.active {
        background-color: #f8f9fc;
      }
    }

    th:not(:last-child) {
      border-right: 1px solid $border-color;
    }
  }

  tbody.bc-table-body {
    tr:nth-child(even) {
      background-color: #f7f7f7;
    }
  }
}
</style>
