<script setup>
import Card from '../../components/Card.vue'
import {IconFont} from '@nutui/icons-vue-taro';
import SimpleLine from "../../components/SimpleLine.vue";
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
        <view class="shop-address">
          广西...一大段地址文字可换行广西...一大段地址文字可换行广西...一大段地址文字可换行广西...一大段地址文字可换行
        </view>
      </view>
      <view class="address-change">
        <view>切换</view>
        <IconFont size="small" name="rect-right"></IconFont>
      </view>
    </view>
  </Card>
  <Card>
    <view>明天16:00可取货</view>
    <view class="commodity-info">
      <image src="../../image/test.png" class="shop-image" style="height: 100px; width: 100px" mode="aspectFit"></image>
      <view>
        <view class="commodity-info-title"></view>
      </view>
      <view>
        ￥ 7.99
      </view>
    </view>
  </Card>
</template>

<style>
page {
  background-color: #f7f8fa;
}

.shop-address {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: small;
  color: #504f4f;
}

.shop-info-desc {
  width: 65vw;
}

.card {
  margin: 20px 10px 10px;
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
