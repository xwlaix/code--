<template>
  <div id="container"/>
</template>
<script>
// import { TMap } from '@/utils/TMap'
import { getAddress } from '@/utils/'

export default {
  data() {
    return {
    }
  },
  mounted() {
    // TMap('MJEBZ-P2QR4-VRTUZ-XL6JL-MXW2T-AOB5W&libraries=place').then(qq => {
    //   var map = new qq.maps.Map(document.getElementById('container'), {
    //     // 地图的中心地理坐标。
    //     center: new qq.maps.LatLng(39.916527, 116.397128),
    //     zoom: 8
    //   })
    //   console.log(map)
    // })
  },
  created: function() {
    getAddress()
  },
  methods: {
  }
}
</script>
<style>
#container {
    min-width:600px;
    min-height:767px;
}
</style>
