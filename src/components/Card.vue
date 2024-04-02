<script setup>
const props = defineProps(['style'])
</script>

<template>
  <view class="sdf-card" :style="props.style">
    <slot></slot>
  </view>
</template>

<style>
.sdf-card {
  padding: 10px;
  border-radius: 20px;
  background-color: #ffffff;

}
</style>
