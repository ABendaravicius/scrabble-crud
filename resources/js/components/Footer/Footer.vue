<template>
  <section class="footer">
    <div class="footer-details">
      <h5>made by</h5>
      <h4>Arnas Bendaravicius</h4>
    </div>
  </section>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
@import 'resources/scss/variables';

.footer {
  width: 100%;
  padding: 32px 24px 16px;
  display: flex;
  justify-content: center;
  box-shadow: 0 -15px 10px rgba($black, 0.25);

  &-details {
    text-align: center;

    h4 {
      text-transform: uppercase;
    }
    h5 {
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 0;
      font-weight: 400 !important;
      letter-spacing: 10px;
      margin-bottom: 0;
    }
  }
}
</style>
