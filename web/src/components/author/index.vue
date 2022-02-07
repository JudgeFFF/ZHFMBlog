<template>
  <div class="author-div">
    <div class="author-avatar">
      <a-avatar
        :size="120"
        src="http://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2021%2F0912%2Fca1855adj00qza34d000qc000hs00clc.jpg&thumbnail=650x2147483647&quality=80&type=jpg"
      />
      <!-- <a-avatar >JudgeF</a-avatar> -->
    </div>
    <div class="author-introduction">
      JudgeF
      <div class="tag-introduction">
        <a-tag color="pink" style="margin: 0.25rem">Web前端</a-tag>
        <a-tag color="cyan" style="margin: 0.25rem">大四Coder</a-tag>
        <a-tag color="blue" style="margin: 0.25rem">珠海</a-tag>
        <a-tag color="black" style="margin: 0.25rem">健身</a-tag>
        <a-tag color="orange" style="margin: 0.25rem">游戏狗</a-tag>
        <a-tag color="purple" style="margin: 0.25rem">儒雅随和</a-tag>
        <a-tag color="orange" style="margin: 0.25rem">朝九晚五</a-tag>
      </div>
      <a-divider>社交账号</a-divider>
      <a-tooltip>
        <template #title>Weibo</template>
        <icon-font type="icon-xinlangweibo" style="font-size: 20px" />
      </a-tooltip>
      <a-tooltip>
        <template #title>Gitee</template>
        <icon-font type="icon-gitee2" style="font-size: 20px; margin: 0 1rem" />
      </a-tooltip>
      <a-tooltip>
        <template #title>Github</template>
        <icon-font type="icon-github" style="font-size: 20px" />
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { IconFont } from "@/utils/showIconFont";

export default {
  components: {
    IconFont,
  },
  setup() {
    const username = localStorage.username;

    return {
      username,
    };
  },
};
</script>

<style lang="scss" scoped>
.author-div {
  text-align: center;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: #fff;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #eee;

  .author-avatar {
    margin-bottom: 1rem;
  }

  .author-introduction {
    font-size: 1rem;
    color: #999;

    .tag-introduction {
      text-align: center;
      margin-top: 0.5rem;
    }
  }
}
</style>
