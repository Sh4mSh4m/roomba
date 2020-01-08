<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field label="Name" type="text" :value="changeName" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-btn @click="createChange">Create change</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="basicFeatures"
            :items="availableFeatures"
            chips
            prepend-icon="mdi-heart"
            label="Global features selection"
            multiple
            outlined
            @change="refreshNodes"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(nodeSpec, indexNode) in nodesSpecs"
          :key="indexNode"
          cols="2"
        >
          <h2>{{ nodeSpec.node }}</h2>
          <div v-for="(item, index) in availableFeatures" :key="index">
            <v-checkbox
              v-model="nodeSpec.features"
              :label="item"
              :value="item"
            ></v-checkbox>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ChangeService from "@/services/ChangeService.js";

export default {
  data() {
    return {
      availableFeatures: ["authentication", "underlay", "vxlan"],
      basicFeatures: ["authentication", "underlay"],
      nodesSpecs: []
    };
  },
  created() {
    ChangeService.getNodes() // <-----
      .then(response => {
        var node;
        var nodesTmp = [];
        for (node of response.data) {
          nodesTmp.push({
            node: node,
            features: this.basicFeatures
          });
        }
        this.nodesSpecs = nodesTmp;
      });
  },
  computed: {
    changeName() {
      const d = new Date();
      const date = d
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
      const time = d
        .toTimeString()
        .slice(0, 5)
        .replace(/:/, "-");
      return "CHG" + "-" + date + "-" + time;
    },
    postBody() {
      return {
        fabric: 0,
        name: this.changeName,
        nodesSpecs: this.nodesSpecs
      };
    }
  },
  methods: {
    refreshNodes: function() {
      var nodeSpec;
      for (nodeSpec of this.nodesSpecs) {
        nodeSpec.features = this.basicFeatures;
      }
    },
    createChange: function() {
      ChangeService.createChange(this.postBody).then(response => {
        const newChangeId = response.data._id.$oid;
        this.$router.push({
          name: "change",
          params: { changeid: newChangeId }
        });
      });
    }
  }
};
</script>

<style></style>
