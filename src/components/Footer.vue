<template>
  <footer id="footer">
    <ul class="icons">
      <li>
        <a
          href="https://www.researchgate.net/profile/Yiqing_Xu3"
          class="icon alt fa-graduation-cap"
        >
          <span class="label">ResearchGate</span>
        </a>
      </li>
      <li>
        <a href="mailto:yiqingxu@njfu.edu.cn" class="icon alt fa-envelope">
          <span class="label">Email</span>
        </a>
      </li>
      <li>
        <a
          href="https://scholar.google.com/citations?user=HNYpuGYAAAAJ&hl=zh-CN"
          class="icon alt fa-google"
        >
          <span class="label">LinkedIn</span>
        </a>
      </li>
      <li>
        <a href="http://xueshu.baidu.com/scholarID/CN-BJ8JVNPJ" class="icon alt fa-university">
          <span class="label">Baidu</span>
        </a>
      </li>
    </ul>
    <ul class="copyright">
      <li>
        Copyright &copy;
        <a href="yiqingxu@njfu.edu.cn">yiqingxu</a> 2015-2017
      </li>
      <li>|</li>
      <li>
        Powered by
        <a href="http://bio.njfu.edu.cn">BIO.NJFU</a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss" scoped>
#footer {
  background: #272833;
  text-align: center;
  font-size: 12px;
  padding: 4.5em;
  & > .icons {
    margin-bottom: 2em;
    & > li {
      display: inline-block;
      padding: 0 1em;
      & > .icon.alt {
        border-bottom: transparent;
        & > .label {
          display: none;
        }
      }
    }
  }
  & > .copyright {
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    & > li {
      display: inline-block;
      line-height: 2em;
      margin-left: 1.5em;
      & > a {
        color: inherit;
        border-bottom: transparent;
      }
    }
  }
}
</style>
