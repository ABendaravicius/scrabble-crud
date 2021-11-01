<template>
  <div>
    <div class="profile" v-if="!loading">
      <div class="profile-details">
        <div class="profile-details__avatar">
          {{ initials }}
        </div>
        <div class="profile-details__info">
          <h1>{{ member?.name }}</h1>
          <div class="profile-details__contact-info">
            <h5><span>UserID:</span>{{ member?.id }}</h5>
            <h5><span>Email:</span>{{ member?.email }}</h5>
            <h5><span>Phone:</span>{{ member?.phone }}</h5>
            <h5><span>Member since:</span>{{ member?.joined_at }}</h5>
          </div>
        </div>
      </div>
      <div class="profile-stats">
        <div class="profile-stats__card">
          <div class="profile-stats__card-info">
            <h2><span>Win:</span>{{ matches?.wins }}</h2>
          </div>
        </div>

        <div class="profile-stats__card">
          <div class="profile-stats__card-info">
            <h2><span>Lose:</span>{{ matches?.losses }}</h2>
          </div>
        </div>

        <div class="profile-stats__card">
          <div class="profile-stats__card-info">
            <h2><span class="smaller-details">Average score:</span>{{ matches.averageScore }}</h2>
          </div>
        </div>

        <div class="profile-stats__card">
          <div class="profile-stats__card-info">
            <h3>Highest score:<span>{{ matches?.bestScore }}</span></h3>
            <p>{{ matches?.bestDate }} @ {{ matches?.bestLocation }}</p>
            <p>VS <strong>{{ matches?.bestVs?.name }}</strong></p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loader-wrapper">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  name: "MemberProfile",
  setup() {
    const route = computed(() => useRoute());
    const store = useStore();
    const loading = computed(() => store.loading);

    const { id } = route.value.params;
    const matches = ref('');
    const member = ref('');
    const initials = computed(() => {
      let name = member.value?.name?.split(' ');
      if (name) return name[0][0]+'.'+name[1][0];
    });

    onMounted(async() => {
      member.value = await store.fetchMemberById(parseInt(id));
      matches.value = await store.fetchMatchesById(parseInt(id));
    });

    return {
      id,
      member,
      loading,
      initials,
      matches
    }
  }
});
</script>

<style lang="scss" scoped>
  @import 'resources/scss/variables';
  @import 'resources/scss/mixins';

  .profile {
    padding-top: 32px;

    &-details {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      margin-bottom: 48px;

      h1 {
        margin: 0;
      }

      &__avatar {
        width: fit-content;
        font-size: 48px;
        font-weight: 900;
        background: $blue-dark;
        padding: 24px;
        border-radius: 12px;
        margin-right: 24px;
      }

      &__info {

      }

      &__contact-info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;

        h5 {
          font-weight: 400;

          &:not(:last-child) {
            margin-right: 24px;
          }

          span {
            display: inline-block;
            margin-right: 8px;
            text-transform: uppercase;
          }
        }
      }
    }

    &-stats {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      column-gap: 16px;
      row-gap: 16px;

      &__card {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        flex: 1 1;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid $blue-accent;
        background: rgba($black, 0.5);

        @include media-breakpoint-down(md) {
          width: 50%;
        }

        &-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          h2 {
            display: flex;
            align-items: center;
            font-size: 60px;
            margin: 0;
            text-transform: uppercase;

            span {
              display: inline-block;
              margin-right: 16px;
              font-size: 48px;

              &.smaller-details {
                width: 50%;
                font-size: 24px;

              }
            }
          }

          h3 {
            text-transform: uppercase;
            font-size: 18px;
            text-align: left;
            font-weight: 400;
            margin: 0;

            span {
              display: inline-block;
              margin-left: 24px;
              font-size: 32px;
              font-weight: 600;
            }
          }

          p {
            margin-top: 16px;
          }
        }
      }
    }
  }
</style>
