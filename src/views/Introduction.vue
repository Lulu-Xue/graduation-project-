<template>
  <div class="content">
    <div class="head-title">
      <h2>Introduction to VDOG</h2>
      <p>Visual Database for Organelle Genome</p>
    </div>
    <section>
      <router-link to="/home#od" class="image">
        <img src="../assets/images/blend.png" alt="blend">
      </router-link>
      <h3>About Organelle Genome</h3>
      <p>
        Compared with nuclear genome, organelles have their own independent genome that encodes a range of genes directly related to producing energy for the cell. Mitochondria and non-photosynthetic plastids are the membrane-bound organelles that convert energy from foodstuffs into cellular energy, while chloroplasts are those use sunlight. Some plastids may also be used for starch storage and the synthesis of fatty acids and terpenes. The
        <router-link to="/vis/oh">history of organelle genome research</router-link>can be trace back to
        <router-link to="entry.php?Release%20Date=1986">1986</router-link>while the first organlle genome was published.
        <br>Research shows that organelles likely evolved from bacteria that were endocytosed by nucleated ancestral cells. From the full
        <router-link to="entry.php">Species List</router-link>, it is clear that metazoan, plant, fungal and other mitochondrial and plastid genomes tend to vary greatly in size and gene content with some of the genes required for the energy creating processes being made by the nuclear genome and imported. Researches also shows that many organisms use one genetic code to translate nuclear mRNAs, and a second one for their mitochondrial and plastid mRNAs.
      </p>

      <h3>Database and its Visualization</h3>
      <p class="vis">
        By the end of 2016, the total number of Organelle Genome has already been over 9000, and this large-scaled dataset creates a challenging complexity for the researchers that tranditional data processing applications are inadequate to deal with. In order to extract value from this large data set, we reorganized the data of
        <a
          href="https://www.ncbi.nlm.nih.gov/genome/organelle/"
        >Organelle Genome Resources</a> from
        <a href="https://www.ncbi.nlm.nih.gov/">NCBI</a>, and published the
        <router-link to="/">VDOG: Visual Database for Organelle Genome</router-link>. This database maintains the reference sequences of 8000+ mitochondrion DNAs (named
        <router-link to="/mito">mitoDB</router-link>) and 1300+ plastid DNAs (
        <router-link to="/plastid">plastidDB</router-link>) in which 1000+ are chloroplast DNAs, as well as their related biology information, including Feature table, CDS sequence, RNA information and etc (See the example of
        <a
          href="http://bio.njfu.edu.cn/CPTree/service/cpdata.php?id=NC_000932.1&type=vdog"
        >
          cpDNA:
          <i>Arabidopsis thaliana</i>
        </a>
        <!-- <router-link to="dataview.php?id=NC_000932.1&type=cpDNA"></router-link> -->
        for detail). User can browse and search in the databases as most of the databases provided, additionally we apply the data visualization technology from
        <a
          href="https://www.baidu.com/"
        >Baidu</a> to enable the visual data analysis via the web interface, currently we deploy three visualizations:
      </p>
      <ul>
        <li>
          <router-link to="/vis/rs">RefSeq Map</router-link>
        </li>
        <li>
          <router-link to="/vis/sc">Scattered Comparison</router-link>
        </li>
        <li>
          <router-link to="/vis/bs-3d">Bar Space in 3D</router-link>
        </li>
      </ul>
      <p>
        See also:
        <router-link to="/howto">VDOG: How to</router-link>
      </p>

      <h3>Related Project: Phylogenetic Analysis Toolkits</h3>
      <p>
        As a convenient experimental target with low substitution rates and high research values, Chloroplast DNA, cpDNA, has recently been widely investigated in comparative genetics. In a previous project, we published
        <a
          href="http://bio.njfu.edu.cn/CPTree/service/index.php"
        >a web-based phylogenetic tree generator using Chloroplast Genomes, called CPTree</a>, to aid the phylogenetic research of cpDNA. It implements an easy-to-use web interface for both the
        <a
          href="http://bio.njfu.edu.cn/CPTree/service/index.php?mode=fast"
        >fast-mode</a> and the
        <a href="http://bio.njfu.edu.cn/CPTree/service/index.php?mode=normal">normal-mode</a> process. The fast mode uses the 16S or 23S ribosomal RNA and the normal-mode uses an automatic gene selection across the species in the phylogenetic analysis. In parallel with CPTree, we are also developing the
        <a
          href="http://bio.njfu.edu.cn/MTTree/service/index.php"
        >MTTree, A web-based Phylogenetic Tree Generator using Mitochondrial Genomes</a>, to ease the relative work with mtDNAs.
      </p>
      <p>
        See also:
        <a href="http://bio.njfu.edu.cn/CPTree/service/intro.php">Introduction to CPTree</a>
      </p>

      <h3>Useful Links:</h3>
      <ul class="useful-links">
        <li>
          <a href="https://www.ncbi.nlm.nih.gov/genome/organelle/">Organelle Genome Resources</a> by
          <a href="https://www.ncbi.nlm.nih.gov/">NCBI</a>
        </li>
        <li style="color:transparent;">
          <ul>
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/genome/browse/?report=5">Browse by Organism</a>
            </li>
            <li>
              <a
                href="ftp://ftp.ncbi.nlm.nih.gov/refseq/release/mitochondrion/"
              >Refseq release of mitochondrial sequences</a>
            </li>
            <li>
              <a
                href="ftp://ftp.ncbi.nlm.nih.gov/refseq/release/plastid/"
              >Refseq release of plastid sequences</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="http://gobase.bcm.umontreal.ca/">GOBASE: The Organelle Genome Database</a>
        </li>
        <li>
          <a href="http://www.oxfordjournals.org/nar/database/cat/12">Other Organelle Databases</a> by
          <a href="http://www.oxfordjournals.org/nar">NAR Journal</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "introduction",
  mounted() {
    this.$nextTick(function() {
      this.$parent.cancelLoading();
    });
  },
  beforeDestroy() {
    this.$parent.openLoading();
  }
};
</script>

<style lang="scss" scoped>
.content > section {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  & > .image {
    margin-bottom: 2em;
  }
  & > .vis {
    margin-bottom: 0;
  }
  & > .useful-links {
    & > li:nth-of-type(2) {
      &::before {
        display: none;
      }
      & > ul {
        margin: 0;
        margin-left: 1em;
      }
    }
  }
  ul {
    font-size: 15px;
  }
}
</style>
