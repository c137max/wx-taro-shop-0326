<template>
  <view class="page">
    <nut-swiper
        :init-page="2"
        :auto-play="3000"
        pagination-visible
        pagination-color="#426543"
        pagination-unselected-color="#808080"
        v-if="slideshowList.length > 0"
    >
      <nut-swiper-item v-for="(item, index) in slideshowList" :key="index" style="height: 200px">
        <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false"/>
      </nut-swiper-item>
    </nut-swiper>
    <nut-sticky top="0">
      <view class="top-classify">
        <view v-for="(item, index) in items" :key="index" :class="{ active: activeIndex === index }"
              @click="handleTabClick(index)">
          <view class="flex justify-center gap-1 justify-items-center items-center ">
            <view>
              {{ item }}
            </view>
            <span v-if="item === '价格'">
              <view className="flex flex-col">
                <IconFont size="10" v-show="priceClickCount === 1" color="#fa2c19" name="triangle-up"/>
                <IconFont size="10" v-show="priceClickCount !== 1" color="#c4c5c6" name="triangle-up"/>
                <IconFont size="10" v-show="priceClickCount === 2" color="#fa2c19" name="triangle-down"/>
                <IconFont size="10" v-show="priceClickCount !== 2" color="#c4c5c6" name="triangle-down"/>
              </view>
            </span>
          </view>
        </view>
      </view>
    </nut-sticky>
    <view class="commodities">
      <view class="commodity-card" @click="() => handleClickCommodity(commodity.id)"
            v-for="(commodity, index) in commodities" :key="commodity.id">
        <image class="commodity-image" :src="commodity.image"></image>
        <view class="commodity-detail">
          <view class="commodity-title">{{ commodity.title }}</view>
          <view>
            <span class="commodity-sales-volume">{{ commodity.salesVolumeDesc }}</span>
          </view>
          <view class="commodity-price">
            <nut-price :price="commodity.price" size="normal"/>
          </view>
          <view>
            <span class="commodity-sales-explain">{{ commodity.unit }} {{ commodity.explain }} 月销量:{{
                commodity.salesVolume
              }} </span>
          </view>
        </view>
      </view>
    </view>
    <view v-show="commodities.length===0">
      <nut-empty description="暂时没有商品在售卖，请尝试下拉刷新，或者过一段时间再来吧~"></nut-empty>
    </view>
    <view class=" h-5">
    </view>
    <view class="w-full m-auto text-center h-7 fixed bottom-0">
      <view v-show="isLoadingMore">
        <IconFont name="loading"></IconFont>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue';
import {IconFont} from '@nutui/icons-vue-taro';
import Taro, {usePullDownRefresh} from '@tarojs/taro'
import {useReachBottom} from '@tarojs/taro'
import {infoToast} from "../../utils/showToast";

const items = ['推荐', '销量', '新品', '价格', '仅看有货'];
const activeIndex = ref(0);
const priceClickCount = ref(0);
const isLoadingMore = ref(false);

const slideshowList = ref([
  // 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  // 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  // 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  // 'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
])

const commodities = [

]
const handleTabClick = (index) => {
  activeIndex.value = index;

  if (items[activeIndex.value] === '价格') {
    priceClickCount.value += 1
    if (priceClickCount.value === 3) {
      priceClickCount.value = 1
    }

  } else {
    priceClickCount.value = 0; // 如果点击其他标签，重置价格点击次数
  }

};

usePullDownRefresh(() => {
  console.log('pull down refresh')
  // 触发下拉刷新事件
  Taro.showLoading({
    title: '加载中',
  })
  setTimeout(() => {
    Taro.hideLoading()
    Taro.stopPullDownRefresh()
  }, 1000);
})
useReachBottom(() => {  // 下滑触底事件
  console.log('reach bottom')
  isLoadingMore.value = true;
  setTimeout(() => {
    isLoadingMore.value = false;
    infoToast("已经没有更多了... ...")
  }, 1000);
})


const handleClickCommodity = (cid) => {
  Taro.navigateTo({
    url: '/pages/commdityDetail/index?id=' + cid,
  })
}

</script>

<style>
.page {
  background-color: #f7f8fa;
}

.commodity-sales-explain {
  color: rgb(145, 143, 143);
  font-size: 20px;
}


.commodity-price {
}

.commodity-detail {
  padding: 10px;
}

.commodity-sales-volume {
  background-color: #feefd9;
  color: #d78f36;
  font-size: 20px;
  font-weight: lighter;
  display: inline-block;
  margin: 0 10px 10px 0;
  border-radius: 5px;
}

.commodity-title {
  font-weight: 500;
  font-size: medium;
  margin: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.commodity-card {
  width: 45vw;
  background-color: #fff;
  border-radius: 10px;
}

.commodity-image {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 350px;
}

.commodities {
  background-color: #f7f8fa;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 20px;
  width: 100%;
}


.top-classify {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  font-weight: lighter;
}

.top-classify .active {
  color: #fa2c19;
}
</style>
