<template>
  <div>
    <h1>This is the change page for change #{{ changeid }}</h1>
    <v-container>
      <v-row>
        <v-col cols="4">
          <ChangeMainCard />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChangeMainCard from "@/components/ChangeMainCard.vue";

export default {
  components: {
    ChangeMainCard
  },
  props: ["changeid"]
};
</script>

<style>
</style>