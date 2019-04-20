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
      <tr
        v-for="(item, i) in sortedData"
        :key="`row_${i}`"
        class="normal"
        @mouseover="showByIndex = i"
        @mouseout="showByIndex = null"
      >
        <td v-for="(col, j) in columns" :key="`col_${j}`">
          <span>{{ item[col.field] }}</span>
          <button
            v-show="col.edit && showByIndex === i"
            type="button"
            class="edit-btn"
            @click="edit(i, col.field)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path
                class="heroicon-ui"
                d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"
              />
            </svg>
          </button>

          <div
            v-if="col.edit"
            :class="[
              'edit-box',
              { active: editingIndex === i && editingField === col.field }
            ]"
          >
            <button type="button" @click="finishEditing" class="close-btn">
              &times;
            </button>
            <form action="#" method="POST" @submit.prevent="submit">
              <input type="text" v-model="editingContent" />
              <button type="submit">Save</button>
            </form>
          </div>
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
      sortDirections: ["original", "asc", "desc"],

      showByIndex: null,

      editingIndex: null,
      editingField: null,
      editingContent: null
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
    },

    edit(index, field) {
      this.editingContent = this.data[index][field];
      this.editingIndex = index;
      this.editingField = field;
    },

    submit() {
      const form = {
        index: this.editingIndex,
        field: this.editingField,
        content: this.editingContent
      };
      this.$emit("submit", form);
      this.finishEditing();
    },

    finishEditing() {
      this.editingContent = null;
      this.editingIndex = null;
      this.editingField = null;
    }
  }
};
</script>

<style scoped lang="scss">
$border-color: #f7f4fa;

table.bc-data-table {
  * {
    box-sizing: border-box;
  }

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
    tr {
      &:nth-child(even) {
        background-color: #f7f7f7;
      }

      td {
        position: relative;

        .edit-btn {
          position: absolute;
          top: 2px;
          right: 0;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .edit-box {
          display: none;
          z-index: 2;
          position: absolute;
          top: 0;
          right: 0;
          padding: 2rem 1rem 1rem 1rem;
          min-width: 50%;
          border: 1px solid darken($border-color, 5%);
          background-color: #fff;
          box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.05);

          .close-btn {
            background: none;
            border: none;
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: 0;
            right: 0.5rem;
            font-size: 1.5rem;
            cursor: pointer;
          }

          form {
            input {
              width: 100%;
              display: block;
              padding: 0.5rem;
              margin-bottom: 0.5rem;
            }

            button[type="submit"] {
              background-color: #1caf0c;
              border: none;
              color: white;
              width: 100%;
              padding: 0.5rem 0.75rem;
              cursor: pointer;
            }
          }

          &.active {
            display: block;
          }
        }
      }
    }
  }
}
</style>
