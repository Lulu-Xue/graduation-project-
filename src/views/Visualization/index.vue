<template>
  <div class="content">
    <div class="head-title">
      <h2>{{title}}</h2>
      <p>{{subtitle}}</p>
    </div>
    <section class="chart">
      <div ref="chart" id="gogogo" v-if="refreshChart">
        <species-list v-if="type === 'sl'" ref="sl" :dataKey="dataKey" :dataValue="dataValue"/>
      </div>
      <div v-if="type === 'sl'" class="small-buttons">
        <el-button @click="randomInList('chloroplast', 100);">Select 100 random cpDNA</el-button>
        <el-button @click="randomInList('mitochondrion', 200);">Select 200 random mtDNA</el-button>
        <el-button @click="randomInList('all', 500);">Select 500 random Genome</el-button>
      </div>
    </section>
    <section class="selection" v-if="randomNum != -1">
      <h3>
        Data Selected: &nbsp;
        <span class="icon alt fa-undo" @click="clearNc"></span>
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
import { getNCBIValues } from "./ncbi.js";
import speciesList from "./vdog-sl.vue";
import FileSaver from "file-saver";
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
    },
    NCBIValues: {
      type: Array
    },
    dataKey: {
      type: String
    },
    dataValue: {
      type: String
    }
  },
  components: { speciesList },
  data() {
    return {
      refreshChart: true,
      title: "Not ready yet",
      subtitle: "Coming soon....",
      randomNum: -1,
      ncNo: this.ncNumbers,
      myChart: null,
      NCBIData: JSON.parse(sessionStorage.getItem("NCBIData"))
    };
  },
  computed: {},
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
      if (this.myChart) {
        this.myChart.clear();
        this.myChart.dispose();
        this.myChart = null;
      }
      if (to.name === from.name) {
        this.$parent.openLoading();
        this.initType();
        if (to.params.type != "sl") this.chooseChart();
        else {
          if (!this.$store.state.NCBIData) this.$store.dispatch("setNCBIData");
          this.refreshChart = false;
        }
        this.$nextTick(function() {
          this.refreshChart = true;
          this.$parent.cancelLoading();
        });
      }
    }
  },
  methods: {
    clearNc() {
      if (this.type != "sl") this.$router.go(0);
      else {
        this.ncNo = "";
        this.$nextTick(function() {
          this.$refs.sl.clearTableMethod();
        });
      }
    },
    changeNcNo(nc) {
      this.ncNo = nc;
    },
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
          break;
        case "ss-3d":
          this.title = "Scatter Space";
          this.subtitle = "Feature Data in 3D";
          this.randomNum = -1;
          this.ncNo = "";
          break;
        default:
          break;
      }
    },
    downloadList() {
      let value = this.ncNo;
      if (value === "no nc" || value === "") {
        this.$parent.popNotification("Nothing to download.");
      } else {
        let blob = new Blob([value], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "nc_numbers.txt");
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
            ncNumbers: value,
            NCBIValues: getNCBIValues(this.NCBIData, value)
          }
        });
      }
    },
    resizeHandler() {
      if (this.myChart && this.$refs.chart) {
        if (this.type === "oh") {
          this.myChart.setOption({
            title: {
              textStyle: {
                fontSize: this.$refs.chart.clientWidth / 13
              }
            }
          });
        }
        this.myChart.resize();
      }
    },
    chooseChart() {
      if (this.type.indexOf("3d") < 0) {
        this.initChart();
      } else {
        import("echarts-gl").then(() => {
          this.initChart();
        });
      }
    },
    async initChart() {
      if (!this.NCBIData) {
        if (!this.$store.state.NCBIData)
          await this.$store.dispatch("setNCBIData");
        this.NCBIData = this.$store.state.NCBIData;
        sessionStorage.setItem("NCBIData", JSON.stringify(this.NCBIData));
      }
      let chartNode = this.$refs.chart;
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
        if (this.ncNo === "no nc" && this.randomNum != -1) {
          this.$parent.popNotification(
            "There is no input data and " +
              this.randomNum +
              " random genome data have been applied."
          );
        } else {
          ncList = this.ncNo ? this.ncNo.split(",") : null;
        }
        this.$nextTick(function() {
          initPage(
            this.NCBIData,
            myChart,
            ncList,
            this.NCBIValues ? this.NCBIValues.slice() : this.NCBIValues,
            this.$router
          ).then(res => {
            if (res) this.ncNo = res;
          });
        });
        myChart.on("rendered", function() {
          myChart.hideLoading();
        });
      });
      this.myChart = myChart;
      window.addEventListener("resize", this.resizeHandler);
    },
    randomInList(type, listSize) {
      let lines = this.$store.state.NCBIData;
      let re = [];
      for (let i = 1; i < lines.length - 1; i++) {
        // length-1: the last line is empty
        let line = lines[i];
        if (line[4] != "-" && (type === "all" || line[3] === type)) {
          re.push(line);
        }
      }
      re.sort(function() {
        return 0.5 - Math.random();
      });
      let res = re.slice(0, listSize);
      this.ncNo = res
        .map(function(item) {
          return item[4];
        })
        .join(",");
    }
  },
  beforeDestroy() {
    this.myChart.clear();
    this.myChart.dispose();
    window.removeEventListener("resize", this.resizeHandler);
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
    cursor: pointer;
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

