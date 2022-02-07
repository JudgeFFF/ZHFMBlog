<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <router-link :to="{ name: 'workspace' }"> 首页 </router-link>
    </a-breadcrumb-item>
    <template
      v-for="(routeItem, rotueIndex) in $route.matched"
      :key="routeItem.name"
    >
      <a-breadcrumb-item>
        <span>{{ routeItem.meta.title }}</span>
        <template v-if="routeItem.children.length" #overlay>
          <a-menu :selectedKeys="[$route.matched[rotueIndex + 1]?.name]">
            <template v-for="childItem in routeItem.children">
              <a-menu-item v-if="!childItem.meta?.hidden" :key="childItem.name">
                <router-link
                  :to="{ name: childItem.name }"
                  custom
                  #="{ navigate }"
                >
                  <div @click="navigate">
                    {{ childItem.meta?.title }}
                  </div>
                </router-link>
              </a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script>
export default {};
</script>

<style></style>
