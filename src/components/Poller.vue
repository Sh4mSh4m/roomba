<template>
  <h1>Test</h1>
</template>

<script>
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
      let socket = new WebSocket("ws://localhost:8765");
      socket.onopen = () => socket.send(JSON.stringify(this.message));
      socket.onmessage = () => {
        this.emits();
      };
    }
  },
  created() {
    this.connect();
  }
};
</script>

<style></style>
