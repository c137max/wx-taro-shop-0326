<script setup>

import Login from "./login";
import Taro from "@tarojs/taro";
import {infoToast} from "../../utils/showToast";
const onAfterLogin = (isSucceed) => {
  if (isSucceed) {
    Taro.navigateBack({
      complete: () => {
        infoToast("登录成功")
      }
    })
  }
}
</script>

<template>
  <div class="h-screen">
    <login @afterLogin="onAfterLogin"></login>
  </div>
</template>

<style scoped>

</style>
