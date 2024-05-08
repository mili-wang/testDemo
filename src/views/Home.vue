<template>
  <div class="content">
    <van-nav-bar
        title="首页" 
        right-text="添加用户"
        @click-right="showPopup"
    />
    <van-popup v-model:show="show" position="bottom" :style="{ height: '60%' }" >
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="user"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="tel"
            type="tel"
            name="tel"
            label="手机号"
            placeholder="手机号"
          />
          <van-cell
            title="出生年月"
            is-link
            :value="timeValue"
            @click="showDatePopup" />
          <van-popup v-model:show="datePopupShow" position="bottom">
            <van-date-picker
              v-model="currentDate"
              type="datetime"
              title="选择时间"
              :loading="isLoadingShow"
              :max-date="maxDate"
              @cancel="datePopupShow = false"
              @confirm="confirmPicker"
            />
          </van-popup>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.key" :title="item.value" />
    </van-list>
  </div>
</template>
 
<script>
import axios from "axios"

import { ref } from 'vue';
import { showSuccessToast, showFailToast } from 'vant';
import { getMessage } from '@/api/test'

export default {
    name: 'home',
    setup() {
        const show = ref(false);
        const datePopupShow = ref(false);
        const isLoadingShow = ref(true);
        
        const timeValue = ref('请选择生日');
        const username = ref('');
        const password = ref('');
        const tel = ref('');


        const maxDate = new Date();
        const currentDate = ref(['2021', '01']);
        const columnsType = ['year', 'month'];

        const onSubmit = (values) => {
          console.log('submit', values);
          list.value.unshift({ key: values.password, value: values.user })
          showSuccessToast('添加成功');
          show.value = false;
        };
        const showPopup = () => {
          username.value = '';
          password.value = '';
          tel.value = '';
          currentDate.value = [];
          timeValue.value = '请选择生日';
          show.value = true;
        };
        const showDatePopup = () => {
          isLoadingShow.value = true
          setTimeout(() => {
            isLoadingShow.value = false
          }, 500)
          datePopupShow.value = true;
        }
        const list = ref([{ kay: "123", value: "张三" }, { kay: "333", value: "李四" }]);
        const loading = ref(false);
        const finished = ref(false);

        const onLoad = () => {
          // 异步更新数据
            // getMessage().then(res => {
            //   const { content } = res;
            //   console.log(res, 1231232)
            //   list.value.push({key: 1, value: content });
            //   finished.value = true;
            // })
            axios.get('https://api.uomg.com/api/rand.qinghua')
              .then(function (response) {
                const { content } = response.data;
                list.value.push({key: 1, value: content });
                finished.value = true;
              })
              .catch(function (error) {
                console.log(error);
              });
        };

        const onClickRight = () => {}

        const confirmPicker  = (val) => {
          let data = val.selectedValues;
          timeValue.value = `${data[0]}-${data[1]}-${data[2]}`;
          datePopupShow.value = false;
        }

        return {
          show,
          datePopupShow,
          username,
          password,
          tel,
          maxDate,
          currentDate,
          columnsType,
          timeValue,
          onSubmit,
          showPopup,
          list,
          onLoad,
          loading,
          finished,
          onClickRight,
          showDatePopup,
          confirmPicker
        };
    }
};
</script>

<style scoped>

.test {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}
.seller
  .timeClass {
    color: #333;
  }
</style>