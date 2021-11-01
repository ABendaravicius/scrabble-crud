<template>
  <div>
    <members-modal v-if="showModal" :item="selectedItem" @close="toggleModal" @request-update="fetchData" />
    <div v-if="!loading">
      <div class="modal-controls">
        <button class="modal-controls__btn" @click="toggleModal">+ Add New Member</button>
      </div>
      <table class="table">
        <thead>
        <tr>
          <sortable-header
            @change-sorting="changeSort"
            title='Name'
            value='name'
            :data="{sortBy, sortDirection}"
            :class="
            sortBy==='name'
              ? 'active'
              : ''
          "
          />
          <sortable-header
            @change-sorting="changeSort"
            title='Email' value='email'
            :data="{sortBy, sortDirection}"
            :class="
            sortBy==='email'
              ? 'active'
              : ''
          "
          />
          <th>Phone</th>
          <sortable-header
            @change-sorting="changeSort"
            title='Joined' value='joined_at'
            :data="{sortBy, sortDirection}"
            :class="
            sortBy==='joined_at'
              ? 'active'
              : ''
          "
          />
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="member in paginationData" :key="member.id"
          class="table-item"
        >
          <td>{{ member.name }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.phone }}</td>
          <td>{{ member.joined_at }}</td>
          <td class="table-item__actions">
            <router-link
              :to="{
                name: 'Profile',
                params: {
                  id: member.id,
                }
              }"
              class="table-item__actions-view button"
            >Profile</router-link>
            <button class="table-item__actions-edit" @click="toggleModal(member.id)">Edit</button>
            <button class="table-item__actions-delete" @click="deleteItem(member.id)">X</button>
          </td>
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
import SortableHeader from "@/js/components/Helpers/SortableHeader.vue";
import MembersModal from "./Modals/MembersModal";

export default defineComponent({
  name: "index",
  components: {
    SortableHeader,
    MembersModal,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.loading);

    const members = computed(() => store.members);
    const paginationData = computed(() => store.paginationMemberData);
    const currentPage = computed(() => store.currentMemberPage);

    // Sort controls
    let sortBy = ref('joined_at');
    let sortDirection = ref('desc');

    const changeSort = (field) => {
      if (sortBy.value === field) {
        sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
      }
      sortBy.value = field;
      store.fetchMemberDataByPage(sortBy.value, sortDirection.value)
    }

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

    const incrementPage = () => canIncrement && store.currentMemberPage++;
    const decrementPage = () => canDecrement && store.currentMemberPage--;
    const selectPage = (e) => {
      store.currentMemberPage = e.target.value;
    };

    //Modal controls
    let selectedItem = ref(null);

    const showModal = ref(false);

    const toggleModal = (id = null) => {
      if (id) selectedItem.value = members.value.find(i => i.id == id);

      showModal.value = !showModal.value;
      if (!showModal.value) {
        selectedItem.value = null;
      }
    };

    const deleteItem = (id) => {
      store.deleteMember(parseInt(id));
      fetchData();
    };

    const fetchData = async () => {
      await store.fetchMemberDataByPage(sortBy.value, sortDirection.value);
    };

    onMounted(() => fetchData());

    watch(currentPage, () => fetchData());

    return {
      fetchData,
      members,
      paginationData,
      currentPage,
      pageButtons,
      decrementPage,
      incrementPage,
      selectPage,
      canDecrement,
      canIncrement,
      changeSort,
      sortBy,
      sortDirection,
      loading,
      showModal,
      toggleModal,
      selectedItem,
      deleteItem
    }
  }
});
</script>

<style lang="scss" scoped>
  .table-item {
    &__actions {
      padding: 8px 0;
      width: 200px;
      min-width: fit-content;

      &-edit,
      &-delete,
      &-view {
        font-size: 12px;

        &:hover {
          color: #FFF;
        }
      }

      &-delete {
        font-weight: 600;
        background: darkred;
        border: none;
        clip-path: none;

        &:hover,
        &:focus,
        &:active {
          background: red;
        }
      }
    }
  }
</style>
