<script setup>
import Taro, {useLoad, useUnload} from "@tarojs/taro";
import {ref} from "vue";

const val = ref('')

useLoad(opt => {
  val.value = opt.value;
})

useUnload(() => {
  submit()
})

const submit = () => {
  const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();
  eventChannel.emit('orderRemark', val.value);
}


</script>

<template>
  <nut-textarea autofocus v-model="val" limit-show :max-length="20"/>
</template>

<style scoped>

</style>
