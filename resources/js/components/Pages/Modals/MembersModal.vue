<template>
  <div class="form-wrapper">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-header">
        <h4>{{ !item ? 'Add New Member' : 'Edit Member' }}</h4>
        <div class="form-header__btn--close button" @click="closeModal">X</div>
      </div>
      <div class="form-item">
        <label for="name" class="form-item__label">Full name</label>
        <input v-model="name" id="name" type="text" class="form-item__input" required>
      </div>
      <div class="form-item">
        <label for="email" class="form-item__label">Email</label>
        <input v-model="email" id="email" type="text" class="form-item__input" required>
      </div>
      <div class="form-item">
        <label for="phone" class="form-item__label">Phone</label>
        <input v-model="phone" id="phone" type="text" class="form-item__input" required>
      </div>
      <div class="form-item">
        <label for="joined_at" class="form-item__label">Joined on</label>
        <input v-model="joined_at" id="joined_at" type="text" class="form-item__input" placeholder="DD-MM-YYYY" required>
      </div>
      <button type="submit">Confirm</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs} from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "MembersModal",
  props: {
    item: {type: Object, required: false}
  },
  emits: ['close', 'request-update'],
  setup(props, { emit }) {
    const store = useStore();
    const { item } = toRefs(props);
    const name = ref(item.value ? item.value.name : '');
    const email = ref(item.value ? item.value.email : '');
    const phone = ref(item.value ? item.value.phone : '');
    const joined_at = ref(item.value ? item.value.joined_at : '');

    const handleSubmit = () => {
      if (item.value) {
        store.updateMember(
          item.value.id,
          name.value,
          email.value,
          phone.value,
          joined_at.value
        );
      } else {
        store.createMember(
          name.value,
          email.value,
          phone.value,
          joined_at.value
        );
      }
      emit('request-update');
      closeModal();
    };

    const closeModal = () => emit('close');

    return {
      name,
      email,
      phone,
      joined_at,
      handleSubmit,
      closeModal
    }
  },
});
</script>

<style lang="scss" scoped>

</style>
