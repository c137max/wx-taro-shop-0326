<template>
  <view className="flex gap-5 shadow m-3 p-2 rounded-lg bg-white outline-zinc-600">
    <view class="drop-shadow h-16 w-16 rounded-full  overflow-hidden shadow-lg ">
      <image className=" w-16 h-16 rounded-full m-auto" src="../../image/test.png"></image>
    </view>
    <view className="flex flex-col justify-around font-serif text-neutral-600">
      <view>微信用户</view>
      <view>注册时间：2024.04.11</view>
    </view>
  </view>

  <view className="m-3 shadow rounded-lg h-max bg-white">
    <nut-cell-group>
      <nut-cell title="我附近的配送地址" is-link>
        <template #icon>
          <IconFont name="location"></IconFont>
        </template>
      </nut-cell>
      <nut-cell title="我的代销" is-link>
        <template #icon>
          <IconFont name="my"></IconFont>
        </template>
      </nut-cell>
      <nut-cell title="联系系统客服" is-link>
        <template #icon>
          <IconFont name="message"></IconFont>
        </template>
      </nut-cell>
      <nut-cell title="用户协议" is-link>
        <template #icon>
          <IconFont name="edit"></IconFont>
        </template>
      </nut-cell>

      <nut-cell title="退出登录" is-link>
        <template #icon>
          <IconFont name="circle-close"></IconFont>
        </template>
      </nut-cell>
      <nut-cell title="更多" @click="() => {showMore = true}" is-link>
        <template #icon>
          <IconFont name="more-x"></IconFont>
        </template>
      </nut-cell>
    </nut-cell-group>

  </view>
  <nut-action-sheet title="更多" v-model:visible="showMore" :menu-items="menuItems" @choose="choose" />
</template>

<script setup>
import {ref} from 'vue';
import {IconFont} from '@nutui/icons-vue-taro'

const showMore = ref(false)

const choose = (e) => {
  console.log(e)
}

const menuItems = [
  {
    name: '注销我的账号'
  },
  {
    name: '取消',
    color: 'red'
  }
]

</script>

<style>

</style>
