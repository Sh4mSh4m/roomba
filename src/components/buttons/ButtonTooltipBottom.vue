<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="primary" icon>
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltiptext }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: String,
    tooltiptext: String
  }
};
</script>

<style>
</style>