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
  <nut-action-sheet title="更多" v-model:visible="showMore" :menu-items="menuItems" @choose="choose"/>
  <nut-cell title="Bottom" is-link @click="showLoginCard = true"></nut-cell>
  <nut-popup v-model:visible="showLoginCard" position="bottom" round :closeable="false" :style="{ height: '50%' }">
    <view className="flex flex-row justify-center justify-items-center align-middle h-full items-center">
      <view className="flex flex-col gap-2 w-5/6 items-center justify-center justify-items-center align-middle ">
        <view className="flex flex-col gap-2 w-1/2">
          <nut-button @click="doLogin" color="#07c160" shape="round" type="primary">
            <template #icon>
              <image src="../../image/wechat.png" className="w-6 h-6"></image>
            </template>
            微信登录
          </nut-button>
          <nut-button shape="round" plain type="default">
            <template #icon>
              <image src="../../image/phone.png" className="w-6 h-6"></image>
            </template>
            手机号登录
          </nut-button>
        </view>
        <view class="font-light font-mono text-xs">
          <nut-checkbox v-model="agreementCheckbox" :class="isAnimating? 'animate-shake':''">
            <p>我已经阅读并同意<span @click="goAgreementPage" class="inline text-blue-400">《xx用户协议》</span>、<span
                class="inline text-blue-400" @click="goPrivacyPolicyPage">《隐私政策》</span>，
              并授权xx使用该账号的信息（如昵称、头像、收货地址）进行统一管理。
            </p>
          </nut-checkbox>
          <nut-checkbox v-model="uInfoCheckbox">
            <p>自动使用您的微信头像和微信昵称填写到账号个人信息中。</p>
          </nut-checkbox>
        </view>
      </view>
    </view>
  </nut-popup>
</template>

<script setup>
import {ref} from 'vue';
import {IconFont} from '@nutui/icons-vue-taro'
import Taro from "@tarojs/taro";

const showMore = ref(false)
const showLoginCard = ref(true)

const agreementCheckbox = ref(false)
const uInfoCheckbox = ref(true)
const isAnimating = ref(false)

const goAgreementPage = (e) => {
  e.preventDefault();
  console.log('goAgreementPage')
}

const doLogin = () => {
  if (!agreementCheckbox.value) {
    Taro.showToast({
      title: '请阅读并同意《用户协议》、《隐私政策》',
      icon: 'none',
      duration: 2000
    })
    isAnimating.value = true
    setTimeout(() => {
      isAnimating.value = false
    }, 300)
    return
  }
  Taro.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        console.log(res.code)
        code2Session(res.code)
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

const code2Session = (sCode) => {
  // todo: send code2Session request to the server
}

const goPrivacyPolicyPage = (e) => {
  e.preventDefault();
  console.log('goPrivacyPolicyPage')
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
@keyframes shake {
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
}

.animate-shake {
  animation: shake 0.1s infinite;
}
</style>
