<template>
  <v-card>
    <v-card-title># {{ change._id.$oid }}</v-card-title>
    <v-card-subtitle>
      <ul>
        <li>status: {{ change.status }}</li>
        <li>qual env status: {{ change.qual_status }}</li>
      </ul>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>

      <BtnTooltipBottom icon="mdi-refresh" tooltiptext="Refresh change" @click="emits"/>

      <BtnTooltipBottom icon="mdi-forklift" tooltiptext="Prepare qualification environment" @click="emits"/>

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
  props: {
    change: {
      type: Object
    }
  },
  components: {
    BtnTooltipBottom
  },
  methods: {
    emits() {
      this.$emit("sync-change");
    },
  }
};
</script>

<style>
</style>
