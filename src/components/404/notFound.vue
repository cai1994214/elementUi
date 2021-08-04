<template>
  <div class="wave-svg">
    <el-collapse-transition>
      <div class="not-found-number" v-show="showNumber">
        <span class="number one">4</span>
        <span class="number two">0</span>
        <span class="number three">4</span>
      </div>
    </el-collapse-transition>
    <svg class="wave" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path>
        <animate attributeName="d" values="M0,50 A50,200 0 0,1 50,50 A50,200 0 0,0 100,50 L100,100 L0,100;M0,60 A50,50 0 0,1 50,50 A50,50 0 0,0 100,50 L100,100 L0,100;M0,50 A50,200 0 0,1 50,50 A50,200 0 0,0 100,50 L100,100 L0,100" dur="10s" repeatCount="indefinite" rotate="auto"></animate>
      </path>
      <path>
        <animate attributeName="d" values="M0,50 A50,200 0 0,1 50,50 A50,200 0 0,0 100,50 L100,100 L0,100;M0,60 A50,50 0 0,1 50,50 A50,50 0 0,0 100,50 L100,100 L0,100;M0,50 A50,200 0 0,1 50,50 A50,200 0 0,0 100,50 L100,100 L0,100" keyTimes="0; 0.25; 0.25; 0.5; 0.75; 0.75; 1" dur="20s" repeatCount="indefinite" rotate="auto"></animate>
      </path>
      <path>
        <animate attributeName="d" values="M0,50 A50,150 0 0,0 40,50 A50,100 0 0,1 100,50 L100,100 L0,100; M0,30 A50,300 0 0,0 40,50 A50,150 0 0,1 100,50 L100,100 L0,100; M0,50 A50,150 0 0,0 40,50 A50,100 0 0,1 100,50 L100,100 L0,100" dur="15s" repeatCount="indefinite" rotate="auto"></animate>
      </path>
      <path>
        <animate attributeName="d" values="M0,50 A50,200 0 0,1 50,50 A50,200 0 0,0 100,50 L100,100 L0,100;M0,50 A50,0 0 0,1 50,50 A50,0 0 0,0 100,50 L100,100 L0,100;M0,50 A50,0 0 0,0 50,50 A50,0 0 0,1 100,50 L100,100 L0,100;M0,50 A50,200 0 0,0 50,50 A50,200 0 0,1 100,50 L100,100 L0,100;M0,50 A50,0 0 0,0 50,50 A50,0 0 0,1 100,50 L100,100 L0,100;M0,50 A50,0 0 0,1 50,50 A50,0 0 0,0 100,50 L100,100 L0,100;M0,50 A50,200 0 0,1 50,50 A50,200 0 0,0 100,50 L100,100 L0,100;" keyTimes="0; 0.25; 0.25; 0.5; 0.75; 0.75; 1" dur="30s" repeatCount="indefinite" rotate="auto"></animate>
      </path>
    </svg>
    <transition name="el-fade-in">
      <div class="content" id="content">
        <div class="not-found-text" v-show="showText">
          <h1 class="title">对不起，您访问的页面不存在……</h1>
          <svg class="background-wave">
            <defs>
              <filter id="wreckit">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"></feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"></feDisplacementMap>
              </filter>
            </defs>
          </svg>
        </div>
        <el-button class="back-btn" @click="goHome" v-show="showText">返回首页</el-button>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'not-found-animation',
  data () {
    return {
      showNumber: false,
      showText: false
    }
  },
  computed: {
    // 首页地址
    homePath () {
      return {name: 'homeLink'}
    }
  },
  methods: {
    initEvent () {
      var self = this
      var x = document.getElementById('content')
      var myStartFunction = () => {
        self.showNumber = true
        self.showText = true
      }
      // Chrome, Safari 和 Opera 代码
      x.addEventListener('webkitAnimationEnd', myStartFunction)
      // 标准语法
      x.addEventListener('animationend', myStartFunction)
    },
    goHome () {
      this.$router.push(this.homePath)
    }
  },
  mounted () {
    this.initEvent()
  }
}
</script>

<style scoped lang="scss">
.not-found-number {
  text-align: center;
  color: #00e8fe;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10vmax;
  position: relative;
  top: 125px;
  font-weight: 700;
  z-index: -999;
  .one {
    animation-delay: -5.76s;
  }
  .two {
    animation-delay: -5.52s;
  }
  .three {
    animation-delay: -5.28s;
  }
}
.title {
  color: #fff;
  font-size: 24px;
  margin: 0;
  padding: 0;
}

@-moz-keyframes wavemover {
  100% {
    padding-left: 200px;
    transform: translateX(-100px);
  }
}

@-webkit-keyframes wavemover {
  100% {
    padding-left: 200px;
    transform: translateX(-100px);
  }
}

@-o-keyframes wavemover {
  100% {
    padding-left: 200px;
    transform: translateX(-100px);
  }
}

@keyframes wavemover {
  100% {
    padding-left: 200px;
    transform: translateX(-100px);
  }
}
.not-found-text {
  height: 100px;
  text-align: center;
  filter: url("#wreckit");
  animation: wavemover 10s infinite alternate linear;
}
@keyframes fillUpSvg {
  0% {
    height: 0;
    min-height: 0;
  }
  100% {
    height: 45vh;
  }
}
.wave-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
}
.wave {
  width: 100%;
  height: 200px;
  display: block;
}
.background-wave {
  height: 10px;
}
.wave path {
  fill: rgba(#31547f, 0.15);
  animation: wave infinite linear;
}

.wave path:nth-child(1) {
  fill: #2F4F4F;
  animation-delay: 20s;
  animation-duration: 50s;
}

.wave path:nth-child(2) {
  fill: #008080;
  animation-delay: 10s;
  animation-duration: 30s;
}

.wave path:nth-child(3) {
  fill: #20B2AA;
  animation-delay: 5s;
  animation-duration: 10s;
}

.wave path:nth-child(4) {
  fill: #48D1CC;
  animation-duration: 5s;
}

.content {
  width: 100%;
  height: 25vh;
  background: #48D1CC;
  animation: fillUpSvg 0.5s linear;
  text-align: center;
}

@keyframes wave {
  0%,
  100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.3);
  }
}

.animate-text {
  width: 100%;
  height: 100px;
}

@keyframes slow-wave {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-15px);
  }
}

.not-found-number span {
  display: inline-block;
  animation-duration: 2s;
  animation-name: slow-wave;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.back-btn {
  background: transparent;
  color: #fff;
  padding: 9px 30px;
  border-radius: 20px;
}
</style>
