<template>
  <v-app>
    <AppNavBar />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppNavBar from "@/components/AppNavBar.vue";

export default {
  name: "App",

  components: {
    AppNavBar
  },

  data: () => ({
    //
  })
};
</script>
