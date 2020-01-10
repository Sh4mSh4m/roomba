<template>
  <h1>Test</h1>
</template>

<script>
export default {
  props: {
    changeid: String,
  },
  data() {
    return {
      imessage: {
        action: "register",
        change_id: this.changeid,
        source: "client",
        data: "none"
      }
    };
  },
  methods: {
    emits(message) {
      this.$emit("sync-change", message);
    },
    connect() {
      console.log("Connected to websocket server")
      let socket = new WebSocket("ws://localhost:8765");
      socket.onopen = () => socket.send(JSON.stringify(this.imessage));
      socket.onmessage = (e) => {
        let message = JSON.parse(e.data)
        console.log("SENDING: " + message)
        this.emits(message);
      };
    }
  },
  created() {
    this.connect();
  }
};
</script>

<style></style>
