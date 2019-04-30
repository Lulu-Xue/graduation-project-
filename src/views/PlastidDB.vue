<template>
  <div class="content">
    <div class="head-title">
      <h2>plastidDB</h2>
      <p>The Genome Database for Plastids</p>
    </div>
    <section>
      <section class="intro">
        <router-link to="/home#plastidDB" class="image">
          <img src="../assets/images/cpDNA_banner.jpg" alt="cpDNA">
        </router-link>
        <h3>Plastids and their Genomes</h3>
        <p
          class="italic"
        >Plastid is a family of plant organelles including chloroplasts, chromoplasts, leucoplasts, amyloplasts, and elaioplasts. All plastids contain the same genome, but they differ in both structure and function. Chloroplasts are specialized for photosynthesis and are unique in that they contain the internal thylakoid membrane system. Other plastids, which are involved in different aspects of plant cell metabolism, are bounded by the two membranes of the plastid envelope but lack both the thylakoid membranes and other components of the photosynthetic apparatus.</p>
        <p
          class="italic"
        >Chloroplasts contain their own genetic system, reflecting their evolutionary origins from photosynthetic bacteria. The genomes of chloroplasts are similar to those of mitochondria in that they consist of circular DNA molecules present in multiple copies per organelle. However, chloroplast genomes are larger and more complex than those of mitochondria, ranging from 120 to 160 kb and containing approximately 120 genes. These chloroplast genes encode both RNAs and proteins involved in gene expression, as well as a variety of proteins that function in photosynthesis. Both the ribosomal and transfer RNAs used for translation of chloroplast mRNAs are encoded by the organelle genome. These include four rRNAs (23S, 16S, 5S, and 4.5S) and 30 tRNA species. In contrast to the smaller number of tRNAs encoded by the mitochondrial genome, the chloroplast tRNAs are sufficient to translate all the mRNA codons according to the universal genetic code. In addition to these RNA components of the translation system, the chloroplast genome encodes about 20 ribosomal proteins, which represent approximately a third of the proteins of chloroplast ribosomes. Some subunits of RNA polymerase are also encoded by chloroplasts, although additional RNA polymerase subunits and other factors needed for chloroplast gene expression are encoded in the nucleus. The chloroplast genome also encodes approximately 30 proteins that are involved in photosynthesis, including components of photosystems I and II, of the cytochrome bf complex, and of ATP synthase. In addition, one of the subunits of ribulose bisphosphate carboxylase (rubisco) is encoded by chloroplast DNA. Rubisco is the critical enzyme that catalyzes the addition of CO2 to ribulose-1,5-bisphosphate during the Calvin cycle. Not only is it the major protein component of the chloroplast stroma, but it is also thought to be the single most abundant protein on Earth, so it is noteworthy that one of its subunits is encoded by the chloroplast genome.</p>
        <p>
          by Cooper GM.
          <em class="italic">The Cell: A Molecular Approach. 2nd edition.</em> Sunderland (MA): Sinauer Associates; 2000.
          <a
            href="https://www.ncbi.nlm.nih.gov/books/NBK9905"
          >Chloroplasts and Other Plastids.</a>
        </p>
        <h3>Database Features</h3>
        <ul>
          <li>
            over
            <strong>1300+</strong> reference sequences of plastid genome
          </li>
          <li>
            over
            <strong>1000+</strong> reference sequences of cpDNA
          </li>
          <li>Annotation and Feature Table for each sequence</li>
          <li>Databases of Genes, Proteins, and RNAs</li>
          <li>Various Visualization</li>
        </ul>
      </section>
      <section class="sidebar">
        <section>
          <h3>Search</h3>
          <p>Enter the NC Number to direct access</p>
          <el-input
            name="ncNumber"
            id="ncNumber"
            type="text"
            tabindex="0"
            placeholder="NC_000932.1"
            v-model="input"
            clearable
            autofocus
          ></el-input>
          <div class="buttons">
            <el-button class="special">GO</el-button>
            <router-link to="entry.php?Type=plast" tag="el-button">View List</router-link>
          </div>
        </section>
        <hr size="1">
        <section>
          <router-link to="examples.php#plastidDB" class="image">
            <img src="../assets/images/at.jpg" alt>
          </router-link>
          <h3>Examples</h3>
          <p>
            All the plastid DNAs have their own web page, you can visit the
            <router-link to="/intro">Introduction</router-link>page to know the organization of the information. Here are some examples:
          </p>
          <ul>
            <li>
              <router-link to="dataview.php?id=NC_000932.1&type=cpDNA">
                cpDNA:
                <i>Arabidopsis thaliana</i>
              </router-link>
            </li>
            <li>
              <router-link to="dataview.php?id=NC_009143.1&type=cpDNA">
                cpDNA:
                <i>Populus trichocarpa</i>
              </router-link>
            </li>
          </ul>
          <router-link to="/howto#plastidDB" tag="el-button">How to</router-link>
        </section>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  name: "plastidDB",
  data() {
    return {
      input: ""
    };
  },
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
<style lang="scss">
.content > section {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  & > section > .image,
  & > section > section > .image {
    margin-bottom: 2em;
  }
  & > .intro {
    width: 62%;
    & > .image {
      margin-bottom: 2em;
    }
  }
  p.italic {
    border-left: solid 4px rgba(255, 255, 255, 0.3);
    padding: 0.5em 0 0.5em 2em;
  }
  & > .sidebar {
    width: 32%;
    & > section > .el-input--suffix > .el-input__inner {
      background: transparent;
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
  .el-button {
    margin-top: 2em;
    font-size: 12px;
    &.special {
      background: #e44c65;
      border-color: #e44c65;
      &:hover {
        background: transparent;
      }
    }
  }
  & > ul,
  ol {
    font-size: 15px;
  }
  & > hr {
    width: 100%;
    margin: 2em 0;
    border-color: rgba(255, 255, 255, 0.3);
  }
}
</style>


