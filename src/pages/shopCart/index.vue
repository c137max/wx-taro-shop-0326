<template>
  <card class="card">
    <nut-swipe-group lock style="width: 100vw">
      <nut-swipe v-for="item in cartCommodities" style="margin-bottom: 10px" :name="item.id.toString()" :key="item.id">
        <view style="display: flex; gap: 10px; width: 100vw">
          <image :src="item.image" style="width: 100px; height: 100px"></image>
          <view style="display: flex; flex-direction: column; gap: 20px">
            <view>{{item.title}}</view>
            <view><nut-price :value="item.price"></nut-price></view>
          </view>
        </view>
        <view class="quantity-button-group">
          <IconFont @click="() => minus(item.id)" name="minus" class="button-cell button-minus"></IconFont>
          <view class="button-cell button-cell-middle ">{{ item.count }}</view>
          <IconFont @click="() => plus(item.id)" class="button-cell button-plus" name="plus"></IconFont>
        </view>
        <template #right>
          <nut-button shape="square" style="height: 100%" type="danger">删除</nut-button>
        </template>
      </nut-swipe>
    </nut-swipe-group>
  </card>
  <view class="bottom-card">
    <view style="display: flex; gap: 5px">
      <view><nut-checkbox v-model="allSelected">全选</nut-checkbox></view>
      <view>合计:
        <nut-price :value="0.00"></nut-price>
      </view>
    </view>
    <view style="margin-right: 10px">
      <nut-button  type="primary">去结算</nut-button>
    </view>
  </view>
</template>

<script setup>
import Card from '../../components/Card.vue'
import {ref} from 'vue';
import {IconFont} from "@nutui/icons-vue-taro";
const allSelected = ref(false)
const cartCommodities = ref([
  {image: '../../image/test.png', id: 1, title: '优选黄皮果', price: '10.90', count: 1, maxBuy: 10},
  {image: '../../image/test.png', id: 2, title: '优选黄皮果', price: '10.90', count: 1, maxBuy: 10},
])
const minus = (id) => {
  cartCommodities.value.forEach(
      item => {
        if (id === item.id) {
          if (item.count !== 1) {
            item.count -= 1
          }
        }
      }
  )
}
const plus = (id) => {
  cartCommodities.value.forEach(
      item => {
        if (id === item.id) {
          if (item.count !== item.maxBuy) {
            item.count += 1
          }
        }
      }
  )
}
</script>

<style lang="less">

page {
  background-color: #f7f8fa;
}
@button-radius: 10px;
@button-border: 1px solid #aba8a8;
.button-minus {
  border: @button-border;
  border-top-left-radius: @button-radius;
  border-bottom-left-radius: @button-radius;
}

.button-plus {
  border: @button-border;
  border-top-right-radius: @button-radius;
  border-bottom-right-radius: @button-radius;
}

.button-cell-middle {
  border-top: @button-border;
  border-bottom: @button-border;
  text-align: center;
  line-height: 40px;
}
.card {
  margin: 0 0;
}
.button-cell {
  min-width: 40px;
  height: 40px;
}

.quantity-button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 30px;
}
.bottom-card {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100vw;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #dcdcdc;
}
</style>
