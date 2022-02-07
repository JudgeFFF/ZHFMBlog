<template>
  <div class="edit-div">
    <a-spin tip="数据请求中，请稍后..." :spinning="spinning">
      <a-row :gutter="50">
        <a-col :span="18">
          <a-input
            placeholder="请输入文章标题"
            v-model:value.lazy="title"
            @change="changeTitle"
            allowClear
          />
        </a-col>
        <a-col :span="3">
          <a-button
            type="primary"
            @click="toArticleList"
            style="width: 145px"
            ghost
          >
            返回文章列表
          </a-button>
        </a-col>
        <a-col :span="3">
          <a-button type="primary" @click="handleSubmit" style="width: 145px">
            发布文章
          </a-button>
        </a-col>
      </a-row>
      <br />
      <a-row :gutter="50">
        <a-col :span="6">
          <a-row>
            <a-col>
              <a-input v-model:value.lazy="id" disabled style="width: 370px" />
              <br />
            </a-col>
            <a-col>
              <br />
              <a-select
                v-if="id"
                :disabled="disabled"
                v-model:value.lazy="region"
                placeholder="请选择地区类型"
                @change="changeRegion"
                style="width: 370px"
              >
                <a-select-option v-for="item in regionListData" :key="item._id">
                  {{ item.rName }}
                </a-select-option>
              </a-select>
              <a-select
                v-else
                :disabled="disabled"
                placeholder="请选择地区类型"
                @change="changeRegion"
                style="width: 370px"
              >
                <a-select-option v-for="item in regionListData" :key="item._id">
                  {{ item.rName }}
                </a-select-option>
              </a-select>
              <br />
            </a-col>
            <a-col>
              <br />
              <a-select
                v-model:value.lazy="tagListData"
                mode="multiple"
                placeholder="请选择文章标签"
                @change="changeTag"
                allowClear
                style="width: 370px"
              >
                <a-select-option v-for="item in tagAUListData" :key="item._id">
                  <a-tag :color="item.color">
                    {{ item.tName }}
                  </a-tag>
                </a-select-option>
              </a-select>
            </a-col>
            <a-col>
              <br />
              <!-- <a-upload
                list-type="picture-card"
                v-model:file-list="fileList"
                :before-upload="beforeUpload"
                @change="handleChange"
                @preview="handlePreview"
                class="avatar-uploader"
              >
                <div v-if="fileList.length < 1 && !cover">
                  <plus-outlined />
                  <div class="ant-upload-text">点击上传文章封面</div>
                  <div class="ant-upload-text">
                    请确认预览文章封面无误再发布文章
                  </div>
                </div>
                <div v-else>
                  <plus-outlined />
                  <div class="ant-upload-text">点击上传文章封面</div>
                  <div class="ant-upload-text">
                    已存在文章封面，如需更改请点击上传
                  </div>
                </div>
              </a-upload>
              <a-modal :visible="visible" :footer="null" @cancel="handleCancel">
                <img width="450" :src="cover" />
              </a-modal> -->
              <a-upload
                v-model:file-list="fileList"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img
                  v-if="cover"
                  :src="cover"
                  alt="picture-card"
                  width="300"
                  height="180"
                />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">点击上传文章封面</div>
                </div>
              </a-upload>
            </a-col>
          </a-row>
        </a-col>

        <a-col :span="18">
          <v-md-editor
            placeholder="请输入文章介绍"
            v-model.lazy="introduce"
            @change="changeIntroduce"
            height="370px"
          />
        </a-col>
      </a-row>
      <br />
      <a-row>
        <a-col :span="24">
          <v-md-editor
            placeholder="请输入文章内容"
            v-model.lazy="content"
            @change="changeContent"
            height="1100px"
          />
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
import { reactive, toRefs, createVNode } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import filterWord from "@/utils/filterWord";

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => resolve(reader.result);

//     reader.onerror = (error) => reject(error);
//   });
// }

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  components: {
    PlusOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const formState = reactive({
      loading: false,
      disabled: false,
      visible: false,
      spinning: false,
      id: "",
      isAdmin: "",
      isAdminLoc: "",
      title: "",
      region: "",
      cover: "",
      introduce: "",
      content: "",
      fileList: [],
      articleListData: [],
      regionListData: [],
      tagListData: [],
      tagAUListData: [],
    });

    formState.spinning = true;

    formState.id = route.params.id;

    formState.isAdmin = route.params.isAdmin;

    formState.isAdminLoc = localStorage.isAdmin;

    if (route.params.id) {
      if (formState.isAdmin > 0) {
        store
          .dispatch("articleAdmin/getArticleAdminById", route.params.id)
          .then((res) => {
            formState.id = res._id;
            formState.title = res.title;
            formState.region = res.region;
            for (const item of res.tag) {
              formState.tagListData.push(item._id);
            }
            formState.cover = res.cover;
            formState.introduce = res.introduce;
            formState.content = res.content;
          })
          .finally(() => {
            formState.spinning = false;
          });
      } else {
        store
          .dispatch("articleUser/getArticleUserById", route.params.id)
          .then((res) => {
            formState.id = res._id;
            formState.title = res.title;
            for (const item of res.tag) {
              formState.tagListData.push(item._id);
            }
            formState.cover = res.cover;
            formState.introduce = res.introduce;
            formState.content = res.content;
          })
          .finally(() => {
            formState.spinning = false;
          });
      }
    }

    store.dispatch("region/getRegionList").then((res) => {
      formState.regionListData = res;
    });

    if (formState.isAdminLoc > 0) {
      store
        .dispatch("tagAdmin/getTagAdminList")
        .then((res) => {
          formState.tagAUListData = res;
        })
        .finally(() => {
          formState.spinning = false;
        });
    } else {
      formState.disabled = true;
      store
        .dispatch("tagUser/getTagUserList")
        .then((res) => {
          formState.tagAUListData = res;
        })
        .finally(() => {
          formState.spinning = false;
        });
    }

    const handleSubmit = () => {
      if (!formState.title) {
        message.warning("文章标题不能为空");
        return false;
      } else if (!formState.region && formState.isAdminLoc > 0) {
        message.warning("必须选择文章地区");
        return false;
      } else if (!formState.tagListData.length > 0) {
        message.warning("必须选择文章标签");
        return false;
      } else if (!formState.fileList.length > 0 && !route.params.id) {
        message.warning("文章封面不能为空");
        return false;
      } else if (!formState.introduce) {
        message.warning("文章简介不能为空");
        return false;
      } else if (!formState.content) {
        message.warning("文章内容不能为空");
        return false;
      }

      formState.articleListData = {
        id: route.params.id,
        title: filterWord(formState.title),
        tag: formState.tagListData,
        cover: formState.cover,
        introduce: filterWord(formState.introduce),
        content: filterWord(formState.content),
      };

      if (formState.isAdminLoc > 0) {
        formState.articleListData.region = formState.region;
      }

      Modal.confirm({
        title: "确认发布该文章吗？",
        icon: createVNode(ExclamationCircleOutlined),
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk: async () => {
          if (!route.params.id) {
            if (localStorage.isAdmin > 0) {
              await store
                .dispatch(
                  "articleAdmin/addArticleAdmin",
                  formState.articleListData
                )
                .then((res) => {
                  const { code } = res.data;
                  if (code === 0) {
                    router.push({
                      name: "article-index",
                    });
                  }
                });
            } else {
              await store
                .dispatch(
                  "articleUser/addArticleUser",
                  formState.articleListData
                )
                .then((res) => {
                  const { code } = res.data;
                  if (code === 0) {
                    router.push({
                      name: "article-index",
                    });
                  }
                });
            }
          } else {
            if (formState.isAdmin > 0) {
              await store
                .dispatch(
                  "articleAdmin/updateArticleAdmin",
                  formState.articleListData
                )
                .then((res) => {
                  const { code } = res.data;
                  if (code === 0) {
                    router.push({
                      name: "article-index",
                    });
                  }
                });
            } else {
              await store
                .dispatch(
                  "articleUser/updateArticleUser",
                  formState.articleListData
                )
                .then((res) => {
                  const { code } = res.data;
                  if (code === 0) {
                    router.push({
                      name: "article-index",
                    });
                  }
                });
            }
          }
        },
      });
    };

    const changeTitle = (e) => {
      formState.title = e.target.value;
    };

    const changeRegion = (e) => {
      formState.region = e;
    };

    const changeTag = (e) => {
      formState.tagListData = e;
    };

    const changeIntroduce = (e) => {
      formState.introduce = e;
    };

    const changeContent = (e) => {
      formState.content = e;
    };

    // const handleChange = ({ fileList: newFileList }) => {
    //   formState.fileList = newFileList;
    //   console.log(formState.fileList);
    // };

    // const handlePreview = async (file) => {
    //   if (!file.url && !file.preview) {
    //     file.preview = await getBase64(file.originFileObj);
    //   }

    //   formState.cover = file.url || file.preview;
    //   formState.visible = true;
    // };

    // const handleCancel = () => {
    //   formState.visible = false;
    // };

    const handleChange = (info) => {
      formState.loading = true;
      getBase64(info.file.originFileObj, (base64Url) => {
        formState.cover = base64Url;
        formState.loading = false;
      });
    };

    // const beforeUpload = (file) => {
    //   const isJpgOrPng =
    //     file.type === "image/jpeg" || file.type === "image/png";

    //   if (!isJpgOrPng) {
    //     message.error("仅支持上传 JPG 或 PNG 格式图片文件");
    //   }

    //   const isLt2M = file.size / 1024 / 1024 < 5;

    //   if (!isLt2M) {
    //     message.error("仅支持上传小于 5MB 大小图片文件");
    //   }

    //   return isJpgOrPng && isLt2M && false;
    // };

    const beforeUpload = (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        message.error("仅支持上传 JPG 或 PNG 格式图片文件");
      }

      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isLt2M) {
        message.error("仅支持上传小于 5MB 大小图片文件");
      }

      return isJpgOrPng && isLt2M & false;
    };

    const toArticleList = () => {
      router.push({ name: "article-index" });
    };

    return {
      ...toRefs(formState),
      handleSubmit,
      changeTitle,
      changeRegion,
      changeTag,
      beforeUpload,
      handleChange,
      // handlePreview,
      // handleCancel,
      changeIntroduce,
      changeContent,
      toArticleList,
    };
  },
};
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 370px;
  height: 210px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-upload-list-picture-card .ant-upload-list-item {
  width: 370px;
  height: 337px;
}
</style>
