<script setup>
import Card from '../../components/Card.vue'
import {IconFont} from '@nutui/icons-vue-taro';
import SimpleLine from "../../components/SimpleLine.vue";
import {ref} from "vue";

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
</script>

<template>
  <Card class="card">
    <view>提货人：易某某 18xxxxxx000</view>
    <SimpleLine color="#f7f8fa" height="2px"></SimpleLine>
    <view>自提点：亿众便利店建政店</view>
    <view class="shop-info">
      <image src="../../image/test.png" class="shop-image" style="height: 50px; width: 50px" mode="aspectFit"></image>
      <view class="shop-info-desc">
        <view>距您14米</view>
        <view class="shop-address tow-line-text">
          广西...一大段地址文字可换行广西...一大段地址文字可换行广西...一大段地址文字可换行广西...一大段地址文字可换行
        </view>
      </view>
      <view class="address-change">
        <view>切换</view>
        <IconFont size="small" name="rect-right"></IconFont>
      </view>
    </view>
  </Card>
  <Card class="card">
    <view>明天16:00可取货</view>
    <SimpleLine color="#f7f8fa" height="2px"></SimpleLine>
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
        <view class="button-cell button-cell-middle ">{{ commodity.buyCount }}</view>
        <IconFont @click="() => plus(commodity.id)" class="button-cell button-plus" name="plus"></IconFont>
      </view>
    </view>
  </Card>
  <Card class="card">
    <view class="check-items">
      <view class="check-item">
        <view>商品总额</view>
        <view>￥ 7.99</view>
      </view>
      <view class="check-item">
        <view>优惠券</view>
        <view>暂无优惠券可用 ></view>
      </view>
    </view>
  </Card>
  <Card class="card" style="display: flex; justify-content: space-between; align-items: center">
    <view>
      订单备注
    </view>
    <view>some-world ></view>
  </Card>
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
  margin: 20px 10px 10px;
  padding: 10px;
}

.shop-info {
  display: flex;
  gap: 5px;
  justify-content: space-around;
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
