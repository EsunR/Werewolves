<template>
  <div class="container">
    <div class="card">
      <div class="big_title">创建房间</div>
      <div class="big_subtitle">请填写游玩参数</div>
    </div>
    <div class="card select_player_num">
      <div class="title">选择玩家人数</div>
      <!-- 自定义属性要加修饰符@或者: -->
      <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount="3"></mt-picker>
    </div>
    <div class="card show_actor">
      <table>
        <tr>
          <th class="left">角色</th>
          <th class="right">人数</th>
        </tr>
        <tr v-for="(val, key, i) in rule" :key="i">
          <td class="left">{{key}}</td>
          <td class="right">{{val}}</td>
        </tr>
      </table>
    </div>
    <div class="card btn_box">
      <mt-button class="primary" type="primary" size="large" @click="postRoomInfo">确定创建</mt-button>
      <mt-button class="danger" type="danger" size="large" @click="backToHome">取消创建</mt-button>
    </div>
  </div>
</template>

<script>
import { Picker } from "mint-ui";
export default {
  data() {
    return {
      slots: [
        {
          flex: 1,
          values: [6, 7, 8, 9, 10, 11, 12],
          className: "slot1"
        }
      ],
      player_num: 6,
      rule: {}
    };
  },
  mounted() {
    // this.getRule();
  },
  methods: {
    onValuesChange(picker, values) {
      if (picker.getSlotValue(0) == null) {
        this.player_num = 6;
      } else {
        this.player_num = picker.getSlotValue(0);
      }
      this.getRule();
    },
    // 由人数获取游戏规则
    getRule() {
      this.$http.get("getRule?num=" + this.player_num).then(res => {
        if (res.ok) {
          this.rule = res.data;
        }
      });
    },
    // 确定建立房间
    postRoomInfo() {
      this.$http
        .post("postRoomInfo", { player_num: this.player_num, rule: this.rule })
        .then(res => {
          // console.log(res.body);
          // 在vuex中记录房间ID
          this.$store.commit("setRoomId", res.body);
          this.$store.commit("setPlayerNo", 1);
          this.$router.push("/found/Ready");
        });
    },
    // 返回首页
    backToHome(){
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.select_player_num {
  .title {
    text-align: center;
    padding: 1rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
  }
}
.show_actor {
  padding: 20px;
  table {
    width: 100%;
    padding: 20px;
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    th,
    tr,
    td {
      background: rgb(235, 235, 235);
      border-bottom: 2px solid white;
      padding: 4px 0;
      font-size: 1rem;
    }
    th {
      background: #26a2ff;
      color: white;
    }
    .left {
      width: 50%;
    }
  }
}
.btn_box {
  padding: 20px;
  .primary {
    margin-bottom: 1.5rem;
  }
}
</style>
