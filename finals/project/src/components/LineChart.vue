<template>
    <div>
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </template>
  
  <script setup>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  } from 'echarts/components';
  import VChart from 'vue-echarts';
  import { ref } from 'vue';
  
  use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  ]);
  
  const props = defineProps({
    chartData: {
      type: Object,
      required: true
    }
  });
  
  const option = ref({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: props.chartData.datasets.map(d => d.label)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.chartData.labels
    },
    yAxis: {
      type: 'value'
    },
    series: props.chartData.datasets.map(dataset => ({
      name: dataset.label,
      type: 'line',
      smooth: true,
      lineStyle: {
        color: dataset.borderColor,
        width: 2
      },
      areaStyle: {
        color: dataset.backgroundColor
      },
      data: dataset.data
    }))
  });
  </script>
  
  <style scoped>
  .chart {
    height: 300px;
    width: 100%;
  }
  </style>