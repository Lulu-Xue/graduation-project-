<template>
  <div class="content">
    <div class="head-title">
      <h2>mitoDB</h2>
      <p>The Genome Database for Mitochondria</p>
    </div>
    <section>
      <section class="sidebar">
        <section>
          <h3>Search</h3>
          <p>Enter the NC Number to direct access</p>
          <el-input
            name="ncNumber"
            id="ncNumber"
            type="text"
            tabindex="0"
            placeholder="NC_006915.1"
            v-model="input"
            clearable
            autofocus
          ></el-input>
          <div class="buttons">
            <el-button class="special" @click="toSingleGene(input===''?'NC_006915.1':input)">GO</el-button>
            <router-link :to="toSlObj" tag="el-button">View List</router-link>
          </div>
        </section>
        <hr>
        <section>
          <div class="image">
            <img src="../assets/images/at.jpg" alt="examples#plastidDB">
          </div>
          <!-- <router-link to="examples.php#plastidDB" class="image">
            <img src="../assets/images/at.jpg" alt="examples#plastidDB">
          </router-link>-->
          <h3>Examples</h3>
          <p>
            All the mtDNAs have their own web page, you can visit the
            <router-link to="/intro">Introduction</router-link>&nbsp;page to know the organization of the information. Here are some examples:
          </p>
          <ul>
            <li>
              <a href="http://bio.njfu.edu.cn/MTTree/service/cpdata.php?id=NC_006915.1&type=vdog">
                mtDNA:
                <i>Mus musculus molossinus</i>
              </a>
              <!-- <router-link to="dataview.php?id=NC_006915.1&type=mtDNA">
                mtDNA:
                <i>Mus musculus molossinus</i>
              </router-link>-->
            </li>
            <li>
              <a href="http://bio.njfu.edu.cn/MTTree/service/cpdata.php?id=NC_024511.2&type=vdog">
                mtDNA:
                <i>Drosophila melanogaster</i>
              </a>
              <!-- <router-link to="dataview.php?id=NC_024511.2&type=mtDNA">
                mtDNA:
                <i>Drosophila melanogaster</i>
              </router-link>-->
            </li>
          </ul>
          <router-link to="/howto#mitoDB" tag="el-button">How to</router-link>
        </section>
      </section>
      <section class="intro">
        <router-link to="/home#mitoDB" class="image">
          <img src="../assets/images/mtDNA_banner.jpg" alt="mtDNA">
        </router-link>
        <h3>Mitochondria and their Genome</h3>
        <p
          class="italic"
        >Mitochondria play a critical role in the generation of metabolic energy in eukaryotic cells. They are responsible for most of the useful energy derived from the breakdown of carbohydrates and fatty acids, which is converted to ATP by the process of oxidative phosphorylation. Most mitochondrial proteins are translated on free cytosolic ribosomes and imported into the organelle by specific targeting signals. In addition, mitochondria are unique among the cytoplasmic organelles already discussed in that they contain their own DNA, which encodes tRNAs, rRNAs, and some mitochondrial proteins. The assembly of mitochondria thus involves proteins encoded by their own genomes and translated within the organelle, as well as proteins encoded by the nuclear genome and imported from the cytosol.</p>
        <p
          class="italic"
        >Mitochondria contain their own genetic system, which is separate and distinct from the nuclear genome of the cell. Mitochondria are thought to have evolved from bacteria that developed a symbiotic relationship in which they lived within larger cells (endosymbiosis). This hypothesis has recently been substantiated by the results of DNA sequence analysis, which revealed striking similarities between the genomes of mitochondria and of the bacterium Rickettsia prowazekii. Rickettsia are intracellular parasites which, like mitochondria, are only able to reproduce within eukaryotic cells. Consistent with their similar symbiotic lifestyles, the genomic DNA sequences of Rickettsia and mitochondria suggest that they share a common ancestor, from which the genetic system of present-day mitochondria evolved.Mitochondrial genomes are usually circular DNA molecules, like those of bacteria, which are present in multiple copies per organelle. They vary considerably in size between different species. The genomes of human and most other animal mitochondria are only about 16 kb, but substantially larger mitochondrial genomes are found in yeasts (approximately 80 kb) and plants (more than 200 kb). However, these larger mitochondrial genomes are composed predominantly of noncoding sequences and do not appear to contain significantly more genetic information. For example, the largest sequenced mitochondrial genome is that of the plant Arabidopsis thaliana. Although Arabidopsis mitochondrial DNA is approximately 367 kb, it encodes only 32 proteins: just more than twice the number encoded by human mitochondrial DNA. The largest number of mitochondrial genes has been found in mitochondrial DNA of the protozoan Reclinomonas americana, which is 69 kb and contains 97 genes. The mitochondrial genome of Reclinomonas appears to more closely resemble the bacterial genome from which mitochondria evolved than most present-day mitochondrial genomes, which encode only a small number of proteins that are essential components of the oxidative phosphorylation system. In addition, mitochondrial genomes encode all of the ribosomal RNAs and most of the transfer RNAs needed for translation of these protein-coding sequences within mitochondria. Other mitochondrial proteins are encoded by nuclear genes, which are thought to have been transferred to the nucleus from the ancestral mitochondrial genome.</p>
        <p>
          by Cooper GM.
          <em class="italic">The Cell: A Molecular Approach. 2nd edition.</em> Sunderland (MA): Sinauer Associates; 2000.
          <a
            href="https://www.ncbi.nlm.nih.gov/books/NBK9896/"
          >Mitochondria.</a>
        </p>
        <h3>Database Features</h3>
        <ul>
          <li>
            over
            <strong>8000+</strong> reference sequences of mitochondrion genome
          </li>
          <li>Annotation and Feature Table for each sequence</li>
          <li>Databases of Genes, Proteins, and RNAs</li>
          <li>Various Visualization</li>
        </ul>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  name: "mitoDB",
  data() {
    return {
      input: "",
      toSlObj: {
        name: "visualization",
        params: {
          type: "sl",
          dataKey: "Type",
          dataValue: "mitochondrion"
        }
      }
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
<style lang="scss" scoped>
</style>


