<template>
  <div class="f-identify">
    <canvas id="f-canvas" :width="contentWidth" :height="contentHeight" @click="$emit('refresh')"></canvas>
  </div>
</template>
<script>
/**
 * referenced from https://www.itread01.com/content/1542007626.html
 */
export default {
  props: {
    identifyCode: {
      //預設註冊碼
      type: String,
      default: "1234"
    },
    fontSizeMin: {
      // 字型最小值
      type: Number,
      default: 25
    },
    fontSizeMax: {
      // 字型最大值
      type: Number,
      default: 35
    },
    backgroundColorMin: {
      // 驗證碼圖片背景色最小值
      type: Number,
      default: 200
    },
    backgroundColorMax: {
      // 驗證碼圖片背景色最大值
      type: Number,
      default: 220
    },
    dotColorMin: {
      // 背景干擾點最小值
      type: Number,
      default: 60
    },
    dotColorMax: {
      // 背景干擾點最大值
      type: Number,
      default: 120
    },
    contentWidth: {
      //容器寬度
      type: Number,
      default: 145
    },
    contentHeight: {
      //容器高度
      type: Number,
      default: 38
    }
  },

  watch: {
    identifyCode() {
      this.drawPic();
    }
  },
  mounted() {
    this.drawPic();
  },
  methods: {
    // 生成一個隨機數
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 生成一個隨機的顏色
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    drawPic() {
      let canvas = document.getElementById("f-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 繪製背景
      ctx.fillStyle = this.randomColor(
        this.backgroundColorMin,
        this.backgroundColorMax
      );
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 繪製文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      this.drawLine(ctx);
      this.drawDot(ctx);
    },
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(50, 160); //隨機生成字型顏色
      ctx.font =
        this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei"; //隨機生成字型大小
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
      var deg = this.randomNum(-30, 30);
      // 修改座標原點和旋轉角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢復座標原點和旋轉角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    },
    drawLine(ctx) {
      // 繪製干擾線
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = this.randomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        );
        ctx.lineTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        );
        ctx.stroke();
      }
    },
    drawDot(ctx) {
      // 繪製干擾點
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
};
</script>
<style scoped>
.f-identify {
  cursor: pointer;
}
</style>
