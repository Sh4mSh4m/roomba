<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <ChangeMainCard :change="change" @sync-change="refresh" />
        </v-col>
        <v-col cols="6">
          <Poller @sync-change="refresh" />
        </v-col>
      </v-row>
      <v-radio-group v-model="c_display" row>
        <v-radio name="c_diplay" label="Command lines" value="CMD"></v-radio>
        <v-radio name="c_diplay" label="Change buffer" value="CHANGE"></v-radio>
        <v-radio
          name="c_diplay"
          label="Rollback buffer"
          value="ROLLBACK"
        ></v-radio>
      </v-radio-group>
      <v-row v-for="(configlets, node) in configletsPerNode" :key="node">
        <v-col>
          <v-card>
            <v-card-title>{{ node }}</v-card-title>
            <v-row>
              <v-col
                cols="4"
                v-for="(configlet, index) in configlets"
                :key="index"
              >
                <ConfigletCard
                  :configlet="configlet"
                  :c_display="c_display"
                  :index="index"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ChangeService from "@/services/ChangeService.js";
import ChangeMainCard from "@/components/ChangeMainCard.vue";
import ConfigletCard from "@/components/ChangeConfigletCard.vue";
import Poller from "@/components/Poller.vue";
import _ from "lodash";

export default {
  props: ["changeid"],
  data() {
    return {
      change: {},
      c_display: "CMD"
    };
  },
  components: {
    ChangeMainCard,
    ConfigletCard,
    Poller
  },
  created() {
    ChangeService.getChange(this.changeid).then(response => {
      this.change = response.data;
    });
  },
  mounted() {
    ChangeService.computeChange(this.changeid).then(response => {
      this.change = response.data;
    });
  },
  computed: {
    configletsPerNode() {
      return _.groupBy(this.change.configlets, "node");
    }
  },
  methods: {
    log() {
      //console.log("yeahhh");
    },
    refresh() {
      console.log("refreshing wesh");
      ChangeService.getChange(this.changeid) // <-----
        .then(response => {
          this.change = response.data; // <--- set the events data
        });
    }
  }
};
</script>

<style></style>
