<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <ChangeMainCard :change="change" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div v-for="(configlet, index) in change.configlets" :key="index">
            <ConfigletCard :configlet="configlet" :index="index" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChangeService from "@/services/ChangeService.js";
import ChangeMainCard from "@/components/ChangeMainCard.vue";
import ConfigletCard from "@/components/ChangeConfigletCard.vue";

export default {
  data() {
    return {
      change: {}
    };
  },
  components: {
    ChangeMainCard,
    ConfigletCard
  },
  props: ["changeid"],
  created() {
    ChangeService.getChange(this.changeid) // <-----
      .then(response => {
        this.change = response.data; // <--- set the events data
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>

<style>
</style>