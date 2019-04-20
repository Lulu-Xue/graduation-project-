<template>
  <div class="content">
    <div class="head-title">
      <h2>How to use VDOG</h2>
      <p>A Brief tutorial to VDOG</p>
    </div>
    <section>
      <el-button plain>Basics</el-button>
      <el-button plain>Entry</el-button>
      <el-button plain>Viewer</el-button>
      <el-button plain>Visualization</el-button>
      <el-button plain>Application</el-button>
      <!-- <a href="#basics" class="button small scrolly">Basics</a>
      <a href="#entry" class="button small scrolly">Entry</a>
      <a href="#viewer" class="button small scrolly">Viewer</a>
      <a href="#visualization" class="button small scrolly">Visualization</a>
      <a href="#application" class="button small scrolly">Application</a>-->
    </section>
    <section>
      <h3>Database Basics</h3>
      <p>
        VDOG, Visual Database for Organelle Genome is an innovative database of the genome information in the organelles. Most of the data in VDOG are originally extracted from GeneBank, re-organized and represented.
        <a
          href="https://www.ncbi.nlm.nih.gov/genbank/"
        >GeneBank</a> is the NIH genetic sequence database, an annotated collection of all publicly available DNA sequences. Also, GenBank is part of the
        <a
          href="http://www.insdc.org/"
        >INSDC, International Nucleotide Sequence Database Collaboration</a>, which comprises
        <a href="http://www.ddbj.nig.ac.jp/">the DNA DataBank of Japan (DDBJ)</a>,
        <a href="http://www.ebi.ac.uk/ena/about/formats">the European Nucleotide Archive (ENA)</a>, and GenBank at
        <a href="https://www.ncbi.nlm.nih.gov/">NCBI</a>. These three organizations exchange data on a daily basis. The organelle genomes in
        <a
          href="https://www.ncbi.nlm.nih.gov/genome/organelle/"
        >Organelle Genome Resources in NCBI</a> is the part of
        <a
          href="https://www.ncbi.nlm.nih.gov/refseq/"
        >the NCBI Reference Sequence (RefSeq)</a> which is a comprehensive, integrated, non-redundant, well-annotated set of reference sequences including genomic, transcript, and protein. Every submitted genome data in NCBI has its own accession numbers, also known as NC Number, a string starting with
        <em>NC_</em>. Accession numbers can be used in the
        <a
          href="https://www.ncbi.nlm.nih.gov/books/NBK25501/"
        >Enterz utilities</a> to retrieve data from NCBI databases. VDOG applies these accession numbers as the keywords of the genome information as well. For example, in the
        <router-link to="entry.php">Species List</router-link>page, users can open the
        <router-link to="#viewer" class="scrolly">Genome Info Viewer</router-link>by clicking the NC Number in the table.
      </p>
    </section>

    <section>
      <h4>
        <router-link to="plastidDB.php">plastidDB</router-link>
      </h4>
      <p>
        <span class="image left">
          <img src="../assets/images/cpDNA.png">
        </span>plastDB is the subset of VDOG, which maintains over 1300 platid genomes.
        <strong>Plastid</strong> is a family of plant organelles including chloroplasts, chromoplasts, leucoplasts, amyloplasts, and elaioplasts. All plastids contain the same genome, but they differ in both structure and function.
        <strong>Chloroplasts</strong> are specialized for photosynthesis and are unique in that they contain the internal thylakoid membrane system, therefore, chloroplast genome, also known as cpDNA, became a hot topic of recent years. plastidDB maintains over 1000 cpDNAs with their genetic information, such as feature table, CDS, RNA sequences and etc.
      </p>
      <p>
        The
        <router-link to="plastidDB.php">plastidDB page</router-link>has a search area, where user can input the NC Number of the plastid genome and jump to the
        <router-link to="#viewer" class="scrolly">Genome Info Viewer</router-link>page to see the detailed information. Also, a full list of plastid genome is available.
      </p>
    </section>

    <section>
      <h4>
        <router-link to="mitoDB.php">mitoDB</router-link>
      </h4>
      <p>
        <span class="image right">
          <img src="../assets/images/mtDNA.png">
        </span>mitoDB is the other subset of VDOG.
        <strong>Mitochondria</strong> play a critical role in the generation of metabolic energy in eukaryotic cells. They are responsible for most of the useful energy derived from the breakdown of carbohydrates and fatty acids, which is converted to ATP by the process of oxidative phosphorylation. Mitochondria contain their own genetic system, which is separate and distinct from the nuclear genome of the cell. Mitochondria are thought to have evolved from bacteria that developed a symbiotic relationship in which they lived within larger cells (endosymbiosis). Therefore, mitochondrial genome, also known as mtDNA, has been widely researched in recent years. mitoDB is aim to serve the information requirement in this area. It gathers over 8000 mtDNAs with their genetic information, such as feature table, CDS, RNA sequences and etc.
      </p>
      <p>
        The
        <router-link to="mitoDB.php">mitoDB page</router-link>has a similar search area with plastidDB, where user can also use the NC Number of the mtDNA to access the
        <router-link to="#viewer" class="scrolly">Genome Info Viewer</router-link>page and check the detailed information. A full list of mitochondrial genome is available as well.
      </p>
    </section>

    <section id="entry">
      <h3>
        <router-link to="entry.php">Database Entry</router-link>
      </h3>
      <p>In order to follow the tradition, we keep the main entrance of VDOG as a typical table, in which lists the Organism Name, Group, SubGroup, Type, NCBI accession number. Also, in the table the numeric features of the genomes are also available, such as genome size, GC contain, the number of Protein, rRNA, tRNA, Other RNA, and the number of Gene and Pseudogene. All these information can be filtered and sorted with online utilities.</p>
      <p>
        User can customized the pre-load filter by changing the URL of the entry address, using
        <code>"?COLUMN_NAME=VALUE"</code>.
      </p>
      <h4>Note</h4>
      <ol>
        <li>
          Base url:
          <code>http://bio.njfu.edu.cn/VDOG/entry.php</code>
        </li>
        <li>Currently it supports only one filtering condition.</li>
        <li>
          Replace the special code in the column name, e.g.
          <code>%20</code> equals blank.
        </li>
      </ol>
      <h4>Custom Filter Examples</h4>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Filter Type" min-width="20">
          <template slot-scope="scope">
            <span v-html="scope.row.type"></span>
          </template>
        </el-table-column>
        <el-table-column label="Description">
          <template slot-scope="scope">
            <span v-html="scope.row.desc"></span>
          </template>
        </el-table-column>
        <el-table-column label="Sample Links" min-width="20">
          <template slot-scope="scope">
            <span v-html="scope.row.link"></span>
          </template>
        </el-table-column>
      </el-table>
      <h4>Upcoming Features</h4>
      <ul>
        <li>Multiple Custom Filter</li>
        <li>Custom Paging</li>
        <li>Taxonomy-based Filtering</li>
        <li>RESTful and Web Service API</li>
      </ul>
    </section>

    <section id="viewer">
      <h3>Organelle Genome Viewer</h3>
      <p>
        Organelle Genome Viewer is the core of VDOG. It represents the genome information of the organelle. We re-designed the page in order to meet the requirement of organelle genome research, and to achieve that we integrated several useful utilities. For example, on the top of the page, user can use the "Open in NCBI" button to access the NCBI database, or use the "Download All Files" button to retrieve all the file as a zip package. The highlighted species name in the title links to the
        <a
          href="https://www.ncbi.nlm.nih.gov/taxonomy"
        >NCBI Taxonomy Browser</a>.
      </p>
      <router-link to="dataview.php?id=NC_000932.1&type=cpDNA" class="dbpage">
        <img
          class="image"
          style="border:1px solid #666;"
          src="../assets/images/dbpage.png"
          alt="dbpage"
        >
      </router-link>
      <p>For most of the organelle genomes, such as mitochondrial and plastids, the Organelle Genome Viewer displays three parts of information:</p>
      <ul>
        <li>
          <strong>Genome Summary</strong> demonstrates the genome information in three plots. The radar plot shows the major numeric characteristics, such as Genome Size, Percentage of GC content, and Number of Genes, Pseudogenes(if applicable), Proteins, tRNAs, rRNAs, and Other RNAs. The taxonomy tree plot shows the classification tree of the species, including domain, kingdom, phylum, class, order, family and genus. Click on any branch of the tree will open an outer link to
          <a
            href="https://www.ncbi.nlm.nih.gov/taxonomy"
          >NCBI Taxonomy Browser</a>. The genome plot beneath these two is generated by
          <a
            href="http://ogdraw.mpimp-golm.mpg.de/"
          >OrganellarGenomeDRAW</a>, which is dedicated to convert genetic information to high-quality, detailed circular or linear maps.
        </li>
        <li>
          <strong>GeneBank Summary</strong> is the head part of GeneBank file. It includes the key information of the genome. In this part, we display the raw data of GeneBank file with the buttons of "Download Summary" and "View in NCBI".
        </li>
        <li>
          <strong>Data Files</strong> store the relative genome information of each organelle. For most of the organelles genomes, they are the raw GeneBank file and its converted GFF3 file, the fasta-formated CDS of Nucleotide and Protein, the feature table, and the raw sequence of the genome.
        </li>
      </ul>
    </section>

    <section>
      <h3>
        <router-link to="/home#vis">Data Visualization</router-link>
      </h3>
      <p class="italic">
        The main goal of data visualization is to communicate information clearly and effectively through graphical means. It doesn't mean that data visualization needs to look boring to be functional or extremely sophisticated to look beautiful. To convey ideas effectively, both aesthetic form and functionality need to go hand in hand, providing insights into a rather sparse and complex data set by communicating its key-aspects in a more intuitive way. Yet designers often fail to achieve a balance between form and function, creating gorgeous data visualizations which fail to serve their main purpose — to communicate information.
        <br>
        <br>by Vitaly Friedman (2008)
        <a
          href="http://www.smashingmagazine.com/2008/01/14/monday-inspiration-data-visualization-and-infographics/"
        >Data Visualization and Infographics</a>
      </p>
      <p>
        In the data visualization, we use the techniques from
        <a
          href="http://www.baidu.com"
        >Baidu Echarts</a> to communicate data or information as visual objects (e.g., dots, lines or bars) contained in graphics. Our aim is to communicate the organelle genome information clearly and efficiently to our end users. Currently, we provide three visualizations:
      </p>
      <p>
        <router-link to="visualization.php?type=rs">
          <img class="image left" src="../assets/images/rs.png">
        </router-link>
        <strong>RefSeq Map</strong> shows the big map of RefSeqs, in which for each genome data, the X axis shows the percentage of GC content, the Y axis shows the size of each genome and the radius of the dot shows the number of genes annotated. When mouse over the dot, a pop-up window lists the detailed information, and click them will open the
        <router-link to="#viewer" class="scrolly">Genome Info Viewer</router-link>. The boxes with dotted line mark the area of data distribution of each type, mtDNA, plastid DNA, and cpDNA, and the arrow line show the average of each type. The toolbox at the top right conner provides the toolkit for zooming and PNG download.
      </p>
      <p>
        Sample Visualization:
        <router-link to="visualization.php?type=rs">RefSeq Map of 500 Random Organelle Genome Data</router-link>
      </p>

      <p>
        <router-link to="visualization.php?type=sc">
          <img class="image right" src="../assets/images/sc.png">
        </router-link>
        <strong>Scattered Comparison</strong> is a visualization tool for multi parameter selection. We use multiple scatter plot to demonstrate the data distribution in all the dimensions, which are: Genome Size, Percentage of GC content, and Number of Genes, Pseudogenes, Proteins, tRNAs, rRNAs, and Other RNAs. The parallel view in the bottom left shares the same dimension. When mouse over the dot, a pop-up window lists the detailed information, and click them will open the
        <router-link to="#viewer" class="scrolly">Genome Info Viewer</router-link>. The toolbox at the top right conner provides the toolkit for multiple selection and PNG download.
      </p>
      <p>
        Sample Visualization:
        <router-link
          to="visualization.php?type=sc"
        >Scattered Comparison of 200 Random Organelle Genome Data</router-link>
      </p>

      <p>
        <router-link to="visualization.php?type=bs-3d">
          <img class="image left" src="../assets/images/bs-3d.png">
        </router-link>
        <strong>Bar Space</strong> renders the data into 3D bars with WebGL 3D engine, in which the height means the value and the color shows the distribution. The bars' location in the space is based on their genome and parameters, which are Genome Size, Percentage of GC content, and Number of Genes, Pseudogenes, Proteins, tRNAs, rRNAs, and Other RNAs. When mouse over the bar, a pop-up window lists the detailed information, and click them will open the
        <router-link to="#viewer" class="scrolly">Genome Info Viewer</router-link>. The toolbox at the top right conner provides the toolkit for PNG download.
      </p>
      <p>
        Sample Visualization:
        <router-link to="visualization.php?type=bs-3d">Bar Space of 20 Random Organelle Genome Data</router-link>
      </p>
    </section>

    <section>
      <h3>
        <router-link to="home#vis">Data Application</router-link>
      </h3>
      <div class="box">
        <div class="image fit">
          <img src="../assets/images/CPTree.jpg" alt>
        </div>
        <div class="image fit">
          <img src="../assets/images/MTTree.jpg" alt>
        </div>
        <div class="image fit">
          <img src="../assets/images/more.jpg" alt>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "howto",
  data() {
    return {
      tableData: [
        {
          type: "Genome Type",
          desc: `Specify the genome type: <code>?TYPE=TYPE_NAME</code>`,
          link: `<a href="entry.php?Type=mitochondrion">mitochondrion</a>`
        },
        {
          type: `Group<br/>SubGroup`,
          desc: `Specify Group using <code>?Group=YOUR_GROUP_NAME</code>, Or SubGroup using <code>?SubGroup=YOUR_SUBGROUP_NAME</code>`,
          link: `<a href="entry.php?Group=Animals">Animals</a> <a href="entry.php?SubGroup=Birds">Birds</a>`
        },
        {
          type: `Species Name`,
          desc: `<td>Specify the species name: <code>?Name=SPECIES_NAME</code>`,
          link: `<a href="entry.php?Name=Populus">Populus</a>`
        },
        {
          type: `Release Date`,
          desc: `Specify the release date: <code>?Release%20Date=YEAR</code> <em class="italic">IN A SINGLE YEAR ONLY</em>`,
          link: `<a href="entry.php?Release%20Date=1986">1986</a>,<a href="entry.php?Release%20Date=2017">2017</a>`
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.content > section {
  display: block;
  & > .el-button {
    margin-bottom: 0.5em;
    margin-top: 0.5em;
  }
  h4 {
    font-size: 16px;
    margin: 1em 0;
    & > a {
      color: #fff;
      &:hover {
        color: #e44c65;
      }
    }
  }
  & > h3 {
    & > a {
      color: #fff;
      &:hover {
        color: #e44c65;
      }
    }
  }
  & > .dbpage + p {
    margin-top: 2em;
  }
  &:last-of-type > .box {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
    & > div {
			width: 300px;
			height:100%;
      margin: 0 1em 1em 0;
    }
  }
  .image {
    border: 1px solid #666;
    width: 170px;
    height: 170px;
  }
  .left {
    float: left;
    margin-right: 10px;
  }
  .right {
    float: right;
    margin-left: 10px;
  }
}
</style>
<style lang="scss">
code {
  background: rgba(255, 255, 255, 0.075);
  border-radius: 4px;
  font-family: "Courier New", monospace;
  font-size: 0.9em;
  margin: 0 0.25em;
  padding: 0.25em 0.65em;
}
.content {
  ol {
    list-style: decimal;
    margin-left: 1em;
  }
  .el-table {
    color: rgba(255, 255, 255, 0.75);
    th {
      color: #fff;
    }
    &::before {
      display: none;
    }
  }
  .el-table td,
  .el-table th.is-leaf {
    border-color: rgba(255, 255, 255, 0.3);
  }
  .el-table th,
  .el-table tr {
    background: transparent;
  }
  .el-table,
  .el-table__expanded-cell {
    background: transparent;
  }
  .el-table__body tr {
    &:nth-of-type(2n + 1) {
      background: rgba(255, 255, 255, 0.1);
    }
  }
  .el-table__body tr:hover > td {
    background-color: transparent;
  }
}
</style>
