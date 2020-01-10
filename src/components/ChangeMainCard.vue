<template>
  <v-card>
    <v-card-title># {{ change._id.$oid }}</v-card-title>
    <v-card-subtitle>
      <ul>
        <li>Change status: {{ change.status }}</li>
        <li>qual env status: {{ change.qual_status }}</li>
        <li v-if="hasQualfabricId">qualfabric_id: {{ change.qualfabric_id }}
        </li>
      </ul>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>

      <div @click="refresh">
        <BtnTooltipBottom icon="mdi-refresh" tooltiptext="Refresh change" />
      </div>

      <div @click="evalQual">
        <BtnTooltipBottom icon="mdi-tank" tooltiptext="Eval Qual env status" />
      </div>

      <div @click="setupQual">
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
    containsKey(obj, key) {
      return Object.keys(obj).includes(key);
    },
    refresh() {
      console.log('hit refresh')
      this.$emit('sync-change');
    },
    evalQual() {
      console.log('hit eval-qual')
      this.$emit('eval-qual')
    },
    setupQual() {
      console.log('hit setup-qual')
      this.$emit('setup-qual')
    }
  },
  computed: {
    hasQualfabricId() {
      return this.containsKey(this.change, 'qualfabric_id')
    }
  }
};
</script>

<style>
</style>
