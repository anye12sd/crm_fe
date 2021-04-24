<template>
  <a-modal
    :title="modalTitle"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    ok-text="加入收藏"
    cancel-text="取消"
  >
    <a-form-model ref="ruleForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="收藏夹">
        <a-select default-value="shanghai">
          <a-select-option value="shanghai"> 添加到新收藏夹 </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="标题">
        <a-input v-model="form.title" placeholder="标题" />
      </a-form-model-item>
      <a-form-model-item label="描述">
        <a-input v-model="form.description" placeholder="描述" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  name: 'CollectionAdd',
  props: {
    value: Boolean,
    modalTitle: String
  },
  data() {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 15 },
      visible: false,
      form: {
        region: []
      }
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.tabs-box {
  margin-top: 20px;
}
.flex {
  display: flex;
}
.space-between {
  justify-content: space-between;
}
</style>
