<script lang="ts">
import { getDynamicMapCss, getBaseCss, getCombinedCssString } from "./dynamic-map-css";
import { useConvertToAlpha2 } from "@/hooks/useConvertToAlpha2";
import type { ICountryList } from "@/types";
import chroma from "chroma-js";
import Map from "./Map.vue";

let legend = {
  data: null,
  code: 0,
  name: null,
};

let position = {
  left: 0,
  top: 0,
};

export default {
  name: "MapChart",
  components: { Map },
  watch: {
    countryData() {
      this.renderMapCSS();
    },
  },
  props: {
    lowColor: { type: String, default: "#fff" },
    highColor: { type: String, default: "#8067DC" },
    countryData: { type: Object, required: true },
    defaultCountryFillColor: { type: String, default: "#dadada" },
    countryStrokeColor: { type: String, default: "#909090" },
    width: { type: Number, default: 800 },
    height: { type: Number, default: 400 },
    text: { type: String, default: "" },
    scale: {
      type: Object,
      default: {
        show: true, // show scale
        position: "bottom-right", // ex: bottom-left, bottom-right, top-left, top-right
        lebel: { show: true, fontSize: 10, color: "#000" }, // label style
      },
    },
  },
  data() {
    return {
      legend: legend,
      position: position,
      node: document.createElement("style"),
      chromaScale: chroma.scale([this.$props.lowColor, this.$props.highColor]),
      convertToAlpha2: {} as any,
    };
  },
  methods: {
    onHoverCountry(country: any) {
      this.legend = country;
      this.position = country.position;
      this.$emit("hoverCountry", country);
    },
    onHoverLeaveCountry(country: any) {
      this.legend = {
        data: null,
        code: 0,
        name: null,
      };
      this.$emit("hoverLeaveCountry", country);
    },
    renderMapCSS() {
      const baseCss = getBaseCss(this.$props);
      const dynamicMapCss = getDynamicMapCss(this.convertToAlpha2, this.chromaScale);
      this.$data.node.innerHTML = getCombinedCssString(baseCss, dynamicMapCss);
    },
  },
  mounted() {
    useConvertToAlpha2(this.$props.countryData).then((res) => {
      this.convertToAlpha2 = res;
      document.body.appendChild(this.$data.node);
      this.renderMapCSS();
    });
  },
};
</script>

<template>
  <div class="vue-world-map" :style="{ width: width + 'px', height: height + 'px' }">
    <Map @hoverCountry="onHoverCountry" @hoverLeaveCountry="onHoverLeaveCountry" />

    <div v-if="legend.name" class="vue-map-legend" :style="'left:' + position.left + 'px; top: ' + position.top + 'px'">
      <div class="vue-map-legend-header">
        <span>{{ legend.name }}</span>
      </div>
      <div class="vue-map-legend-content">
        <span>{{ convertToAlpha2[legend.code] || 0 }} {{ text }}</span>
      </div>
    </div>

    <div
      class="scale"
      v-if="scale.show"
      :style="{
        left: scale.position === 'bottom-left' || scale.position === 'top-left' ? '10px' : 'auto',
        right: scale.position === 'bottom-right' || scale.position === 'top-right' ? '10px' : 'auto',
        top: scale.position === 'top-left' || scale.position === 'top-right' ? '10px' : 'auto',
        bottom: scale.position === 'bottom-left' || scale.position === 'bottom-right' ? '10px' : 'auto',
      }"
    >
      <div class="scale-content">
        <div
          class="scale-item"
          v-for="(item, i) in 10"
          :key="i"
          :style="{ background: chromaScale(i / 10).hex() }"
          :class="{ 'scale-item-first': i === 0, 'scale-item-last': i === 9 }"
        >
          <span v-if="scale.lebel.show" :style="{ fontSize: scale.lebel.fontSize + 'px', color: scale.lebel.color }" class="scale-label">
            {{ (Object.keys(countryData).length * i) / 10 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vue-world-map {
  position: relative;
}

.vue-map-legend {
  width: 185px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 3px 16px 0px #e9e5e5;
  position: absolute;
}

.vue-map-legend-header {
  padding: 10px 15px;
  color: #000;
}

.vue-map-legend-content {
  padding: 10px 15px;
  background: #dadbda8f;
  border-top: 1px solid #acacad;
  color: #000;
}

.scale {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  background: #fff;
}

.scale-item-first {
  border-radius: 150px 0 0 150px;
}
.scale-item-last {
  border-radius: 0 150px 150px 0;
}
.scale-item {
  width: 30px;
  height: 10px;
  display: inline-block;
}

.scale-label {
  display: inline-block;
  margin-left: 5px;
  margin-top: 1.5rem;
}
</style>
