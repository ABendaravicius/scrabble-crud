<template>
  <div class="form-wrapper">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-header">
        <h4>{{ 'Register Match Results'}}</h4>
        <div class="form-header__btn--close button" @click="closeModal">X</div>
      </div>

      <div class="form-item__group-wrapper">
        <div class="form-item">
          <label for="player1" class="form-item__label">Player 1 ID</label>
          <input v-model="playerOne" id="player1" type="text" class="form-item__input" required>
        </div>
        <div class="form-item">
          <label for="player1-score" class="form-item__label">Player 1 Score</label>
          <input v-model="playerOneScore" id="player1-score" type="text" class="form-item__input" required>
        </div>
      </div>

      <div class="form-item__group-wrapper">
        <div class="form-item">
          <label for="player2" class="form-item__label">Player 2 ID</label>
          <input v-model="playerTwo" id="player2" type="text" class="form-item__input" required>
        </div>
        <div class="form-item">
          <label for="player2-score" class="form-item__label">Player 2 Score</label>
          <input v-model="playerTwoScore" id="player2-score" type="text" class="form-item__input" required>
        </div>
      </div>

      <div class="form-item__group-wrapper">
        <div class="form-item">
          <label for="location" class="form-item__label">Location</label>
          <input v-model="location" id="location" type="text" class="form-item__input" placeholder="City" required>
        </div>
        <div class="form-item">
          <label for="date" class="form-item__label">Date</label>
          <input v-model="date" id="date" type="text" class="form-item__input" placeholder="DD-MM-YYYY" required>
        </div>
      </div>
      <button type="submit">Confirm</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs} from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "MatchupsModal",
  emits: ['close', 'request-update'],
  setup(props, { emit }) {
    const store = useStore();
    const playerOne = ref('');
    const playerOneScore = ref('');
    const playerTwo = ref('');
    const playerTwoScore = ref('');
    const location = ref('');
    const date = ref('');

    const handleSubmit = () => {
      store.createMatchup(
        parseInt(playerOne.value),
        parseInt(playerOneScore.value),
        parseInt(playerTwo.value),
        parseInt(playerTwoScore.value),
        location.value,
        date.value,
      );

      emit('request-update');
      closeModal();
    };

    const closeModal = () => emit('close');

    return {
      playerOne,
      playerOneScore,
      playerTwo,
      playerTwoScore,
      location,
      date,
      handleSubmit,
      closeModal
    }
  },
});
</script>

<style lang="scss" scoped>

</style>
