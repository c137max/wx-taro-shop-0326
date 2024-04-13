<template>
  <card class="card">
    <nut-swipe-group lock style="width: 100vw">
      <nut-swipe v-for="item in cartCommodities" ref="swipeRefs" style="margin-bottom: 10px" :name="item.id.toString()" :key="item.id">
        <view style="display: flex; gap: 5px; width: 100vw">
          <nut-checkbox @change="cCheckboxChange" v-model="item.checkbox">
            <image :src="item.image" style="width: 100px; height: 100px"></image>
          </nut-checkbox>
          <view style="display: flex; flex-direction: column; gap: 20px">
            <view>{{item.title}}</view>
            <view><nut-price :price="item.price"></nut-price></view>
          </view>
        </view>
        <view class="quantity-button-group">
          <IconFont @click="() => minus(item.id)" name="minus" class="button-cell button-minus"></IconFont>
          <view class="button-cell button-cell-middle ">{{ item.count }}</view>
          <IconFont @click="() => plus(item.id)" class="button-cell button-plus" name="plus"></IconFont>
        </view>
        <template #right>
          <nut-button shape="square" style="height: 100%" type="danger" @click="() => {showRmDialog(item.id)}">删除</nut-button>
        </template>
      </nut-swipe>
    </nut-swipe-group>
  </card>
  <view class="bottom-card">
    <view style="display: flex; gap: 5px">
      <view><nut-checkbox v-model="allSelected">全选</nut-checkbox></view>
      <view>合计:
        <nut-price :price="totalPrice"></nut-price>
      </view>
    </view>
    <view style="margin-right: 10px">
      <nut-button  type="primary" @click="goMakeOrder">去结算</nut-button>
    </view>
  </view>
  <nut-dialog content="确定移除商品吗？" v-model:visible="isRmCommodityDialogShow" @cancel="reCCard"  @ok="removeCommodity" />
</template>

<script setup>
import Card from '../../components/Card.vue'
import {ref, onBeforeMount} from 'vue';
import {IconFont} from "@nutui/icons-vue-taro";
import Taro from "@tarojs/taro";
const allSelected = ref(false)
const isRmCommodityDialogShow = ref(false)
const cartCommodities = ref([
  {image: '../../image/test.png', id: 1, title: '优选黄皮果', price: 10.90, count: 1, maxBuy: 10, checkbox: false},
  {image: '../../image/test.png', id: 2, title: '优选黄皮果', price: 10.90, count: 1, maxBuy: 10, checkbox: false},
])
onBeforeMount(() => {
  cartCommodities.value.forEach(item => {
    item['checkbox'] = false
  })
})
const totalPrice = ref(0)
const swipeRefs = ref([])
const goMakeOrder = () => {
  Taro.navigateTo({
    url: '/pages/makeOrder/index'
  })
}

let tempId = -1
const showRmDialog = (id) => {
  tempId=id
  isRmCommodityDialogShow.value=true
}

const countTotalPrice = () => {
  totalPrice.value = cartCommodities.value
      .filter(x => x.checkbox)
      .reduce((acc, curr) => acc + curr.price * curr.count, 0);
}
const removeCommodity = (id) => {
  cartCommodities.value.splice(cartCommodities.value.findIndex(item => item.id === id), 1)
}
const reCCard = () => {
  swipeRefs.value[cartCommodities.value.findIndex(item => item.id === tempId)]?.close()
}

const cCheckboxChange = (state, label) => {
  const l = cartCommodities.value.map(i => i.checkbox).filter(x => x).length
  allSelected.value = l === cartCommodities.value.length;
  countTotalPrice()
}
const minus = (id) => {
  cartCommodities.value.forEach(
      item => {
        if (id === item.id) {
          if (item.count !== 1) {
            item.count -= 1
          } else {
            Taro.showToast({
              title: '最少购买一个商品~',
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
  )
  countTotalPrice()
}
const plus = (id) => {
  cartCommodities.value.forEach(
      item => {
        if (id === item.id) {
          if (item.count !== item.maxBuy) {
            item.count += 1
          } else {
            Taro.showToast({
              title: '当前最多仅能购买' + item.maxBuy + '份该商品~',
              icon: 'none',
              duration: 2000
            })
          }
        }
      }
  )
  countTotalPrice()
}
</script>

<style>


.button-minus {
  border: 1px solid #aba8a8;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.button-plus {
  border: 1px solid #aba8a8;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.button-cell-middle {
  border-top: 1px solid #aba8a8;
  border-bottom: 1px solid #aba8a8;
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
