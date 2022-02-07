<template>
  <div class="layout-index">
    <Header />
    <a-row type="flex" justify="center">
      <transition name="fade">
        <a-col
          :xs="24"
          :sm="24"
          :md="16"
          :lg="18"
          :xl="24"
          v-show="$route.meta.keepAlive"
        >
          <Carousel />
        </a-col>
      </transition>
    </a-row>

    <a-row justify="center">
      <a-col :xs="0" :sm="0" :md="7" :lg="5" :xl="4" class="index-left">
        <RateAdmin
          v-show="
            $route.name == 'home' ||
            $route.name == 'collect' ||
            $route.name == 'message'
          "
        />
        <VisitAdmin
          v-show="
            $route.name == 'home' ||
            $route.name == 'collect' ||
            $route.name == 'message'
          "
        />
        <RateUser
          v-show="
            $route.name == 'article-user' ||
            $route.name == 'collect' ||
            $route.name == 'message'
          "
        />
        <VisitUser
          v-show="
            $route.name == 'article-user' ||
            $route.name == 'collect' ||
            $route.name == 'message'
          "
        />
      </a-col>

      <a-col :xs="24" :sm="24" :md="16" :lg="18" :xl="11" class="index-content">
        <Content />
      </a-col>

      <a-col :xs="0" :sm="0" :md="7" :lg="5" :xl="4" class="index-right">
        <Author />
        <Date />
        <TagAdmin
          v-show="
            $route.name == 'home' ||
            $route.name == 'collect' ||
            $route.name == 'message' ||
            $route.name == 'detailed-id'
          "
        />
        <TagUser
          v-show="
            $route.name == 'article-user' ||
            $route.name == 'collect' ||
            $route.name == 'message' ||
            $route.name == 'detailed-id'
          "
        />
        <SearchTitle
          v-show="$route.name == 'home' || $route.name == 'article-user'"
        />
        <SearchEditor v-show="$route.name == 'article-user'" />
        <SearchAdminTag v-show="$route.name == 'home'" />
        <SearchUserTag v-show="$route.name == 'article-user'" />
        <SearchRegion v-show="$route.name == 'home'" />
      </a-col>
    </a-row>
    <a-back-top />
    <Footer />
  </div>
</template>

<script>
import Header from "./header/index.vue";
import Content from "./content/index.vue";
import Footer from "./footer/index.vue";
import Carousel from "@/components/carousel/index.vue";
import RateAdmin from "@/components/rate-admin/index.vue";
import RateUser from "@/components/rate-user/index.vue";
import VisitAdmin from "@/components/visit-admin/index.vue";
import VisitUser from "@/components/visit-user/index.vue";
import Author from "@/components/author/index.vue";
import Date from "@/components/date/index.vue";
import TagAdmin from "@/components/tag-admin/index.vue";
import TagUser from "@/components/tag-user/index.vue";
import SearchTitle from "@/components/searchTitle/index.vue";
import SearchEditor from "@/components/searchEditor/index.vue";
import SearchAdminTag from "@/components/searchAdminTag/index.vue";
import SearchUserTag from "@/components/searchUserTag/index.vue";
import SearchRegion from "@/components/searchRegion/index.vue";

export default {
  components: {
    Header,
    Content,
    Footer,
    Carousel,
    RateAdmin,
    RateUser,
    VisitAdmin,
    VisitUser,
    Author,
    Date,
    TagAdmin,
    TagUser,
    SearchTitle,
    SearchEditor,
    SearchAdminTag,
    SearchUserTag,
    SearchRegion,
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f0f0f0;
}

.index-left {
  margin-top: 1rem;
  margin-right: 1rem;
}

.index-content {
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  margin-top: 1rem;
  margin-right: 1rem;
}

.index-right {
  margin-top: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
