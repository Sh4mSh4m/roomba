<template>
  <v-card class="ml-2 mb-2 mr-1">
    <v-card-title>#{{ index + 1 }} set for {{ configlet.feature }}</v-card-title>
    <v-card-subtitle>{{ configlet.context }}</v-card-subtitle>
    <v-card-text v-if="c_display === 'CMD'">
      <ul>
        <li v-for="(line,index) in configlet.cmd_lines" :key="index">{{ line }}</li>
      </ul>
    </v-card-text>
    <v-card-text v-if="c_display === 'CHANGE'">
      <ul>
        <li v-for="(line,index) in configlet.change_buffer" :key="index">{{ line }}</li>
      </ul>
    </v-card-text>
    <v-card-text v-if="c_display === 'ROLLBACK'">
      <ul>
        <li v-for="(line,index) in configlet.rollback_buffer" :key="index">{{ line }}</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    index: Number,
    configlet: {
      type: Object
    },
    c_display: String
  },
  methods: {
    belong: function(node, configlet) {
      return node.filter(function(node) {
        return node === configlet.node;
      });
    }
  }
};
</script>

<style>
</style>