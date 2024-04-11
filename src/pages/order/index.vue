<template>
  <nut-tabs v-model="tabValue" swipeable background="#f7f8fa">
    <nut-tab-pane title="进行中" pane-key="1">
      <orders :values="ongoingOrders"></orders>
    </nut-tab-pane>
    <nut-tab-pane title="全部订单" pane-key="2">
      <orders :values="orders"></orders>
    </nut-tab-pane>
    <nut-tab-pane title="待评价" pane-key="3">
      <orders :values="unEvaluateOrders"></orders>
    </nut-tab-pane>
    <nut-tab-pane title="退款/售后" pane-key="4">
      <orders :values="afterSaleOrRefundOrders"></orders>
    </nut-tab-pane>
  </nut-tabs>
</template>

<script setup>
import {onBeforeMount, ref} from 'vue';
import Orders from "./orders.vue";


const orders = ref([
  {
    id: 1,
    commodities: [
      {
        image: '../../image/test.png',
        title: 'test【农家自制】【小份装】新鲜小米辣椒test【农家自制】【小份装】新鲜小米辣椒',
        unit: '50g±10g/袋',
        price: 30,
        count: 1,
      },
      {
        image: '../../image/test.png',
        title: '2【农家自制】【小份装】新鲜小米辣椒test【农家自制】【小份装】新鲜小米辣椒',
        unit: '50g±10g/袋',
        price: 30,
        count: 1,
      }
    ],
    status: 1,
    actualPay: 30,  // 实际付款
  },
  {
    id: 2,
    commodities: [
      {
        image: '../../image/test.png',
        title: 'test【农家自制】【小份装】新鲜小米辣椒',
        unit: '50g±10g/袋',
        price: 30,
        count: 1,
      },
      {
        image: '../../image/test.png',
        title: '2【农家自制】【小份装】新鲜小米辣椒test【农家自制】【小份装】新鲜小米辣椒',
        unit: '50g±10g/袋',
        price: 30,
        count: 1,
      }
    ],
    status: 1,
    statusDescription: '订单已确认, 开始配货',
    actualPay: 30,  // 实际付款
  },
])
// status description
// 进行中 1 已经评价 2 待评价 3 售后 4  退款 5
let ongoingOrders = ref([])
let unEvaluateOrders = ref([])
let afterSaleOrRefundOrders = ref([])

onBeforeMount(() => {
  ongoingOrders.value = orders.value.filter(item => item.status === 1)
  unEvaluateOrders.value = orders.value.filter(item => item.status === 3)
  afterSaleOrRefundOrders.value = orders.value.filter(item => item.status === 4 || item.status === 5)
})

const tabValue = ref(1)

</script>

<style>
.nut-tab-pane {
  background-color: #f7f8fa;
  padding: 20px 20px;
}
</style>
