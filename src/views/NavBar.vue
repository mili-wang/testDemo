<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item active" to="home">
       <van-icon name="home-o" />
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="list">
       <van-icon name="user-o" />
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>
 
<script>
import { onMounted } from 'vue'
export default {
  setup() {
    onMounted(() => {
 
    })
  }
}
</script>
 
<style lang="less" scoped>
	.fj(@type: space-between){
	  display: flex;
	  justify-content: @type;
	}
    .nav-bar{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 5px 0;
      z-index: 1000;
      background: #fff;
      .nav-list {
        width: 100%;
		.fj();
        flex-direction: row;
        padding: 0;
        .nav-list-item {
          display: flex;
          flex: 1;
          flex-direction: column;
          text-align: center;
          color: #666;
          &.router-link-active {
            color: #3663FE;
          }
          i {
            text-align: center;
            font-size: 22px;
          }
          span{
            font-size: 12px;
          }
        }
      }
    }
</style>