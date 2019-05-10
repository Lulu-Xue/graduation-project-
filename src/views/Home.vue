<template>
  <div id="page-wrapper">
    <!-- Banner -->
    <section id="banner" class="image">
      <div class="content">
        <div>
          <h2>Visual Database for Organelle Genome</h2>
          <p>
            A Visual Re-discovery of the Genomes of
            <br>plastid and mitochondrion.
          </p>
        </div>
        <div class="image"></div>
      </div>
      <a href="#od" class="goto-next scrolly">Next</a>
    </section>

    <!-- od -->
    <section id="od" class="image">
      <div class="content label-back bottom">
        <div>
          <h2>Organelle Database</h2>
          <p>
            <a href="#plastidDB" class="scrolly">plastidDB</a> and
            <a href="#mitoDB" class="scrolly">mitoDB</a>
          </p>
        </div>
        <p>
          <router-link to="/plastid">plastidDB</router-link>is a web-based database for plastid DNA, currently it maintained over
          <strong>1300+</strong> plastid DNA reference sequences and their related biology information, in which
          <strong>1000+</strong> are chloroplast DNA, also known as cpDNA.
        </p>
        <p>
          <router-link to="/mito">mitoDB</router-link>is a web-based database for mitochondrion DNA, mtDNA, maintaining over
          <strong>8000+</strong> reference sequences of mitochondrion DNA and their related biology information.
        </p>
      </div>
      <a href="#plastidDB" class="goto-next scrolly">Next</a>
    </section>

    <!-- plastidDB -->
    <section id="plastidDB" class="image">
      <div class="content label-back right">
        <div>
          <h2>plastidDB</h2>
          <p>The genome database for plastid DNA</p>
        </div>
        <ul>
          <li>
            over
            <strong>1300+</strong> RefSeqs
          </li>
          <li>
            over
            <strong>1000+</strong> cpDNA RefSeqs
          </li>
          <li>&nbsp;Annotation and Feature Table</li>
          <li>&nbsp;Genes, Proteins, and RNAs</li>
          <li>&nbsp;Database Visualization</li>
        </ul>
        <router-link to="/plastid" tag="el-button">plastidDB Entry</router-link>
      </div>
      <a href="#mitoDB" class="goto-next scrolly">Next</a>
    </section>

    <!-- mitoDB -->
    <section id="mitoDB" class="image">
      <div class="content label-back left">
        <div>
          <h2>mitoDB</h2>
          <p>The genome database for mitochondrion DNA</p>
        </div>
        <ul>
          <li>
            over
            <strong>8000+</strong> RefSeqs
          </li>
          <li>Annotation and Feature Table</li>
          <li>Genes, Proteins, and RNAs</li>
          <li>ORF Matcher</li>
          <li>Database Visualization</li>
        </ul>
        <router-link to="/mito" tag="el-button">mitoDB Entry</router-link>
      </div>
      <a href="#vis" class="goto-next scrolly">Next</a>
    </section>

    <!-- vis -->
    <section id="vis">
      <div class="content">
        <div class="head-title">
          <h2>Visualizations and Applications</h2>
          <p>Discovery in Visual Sense</p>
        </div>
        <div class="box">
          <section>
            <div class="icon alt major fa-history"></div>
            <h3>
              <router-link :to="toVisObj[0]">Organelle History</router-link>
            </h3>
            <p>Timeline for decades</p>
          </section>
          <section>
            <div class="icon alt major fa-list-alt"></div>
            <h3>
              <router-link :to="toVisObj[4]">Species List</router-link>
            </h3>
            <p>Browse by Species Name</p>
          </section>
          <section>
            <div class="icon alt major fa-tree"></div>
            <h3>
              <a href="http://bio.njfu.edu.cn/MTTree/service/index.php">Phylogenetic Tree</a>
            </h3>
            <p>
              <a href="http://bio.njfu.edu.cn/CPTree/service/index.php">CPTree</a> or
              <a href="http://bio.njfu.edu.cn/MTTree/service/index.php">MTTree</a>
            </p>
          </section>
          <section>
            <div class="icon alt major fa-map-o"></div>
            <h3>
              <router-link :to="toVisObj[1]">RefSeq Map</router-link>
            </h3>
            <p>Big Map of RefSeq</p>
          </section>
          <section>
            <div class="icon alt major fa-line-chart"></div>
            <h3>
              <router-link :to="toVisObj[2]">Scattered Comparison</router-link>
            </h3>
            <p>Control by parameter</p>
          </section>
          <section>
            <div class="icon alt major fa-cube"></div>
            <h3>
              <router-link :to="toVisObj[3]">Bar Space</router-link>
            </h3>
            <p>Feature Data in 3D</p>
          </section>
          <section>
            <div class="icon alt major fa-cube"></div>
            <h3>
              <router-link :to="toVisObj[5]">Scatter Space</router-link>
            </h3>
            <p>Feature Data in 3D</p>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {},
  data() {
    return {
      isTrue: true,
      toVisObj: [
        {
          name: "visualization",
          params: {
            type: "oh"
          }
        },
        {
          name: "visualization",
          params: {
            type: "rs"
          }
        },
        {
          name: "visualization",
          params: {
            type: "sc"
          }
        },
        {
          name: "visualization",
          params: {
            type: "bs-3d"
          }
        },
        {
          name: "visualization",
          params: {
            type: "sl"
          }
        },
        {
          name: "visualization",
          params: {
            type: "ss-3d"
          }
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(async function() {
      this.$parent.cancelLoading();
      await this.$store.dispatch("setNCBIData");
      sessionStorage.setItem(
        "NCBIData",
        JSON.stringify(this.$store.state.NCBIData)
      );
    });
  },
  beforeDestroy() {
    this.$parent.openLoading();
  },
  methods: {}
};
</script>
<style lang="scss">
a {
  transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
  border-bottom: dotted 1px #e44c65;
  color: #e44c65;
  text-decoration: none;
  &:hover {
    border-color: transparent;
  }
  &:focus {
    border-color: transparent;
  }
}
a.image {
  border: none;
}
.icon.alt {
  text-decoration: none;
  position: relative;
  text-decoration: none;
  font-size: 2em;
  color: #272833;
  &:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
    text-shadow: 1px 0 0 rgba(255, 255, 255, 0.5),
      -1px 0 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.5),
      0 -1px 0 rgba(255, 255, 255, 0.5);
  }
}
.goto-next {
  font-size: pxTorem(15);
  border: 0;
  bottom: 0;
  display: block;
  height: 5em;
  left: 50%;
  margin: 0 0 0 -5em;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 10em;
  color: transparent;
  z-index: 1;
  &::before {
    background-image: url("../assets/css/images/arrow.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    display: block;
    height: 1.5em;
    left: 50%;
    margin: -0.75em 0 0 -1em;
    position: absolute;
    top: 50%;
    width: 2em;
    z-index: 1;
  }
}
.content {
  color: #fff;
  padding: 4em 3em;
  font-size: pxTorem(18);
  text-align: left;
  & > div.head-title {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    &::after {
      content: "";
      background: #e44c65;
      display: inline-block;
      height: 0.2em;
      max-width: 20em;
      width: 75%;
      margin: 2em auto;
    }
  }
  & > div {
    line-height: 2em;
    margin-bottom: 1em;
    & > h2 {
      font-size: pxTorem(30);
      line-height: 2em;
    }
  }
  ul,
  ol {
    margin-bottom: 2em;
    font-size: pxTorem(14);
    line-height: 2em;
    color: rgba(255, 255, 255, 0.75);
    list-style: disc;
    & > li {
      padding-left: 0.5em;
    }
  }
  section {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    & > h3 {
      font-size: 20px;
      line-height: 2em;
      margin-bottom: 1em;
    }
    & > p {
      color: rgba(255, 255, 255, 0.75);
      font-size: 15px;
      line-height: 2em;
      margin-bottom: 2em;
    }
  }
  p > strong,
  li > strong {
    color: #fff;
  }
  .el-button {
    margin-bottom: 2em;
    background: transparent;
    color: #fff;
    transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    border-color: rgba(255, 255, 255, 0.3);
    font-size: pxTorem(15);
    &:hover {
      border-color: #e44c65;
      color: #e44c65;
      background: transparent;
    }
    &:focus {
      border-color: #e44c65;
      color: #e44c65 !important;
      background: transparent;
    }
  }
}
.image {
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  border-radius: 3px;
  background-size: cover;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("../assets/css/images/overlay.png");
  }
  & > img {
    width: 100%;
  }
}
#page-wrapper {
  & > section {
    width: 100%;
    height: auto;
    min-height: 100vh;
    position: relative;
    background-attachment: fixed;
  }
  .label-back {
    position: absolute;
    background: rgba(23, 24, 32, 0.95);
    border-style: solid;
  }
  .bottom {
    border-top-width: pxTorem(5);
    border-color: #e44c65;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .right {
    border-left-width: pxTorem(5);
    border-color: #5480f1;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 21em;
  }
  .left {
    border-right-width: pxTorem(5);
    border-color: #39c088;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 21em;
  }
  #banner {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/images/main.jpg");
    position: relative;
    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(23, 24, 32, 0.98);
    }
    & > .content {
      padding: 0 4em;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: flex-end;
      text-align: right;
      width: 100%;
      z-index: 1;
      height: 100%;
      & > div {
        & > h2 {
          font-size: pxTorem(36);
        }
      }
      & > .image {
        font-size: pxTorem(14);
        width: 18em;
        height: 18em;
        margin: 1em;
        border-radius: 50%;
        background: url("../assets/images/main.jpg");
        background-size: cover;
      }
    }
  }
  #od {
    background-image: url("../assets/images/cell.jpg");
    & > .content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: flex-start;
      & > div {
        width: 33%;
      }
      & > p {
        width: 33%;
        font-size: pxTorem(14);
        line-height: 2em;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }
  #plastidDB {
    background-image: url("../assets/images/cpDNA.jpg");
  }
  #mitoDB {
    background-image: url("../assets/images/mtDNA.jpg ");
  }
  #vis {
    & > .content {
      & > .box {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        & > section {
          align-items: center;
          width: 33%;
          & > div {
            height: 96px;
            width: 96px;
            border-radius: 50%;
            background: #272833;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1em;
          }
          & > h3 {
            & > a {
              color: #fff;
              border: none;
              &:hover {
                color: #e44c65;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #page-wrapper {
    & > #od > .content > div {
      width: 100%;
    }
    .content {
      display: flex;
      align-items: center;
      flex-flow: column !important;
      justify-content: flex-start;
      text-align: center;
      height: auto;
      width: 100%;
      border-width: 0;
      border-top-width: pxTorem(5);
    }
    #vis > .content > .box {
      & > section {
        width: 100%;
      }
    }
  }
  .content {
    & > div {
      width: 100%;
      text-align: center;
      font-size: pxTorem(40) !important;
      & > h2 {
        font-size: pxTorem(60) !important;
      }
    }
    & > p {
      width: 100% !important;
      margin-bottom: 1em;
      font-size: pxTorem(35) !important;
    }
    & > ul {
      width: 100%;
      font-size: pxTorem(35) !important;
    }
    & > .el-button {
      width: 100%;
      font-size: pxTorem(35) !important;
    }
  }
}
</style>
