<template>
  <div class="message-div">
    <div class="breadcrumb">
      <Breadcrumb />
    </div>

    <div class="message-icon">
      <span>
        <icon-font type="icon-200yonghu_yonghu" style="margin-right: 0.5rem" />
        作者&nbsp;&nbsp;JudgeF
        <a-divider type="vertical" />
        <icon-font type="icon-riqi" style="margin-right: 0.5rem" />
        日期&nbsp;&nbsp;2021-11-01
      </span>
    </div>

    <div class="message-text">
      <h2>欢迎在此留下您的宝贵意见和建议！</h2>
    </div>

    <a-comment>
      <template #content>
        <a-form-item>
          <a-textarea
            placeholder="请登录后再留言，文明发言并请保持 50 字数以内，该留言暂不支持回复"
            :disabled="disabled"
            :rows="5"
            :value="message"
            @change="changeMessage"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            @click="addMessage"
          >
            提交留言
          </a-button>
        </a-form-item>
      </template>
    </a-comment>

    <a-list
      v-if="messageListData.length > 0"
      :pagination="pagination"
      :data-source="messageListData"
      :header="`${messageListData.length} 条留言`"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment :author="item.user.username">
            <template #avatar>
              <a-avatar>{{ item.user.username }}</a-avatar>
            </template>
            <template #content>
              <p>
                {{ item.mContent }}
              </p>
            </template>
            <template #datetime>
              <span>
                {{ moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
              </span>
            </template>
          </a-comment>
        </a-list-item>
      </template>
    </a-list>

    <div class="layout-loading" v-else-if="!spinning">
      <a-empty description="留言获取失败，请检查服务端是否开启" />
    </div>

    <div class="layout-loading" v-else>
      <a-spin tip="数据加载中，请稍后..." :spinning="spinning" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import { IconFont } from "@/utils/showIconFont";
import moment from "moment";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import filterWord from "@/utils/filterWord";

export default {
  components: {
    IconFont,
    Breadcrumb,
  },
  setup() {
    const store = useStore();
    const messageState = reactive({
      spinning: true,
      loading: false,
      disabled: true,
      value: 3,
      message: "",
      messageListData: [],
      pagination: {
        pageSize: 5,
      },
    });

    window.scrollTo({
      top: 0,
    });

    if (localStorage.elementTokenWeb) {
      messageState.disabled = false;
    }

    store
      .dispatch("message/getMessageList")
      .then((res) => {
        if (res) {
          messageState.messageListData = res;
        } else {
          messageState.disabled = true;
        }
      })
      .finally(() => {
        messageState.spinning = false;
      });

    const addMessage = () => {
      if (messageState.message.trim() == "") {
        return message.warning("该留言为空，请重新输入");
      } else if (messageState.message.trim().length < 5) {
        return message.warning("该留言最低字数 5 以内，请重新输入");
      } else if (messageState.message.trim().length >= 50) {
        return message.warning("该留言限制字数 50 以内，请重新输入");
      }

      messageState.loading = true;
      setTimeout(async () => {
        messageState.loading = false;
        const messageInfo = {
          mContent: filterWord(messageState.message),
        };

        await store.dispatch("message/addMessage", messageInfo).then((res) => {
          if (res) {
            store.commit("routes/SET_ROUTERACTIVE");
            setTimeout(() => {
              store.commit("routes/SET_ROUTERACTIVE");
            }, 500);
          }
        });

        messageState.message = "";
      }, 500);
    };

    const changeMessage = (e) => {
      messageState.message = e.target.value;
    };

    return {
      ...toRefs(messageState),
      moment,
      addMessage,
      changeMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  background-color: #e1f0ff;
  border: 1px solid #eee;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.message-icon {
  color: #aaa;
  padding: 0.5rem;
  text-align: left;
}

.message-text {
  padding-left: 0.5rem;
  text-align: left;
}

.layout-loading {
  width: 100%;
  height: 100%;
  padding-top: 15vh;
  text-align: center;
  background-color: transparent;
}
</style>
