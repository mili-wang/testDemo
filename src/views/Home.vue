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
import { ref } from 'vue';
import { showSuccessToast, showFailToast } from 'vant';

export default {
    name: 'home',
    setup() {
        const show = ref(false);
        const username = ref('');
        const password = ref('');
        const onSubmit = (values) => {
            console.log('submit', values);
            list.value.unshift({ key: values.user, value: values.password })
            showSuccessToast('添加成功');
            show.value = false;
        };
        const showPopup = () => {
            show.value = true;
        };
        const list = ref([{ kay: "123", value: "张三" }, { kay: "333", value: "李四" }]);
        const loading = ref(false);
        const finished = ref(false);

        const onLoad = () => {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                // for (let i = 0; i < 5; i++) {
                //     list.value.push({key: list.value.length + 1 + i, value: list.value.length + 1 + i });
                // }
                // // 加载状态结束
                // loading.value = false;
                // // 数据全部加载完成
                if (list.value.length >= 10) {
                    
                }
                finished.value = true;
            }, 1000);
        };

        const onClickRight = () => {}

        return {
            show,
            username,
            password,
            onSubmit,
            showPopup,
            list,
            onLoad,
            loading,
            finished,
            onClickRight
        };
    }
};
</script>

<style scoped>
.content {
    height: calc(100% - 50px);
}
.test {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}
</style>