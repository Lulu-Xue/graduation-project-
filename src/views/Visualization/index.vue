<template>
  <div class="content">
    <div class="head-title">
      <h2>{{title}}</h2>
      <p>{{subtitle}}</p>
    </div>
    <section>
      <div id="gogogo"></div>
    </section>
    <section class="selection" v-if="type!='oh'">
      <h3>
        Data Selected: &nbsp;
        <router-link class="icon alt fa-undo" to="entry.php" tag="span"></router-link>
      </h3>
      <div>
        <el-input
          id="ncNumbers"
          type="textarea"
          rows="3"
          placeholder="No record has been selected"
          v-model="ncNumbers"
          disabled
        ></el-input>
      </div>
      <div class="buttons">
        <el-button class="icon alt fa-download special" onclick="downloadList">Downlaod List</el-button>
        <el-button
          onclick="sendListToVis('visualization.php?type=rs');"
          class="icon alt fa-map-o"
        >RefSeq Map</el-button>
        <el-button
          onclick="sendListToVis('visualization.php?type=sc');"
          class="icon alt fa-line-chart"
        >Scattered Comparison</el-button>
        <el-button
          onclick="sendListToVis('visualization.php?type=bs-3d');"
          class="icon alt fa-cube"
        >Bar Space(3D)</el-button>
      </div>
    </section>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "visualization",
  props: {
    type: {
      type: String,
      required: true
    },
    ncNumbers: String
  },
  data() {
    return {
      title: "Not ready yet",
      subtitle: "Coming soon...."
    };
  },
  created() {
    switch (this.type) {
      case "rs":
        this.title = "RefSeq Map";
        this.subtitle = "Big Map of RefSeq";
        break;
      case "oh":
        this.title = "Organelle History";
        this.subtitle = "Timeline for decades";
        break;
      case "sc":
        this.title = "Scattered Comparison";
        this.subtitle = "Control by parameter";
        break;
      case "bs-3d":
        this.title = "Bar Space";
        this.subtitle = "Feature Data in 3D";
        break;
      default:
        break;
    }
  },
  mounted() {
    if (this.type != "oh") document.querySelector("#ncNumbers").value = "no nc";
    if (this.type != "bs-3d") {
      this.initChart();
    } else {
      import("echarts-gl").then(() => {
        this.initChart();
      });
    }
    this.$nextTick(function() {
      this.$parent.cancelLoading();
    });
  },
  methods: {
    resizeHandler(myChart, chartNode) {
      if (this.type === "oh") {
        myChart.setOption({
          title: {
            textStyle: {
              fontSize: chartNode.clientWidth / 13
            }
          }
        });
      }
      myChart.resize();
    },
    initChart() {
      let chartNode = document.querySelector("#gogogo");
      let myChart = echarts.init(chartNode);
      myChart.showLoading("default", {
        text: "Loading",
        color: "#fff",
        textColor: "#999",
        maskColor: "rgba(255, 255, 255, 0.1)",
        zlevel: 0
      });
      import("./vdog-" + this.type + ".js").then(({ initPage }) => {
        initPage(myChart, this.$parent.popNotification);
        myChart.hideLoading();
      });
      window.addEventListener(
        "resize",
        this.resizeHandler.bind(this, myChart, chartNode)
      );
    }
  },
  beforeDestroy() {
    this.$parent.openLoading();
  }
};
</script>
<style lang="scss" scoped>
.icon.alt {
  color: #fff;
  font-size: 1em;
  &::before {
    text-shadow: none;
    margin-right: 0.5em;
  }
  &:hover {
    color: #e44c65;
  }
}
.content {
  & > .selection {
    flex-flow: column;
    & > div {
      width: 100%;
      &.buttons {
        font-size: pxTorem(16);
        & > .el-button {
          margin-top: 1em;
          margin-bottom: 0;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .content {
    & > .selection {
      & > h3 {
        font-size: pxTorem(35);
      }
      .el-textarea {
        font-size: pxTorem(35);
      }
      & > div {
        &.buttons {
          font-size: pxTorem(35);
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          align-items: flex-start;
          width: auto;
          & > .el-button {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
#gogogo {
  width: 100%;
  height: pxTorem(600);
}
.el-textarea.is-disabled .el-textarea__inner {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.3);
}
</style>

