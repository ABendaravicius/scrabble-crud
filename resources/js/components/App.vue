<template>
  <div>
    <Header/>
    <section class="container">
      <router-view v-if="!loading"></router-view>
    </section>
    <Footer/>
  </div>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "../../store";
import Header from "@/js/components/Header/Header.vue";
import Footer from "@/js/components/Footer/Footer.vue";

export default defineComponent ({
  name: "App",
  components: {
    Header,
    Footer
  },
  setup() {
    const store = useStore();
    const loading = (store.loading);

    onMounted(
      () => store.fetchData()
    );

    return {
      loading
    }
  },
});
</script>

<style scoped>

</style>
