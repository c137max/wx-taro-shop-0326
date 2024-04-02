<template>
  <view class="page">
    <nut-image-preview :show="showPreview" :images="showImgData" @close="hidePreview" :init-no="initShowImgNo" />
    <view class="skeleton-picture" v-show="isLoading">
      <nut-skeleton width="400px" height="150px" title :animated="isLoading" row="1" class="item"> </nut-skeleton>
      <nut-skeleton width="400px" height="15px" title :animated="isLoading" row="3" class="item"> </nut-skeleton>
    </view>
    <view v-show="!isLoading">
      <nut-swiper @change="onSwiperChange" @click="swiperClick">
        <nut-swiper-item v-for="(item, index) in imageList" :key="index" style="height: 45vh">
          <img :src="item" alt="" style="height: 100%; width: 100%" draggable="false" />
        </nut-swiper-item>
        <template #page>
          <div class="swiper-pagination">
            <div class="swiper-pagination-active">{{ swiperPage }}</div>
            <div class="swiper-pagination-page-total">4</div>
          </div>
        </template>
      </nut-swiper>
      <view class="commodity-detail">
        <view>
          <nut-price :price="99" size="large" />
        </view>
        <view class="commodity-desc-card">
          <view class="commodity-desc-title">
            200g±20g | 广西三月李（单果酸爽7克送椒盐）好好好广西三月李（单果酸爽7克送椒盐）好好好
          </view>
          <view class="commodity-desc-tags">
            <nut-tag plain type="primary" color="#c8cacc" text-color="#000000"> 产地：武利 </nut-tag>
            <nut-tag plain type="primary" color="#c8cacc" text-color="#000000"> 保质期：5天 </nut-tag>
          </view>
          <view class="commodity-desc-other">
            配送到小区自提 72小时坏果包退
          </view>
          <view class="commodity-desc-delivery">
            <view>明天16:00点提货，查看附近配送点</view>
            <IconFont name="right"></IconFont>
          </view>
        </view>
        <view>
          <view class="user-evaluation-card">
            <view>用户评价(543)</view>
            <view class="user-evaluation-box-container">
              <view class="user-evaluation-box" v-for="i in 3" :key="i">
                <view class="user-evaluation">
                  <view>
                    <view class="user-evaluation-uinfo">
                      <nut-avatar size="small"> 王 </nut-avatar>
                      <view>
                        <view>舜菲853</view>
                        <view>
                          <template v-for="i in 3" :key="i">
                            <IconFont color="#ff3131" size="13" name="star-fill-n"></IconFont>
                          </template>
                          <template v-for="i in 2" :key="i">
                            <IconFont name="star-n" size="13"></IconFont>
                          </template>
                        </view>

                      </view>
                    </view>
                    <view class="user-evaluation-text">
                      个头大小：大
                    </view>
                  </view>
                  <view>
                    <image class="square-img" src="https://yijhsite-1251621866.cos.ap-guangzhou.myqcloud.com/test.png">
                    </image>
                  </view>
                </view>
              </view>
              <view class="user-evaluation-more">
                查看更多
                <IconFont name="rect-right" size="16"></IconFont>
              </view>
            </view>
          </view>
        </view>
        <view class="commodity-params-card" style="margin-top: 10px;">
          <view style="font-weight: 600;">商品详情</view>
          <view class="commodity-params">
            <nut-row v-for="i in 4" :key="i">
              <nut-col :span="5" style="font-size: small; font-weight: lighter;">产地</nut-col>
              <nut-col :span="19" style="font-size: small; ">灵山</nut-col>
            </nut-row>
          </view>
          <view class="commodity-images">
            <template v-for="i in 5" :key="i">
              <image mode="aspectFit"
                src="https://yijhsite-1251621866.cos.ap-guangzhou.myqcloud.com/20231111122808.png"></image>
            </template>
          </view>
        </view>
        <view class="commodity-params-card commodity-guide-card">
          选购指南
          <view class="commodity-guide">
            <view v-for="item in  shoppingGuides" :key="item.title">
              <view class="commodity-guide-title">{{ item.title }}</view>
              <view class="commodity-guide-desc">{{ item.desc }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom-funtion-area">
      <view class="funtion-area-A">
        <view class="funtion-area-Aa ">
          <IconFont name="message"></IconFont>
          <view>咨询</view>
        </view>
        <view class="funtion-area-Aa ">
          <nut-badge :value="1" :max="99">
            <IconFont name="cart"></IconFont>
          </nut-badge>
          <view>购物车</view>
        </view>
      </view>
      <view class="funtion-area-B">
        <nut-button shape="square" style="width: 50%; border-top-left-radius: 999px; border-bottom-left-radius: 999px;"
          plain type="primary">加入购物车</nut-button>
        <nut-button shape="square" style="width: 50%; border-top-right-radius: 999px; border-bottom-right-radius: 999px"
          type="primary" @click="buy">立即购买</nut-button>
      </view>
    </view>
    <view v-show="displayBacktop">
      <IconFont class="backtop" @click="toTop" name="top"></IconFont>
    </view>
  </view>
</template>

<script setup>
import Taro, { usePageScroll } from '@tarojs/taro';
import { ref } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';

const id = ref(0)
const isLoading = ref(true)
const swiperPage = ref(1)
const showPreview = ref(false)
const showImgData = ref([])
const initShowImgNo = ref(0)
const displayBacktop = ref(false)

usePageScroll((res) => {
  if (res.scrollTop > 100) {
    displayBacktop.value = true
  } else {
    displayBacktop.value = false
  }
})
const buy = () => {
  Taro.navigateTo({
    url: '../makeOrder/Index?id=' + id ,
  })
}
const toTop = () => {
  Taro.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
}

const shoppingGuides = [
  {
    title: '每天下单',
    desc: '每天23点前可选购明日送达的产品，23点后选购的商品后天送达。预售品送货时间以订单页面为准。'
  },
  {
    title: '物流配送',
    desc: '物流会将您下单时设置的配送时间，配送到您选定的配送点。'
  },
  {
    title: '门店自提',
    desc: '每天16点提货，提货时间可能有误差，请以通知为准。'
  },
  {
    title: '售后无忧',
    desc: '若购买的商品有问题，可联系客服进行处理。'
  }
]

const imageList = ref([
  'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
  'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
  'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
  'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
]);

const userEvaluations = [
  {
    star: 4,

  }
]

Taro.useLoad(options => {
  id.value = options.id
  isLoading.value = false
  showImgData.value = [
    { src: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg' },
    { src: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg' },
    { src: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg' },
    { src: 'https://storage.360buyimg.com/jdc-article/fristfabu.jpg' },
  ]
})

const onSwiperChange = (index) => {
  swiperPage.value = index + 1;
};

const swiperClick = () => {
  initShowImgNo.value = swiperPage.value - 1
  showPreview.value = true
}

const hidePreview = () => {
  showPreview.value = false
}



</script>

<style>
.backtop {
  position: fixed;
  bottom: 150px;
  right: 30px;
  background-color: #fff;
  border-radius: 999px;
  border: 0.5px solid #e6e4e4;
  padding: 10px;
}

.commodity-guide-desc {
  font-weight: lighter;
  font-size: small;
}

.commodity-guide-title {
  font-weight: bold;
  font-size: small;
}

.commodity-guide {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  gap: 20px;
}

.commodity-guide-card {
  margin-bottom: 120px;
}

.commodity-params {
  margin: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px
}

.commodity-images {
  width: 100%;
  text-align: center;
}

.user-evaluation-more {
  width: 20px;
  font-size: small;
  font-weight: lighter;
  margin-top: 10px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 20px;
}

.user-evaluation-text {
  margin: 10px;
  font-size: 25px;
}

.square-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 20px;
}

.user-evaluation-uinfo {
  display: flex;
  font-size: 22px;
  gap: 10px;

}

.user-evaluation {
  margin-top: 10px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 20px;
  width: 70vw;
  display: flex;
  justify-content: space-between;
}

.user-evaluation-box {
  gap: 20px;
  display: flex;
}

.user-evaluation-box-container {
  overflow-x: scroll;
  display: flex;
  gap: 10px;
}

.user-evaluation-box-container::-webkit-scrollbar {
  display: none;
}

.user-evaluation-card {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
}


.commodity-desc-other {
  margin: 10px;
  background-color: #edeff2;
  border-radius: 10px;
  font-weight: lighter;
  font-size: small;
}

.commodity-desc-delivery {
  font-size: small;
  display: flex;
  justify-content: space-between;
  margin-top: 20px
}

.commodity-desc-tags {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  gap: 10px;
}

.commodity-desc-card {
  border-radius: 40px;
  background-color: #fff;
  padding: 10px;
}

.commodity-params-card {
  border-radius: 40px;
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
}

.commodity-desc-title {
  font-size: large;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.funtion-area-A {
  display: flex;
  justify-content: space-around;
  align-content: center;
  gap: 20px;
  font-weight: lighter;
  font-size: small;
}

.funtion-area-B {
  margin-right: 30px;
  display: flex;
  width: 70vw;
}

.funtion-area-Aa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom-funtion-area {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100vw;
  z-index: 99;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e6e4e4;
}

.commodity-detail {
  transform: translateY(-20px);
  min-height: 100vh;
  margin-top: -30px;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  background-color: #f7f8fa;
  padding: 20px;
}

.page {}

.skeleton-picture {}

.skeleton-picture .item {}

.swiper-pagination {
  position: absolute;
  bottom: 50px;
  right: 30px;
  background: rgba(0, 0, 0, 0.33);
  border-radius: 1111px;
  text-align: center;
  color: #fff;
  height: 40px;
  font-size: 14px;
  margin: auto;
  z-index: 9;
  display: flex;
  justify-content: space-around;
}

.swiper-pagination-active {
  border-radius: 50%;
  background: rgba(14, 13, 13, 0.23);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination-page-total {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
