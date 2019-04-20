<template>
  <div id="page-wrapper">
    <!-- Banner -->
    <section id="banner">
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
            <a href="#two" class="scrolly">plastidDB</a> and
            <a href="#three" class="scrolly">mitoDB</a>
          </p>
        </div>
        <p>
          <a href="plastidDB.php">plastidDB</a> is a web-based database for plastid DNA, currently it maintained over
          <strong>1300+</strong> plastid DNA reference sequences and their related biology information, in which
          <strong>1000+</strong> are chloroplast DNA, also known as cpDNA.
        </p>
        <p>
          <a href="mitoDB.php">mitoDB</a> is a web-based database for mitochondrion DNA, mtDNA, maintaining over
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
        <el-button plain>plastidDB Entry</el-button>
        <!-- <div class="actions">
          <a href="plastidDB.php" class="button">plastidDB Entry</a>
        </div>-->
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
        <el-button plain>mitoDB Entry</el-button>
        <!-- <div class="actions">
          <a href="mitoDB.php" class="button">mitoDB Entry</a>
        </div>-->
      </div>
      <a href="#vis" class="goto-next scrolly">Next</a>
    </section>

    <!-- vis -->
    <section id="vis" class="wrapper style1 special fade-up">
      <div class="content head-title">
        <div>
          <h2>Visualizations and Applications</h2>
          <p>Discovery in Visual Sense</p>
        </div>
        <div class="box">
          <section>
            <div class="icon alt major fa-history"></div>
            <h3>
              <a href="visualization.php?type=oh">Organelle History</a>
            </h3>
            <p>Timeline for decades</p>
          </section>
          <section>
            <div class="icon alt major fa-list-alt"></div>
            <h3>
              <a href="entry.php">Species List</a>
            </h3>
            <p>Browse by Species Name</p>
          </section>
          <section>
            <div class="icon alt major fa-tree"></div>
            <h3>
              <a href="../MTTree/">Phylogenetic Tree</a>
            </h3>
            <p>
              <a href="../CPTree/">CPTree</a> or
              <a href="../MTTree/">MTTree</a>
            </p>
          </section>
          <section>
            <div class="icon alt major fa-map-o"></div>
            <h3>
              <a href="visualization.php?type=rs">RefSeq Map</a>
            </h3>
            <p>Big Map of RefSeq</p>
          </section>
          <section>
            <div class="icon alt major fa-line-chart"></div>
            <h3>
              <a href="visualization.php?type=sc">Scattered Comparison</a>
            </h3>
            <p>Control by parameter</p>
          </section>
          <section>
            <div class="icon alt major fa-cube"></div>
            <h3>
              <a href="visualization.php?type=bs-3d">Bar Space</a>
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
  components: {
    // HelloWorld
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      isTrue: true
    };
  },
  mounted() {
    // 监听窗口大小
    window.addEventListener("resize", () => {
      this.screenWidth = document.body.clientWidth;
    });
  }
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
}
.icon.alt {
  text-decoration: none;
  border-bottom: none;
  position: relative;
  text-decoration: none;
  font-size: 2em;
  &:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
    color: #272833 !important;
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
  &.head-title > div:first-of-type {
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
    & > h2 {
      font-size: pxTorem(30);
      line-height: 2em;
    }
  }
}
#page-wrapper {
  & > section {
    width: 100%;
    min-height: 100vh;
    position: relative;
    background-size: cover;
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
  .content {
    & > ul {
      margin-top: 2em;
      font-size: pxTorem(14);
      line-height: 2em;
      color: rgba(255, 255, 255, 0.75);
      & > li {
        &::before {
          content: "";
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.75);
          vertical-align: middle;
          margin-right: 1em;
        }
      }
    }
    & > .el-button {
      margin-top: 2em;
      background: transparent;
      color: #fff;
      transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
      border-color: rgba(255, 255, 255, 0.5);
      font-size: pxTorem(15);
      &:hover {
        border-color: #e44c65;
        color: #e44c65;
      }
    }
  }
  .image {
    position: relative;
    overflow: hidden;
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
  }
  p > strong,
  li > strong {
    color: #fff;
  }
}
#banner {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/main.jpg");
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
    position: absolute;
    right: 0;
    top: 0;
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
  background: url("../assets/images/cell.jpg");
  & > .content {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: flex-start;
    & > div {
      width: 33%;
    }
    & > p {
      width: 30%;
      font-size: pxTorem(14);
      line-height: 2em;
      color: rgba(255, 255, 255, 0.75);
    }
  }
}
#plastidDB {
  background: url("../assets/images/cpDNA.jpg");
}
#mitoDB {
  background: url("../assets/images/mtDNA.jpg ");
}
#vis {
  & > .content {
    & > .box {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-evenly;
      align-items: center;
      & > section {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 300px;
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
          font-size: 20px;
          & > a {
            color: #fff;
            border: none;
            &:hover {
              color: #e44c65;
            }
          }
          margin-bottom: 1em;
        }
        & > p {
          color: rgba(255, 255, 255, 0.75);
          font-size: 16px;
          margin-bottom: 2em;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #page-wrapper {
    & > #banner > .content {
      height: 100%;
    }
    .content {
      align-items: center;
      flex-flow: column;
      text-align: center;
      height: auto;
      width: 100%;
      border-width: 0;
      border-top-width: pxTorem(5);
      & > div {
        width: 100%;
        text-align: center;
        font-size: pxTorem(35);
        & > h2 {
          font-size: pxTorem(50);
        }
      }
      & > p {
        width: 100%;
        margin-top: 2em;
        font-size: pxTorem(35);
      }
      & > ul {
        width: 100%;
        margin-top: 2em;
        font-size: pxTorem(35);
      }
      & > .el-button {
        width: 100%;
        margin: 2em 0;
        font-size: pxTorem(35);
      }
    }
  }
}
</style>
