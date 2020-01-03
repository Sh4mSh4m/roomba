<template>
  <div class="home">
    <Carousel />
    <Poller />
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/Carousel.vue";
import Poller from "@/components/Poller.vue";

export default {
  name: "home",
  components: {
    Carousel,
    Poller
  }
};
</script>
