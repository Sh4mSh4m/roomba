<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field label="Name" type="text" :value="rName" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-select
            v-model="selectedItems"
            :items="menuItems"
            chips
            prepend-icon="mdi-heart"
            label="Global features selection"
            multiple
            outlined
            @change="refreshNodes"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <p>debug {{selectedItems}}</p>
          <p>debug {{ nodes }}</p>
          <div v-for="(node, indexNode) in nodes" :key="indexNode">
            <h2>{{ node.name }}</h2>
            <div v-for="(item, index) in menuItems" :key="index">
              <v-checkbox
                v-model="node.features"
                :label="item"
                :value="selectedItems.includes(item) ? item : null"
                @change="refNode(indexNode, index)"
              ></v-checkbox>
            </div>
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
      menuItems: ["Authentication", "Underlay", "VxLan"],
      selectedItems: ["Authentication", "Underlay"],
      nodes: []
    };
  },
  methods: {
    refNode(indexNode, index) {
      const feature = this.menuItems[index];
      var currentFeatures = this.nodes[indexNode].features;
      if (currentFeatures.includes(feature)) {
        currentFeatures.splice(currentFeatures.indexOf(feature), 1);
      } else {
        currentFeatures.push(feature);
      }
    },
    refreshNodes: function() {
      var node;
      console.log("here are the nodes: " + this.nodes);
      for (node of this.nodes) {
        console.log(node.features);
        node.features = this.selectedItems;
      }
    }
  },
  created() {
    ChangeService.getNodes() // <-----
      .then(response => {
        var node;
        var nodes = [];
        for (node of response.data) {
          nodes.push({
            name: node,
            features: this.selectedItems
          });
        }
        this.nodes = nodes;
      });
  },
  computed: {
    rName() {
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
  }
};
</script>

<style>
</style>