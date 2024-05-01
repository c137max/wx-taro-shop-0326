<script setup>

import Taro from "@tarojs/taro";
import {useReady} from '@tarojs/taro'
import {ref} from "vue";
import {IconFont} from '@nutui/icons-vue-taro'
import {getLocationDesc, getSelfPickList, wordTransToCoordinate} from "../../http/map";
import {selfPickUpPng} from "../../image/image";

let mapCtx = null;
const posDesc = ref('');
const isLocaling = ref(false);
const lg = ref(22.324520);
const la = ref(23.099994);


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
          console.log(res)
          la.value = res.latitude
          lg.value = res.longitude
          getLocationDesc(res.latitude, res.longitude).then(getLocationDescThen)
          getSelfPickAndShow(res.latitude, res.longitude)
        }
      })
    },
    complete() {
      isLocaling.value = false
    }
  })
}

const getSelfPickLocation = (id) => {
  const sp = selfPickList.value.find(item => item.id === id)
  if (sp) {
    mapCtx.moveToLocation({
      latitude: sp.latitude,
      longitude: sp.longitude
    })
  }
}
const getLocationDescThen = (res) => {
  posDesc.value = res.result.formatted_addresses.recommend
}

const onPosWordSearch = () => {
  const value = posDesc.value
  if (value === '') {
    return
  }
  wordTransToCoordinate(value).then(res => {
    const latitude = res.result.location.lat
    const longitude = res.result.location.lng
    lg.value = longitude
    la.value = latitude
    mapCtx.moveToLocation({
      latitude,
      longitude,
    })
  })
}
const resetPosWord = () => {
  posDesc.value = ''
}

const selfPickList = ref([  // 自提点
  // {
  //   id: 1,
  //   displayName: '金腾江湾美宜佳店(测试)',
  //   address: '小区1号楼101（美宜佳便利店）测试',
  //   latitude: 22.785102290892556,
  //   longitude: 108.49709043054145,
  //   avatarUrl: '',
  //   contactName: '',
  //   distance: 50
  // },
])
const onMarkerTap = (e) => {
  console.log(e)
}

const displayPageIndex = ref(0)
const changePageIndex = (index) => {
  displayPageIndex.value = index
}

const addSelfPosMarker = (latitude, longitude) => {
  mapCtx.removeMarkers({
    markerIds: [-1],
    success() {
      mapCtx.addMarkers({
        markers: [
          {
            id: -1,
            latitude,
            longitude,
            width: 29,
            height: 35,
          }
        ]
      })
    }
  })
}

const onMapTap = (e) => {
  console.log(e)
  const {latitude, longitude} = e.detail
  addSelfPosMarker(latitude, longitude)
  getLocationDesc(latitude, longitude).then(getLocationDescThen)
  mapCtx.moveToLocation({
    latitude,
    longitude,
  })
  getSelfPickAndShow(latitude, longitude)
}

const getSelfPickAndShow = (latitude, longitude) => {
  getSelfPickList({
    latitude,
    longitude
  }).then(result => {
    selfPickList.value = result;
    const markers = result.map(item => {
      return {
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        width: 29,
        height: 35,
        callout: {
          content: item.displayName,
          borderRadius: 10,
          padding: 10,
          display: 'BYCLICK',
          bgColor: '#ffffff',
          color: '#000000',
        },
        iconPath: selfPickUpPng
      }
    })
    mapCtx.addMarkers({
      markers
    })
  })
}

const navigate = ({latitude, longitude, displayName, address}) => {
  Taro.openLocation({
    latitude,
    longitude,
    scale: 18,
    name: displayName,
    address: address
  })
}
</script>

<template>
  <view>
    <div class="flex justify-around m-2 text-center">
      <div @click="()=> changePageIndex(0)"
           :class="['w-full h-full', displayPageIndex === 0 ? 'border-b bg-amber-100' : '']">
        我的自提点
      </div>
      <div @click="()=> changePageIndex(1)"
           :class="['w-full h-full', displayPageIndex === 1 ? 'border-b bg-amber-100' : '']">
        选择自提点
      </div>
    </div>
    <view v-show="displayPageIndex===1">
      <view className="bg-white p-4 rounded mb-1">
        <view className="font-mono text-sm">
          <nut-textarea :autosize="{ maxHeight: 60, minHeight: 60 }" v-model="posDesc" placeholder="请输入地址"
                        limit-show :max-length="50"/>
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
          scale="18"
          :show-location="true"
          :enable-scroll="true"
          :enable-scale="true"
          :enable-overlooking="true"
          :enable-rotate="true"
          @marker-tap="onMarkerTap"
          @tap="onMapTap"
      />
      <scroll-view :scroll-y="true">
        <view v-for="selfPick in selfPickList" :key="selfPick.id" className="bg-white p-2">
          <view className="flex justify-between items-center gap-1  mt-1 ">
            <view class="flex gap-2">
              <nut-avatar :src="selfPick.avatarUrl" :size="50" :round="true"/>
              <view class="flex-1">
                <view className="font-bold">{{ selfPick.displayName }}</view>
                <view className="text-gray-400">{{ selfPick.address }}</view>
              </view>
            </view>
            <view class=" font-light font-mono text-gray-500">
              直线距离{{ selfPick.distance }}米
            </view>
          </view>
          <view class="flex justify-end gap-5 mt-1">
            <nut-button size="small" type="primary">
              <template #icon>
                <IconFont color="#ffffff" name="plus"></IconFont>
              </template>
              加入自提点
            </nut-button>
            <nut-button size="small" @click="() => getSelfPickLocation(selfPick.id)">
              <template #icon>
                <IconFont name="location"></IconFont>
              </template>
              位置
            </nut-button>
            <nut-button size="small" @click="() => navigate(selfPick)">
              导航
            </nut-button>
          </view>
        </view>
        <view v-show="selfPickList.length === 0">
          <nut-empty image="empty" description="附近1公里内暂时没有配送点，您可以点击下面的按钮向我们反馈">
            <div style="margin-top: 10px">
              <nut-button type="primary">反馈</nut-button>
            </div>
          </nut-empty>
        </view>
      </scroll-view>
    </view>
    <view v-show="displayPageIndex===0">
      <scroll-view :scroll-y="true" style="height:  90vh;">
        <view v-for="selfPick in selfPickList" :key="selfPick.id" className="bg-white p-2">
          <view className="flex justify-between items-center gap-1  mt-1 ">
            <view class="flex">
              <nut-avatar :src="selfPick.avatarUrl" :size="50" :round="true"/>
              <view>
                <view className="font-bold">{{ selfPick.displayName }}</view>
                <view className="text-gray-400">{{ selfPick.address }}</view>
              </view>
              <view class="font-light font-mono text-gray-500">
                {{ selfPick.distance }}米
              </view>
            </view>
          </view>
          <view class="flex justify-end gap-5 mt-1">
            <nut-button size="small">
              删除自提点
            </nut-button>
            <nut-button size="small" @click="() => navigate(selfPick)">
              导航
            </nut-button>
          </view>
        </view>
        <nut-empty image="empty" description="您还未添加自提点，点击下面的按钮来查找附近的自提点">
          <div style="margin-top: 10px">
            <nut-button type="primary" @click="() => changePageIndex(1)">查找</nut-button>
          </div>
        </nut-empty>
      </scroll-view>
    </view>
  </view>
</template>

<style>

</style>
