<template>
  <section class="header">
    <div class="header-logo">
      <h1 class="header-logo__title">Scrabble</h1>
      <h3 class="header-logo__subtitle">Challenge</h3>
    </div>
    <nav class="header-nav">
      <router-link
        active-class="header-nav__link--active"
        :to="{name: 'Members'}" class="header-nav__link"
      >Members</router-link>
      <router-link
        active-class="header-nav__link--active"
        :to="{name: 'Matches'}" class="header-nav__link"
      >Matches</router-link>
      <router-link
        active-class="header-nav__link--active"
        :to="{name: 'Leaderboard'}"
        class="header-nav__link"
      >Leaderboard</router-link>
    </nav>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent ({
  name: "Header",
  setup() {


    return {}
  }
});
</script>

<style lang="scss" scoped>
@import 'resources/scss/variables';

.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  padding: 16px 36px;
  background: rgba($gray, 0.8);
  backdrop-filter: blur(5px);
  box-shadow: 0 15px 10px rgba($black, 0.25);

  &-logo {
    margin-right: 16px;

    &__title {
      margin: 0;
    }
    &__subtitle {
      text-transform: uppercase;
      font-weight: 400 !important;
      letter-spacing: 10px;
      margin-bottom: 0;
    }
  }
  &-nav {
    height: inherit;
    display: flex;
    align-items: center;

    &__link {
      font-size: 20px;
      line-height: 28px;
      transition: all ease 300ms;
      padding: 20px 0;

      &:not(:last-child) {
        margin-right: 24px;
      }

      &:hover {
        padding: 24px;
        cursor: pointer;
      }

      &--active {
        color: $blue-accent;
      }
    }
  }
}
</style>
