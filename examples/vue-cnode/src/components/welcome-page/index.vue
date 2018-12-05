<template>
  <v-container>
    <sidebar></sidebar>
    <el-main>
      <v-link-card v-for="(menu,index) in menus" :key="index" :url="menu.url" :idx="index">{{menu.name}}</v-link-card>
      <v-link-card url="/" :idx="5">
        <div @click="tip">coming soon...</div>
      </v-link-card>
    </el-main>
  </v-container>
</template>

<script>
// import VLinkCard from "@/v-components/v-link-card";
// import VContainer from "@/v-components/v-container";
import Sidebar from "./sidebar";
import { menus } from "./menu.js";
export default {
  name: "WelcomePage",
  data() {
    return {
      menus
    };
  },
  components: {
    // VContainer,
    // VLinkCard,
    Sidebar
  },
  head: {
    title: {
      inner: "index"
    }
  },
  methods: {
    tip() {
      this.$message("敬请期待");
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
