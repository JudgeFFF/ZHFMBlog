<template>
  <div class="carousel-div">
    <video-background
      src="http://res.xindalu.xyz/0121/1118/Show.mp4"
      style="width: 100%; height: 925px"
    >
      <DownOutlined class="backBottom" @click="handleSubmit" />
    </video-background>
  </div>
</template>

<script>
import { DownOutlined } from "@ant-design/icons-vue";

export default {
  components: { DownOutlined },
  setup() {
    const handleSubmit = () => {
      window.scrollTo({
        top: 925,
        behavior: "smooth",
      });
    };

    return { handleSubmit };
  },
};
</script>

<style lang="scss" scoped>
.carousel-div {
  width: 99vw;
  height: 95vh;
  position: relative;
}

.backBottom {
  color: #1e90ff;
  font-size: 70px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
}
</style>
