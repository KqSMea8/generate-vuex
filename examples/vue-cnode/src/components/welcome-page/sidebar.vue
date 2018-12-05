<template>
  <v-sidebar :avatarUrl="avatarUrl">
  </v-sidebar>
</template>

<script>
// import VSidebar from "@/v-components/v-sidebar";
import { getNickname } from "@/apis";
import { mapActions } from "vuex";

export default {
  name: "Sidebar",
  data: () => ({
    avatarUrl: ""
  }),
  components: {
    // VSidebar
  },
  methods: {
    ...mapActions({
      setNickname: "userInfo/setNickname_perform"
    })
  },
  created() {
    getNickname().then(nickname => {
      // 测试环境拿不到nickname, nickname 默认
      if (!nickname) {
        nickname = "mrjzhang";
      }
      this.setNickname(nickname);
      this.avatarUrl = `//tapd.oa.com/0/users/avatar/${nickname}/jpg/0/`;
    });
  }
};
</script>
