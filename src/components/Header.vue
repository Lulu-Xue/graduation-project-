<template>
  <header id="header">
    <el-menu
      :default-active="$route.path"
      class="el-menu-1"
      mode="horizontal"
      background-color="transparent"
      text-color="rgba(255,255,255,0.75)"
      active-text-color="#fff"
      v-if="screenWidth > 768"
      :router="isTrue"
    >
      <el-menu-item class="home-label" index="/" route="/">VDOG</el-menu-item>
      <el-menu-item index="4">
        <button class="intro-button">Introduction</button>
      </el-menu-item>
      <el-submenu index="3" popper-class="submenu">
        <template slot="title">Databases</template>
        <el-menu-item index="3-1">plastidDB</el-menu-item>
        <el-menu-item index="3-2">mitoDB</el-menu-item>
        <el-menu-item index="3-3">Vis and Apps</el-menu-item>
        <el-menu-item index="3-4">How to use</el-menu-item>
        <el-submenu index="3-5" :popper-append-to-body="isTrue" popper-class="submenu">
          <template slot="title">Examples</template>
          <el-menu-item index="3-5-1">
            cpDNA:
            <span class="italic">Arabidopsis thaliana</span>
          </el-menu-item>
          <el-menu-item index="3-5-2">
            cpDNA:
            <span class="italic">Populus trichocarpa</span>
          </el-menu-item>
          <el-menu-item index="3-5-3">
            mtDNA:
            <span class="italic">Mus musculus molossinus</span>
          </el-menu-item>
          <el-menu-item index="3-5-4">
            mtDNA:
            <span class="italic">Drosophila melanogaster</span>
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/home" route="/home">Home</el-menu-item>
    </el-menu>

    <el-menu
      :default-active="$route.path"
      class="el-menu-2"
      mode="horizontal"
      background-color="transparent"
      text-color="rgba(255,255,255,0.75)"
      active-text-color="#fff"
      v-if="screenWidth <= 768"
      :router="isTrue"
    >
      <el-submenu index="1" popper-class="submenu">
        <template slot="title">
          <i class="el-icon-menu"></i>
        </template>
        <el-menu-item index="/" route="/">VDOG</el-menu-item>
        <el-menu-item index="/home" route="/home">Home</el-menu-item>
        <el-submenu index="1-3" :popper-append-to-body="isTrue" popper-class="submenu">
          <template slot="title">Databases</template>
          <el-menu-item index="1-3-1">plastidDB</el-menu-item>
          <el-menu-item index="1-3-2">mitoDB</el-menu-item>
          <el-menu-item index="1-3-3">Vis and Apps</el-menu-item>
          <el-menu-item index="1-3-4">How to use</el-menu-item>
          <el-submenu index="1-3-5" :popper-append-to-body="isTrue" popper-class="submenu">
            <template slot="title">Examples</template>
            <el-menu-item index="1-3-5-1">
              cpDNA:
              <span class="italic">Arabidopsis thaliana</span>
            </el-menu-item>
            <el-menu-item index="1-3-5-2">
              cpDNA:
              <span class="italic">Populus trichocarpa</span>
            </el-menu-item>
            <el-menu-item index="1-3-5-3">
              mtDNA:
              <span class="italic">Mus musculus molossinus</span>
            </el-menu-item>
            <el-menu-item index="3-5-4">
              mtDNA:
              <span class="italic">Drosophila melanogaster</span>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="1-4">
          <span>Introduction</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>

<script>
export default {
  name: "Header",
  // props: {
  //   screenWidth: Number
  // },
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
.submenu {
  background: rgba(39, 40, 51, 0.765);
  border-radius: 4px;
  box-shadow: 0 0.075em 0.35em 0 rgba(0, 0, 0, 0.125);
  list-style: none;
  padding: 0.25em 0;
}
#header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  .el-menu--horizontal {
    border: none;
    &.el-menu-1 {
      & > .el-menu-item,
      .el-submenu {
        float: right;
        &:hover {
          color: #e44c65 !important;
        }
        & > .el-submenu__title:hover {
          color: #e44c65 !important;
        }
      }
      & > .el-menu-item:first-of-type {
        float: left;
      }
    }
  }
  .el-menu--horizontal {
    & > .el-menu-item,
    .el-submenu {
      border: none;
      & > .el-submenu__title {
        border: none;
        & > i.el-icon-menu {
          color: #e44c65;
        }
      }
    }
  }
}
.italic {
  font-style: italic;
}
.intro-button {
  color: #fff;
  background: #e44c65;
  border-radius: 4px;
  height: 2em;
  line-height: 2em;
  padding: 0 1.25em;
}
</style>

