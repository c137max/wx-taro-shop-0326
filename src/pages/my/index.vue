<template>
  <view className="flex gap-5 shadow m-3 p-2 rounded-lg bg-white outline-zinc-600">
    <view  class="drop-shadow h-16 w-16 rounded-full overflow-hidden shadow-lg">
      <image  class="w-16 h-16 rounded-full  m-auto"  :src="userInfo.avatarUrl"></image>
    </view>
    <view className="flex flex-col justify-around font-serif text-neutral-600">
      <view>{{ userInfo.nickName }}</view>
      <view className="font-mono font-light text-blue-500" @click="toUpdateInfo">使用微信头像和昵称</view>
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

      <nut-cell title="退出登录" is-link @click="showExitDialog = true">
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
  <nut-action-sheet title="更多" v-model:visible="showMore" :menu-items="menuItems" @choose="choose"/>
  <nut-popup v-model:visible="showLoginCard" position="bottom" round :close-on-click-overlay="false" :closeable="false" :style="{ height: '70%' }">
    <login @afterLogin="afterLogin"></login>
  </nut-popup>
  <nut-dialog content="确定退出登录么？" v-model:visible="showExitDialog" @ok="onExit" />
  <nut-toast :msg="state.msg" v-model:visible="state.show" :type="state.type"  :cover="state.cover" />
</template>

<script setup>
import {ref, onBeforeMount, reactive} from 'vue';
import {IconFont} from '@nutui/icons-vue-taro'
import {useUserStore} from "../../store/user";
import Login from "../login/login";
import {storeToRefs} from "pinia";
import Taro from "@tarojs/taro";

const state = reactive({
  msg: 'toast',
  type: 'text',
  show: false,
  cover: false,
  title: '',
  bottom: '',
  center: true
})
const openToast = (type, msg, cover = false) => {
  state.show = true
  state.msg = msg
  state.type = type
  state.cover = cover
}

const showMore = ref(false)
const showExitDialog = ref(false)
const showLoginCard = ref(true)
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
onBeforeMount(() => {
  if (userStore.isLogin) {
    showLoginCard.value = false
  }
})
const onExit = () => {
  userStore.logout()
  showLoginCard.value = true
}
const toUpdateInfo = () => {
  openToast('loading', '加载中，请稍侯', true)
  Taro.getUserProfile(
      {
        desc: '用于展示用户资料',
        lang: 'zh_CN',
        success: (res) => {
          console.log(res)
          userStore.updateInfo({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          })
          showLoginCard.value = false
        }
      },
      function (err) {
        console.log(err)
      }
  )
}

const afterLogin = (isSucceed) => {
  if (isSucceed) {
    showLoginCard.value = false
  }
}

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
