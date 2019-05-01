<template>
  <div class="content">
    <div class="head-title">
      <h2>{{title}}</h2>
      <p>{{subtitle}}</p>
    </div>
    <section class="chart">
      <div id="gogogo"></div>
      <div v-if="type === 'sl'" class="small-buttons">
        <el-button @click="randomInList('chloroplast', 100);">Select 100 random cpDNA</el-button>
        <el-button @click="randomInList('mitochondrion', 200);">Select 200 random mtDNA</el-button>
        <el-button @click="randomInList('all', 500);">Select 500 random Genome</el-button>
      </div>
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
          v-model="ncNo"
          disabled
        ></el-input>
      </div>
      <div class="buttons">
        <el-button class="icon alt fa-download special" @click="downloadList">Downlaod List</el-button>
        <el-button @click="sendListToVis('rs')" class="icon alt fa-map-o">RefSeq Map</el-button>
        <el-button @click="sendListToVis('sc')" class="icon alt fa-line-chart">Scattered Comparison</el-button>
        <el-button @click="sendListToVis('bs-3d')" class="icon alt fa-cube">Bar Space(3D)</el-button>
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
    ncNumbers: {
      type: String,
      default: "no nc"
    }
  },
  data() {
    return {
      title: "Not ready yet",
      subtitle: "Coming soon....",
      randomNum: 0,
      ncNo: this.ncNumbers,
      myChart: null
    };
  },
  created() {
    this.initType();
  },
  mounted() {
    if (this.type != "sl") this.chooseChart();
    this.$nextTick(function() {
      this.$parent.cancelLoading();
    });
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.myChart.dispose();
      if (to.name === "visualization") {
        this.$parent.openLoading();
        this.initType();
        this.chooseChart();
        this.$nextTick(function() {
          this.$parent.cancelLoading();
        });
      }
    }
  },
  methods: {
    initType() {
      switch (this.type) {
        case "rs":
          this.title = "RefSeq Map";
          this.subtitle = "Big Map of RefSeq";
          this.randomNum = 500;
          break;
        case "oh":
          this.title = "Organelle History";
          this.subtitle = "Timeline for decades";
          this.randomNum = -1;
          break;
        case "sc":
          this.title = "Scattered Comparison";
          this.subtitle = "Control by parameter";
          this.randomNum = 200;
          break;
        case "bs-3d":
          this.title = "Bar Space";
          this.subtitle = "Feature Data in 3D";
          this.randomNum = 20;
          break;
        case "sl":
          this.title = "Species List";
          this.subtitle = "Browse by Species Name";
          this.randomNum = 0;
          this.ncNo = "";
        default:
          break;
      }
    },
    downloadList() {
      let value = this.ncNo;
      if (value === "no nc" || value === "") {
        this.$parent.popNotification("Nothing to download.");
      } else {
        let saveData = new Array();
        saveData[0] = value;
        let blob = new Blob(saveData, { type: "text/plain;charset=utf-8" });
        saveAs(blob, "nc_numbers.txt");
      }
    },
    sendListToVis(type) {
      let value = this.ncNo;
      if (value == "no nc" || value === "") {
        this.$parent.popNotification("You have not selected any data.");
      } else if (value.split(",").length > 2000) {
        this.$parent.popNotification(
          "BLOCKED: More than 2000 may cause performance problem."
        );
      } else {
        this.$router.push({
          name: "visualization",
          params: {
            type: type,
            ncNumbers: value
          }
        });
      }
    },
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
    chooseChart() {
      if (this.type != "bs-3d") {
        this.initChart();
      } else {
        import("echarts-gl").then(() => {
          this.initChart();
        });
      }
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
        let ncList = null;
        if (this.ncNo === "no nc" && this.type != "oh") {
          this.$parent.popNotification(
            "There is no input data and " +
              this.randomNum +
              " random genome data have been applied."
          );
        } else {
          ncList = this.ncNo.split(",");
        }
        initPage(myChart, ncList).then(res => {
          if (res) this.ncNo = res;
        });
        myChart.on("rendered", function() {
          myChart.hideLoading();
        });
      });
      window.addEventListener(
        "resize",
        this.resizeHandler.bind(this, myChart, chartNode)
      );
      this.myChart = myChart;
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
  & > .chart {
    flex-flow: column;
    & > .small-buttons {
      font-size: pxTorem(13);
      width: 100%;
      text-align: center;
      .el-button.active {
        border-color: #e44c65;
        color: #e44c65;
      }
    }
  }
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
</style>
<style lang="scss">
#gogogo {
  width: 100%;
  min-height: pxTorem(600);
}
.el-textarea.is-disabled .el-textarea__inner {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.3);
}
@media screen and (max-width: 768px) {
  .content {
    & > .chart {
      & > .small-buttons {
        .el-button {
          margin: 0.5em 0;
        }
      }
    }
    & > .selection {
      & > h3 {
        font-size: pxTorem(35);
      }
      .el-textarea {
        font-size: pxTorem(35);
      }
      & > div {
        &.buttons {
          display: flex;
          flex-flow: column;
          justify-content: flex-start;
          align-items: flex-start;
          width: auto;
          & > .el-button {
            font-size: pxTorem(35);
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>

