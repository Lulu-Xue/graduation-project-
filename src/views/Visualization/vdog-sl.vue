<template>
  <div>
    <el-table
      ref="slTable"
      class="sl-table"
      v-if="tableData && tableHeadWidth"
      :data="tableData.slice(
        (this.pageNum - 1) * this.perPageNum,
        this.pageNum * this.perPageNum
      )"
      tooltip-effect="dark"
      size="mini"
      lazy
      row-key="INSDC"
      row-class-name="table-row"
      cell-class-name="table-cell"
      header-row-class-name="table-head-row"
      header-cell-class-name="table-head-cell"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <el-form
            :label-width="(tableHeadWidth[0])+'px'"
            label-position="left"
            class="demo-table-expand"
          >
            <el-form-item v-for="head in tableHead" :key="head" :label="head">
              <span>{{ props.row[head] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" fixed reserve-selection width="30px"></el-table-column>
      <el-table-column
        v-for="(head,index) in tableHead"
        :key="head"
        :prop="head"
        show-overflow-tooltip
        sortable
        :fixed="screenWidth > 768 && index === 0 ? true:false"
        :width="tableHeadWidth[index]"
      >
        <template slot="header">
          <span style="white-space:nowrap;" :ref="'tablehead'+index">{{head}}</span>
        </template>
        <template slot-scope="scope">{{ scope.row[head] }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData"
      small
      :current-page.sync="pageNum"
      :page-sizes="[50, 100, 500]"
      :page-size.sync="perPageNum"
      layout="total, sizes, slot, jumper"
      :total="tableData.length"
      hide-on-single-page
      class="page"
    >
      <el-pagination
        small
        layout="prev, pager, next"
        :current-page.sync="pageNum"
        :page-sizes="[50, 100, 500]"
        :page-size.sync="perPageNum"
        :pager-count="5"
        :total="tableData.length"
        hide-on-single-page
      ></el-pagination>
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "specieslist",
  props: {
    dataKey: {
      type: String
    },
    dataValue: {
      type: String
    }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      tableHead: null,
      tableData: null,
      rawData: null,
      perPageNum: 100,
      pageNum: 1,
      tableHeadWidth: null
    };
  },
  computed: {},
  created() {
    this.NCBIValues();
  },
  update() {},
  mounted() {
    // 监听窗口大小
    window.addEventListener("resize", () => {
      this.screenWidth = document.body.clientWidth;
    });
    if (!this.tableHeadWidth) {
      this.setTableHeadWidth();
    }
  },
  methods: {
    clearTableMethod() {
      this.$nextTick(function() {
        this.$refs.slTable.clearSelection();
        this.$refs.slTable.clearSort();
      });
    },
    async NCBIValues() {
      let NCBIData = JSON.parse(sessionStorage.getItem("NCBIData"));
      if (!NCBIData) {
        if (!this.$store.state.NCBIData)
          await this.$store.dispatch("setNCBIData");
        NCBIData = this.$store.state.NCBIData;
      }
      let lines = NCBIData ? NCBIData : this.$store.state.NCBIData;
      if (lines) {
        let head = lines[0].split("\t");
        let res = [];
        let index = 0;
        if (this.dataKey && this.dataValue) {
          index = head.indexOf(this.dataKey);
        }
        for (let i = 1; i < lines.length; i++) {
          if (lines[i]) {
            let line = lines[i].split("\t");
            if (
              this.dataKey &&
              this.dataValue &&
              ("" + line[index]).indexOf(this.dataValue) < 0
            ) {
              continue;
            }
            let re = {};
            for (let j = 0; j < line.length; j++) {
              re[head[j]] = line[j];
            }
            res.push(re);
          }
        }
        this.tableHead = head;
        this.tableData = res;
        this.rawData = res.slice();
      }
    },
    handleSortChange({ prop, order }) {
      this.pageNum = 1;
      if (order === null) {
        this.tableData = this.rawData.slice();
      } else {
        this.tableData.sort((a, b) => {
          if (order === "ascending") {
            if (a[prop] < b[prop]) {
              return -1;
            }
            if (a[prop] > b[prop]) {
              return 1;
            }
            return 0;
          } else if (order === "descending") {
            if (a[prop] < b[prop]) {
              return 1;
            }
            if (a[prop] > b[prop]) {
              return -1;
            }
            return 0;
          }
        });
      }
    },
    handleSelectionChange(selection) {
      let ncNum = "",
        i = 0;
      for (let len = selection.length - 1; i < len; i++) {
        ncNum += selection[i].RefSeq + ",";
      }
      if (selection.length > 0) {
        ncNum += selection[i].RefSeq;
      }
      this.$parent.changeNcNo(ncNum);
    },
    setTableHeadWidth() {
      this.tableHeadWidth = [];
      this.$nextTick(() => {
        if (this.$refs.tablehead0) {
          for (let i = 0, len = this.tableHead.length; i < len; i++) {
            this.tableHeadWidth.push(
              +this.$refs["tablehead" + i][0].offsetWidth + 35
            );
          }
        } else {
          this.setTableHeadWidth();
        }
      });
    }
  }
};
</script>
<style lang="scss">
.content {
  .el-textarea.is-disabled .el-textarea__inner {
    background: transparent;
  }
  .el-table {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.3);
    &::before {
      display: none;
    }
    .table-row,
    .table-cell,
    .table-head-row,
    .table-head-cell,
    tr {
      background: rgb(62, 62, 66) !important;
      border-color: rgba(255, 255, 255, 0.3);
      color: rgba(255, 255, 255, 0.75);
      padding: 0;
      & > .cell {
        padding: 0;
      }
    }
    .table-row:nth-of-type(2n) {
      .table-cell {
        background: rgb(42, 42, 44) !important;
      }
    }
    .el-table__expanded-cell {
      background: transparent;
    }
  }
}

.demo-table-expand {
  label {
    color: #99a9bf;
    font-size: 12px;
  }
  div {
    font-size: 12px;
  }
  .el-form-item {
    font-size: 12px;
    margin-left: 48px;
    margin-bottom: 0;
  }
}
.page {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  .el-pager {
    margin: 0 auto;
    color: #35353a;
    li.btn-quicknext,
    li.btn-quickprev {
      color: rgba(255, 255, 255, 0.6);
    }
    li.active {
      color: #fff;
    }
    li:hover {
      color: #e44c65;
    }
  }
  .el-input__inner {
    border-color: rgba(255, 255, 255, 0.3);
  }
  button,
  li,
  .el-input__inner,
  .el-pagination .btn-prev,
  .el-pagination .btn-next {
    background: transparent !important;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
