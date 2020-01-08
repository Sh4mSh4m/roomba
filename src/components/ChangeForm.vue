<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field label="Name" type="text" :value="changeName" />
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
        <v-col v-for="(node, indexNode) in nodes" :key="indexNode" cols="2">
            <h2>{{ node.name }}</h2>
            <div v-for="(item, index) in availableFeatures" :key="index">
              <v-checkbox v-model="node.features" :label="item" :value="item"></v-checkbox>
            </div>
        </v-col>
      </v-row>
    </v-container>
    <p>debug {{basicFeatures}}</p>
    <p>debug {{ nodes }}</p>
  </v-form>
</template>

<script>
import ChangeService from "@/services/ChangeService.js";

export default {
  data() {
    return {
      availableFeatures: ["Authentication", "Underlay", "VxLan"],
      basicFeatures: ["Authentication", "Underlay"],
      nodes: []
    };
  },
  created() {
    ChangeService.getNodes() // <-----
      .then(response => {
        var node;
        var nodesTmp = [];
        for (node of response.data) {
          nodesTmp.push({
            name: node,
            features: this.basicFeatures
          });
        }
        this.nodes = nodesTmp;
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
    }
  },
  methods: {
    refreshNodes: function() {
      var node;
      console.log("here are the nodes: " + this.nodes);
      for (node of this.nodes) {
        console.log(node.features);
        node.features = this.basicFeatures;
      }
    }
  }
};
</script>

<style>
</style>