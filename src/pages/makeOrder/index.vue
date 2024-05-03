<script setup>
import {IconFont} from '@nutui/icons-vue-taro';
import {ref} from "vue";
import {EventChannel} from "@tarojs/shared";
import Taro from "@tarojs/taro";

const remark = ref('无')

const commodities = ref([
  {
    id: '1',
    unit: '200g±20g',
    title: '广西三月李（单果子酸爽7克送椒盐）广西三月李（单果子酸爽7克送椒盐）广西三月李（单果子酸爽7克送椒盐）广西三月李（单果子酸爽7克送椒盐）',
    price: 7.99,
    buyCount: 2,
    image: '../../image/test.png',
    maxBuy: 99
  }
])

const minus = (id) => {
  commodities.value.forEach(
      item => {
        if (id === item.id) {
          if (item.buyCount !== 1) {
            item.buyCount -= 1
          }
        }
      }
  )
}

const plus = (id) => {
  commodities.value.forEach(
      item => {
        if (id === item.id) {
          if (item.buyCount !== item.maxBuy) {
            item.buyCount += 1
          }
        }
      }
  )
}

const go2Remark = () => {
  Taro.navigateTo({
    url: '/pages/makeOrder/remark/index?value=' + remark.value,
    events: {
      orderRemark(res) {
        console.log(res)
        remark.value = res
      }
    }
  })
}

</script>

<template>
  <view class=" font-sans">
    <view hover-class="hover-bg" hover-start-time="10" hover-stay-time="100" class="bg-white  mt-2">
      <view class=" flex justify-between items-center p-2 h-6">
        <view>提货人：易某某 18xxxxxx000</view>
        <view>
          <icon-font size="13" name="right"></icon-font>
        </view>
      </view>
    </view>
    <view hover-class="hover-bg" hover-start-time="10" hover-stay-time="100" class="bg-white mt-2 p-2">
      <view class="">自提点：亿众便利店建政店</view>
      <view class="shop-info">
        <image src="../../image/test.png" class="shop-image" style="height: 50px; width: 50px" mode="aspectFit"></image>
        <view class="shop-info-desc">
          <view>距您14米</view>
          <view class="shop-address tow-line-text">
            广西...一大段地址文字可换行广西...一大段地址文字可换行广西...一大段地址文字可换行广西...一大段地址文字可换行
          </view>
        </view>
        <view>
          <IconFont size="13" name="rect-right"></IconFont>
        </view>
      </view>
    </view>
  </view>
  <view class="bg-white p-2 mt-2">
    <view class="mb-1">明天16:00可取货</view>
    <view class="commodity-box" v-for="(commodity, index) in commodities" :key="index">
      <view class="commodity-info">
        <image :src="commodity.image" class="shop-image" style="height: 100px; width: 100px"
               mode="aspectFit"></image>
        <view class="commodity-info-detail">
          <view class="commodity-info-title tow-line-text">
            {{ commodity.unit }} | {{ commodity.title }}
          </view>
          <view>
            <nut-price :size="'normal'" :price="commodity.price"></nut-price>
          </view>
        </view>
      </view>
      <view class="quantity-button-group">
        <IconFont @click="() => minus(commodity.id)" name="minus" class="button-cell button-minus"></IconFont>
        <view class="button-cell button-cell-middle text-red-500">{{ commodity.buyCount }}</view>
        <IconFont @click="() => plus(commodity.id)" class="button-cell button-plus" name="plus"></IconFont>
      </view>
    </view>
  </view>
  <view class="mt-2 p-2 bg-white">
    <view class="check-items">
      <view class="check-item">
        <view>商品总额</view>
        <view>￥ 7.99</view>
      </view>
      <view hover-class="hover-bg" hover-start-time="10" hover-stay-time="100" class="check-item">
        <view>优惠券</view>
        <view class="font-sans flex items-center justify-between gap-3">
          <view>暂无优惠券可用</view>
          <icon-font size="13" name="right"></icon-font>
        </view>
      </view>
    </view>
  </view>
  <view @click="go2Remark" hover-class="hover-bg" hover-start-time="10" hover-stay-time="100" class="bg-white  mt-2 p-2 flex items-center justify-between">
    <view>
      订单备注
    </view>
    <view class="font-sans flex items-center justify-between gap-3">
      <view class="w-24 truncate text-end">{{remark}}</view>
      <icon-font size="13" name="right"></icon-font>
    </view>
  </view>
  <view class="bottom-card">
    <view>
      <span>待支付<nut-price :price="7.99" size="large"></nut-price></span>
    </view>
    <view>
      <nut-button style="margin-right: 20px" type="primary">立即支付</nut-button>
    </view>
  </view>
</template>

<style lang="less">
page {
  background-color: #f7f8fa;
}

.bottom-card {
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  border-top: 1px solid #c5c5c5;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  gap: 20px;
}

.check-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.hover-bg {
  background-color: #f7f8fa;
}

.check-item {
  display: flex;
  justify-content: space-between;
}

.commodity-box {
  position: relative;
}

.quantity-button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.button-cell {
  min-width: 40px;
  height: 40px;
}

.button-cell-middle {
  text-align: center;
  line-height: 40px;
}

.commodity-info-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.commodity-info-title {
  width: 65vw;
}

.shop-address {
  font-size: small;
  color: #504f4f;
}

.commodity-info {
  display: flex;
  gap: 10px;
}

.tow-line-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shop-info-desc {
  width: 65vw;
}

.card {
  margin: 20px 0 0;
  padding: 10px;
}

.shop-info {
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.shop-image {
  border-radius: 20px;
}

.address-change {
  display: flex;
  font-size: small;
}
</style>
