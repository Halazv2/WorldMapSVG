<script setup lang="ts">
import WorldMap from "./components/map/WorldMap.vue";
import Gauge from "./components/charts/Gauge.vue";
import { ref } from "vue";

const countryData = ref({
  US: 500,
  CA: 300,
  GB: 400,
  FR: 100,
  DE: 200,
  IN: 100,
  CN: 200,
  JP: 300,
  BR: 400,
  AU: 500,
  ZA: 100,
  EG: 200,
  RU: 300,
  NG: 400,
  MX: 500,
  ID: 100,
  TR: 200,
  AR: 300,
  SA: 400,
  IR: 500,
  PK: 100,
  Morocco: 900,
  IQ: 200,
  VN: 300,
  China: 400,
  PH: 400,
  BD: 500,
  TH: 100,
  Croatia: 800,
  IT: 200,
  PL: 300,
  KE: 400,
  Algeria: 800,
  UA: 500,
  ES: 100,
  CO: 200,
});
</script>

<template>
  <WorldMap
    :countryData="countryData"
    :text="'visitor'"
    :defaultCountryFillColor="'#dadada'"
    :countryStrokeColor="'#909090'"
    :width="400"
    :height="200"
    :lowColor="'#F0F0F0'"
    :highColor="'#6794DC'" />
  <!-- <Gauge
    fontSize="1em"
    :min="0"
    :max="100"
    :dp="1"
    :value="10"
    unit="%"
    style="width: 430px"
    inactiveFill="#212121"
    :minThreshold="20"
    :maxThreshold="70"
    minThresholdFill="lawngreen"
    maxThresholdFill="darkred"
  /> -->
</template>

<style scoped>
.body {
  background-color: #f5f5f5;
  width: 80%;
}
</style>
