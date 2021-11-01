<template>
  <div>
    <div v-if="!loading">
      <table class="leaderboard-table">
        <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Avg. Score</th>
          <th>Games Played</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="data in tableData" :key="data.member?.id"
          class="table-item"
        >
          <td>indexOf</td>
          <td>
            <router-link
              :to="{
                  name: 'Profile',
                  params: {
                    id: item.member?.id,
                  }
                }"
              class="table-item__actions-view"
            >{{ item.member?.name }}</router-link>
          </td>
          <td>{{ item.averageScore }}</td>
          <td>{{ item.gamesPlayed }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, watch, ref } from 'vue';
import { useStore } from "@/store";
import MatchupsModal from "./Modals/MatchupsModal";

export default defineComponent({
  name: "index",
  components: {
    MatchupsModal,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.loading);
    const tableData = computed(async () => await store.fetchMatchesByMember());

    return {
      tableData,
      loading,
    }
  }
});
</script>

<style lang="scss" scoped>
@import "resources/scss/variables";

.matches-table {
  table-layout: auto;

  tr,
  td {
    font-size: 16px !important;
  }

  td {
    padding: 16px 16px;

    &:last-child {
      text-align: center !important;
    }

    &.winner {
      font-weight: 600;
      color: $blue-accent;
    }
  }

  .table-item {
    &__actions {
      padding: 8px 0;
      width: 200px;
      min-width: fit-content;

      &-view {
        font-weight: 600;

        &:hover,
        &:focus,
        &:active {
          color: $blue-accent;
        }
      }
    }
  }
}

</style>
