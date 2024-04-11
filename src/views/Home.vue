<template>
  <div>
    <el-container>
      <el-aside class="sidebar">
        <el-menu class="link" mode="inline" router>
          <el-menu-item index="/eligibility">查询考试资格</el-menu-item>
          <el-menu-item index="/score">查询考试成绩</el-menu-item>
          <el-menu-item index="/qualified">查询录取结果</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {

    }
  }
}
</script>

<style>
el-container {
  height: 100%;
}
.sidebar {
  height: 100%;
  /* background-color: #f6f6f7; */
}
.sidebar .link {
  margin: 20px auto;
  width: 299px;
  height: 100%;
  border: none;
  font-weight: 700;
}
.sidebar .link .el-menu-item{
  font-size: 16px;
}
.el-main {
  width: 400px;
  height: 700px;
  background: #fafbfe;
}
</style>
