<script setup>

import Taro from "@tarojs/taro";
import {useReady} from '@tarojs/taro'
import {reactive, ref} from "vue";
import {getLocationDesc, wordTransToCoordinate} from "../../http/map";

let mapCtx = null;
const posDesc = ref('');
const isLocaling = ref(false);
const lg = ref(113.324520);
const la = ref(23.099994);

const markers = reactive([
  {
    id: 1,
    title: '自提点名称',
    address: '东葛路211号',
    latitude: 111,
    longitude: 111,
    iconPath: 'https://yijhsite-1251621866.cos.ap-guangzhou.myqcloud.com/minapp/images/selfPick.png',
    width: 30,
    height: 30
  },
])

useReady(() => {
  mapCtx = Taro.createMapContext('myMap')
  getLocation()
})

const getLocation = () => {
  isLocaling.value = true
  mapCtx.moveToLocation({
    success() {
      mapCtx.getCenterLocation({
        success(res) {
          la.value = res.latitude
          lg.value = res.longitude
          getLocationDesc(res.latitude, res.longitude).then(res => {
            posDesc.value = res.result.pois[0].address
          })
        }
      })
    },
    complete() {
      isLocaling.value = false
    }
  })
}


const onPosWordSearch = () => {
  const value = posDesc.value
  if (value === '') {
    return
  }
  wordTransToCoordinate(value).then(res => {
    const latitude = res.result.location.lat
    const longitude = res.result.location.lng
    // lg.value = longitude
    // la.value = latitude
    mapCtx.moveToLocation({
      latitude,
      longitude,
    })
  })
}
const resetPosWord = () => {
  posDesc.value = ''
}

const shopAddressList = []

</script>

<template>
  <view>
    <view className="bg-white p-4 rounded mb-1">

      <view className="font-mono text-sm">
        <nut-textarea v-model="posDesc" autosize placeholder="请输入地址" limit-show :max-length="50"/>
        <view class="flex  gap-10">
          <nut-button size="small" @click="onPosWordSearch">搜索地址</nut-button>
          <nut-button size="small" @click="resetPosWord">清空</nut-button>
          <nut-button :loading="isLocaling" size="small" type="primary" @click="getLocation">定位</nut-button>
        </view>
      </view>
    </view>
    <map
        id="myMap"
        style="width: 100vw; height: 300px;"
        :longitude="lg"
        :latitude="la"
        scale="14"
        :show-location="true"
    />
    <view>

    </view>
  </view>
</template>

<style>

</style>
