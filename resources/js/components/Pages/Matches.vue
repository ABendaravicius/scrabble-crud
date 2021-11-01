<template>
  <div>
    <matchups-modal v-if="showModal" @close="toggleModal" @request-update="fetchData" />
    <div v-if="!loading">
      <div class="modal-controls">
        <button class="modal-controls__btn" @click="toggleModal">+ Register New Match</button>
      </div>
      <table class="matches-table">
        <thead>
          <tr>
            <th>Player 1</th>
            <th>Score (P1)</th>
            <th>Player 2</th>
            <th>Score (P2)</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="match in paginationData" :key="match.id"
            class="table-item"
          >
            <td>
              <router-link
                :to="{
                  name: 'Profile',
                  params: {
                    id: match.player1_id,
                  }
                }"
                class="table-item__actions-view"
              >{{ memberName(match.player1_id) }}</router-link>
            </td>
            <td :class="
              match.player1_score > match.player2_score
              ? 'winner' : ''
            ">
              {{ match.player1_score }}
            </td>
            <td>
              <router-link
                :to="{
                  name: 'Profile',
                  params: {
                    id: match.player2_id,
                  }
                }"
                class="table-item__actions-view"
              >{{ memberName(match.player2_id) }}</router-link>
            </td>
            <td :class="
              match.player2_score > match.player1_score
              ? 'winner' : ''
            ">
              {{ match.player2_score }}
            </td>
            <td>{{ match.location }}</td>
            <td>{{ match.date }}</td>
          </tr>
        </tbody>
      </table>
      <div class="table-pagination">
        <hr>
        <button @click="decrementPage" :disabled="!canDecrement" class="table-pagination__btn">Prev</button>
        <template v-for="btn in pageButtons" :key="btn.value">
          <button
            @click="selectPage"
            :disabled="currentPage == btn.value"
            :value="btn.value"
            :class="[
            'table-pagination__btn',
            currentPage === btn.value
              ? 'table-pagination__btn--active'
              : ''
          ]"
          >{{ btn.title }}</button>
        </template>
        <button @click="incrementPage" :disabled="!canIncrement" class="table-pagination__btn">Next</button>
        <hr>
      </div>
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

    const members = computed(() => store.members);
    const matchups = computed(() => store.matchups);
    const paginationData = computed(() => store.paginationMatchData);
    const currentPage = computed(() => store.currentMatchPage);

    const memberName = (id) => members.value.find(i => i.id === id).name;

    // Pagination controls
    const pageButtons = computed(() => {
      let buttons = [];

      for (let i = 1; i <= store.lastPage; i++) {
        buttons.push({
          value: i,
          title: i.toString()
        });
      }

      return buttons;
    });

    const canIncrement = computed(() =>
      currentPage.value < store.lastPage
    );

    const canDecrement = computed(() =>
      currentPage.value > 1
    );

    const incrementPage = () => canIncrement && store.currentMatchPage++;
    const decrementPage = () => canDecrement && store.currentMatchPage--;
    const selectPage = (e) => {
      store.currentMatchPage = e.target.value;
    };

    //Modal controls
    const showModal = ref(false);

    const toggleModal = (id = null) => {
      showModal.value = !showModal.value;
    };

    const fetchData = async () => {
      await store.fetchMatchDataByPage();
    };

    onMounted(() => fetchData());

    watch(currentPage, () => fetchData());

    return {
      fetchData,
      members,
      matchups,
      paginationData,
      currentPage,
      pageButtons,
      decrementPage,
      incrementPage,
      selectPage,
      canDecrement,
      canIncrement,
      loading,
      showModal,
      toggleModal,
      memberName,
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
