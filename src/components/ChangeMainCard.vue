<template>
  <v-card>
    <v-card-title>Change#id</v-card-title>
    <v-card-subtitle>
      <ul>
        <li>status: clear</li>
        <li>qual env status: ready</li>
      </ul>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>

      <BtnTooltipBottom icon="mdi-forklift" tooltiptext="Prepare qualification environment" />

      <BtnTooltipBottom
        icon="mdi-checkbox-multiple-marked-circle-outline"
        tooltiptext="Check running conf in qual env"
      />

      <BtnTooltipBottom icon="mdi-heart" tooltiptext="test" />
    </v-card-actions>
  </v-card>
</template>

<script>
import BtnTooltipBottom from "@/components/buttons/ButtonTooltipBottom.vue";

export default {
  components: {
    BtnTooltipBottom
  }
};
</script>

<style>
</style>
