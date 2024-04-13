<script setup>
import {ref} from "vue";
import Taro from "@tarojs/taro";
import {infoToast} from "../../../utils/showToast";

const agreementCheckbox = ref(false)
const uInfoCheckbox = ref(true)

const doLogin = () => {
  if (!agreementCheckbox.value) {
    infoToast('请阅读并同意《用户协议》、《隐私政策》')
    isAnimating.value = true  // 抖动用户协议
    setTimeout(() => {
      isAnimating.value = false
    }, 300)
    return
  }
  isLoginLoading.value = true
  Taro.login({
    success: function (res) {
      if (res.code) {
        code2Session(res.code)
      } else {
        console.error(res)
        infoToast('登录失败，请稍后重试')
      }
    },
    complete: () => {
      isLoginLoading.value = false
    }
  })
}
const code2Session = (sCode) => {
  // todo: send code2Session request to the server
}
const goAgreementPage = (e) => {
  e.preventDefault();
  console.log('goAgreementPage')
}
const goPrivacyPolicyPage = (e) => {
  e.preventDefault();
  console.log('goPrivacyPolicyPage')
}
const isAnimating = ref(false)
const isLoginLoading = ref(false)

</script>

<template>
  <view className="flex flex-row justify-center justify-items-center align-middle h-full items-center">
    <view className="flex flex-col gap-2 w-5/6 items-center justify-center justify-items-center align-middle ">
      <view className="flex flex-col gap-2 w-1/2">
        <nut-button :loading="isLoginLoading" @click="doLogin" color="#07c160" shape="round" type="primary">
          <template #icon>
            <image src="../../../image/wechat.png" className="w-6 h-6"></image>
          </template>
          微信登录
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
</template>

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
