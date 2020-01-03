<template>
  <v-card>
    <v-card-title>Configlet {{ index + 1 }} for {{ configlet.node }}</v-card-title>
    <v-card-subtitle>{{ configlet.context }}</v-card-subtitle>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4">
            <ul>
              <li v-for="(line,index) in configlet.cmd_lines" :key="index">{{ line }}</li>
            </ul>
          </v-col>
          <v-col cols="4">{{ configlet.change_buffer }}</v-col>
          <v-col cols="4">{{ configlet.rollback_buffer }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    index: Number,
    configlet: {
      type: Object
    }
  }
};
</script>

<style>
</style>