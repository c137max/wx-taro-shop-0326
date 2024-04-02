<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  length: {
    type: String,
    default: '100%'
  },
  color: {
    type: String,
    default: '#9b9b9b'
  },
  height: {
    type: String,
    default: '1px'
  }
})
</script>

<template>
  <view class="simple-line" :style="{ borderBottom: props.height + ' solid ' + props.color, width: props.length }">

  </view>
</template>

<style>
.simple-line {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
