<template>
  <div class="content">
    <div
      id="container"
      style="width: 100%; height: 100%; position: absolute; z-index: 2"
    ></div>
    <canvas
      id="canvas"
      style="position: absolute; z-index: 1; filter: blur(5px)"
    ></canvas>
  </div>
</template>

<script type="text/jsx">
import { Mixins } from "./common";
const dragonImage = require("./dragon.jpg");
const bubbleImage = require("./bubble.png");

export default {
  name: "mousepage",
  data() {
    return {
      numArr: [],
    };
  },
  mixins: [Mixins],
  methods: {
    enter(e) {},
    leave(e) {},
    drawDragonImageInCanvas() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      var image = new Image();
      image.src = dragonImage;
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        var imageData = ctx.getImageData(0, 0, image.width, image.height).data;

        ctx.clearRect(0, 0, image.width, image.height);

        var gap = 10;

        var dragonContainer = document.getElementById("container");
        var dragonScale = 2;

        for (var h = 0; h < image.height; h += gap) {
          for (var w = 0; w < image.width; w += gap) {
            var position = (image.width * h + w) * 4;
            var r = imageData[position],
              g = imageData[position + 1],
              b = imageData[position + 2];

            if (r + g + b == 0) {
              var bubble = document.createElement("img");
              bubble.src = bubbleImage;
              bubble.setAttribute("class", "bubble");

              var bubbleSize = Math.random() * 10 + 20;

              bubble.style.left = w * dragonScale - bubbleSize / 2 + "px";
              bubble.style.top = h * dragonScale - bubbleSize / 2 + "px";

              bubble.style.width = bubble.style.height = bubbleSize + "px";

              bubble.style.animationDuration = Math.random() * 6 + 4 + "s";

              dragonContainer.appendChild(bubble);
            }
          }
        }
      };
    },
  },
  created() {
    console.log()
    this.$msgbox({
       title: '消息',
      dangerouslyUseHTMLString: true,
       message: (()=>(
         <div>
           <p>欢迎来到鼠标点击页面</p>
           <p>请点击鼠标左键</p>
            <el-button type="success">成功按钮</el-button>
         </div>
       ))(),
    });
  },
  mounted() {
    this.drawDragonImageInCanvas();
  },
};
</script>

<style scoped>
.content >>> .bubble {
  position: absolute;
  animation-timing-function: linear;
  animation-name: floating;
  animation-iteration-count: infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
