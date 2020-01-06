<template>
  <div>
    <v-app-bar color="green accent-4" app dark>
      <v-toolbar-title>Roomba</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :to="{name: 'home'}" text rounded>
        Home <v-icon>mdi-home-circle-outline</v-icon>
      </v-btn>

      <v-btn :to="{name: 'change', params: { changeid: '5e0e24e34b730926bd1982b8' }}" text rounded>
        Change#1
        <v-icon>mdi-file-move-outline</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <!-- Future nav list
        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
        -->
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>