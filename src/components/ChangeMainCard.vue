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

      <div @click="emits">
        <BtnTooltipBottom icon="mdi-refresh" tooltiptext="Refresh change" />
      </div>

      <div @click="qual">
        <BtnTooltipBottom 
          icon="mdi-forklift" 
          tooltiptext="Prepare qualification environment"/>
      </div>

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
      console.log('hit refresh')
      this.$emit('sync-change');
    },
    qual() {
      console.log('hit setup-qual')
      this.$emit('setup-qual')
    }
  }
};
</script>

<style>
</style>
