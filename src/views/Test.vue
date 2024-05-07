<template>
  <div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '60%' }" >
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      default-tag-text="默认"
      @add="showPopup"
      @edit="onEdit"
    />
  </div>
  
</template>
 
<script>
import { ref } from 'vue';
export default {
  setup() {
    const show = ref(false);
    const username = ref('');
    const password = ref('');
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    const showPopup = () => {
      show.value = true;
    };
    const chosenAddressId = ref('1');
    const list = [
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ];
    const disabledList = [];
    return {
      show,
      username,
      password,
      onSubmit,
      showPopup,
      chosenAddressId,
      list,
      disabledList
    };
  },
};
</script>

<style scoped>
.test {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}
</style>