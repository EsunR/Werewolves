<template>
  <div class="container">
    <img class="logo" src="../../img/logo.png" alt="">
    <div class="btn_box">
      <mt-button @click="gotoRoomInfo" class="found_btn" size="large" type="primary">加入游戏</mt-button>
      <mt-button class="join_btn" size="large" type="danger">创建游戏</mt-button>
    </div>
    <div class="message">
      版本：α内测版
      <br>
      Github：EsunR/Werewolves
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  methods: {
    gotoRoomInfo(){
      this.$router.push("/found/RoomInfo")
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 20px;
  .logo{
    display: block;
    margin: 50px auto;

  }
  .btn_box{
    .join_btn{
      margin-top: 2rem;
    }
  }
  .message{
    text-align: center;
    margin-top: 7rem;
    font-size: .9rem;
    line-height: 2rem;
    color: rgba(0,0,0,0.5)
  }
}
</style>
