<!--
  - Module name:  ws_ui_inexus
  - Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
  - 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
  - Description:
  -->

<template>
  <div class="measurement-container">
    <!-- 背景层 -->
    <div class="background-layer"></div>

    <!-- 主圆形区域 -->
    <div class="main-ellipse">
      <!-- 中心主按钮 -->
      <!-- <div class="center-button" @click="handleQuickMeasure">
        <div class="button-text">
          <div class="main-text">快速测量</div>
          <div class="sub-text">你可以直接进行</div>
        </div>
      </div> -->
      <div class="center-button" @click="handleQuickMeasure">
        <div class="center-img">
          <img src="@/assets/images/experiment/top_bg.png" alt="" />
          <div class="button-text">
            <div class="main-text">快速测量</div>
            <div class="sub-text">你可以直接进行</div>
          </div>
        </div>
      </div>

      <!-- 环绕的时间选项 -->
      <div
        v-for="(option, index) in timeOptions"
        :key="option.value"
        class="time-option"
        :style="{
          ...(measureType === option.value
            ? {
                color: 'white !important',
                background: '#5CB265',
              }
            : {}),
        }"
        @click="handleMoudleSelect(option.value)"
        @mouseenter="isHovered[index] = true"
        @mouseleave="isHovered[index] = false"
      >
        <div
          class="circle-box"
          :style="{
            ...(measureType === option.value
              ? {
                  backgroundColor: 'white !important',
                }
              : {}),
          }"
        ></div>
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'QuickMeasurement',
  emits: ['moduleSelect'],
  setup(props, ctx) {
    const timeOptions = ref([
      { label: '光度测量', value: '光度测量' },
      { label: '定量测定', value: '定量测定' },
      { label: '光谱扫描', value: '光谱扫描' },
      { label: '时间扫描', value: '时间扫描' },
      { label: '双组分测定', value: '双组分测定' },
    ])
    const isHovered = ref<boolean[]>(Array(timeOptions.value.length).fill(false))
    const handleQuickMeasure = () => {
      console.log('快速测量触发')
      // 这里添加测量逻辑
    }
    const measureType = ref('光谱扫描')
    const handleMoudleSelect = (value: string) => {
      measureType.value = value
      ctx.emit('moduleSelect', value)
      // 这里添加时间选择逻辑
      console.log('时间选择触发', value)
    }

    // const getOptionStyle = (index: number) => {
    //   // 使用椭圆方程来定位元素，使它们排列在一个扁平的椭圆上
    //   const angle = index * 45 - 90 // 每个选项间隔45度，从顶部开始
    //   const horizontalRadius = 150 // 水平半径（长半轴）
    //   const verticalRadius = 130 // 垂直半径（短半轴），较小的值使椭圆更扁

    //   // 使用椭圆参数方程计算位置
    //   const x = parseInt(horizontalRadius * Math.cos((angle * Math.PI) / 180))
    //   const y = parseInt(verticalRadius * Math.sin((angle * Math.PI) / 180))

    //   return {
    //     transform: `translate(${x}px, ${y}px)`,
    //   }
    // }

    return {
      timeOptions,
      handleQuickMeasure,
      handleMoudleSelect,
      // getOptionStyle,
      isHovered,
      measureType,
    }
  },
})
</script>

<style scoped lang="less">
.measurement-container {
  // position: relative;
  height: 350px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
  padding: 20px 30px;
  background: rgba(175, 175, 175, 0.1);
  border-radius: 22px;
}

.main-ellipse {
  position: relative;
  width: 320px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: transparent;
}

.center-button {
  // width: 140px;
  // height: 140px;
  // border-radius: 50%;
  // background: #fff;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // color: #0038a8;
  // box-shadow:
  //   0 10px 30px rgba(0, 56, 168, 0.5),
  //   inset 0 -5px 10px rgba(0, 0, 0, 0.1),
  //   inset 0 5px 10px rgba(255, 255, 255, 0.2);
  // transition: all 0.3s ease;
  // position: relative;
  // // transform: translateX(-30%);
  // overflow: hidden;
  // z-index: 3;

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: -50%;
  //   left: -50%;
  //   width: 200%;
  //   height: 200%;
  //   background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  //   transform: rotate(0deg);
  //   transition: transform 0.6s ease;
  // }

  .center-img {
    width: 170px;
    height: auto;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .button-text {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      color: #113371;
      text-align: center;
      .main-text {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 6px;
      }
      .sub-text {
        font-size: 14px;
      }
    }
  }

  // &:hover {
  //   transform: scale(1.05);
  //   box-shadow:
  //     0 15px 40px rgba(0, 56, 168, 0.7),
  //     inset 0 -5px 10px rgba(0, 0, 0, 0.1),
  //     inset 0 5px 10px rgba(255, 255, 255, 0.3);

  //   &::before {
  //     transform: rotate(180deg);
  //   }
  // }

  &:active {
    transform: scale(0.98);
  }

  // .button-text {
  //   text-align: center;
  //   z-index: 2;

  //   .main-text {
  //     font-size: 22px;
  //     font-weight: 600;
  //     margin-bottom: 6px;
  //     text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  //   }

  //   .sub-text {
  //     font-size: 14px;
  //     opacity: 0.9;
  //     text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  //   }
  // }
}

.time-option {
  position: absolute;
  left: 300px;
  width: 105px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #595757;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  background: rgba(92, 178, 101, 0.4);
  box-shadow: 0px 2px 5px 0px rgba(13, 5, 9, 0.22);
  border-radius: 16px;
  z-index: 2;
  text-align: center;
  padding: 10px;

  &:hover {
    background: #b6e0be;
    // box-shadow:
    //   0 8px 20px rgba(0, 56, 168, 0.3),
    //   inset 0 2px 4px rgba(255, 255, 255, 0.8);
    color: white;
    z-index: 4;
  }

  .circle-box {
    width: 7px;
    height: 7px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: #5cb265;
  }
}

/* 使用CSS变量定义每个选项的位置 */
// .time-option:nth-child(1) { transform: translate(10px, 130px); }
.time-option:nth-child(2) {
  transform: translate(10px, -130px);
}
.time-option:nth-child(3) {
  transform: translate(120px, -70px);
}
.time-option:nth-child(4) {
  transform: translate(230px, 0px);
}
.time-option:nth-child(5) {
  transform: translate(120px, 70px);
}
.time-option:nth-child(6) {
  transform: translate(10px, 130px);
}
// .time-option:nth-child(7) { transform: translate(-130px, 0); }
// .time-option:nth-child(8) { transform: translate(-92px, -92px); }

// @keyframes pulse {
//   0% {
//     transform: scale(0.98);
//     opacity: 0.8;
//   }
//   100% {
//     transform: scale(1.02);
//     opacity: 1;
//   }
// }

/* 响应式调整 */
// @media (max-width: 480px) {
//   .measurement-container {
//     width: 300px;
//     height: 300px;
//   }

//   .main-circle {
//     width: 240px;
//     height: 240px;
//   }

//   .center-button {
//     width: 110px;
//     height: 110px;

//     .button-text .main-text {
//       font-size: 18px;
//     }
//   }

//   .time-option {
//     width: 60px;
//     height: 60px;
//     font-size: 12px;
//   }
// }
</style>
