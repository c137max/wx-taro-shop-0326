<script setup>
import {ref, defineEmits} from "vue";
import Taro from "@tarojs/taro";
import {code2SessionApi} from "../../http/login";
import {infoToast} from "../../utils/showToast";
import {useUserStore} from "../../store/user";

const agreementCheckbox = ref(false)
const userStore = useUserStore()

const emit = defineEmits(['afterLogin'])


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
            isLoginLoading.value = false
            infoToast('登录失败，请稍后重试')
          }
        },
        error: () => {
          isLoginLoading.value = false
          infoToast('登录失败，请稍后重试')
        }
      }
  )
}
const code2Session = (sCode) => {
  code2SessionApi(sCode)
      .then((res) => {
        infoToast('登录成功')
        userStore.login({
          token: res.token,
          openId: res.openid,
          unionID: res.unionid,
          nickName: res.nickname,
          avatarUrl: res.avatarUrl,
        })
        isLoginLoading.value = false
        emit('afterLogin', true)
      }).catch(() => {
    isLoginLoading.value = false
    emit('afterLogin', false)
  })
}


const goPrivacyPolicyPage = () => {
  Taro.navigateTo({
    url: '/pages/other/agreement/index'
  })
}


const isAnimating = ref(false)
const isLoginLoading = ref(false)
const userAgreement = '《xx用户协议》'
const privacyPolicy = '《隐私政策》'
const companyName = 'xx'
</script>

<template>
  <view className="flex flex-row justify-center justify-items-center align-middle h-full items-center">
    <view className="flex flex-col gap-2 w-5/6 items-center justify-center justify-items-center align-middle ">
      <view className="flex flex-col gap-2 w-1/2">
        <nut-button :loading="isLoginLoading" @click="doLogin" color="#07c160" shape="round" type="primary">
          <template #icon>
            <image src="../../image/wechat.png" className="w-6 h-6"></image>
          </template>
          微信登录
        </nut-button>
      </view>
      <view class="font-light font-mono text-xs">
        <nut-checkbox v-model="agreementCheckbox" :class="isAnimating? 'animate-shake':''">
          <p>我已经阅读并同意<span class="inline text-blue-400"> {{userAgreement}} </span>、<span
              class="inline text-blue-400"> {{privacyPolicy}}</span>，
            并授权{{companyName}}使用该账号的信息（如昵称、头像、收货地址）进行统一管理。
          </p>
        </nut-checkbox>
      </view>
    </view>
  </view>
  <view @click="goPrivacyPolicyPage" className="flex font-mono text-sm  text-blue-400 justify-center gap-10  absolute bottom-5 w-full">
    <view> {{userAgreement}} </view>
    <view> {{privacyPolicy}} </view>
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
