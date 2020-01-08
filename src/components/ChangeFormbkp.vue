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
          ></v-select>
        </v-col>
        <v-col cols="12">
          <p>debug {{selectedItems}}</p>
          <p>debug {{ nodes }}</p>
          <div v-for="(node, indexNode) in nodes" :key="indexNode">
            <h2>{{ node.name }}</h2>
            <div v-for="(item, index) in menuItems" :key="index">
              <v-checkbox
                v-model="node.features[index]"
                :label="item"
                :value="selectedItems.includes(item) ? item : null"
                :true-value="item"
                :false-value="null"
              ></v-checkbox>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      menuItems: ["Authentication", "Underlay", "VxLan"],
      selectedItems: ["Authentication", "Underlay"]
    };
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
    },
    nodes() {
      var defFeatures = [];
      var feature;
      for (feature of this.menuItems) {
        this.selectedItems.includes(feature) ? defFeatures.push(feature) : null;
      }
      return [
        {
          fabric: 0,
          node: "node A",
          features: defFeatures
        },
        {
          fabric: 0,
          node: "node B",
          features: defFeatures
        }
      ];
    },
  }
};
</script>

<style>
</style>