import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:5004/api`,
  //baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  createChange(body) {
    return apiClient.post("/changes", {
      body
    });
  },
  getChanges() {
    return apiClient.get("/changes");
  },
  getChange(id) {
    return apiClient.get("/change/" + id);
  },
  computeChange(id) {
    return apiClient.put("/change/" + id, {
      action: "compute"
    });
  },
  evalQualForChange(id) {
    return apiClient.get("/change/" + id +'/qualfabric');
  },
  sendToQualChange(id) {
    return apiClient.put("/change/" + id, {
      action: "setup_qual"
    });
  },
  getQualfabric(id) {
    return apiClient.get("/qualfabric/" + id)
  },
  getNodes() {
    return apiClient.get("/nodes");
  }
};
