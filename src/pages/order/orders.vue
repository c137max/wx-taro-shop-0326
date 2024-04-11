<script setup>
import {onBeforeMount} from "vue";
// props
const props = defineProps({
  values: {
    type: Array,
    required: true
  },
  type: String
});


// mounted
onBeforeMount(() => {
  console.log(props.values);
});

</script>

<template>
  <view v-if="values.length === 0">
    <nut-empty image="empty" description="暂时没有相关的订单，快去下单吧！"></nut-empty>
  </view>
  <scroll-view v-else :scroll-y="true" :scroll-x="false" class="w-full scroll-h">
    <view v-for="order in values" class="bg-white mb-2  p-2 rounded shadow">

      <view className="flex flex-col gap-2 ">
        <view v-for="commodity in order.commodities">
          <view className="flex flex-row justify-between align-top">
            <view className="flex min-w-0 gap-1">
              <image :src="commodity.image" className="w-16 h-16 rounded"></image>
              <view className="font-serif  font-light " style="width: 60vw; ">
                <view className="line-clamp-2 overflow-ellipsis">{{ commodity.unit }} | {{ commodity.title }}</view>
              </view>
            </view>
            <view>
              <view className="font-bold">￥{{ commodity.price }}</view>
              <view className="text-sm text-gray-400 text-right ">x{{ commodity.count }}</view>
            </view>
          </view>
        </view>
        <view className="border-y border-x-0 border-neutral-300 border-dashed text-neutral-500 text-right text-sm ">
          <p>总计{{order.commodities.length}}件商品 <span className="text-black inline">实付:￥{{order.actualPay}}</span></p>
        </view>
        <view class="flex flex-row justify-end gap-2 mr-1">
          <nut-button class="rounded" plain type="default" shape="square" size="mini">查看物流</nut-button>
          <nut-button v-if="order.status === 1" class="rounded" plain type="primary" shape="square" size="mini">确认提货</nut-button>
          <nut-button v-if="order.status === 3" class="rounded" plain type="primary" shape="square" size="mini">立即评价</nut-button>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style>
.scroll-h {
  height: 89vh;
}
</style>
