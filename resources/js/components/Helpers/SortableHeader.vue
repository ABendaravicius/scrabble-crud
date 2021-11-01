<template>
  <th>
    <a @click.prevent="sortUpdate">{{ title }}</a>
    <span v-if="data.sortBy === value && data.sortDirection === 'desc'">
      &uarr;
    </span>
    <span v-if="data.sortBy === value && data.sortDirection === 'asc'">
      &darr;
    </span>
  </th>
</template>

<script>
import { defineComponent, computed, toRefs, ref } from 'vue';

export default defineComponent({
  name: "sortable-header",
  emits: [
    "change-sorting"
  ],
  props: {
    title: {type: String, required: false},
    value: {type: String, required: true},
    data: {type: Object, required: true},
  },
  setup(props, { emit }) {
    const {value, data} = toRefs(props);

    const sortUpdate = () => {
      emit('change-sorting', value.value);
    };

    return{
      value,
      data,
      sortUpdate
    }
  }
});
</script>
