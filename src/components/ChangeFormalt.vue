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
            label="Global features update selection"
            multiple
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12">
          <div v-for="(node, indexNode) in nodes" :key="indexNode">
            <v-checkbox v-model="nodesL" :label="node.name" :value="node.name"></v-checkbox>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <p>debug {{ nodes }}</p>
    <p>debug {{ nodesL }}</p>
    <p>debug {{ selectedItems }}</p>
  </v-form>
</template>

<script>
import ChangeService from "@/services/ChangeService.js";

export default {
  data() {
    return {
      menuItems: ["Authentication", "Underlay", "VxLan"],
      selectedItems: ["Authentication", "Underlay", "VxLan"],
      nodes: [],
      nodesL: []
      //nodes: [
      //  {
      //    name: "node A",
      //    included: true,
      //  },
      //  {
      //    name: "node B",
      //    included: true,
      //  }
      //]
    };
  },
  created() {
    ChangeService.getNodes() // <-----
      .then(response => {
        var node;
        var nodes = [];
        for (node of response.data) {
          nodes.push({ name: node, included: true });
        }
        this.nodes = nodes;
        this.nodesL = response.data; // <--- set the events data
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