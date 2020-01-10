<template>
  <div>
    <v-snackbar
      v-model="notification.snackbar"
      :bottom="notification.y === 'bottom'"
      :color="notification.color"
      :left="notification.x === 'left'"
      :multi-line="notification.mode === 'multi-line'"
      :right="notification.x === 'right'"
      :timeout="notification.timeout"
      :top="notification.y === 'top'"
      :vertical="notification.mode === 'vertical'"
    >
      {{ notification.text }}
      <v-btn
        dark
        text
        @click="notification.snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-container>
      <v-row>
        <v-col cols="6">
          <ChangeMainCard 
            :change="change" 
            @sync-change="refresh"
            @setup-qual="setupQual"
            @eval-qual="evalQual"
           />
        </v-col>
        <v-col cols="6">
          <ChangeQualCard v-if="hasQualfabricId" :qualfabric="qualfabric"/>
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
    <Poller @sync-change="refreshMsg" :changeid="changeid"/>
  </div>
</template>

<script>
import ChangeService from "@/services/ChangeService.js";
import ChangeMainCard from "@/components/ChangeMainCard.vue";
import ChangeQualCard from "@/components/ChangeQualCard.vue";
import ConfigletCard from "@/components/ChangeConfigletCard.vue";
import Poller from "@/components/Poller.vue";
import _ from "lodash";

export default {
  props: ["changeid"],
  data() {
    return {
      notification: {
        color: '',
        mode: '',
        snackbar: false,
        text: 'Hello, I\'m a snackbar',
        timeout: 4000,
        x: 'right',
        y: 'top',
      },
      change: {},
      qualfabric: {},
      c_display: "CMD"
    };
  },
  components: {
    ChangeMainCard,
    ChangeQualCard,
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
    },
    hasQualfabricId() {
      return this.containsKey(this.change, 'qualfabric_id')
    }
  },
  methods: {
    containsKey(obj, key) {
      return Object.keys(obj).includes(key);
    },
    log() {
      //console.log("yeahhh");
    },
    refresh() {
      console.log("refreshing wesh");
      this.fetchChange(this.changeid);
      this.fetchQualfabric(this.change.qualfabric_id);
      this.notification.snackbar = true;
    },
    refreshMsg(message) {
      if (message.type == "refresh"){
        this.fetchChange(this.changeid);
        this.fetchQualfabric(this.change.qualfabric_id);
        this.notification.snackbar = true;
        this.notification.text = message.snack_msg;
      }
      else {
        console.log("websocket message unknown")
      }
    },
    fetchChange(id) {
      ChangeService.getChange(id)
        .then(response => {
          this.change = response.data;
        });
    },
    fetchQualfabric(id) {
      ChangeService.getQualfabric(id)
        .then(response => {
          this.qualfabric = response.data;
        });
    },
    evalQual() {
      console.log("go for qual eval");
      ChangeService.evalQualForChange(this.changeid)
        .then(response => {
          this.change = response.data;
        });
    },
    setupQual() {
      console.log("go for qual setup");
      ChangeService.sendToQualChange(this.changeid)
        .then(response => {
          this.change = response.data;
        });
    }
  },
  watch: {
    change: function() {
      if (this.hasQualfabricId) {
        this.fetchQualfabric(this.change.qualfabric_id)
      }
    }
  }
};
</script>

<style></style>
