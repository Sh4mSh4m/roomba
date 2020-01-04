<template>
  <h1>Test</h1>
</template>

<script>
//webs.onmessage = function(event) {
//  console.log(event.data);
//};
export default {
  data() {
    return {
      message: {
        action: "register",
        change_id: "1",
        source: "client"
      }
    };
  },
  methods: {
    emits() {
      this.$emit("sync-change");
    },
    connect() {
      this.socket = new WebSocket("ws://localhost:8765");
      this.socket.onopen = () => this.socket.send(JSON.stringify(this.message));
      this.socket.onmessage = () => this.emits();
    }
  },
  created() {
    this.connect();
  }
};
</script>


<style>
</style>