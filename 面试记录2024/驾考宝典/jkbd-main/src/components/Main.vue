<template>
  <div>
    <!-- 顶部区域 -->
    <header class="header">
      <div class="header-top">
        <!-- logo区域 -->
        <div class="logo-w">
          <a class="logo" href="https://www.jiakaobaodian.com/"></a>
        </div>
        <!-- 搜索框 -->
        <div class="search-w">
          <form action="https://www.so.com/s" target="_blank" id="so360form">
            <input type="text" placeholder="请输入关键字" autocomplete="off" name="q" id="so360_keyword" class="search-input">
            <input type="submit" class="button" ref="soSubmit" id="so360_submit" value="搜 索">
            <input type="hidden" name="ie" value="utf8"><input type="hidden" name="src"
              value="zz_jiakaobaodian.com"><input type="hidden" name="site" value="jiakaobaodian.com">
            <input type="hidden" name="rg" value="1">
          </form>
        </div>
      </div>
      <!-- 导航栏 -->
      <nav class="horizontal-nav">
        <ul class="nav-w">
          <li><a @click="selectNavItem('home')" :class="{ 'active': selectedNavItem === 'home' }"
              href="https://www.jiakaobaodian.com/">首页</a></li>
          <li class="menu-jx" @click="selectNavItem('mnks')">
            <a class="" href="https://www.jiakaobaodian.com/mnks/"
              :class="{ 'active': selectedNavItem === 'mnks' }">模拟考试</a>
            <div class="drop-w">
              <a href="https://www.jiakaobaodian.com/mnks/kemu1/car.html">科目一</a>
              <a href="https://www.jiakaobaodian.com/mnks/kemu2/car.html">科目二</a>
              <a href="https://www.jiakaobaodian.com/mnks/kemu3/car.html">科目三</a>
              <a href="https://www.jiakaobaodian.com/mnks/kemu4/car.html">科目四</a>
            </div>
          </li>
          <li class="menu-jx" @click="selectNavItem('school')">
            <a href="https://www.jiakaobaodian.com/school/" :class="{ 'active': selectedNavItem === 'school' }">找驾校</a>
            <div class="drop-w">
              <a href="https://www.jiakaobaodian.com/school/">找驾校</a>
              <a href="https://www.jiakaobaodian.com/coach/">找教练</a>
              <a href="https://www.jiakaobaodian.com/peilian/">找陪练</a>
            </div>
          </li>
          <li><a class="" href="https://www.jiakaobaodian.com/bbs/" @click="selectNavItem('bbs')"
              :class="{ 'active': selectedNavItem === 'bbs' }">驾考圈</a></li>
          <li><a class="" href="https://www.jiakaobaodian.com/sign/" @click="selectNavItem('sign')"
              :class="{ 'active': selectedNavItem === 'sign' }">交通标志</a></li>
          <li><a class="" href="https://www.jiakaobaodian.com/download/" @click="selectNavItem('download')"
              :class="{ 'active': selectedNavItem === 'download' }">软件下载</a></li>
          <li class="qiye"><a href="https://qiye.jiakaobaodian.com" target="_blank" rel="nofollow">驾考宝典企业版</a></li>
          <li><a href="https://www.futurephantom.cn/" target="_blank" rel="nofollow">智慧驾校</a></li>
          <li class="menu-jx"><a href="https://www.maiche.com/rank/?from=jiakao_web">买新车</a>
            <div class="drop-w"><a href="https://www.maiche.com/rank/?from=jiakao_web" target="_blank"
                rel="nofollow">买车网</a><a href="http://www.pingxing.cn" target="_blank" rel="nofollow">平行之家</a></div>
          </li>
          <li><a href="http://www.xiaozhu2.com/?from=jiakao_web" target="_blank" rel="nofollow">二手车</a></li>
        </ul>
      </nav>

    </header>


    <!-- 轮播图 -->
    <div class="carousel">
      <Carousel />
    </div>

    <!-- 内容区域 小车理论考试 -->
    <div class="container">
      <div class="container-title">
        <hr class="hr">
        <div class="title-text">2024小车理论考试</div>
      </div>
      <div class="container-content">
        <ul v-for="item in practice" :key="item.id" :class="'item km '+item.position">
          <li class="item-right">
            <a class="link" target="_blank" :href="item.href">{{item.title}}<span class="small"></span></a>
          </li>
          <li v-for="listItem in item.list" :key="listItem.id" :class="'item-left icon'+listItem.id"><a target="_blank" :href="listItem.href">{{listItem.text1 }}</a>
            <p>{{ listItem.text2 }}</p>
          </li>
          <li class="item-right btn-bar"><a class="btn-link" target="_blank" :href="item.moni">模拟考试</a></li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <!-- 入驻 -->
      <div class="banner-mid-ad com-part-home">
        <a target="_blank" href="https://saas-shop.jiakaobaodian.com/runtu/cooperate.html">
          <img src="../images/rzgl.png">
        </a>
      </div>
    </div>

    <!-- 驾校推荐 -->
    <div class="part-home">
      <div class="part-home-title">
        <hr class="hr">
        <div class="title-text">驾校推荐</div>
        <div class="title-text2"></div>
      </div>
      <div class="jiaoxiao-tuijian-container">
        <ul class="school-list clearfix">
          <li v-for="(item, index) in schools" :key="index">
            <div class="item-top clearfix">
              <div class="col1 left">
                <div class="div1"><span class="name">{{ item.schoolName }}</span>
                  <div class="star-w-s">
                    <div class="bfb" :style="'width :' + item.star"></div>
                  </div>
                </div>
                <div class="div2"><span v-for="(tag, index) in item.tags" :key="index">{{ tag }}</span></div>
              </div>
              <div class="col2 left">
                <p class="price red">￥{{ item.price }}</p>
              </div>
              <div class="col3 right"><button class="btn-baoming" ref="baoming" data-id="8567">学车报名</button></div>
            </div>
            <div class="item-content">
              <div class="img-w"><img :src="item.userImg">
              </div>
              <p class="content">{{ item.evaluate }}</p>
            </div>
            <div class="tip"></div>
          </li>
        </ul>
        <div class="btn-bar"><a target="_blank" href="https://www.jiakaobaodian.com/school/">查看更多</a></div>
      </div>
    </div>
    <!-- 学车流程 -->
    <div class="com-home-study-step part-home">
      <div class="part-home-title">
        <hr class="hr">
        <div class="title-text">学车流程</div>
        <div class="title-text2">驾考宝典整合学车全流程，驾考宝典为用户提供全方位学车服务</div>
      </div>
      <div class="content">
        <ul class="item clearfix">
          <li v-for="item in studySteps" :key="item.id" :class="'item-left icon' + item.id">
            <a target="_blank" :href="item.href"><span class="title">{{ item.text1 }}</span>
              <p>{{ item.text2 }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 宝典荣誉 -->
    <div class="part-home">
      <div class="part-home-title">
        <hr class="hr">
        <div class="title-text">宝典荣誉</div>
        <div class="title-text2">强大的驾考功能，优秀的用户体验，我们的愿景是学车无忧，轻松拿本</div>
      </div>
      <div class="content"><img src="../images/hezuo.png"></div>
    </div>

    <!-- 驾考宝典app -->
    <div class="com-home-app-ad">
      <div class="content">
        <div v-for="item in appName" :key="item.id" :class="'ad' + item.id"><span></span>
          <div></div>
        </div>
      </div>
    </div>

    <!-- 下载 -->
    <div class="com-home-app-down part-home">
      <div class="content">
        <ul class="item clearfix">
          <li v-for="(item, index) in dowload" :key="index" :class="'item-' + item.class"><span>{{ item.text1 }}</span>
            <p>{{ item.text2 }}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
// 导入轮播图组件
import Carousel from './Carousel.vue';
export default {
  components: {
    Carousel,
  },
  name: 'Main',
  data() {
    return {
      selectedNavItem: "",
      // 练习
      practice: [{
        title: '科目一交规',
        id:1,
        href:'https://www.jiakaobaodian.com/mnks/kemu1/car-wuhan.html',
        position:'left',
        list: [{
          id: 1,
          href: 'https://www.jiakaobaodian.com/mnks/exercise/0-car-kemu1-wuhan.html?id=800500',
          text1: '顺序练习',
          text2: '按照顺序练习做题'
        },
        {
          id: 2,
          href: 'https://www.jiakaobaodian.com/mnks/exercise/3-car-kemu1-wuhan.html?id=875000',
          text1: '随机练习',
          text2: '按随机顺序做题'
        },
        {
          id: 1,
          href: 'https://www.jiakaobaodian.com/mnks/strengthen/car-kemu1-wuhan.html',
          text1: '专项练习',
          text2: '分门别类重点突破'
        },
        {
          id: 1,
          href: 'https://www.jiakaobaodian.com/mnks/exercise/8-car-kemu1-wuhan.html?id=801300',
          text1: '难题攻克',
          text2: '准确把握考试难点'
        }
        ],
        moni: 'https://www.jiakaobaodian.com/mnks/exam/car-kemu1-wuhan.html'
      },
      {
        title: '科目四安全文明驾驶',
        id:2,
        href:'https://www.jiakaobaodian.com/mnks/kemu4/car-wuhan.html',
        position:'right',
        list: [{
          id: 1,
          href: 'https://www.jiakaobaodian.com/mnks/exercise/0-car-kemu3-wuhan.html?id=881600',
          text1: '顺序练习',
          text2: '按照顺序练习做题'
        },
        {
          id: 2,
          href: 'https://www.jiakaobaodian.com/mnks/exercise/3-car-kemu3-wuhan.html?id=1138500',
          text1: '随机练习',
          text2: '按随机顺序做题'
        },
        {
          id: 1,
          href: 'https://www.jiakaobaodian.com/mnks/strengthen/car-kemu3-wuhan.html',
          text1: '专项练习',
          text2: '分门别类重点突破'
        },
        {
          id: 1,
          href: 'https://www.jiakaobaodian.com/mnks/exercise/8-car-kemu3-wuhan.html',
          text1: '难题攻克',
          text2: '准确把握考试难点'
        }
        ],
        moni: 'https://www.jiakaobaodian.com/mnks/exam/car-kemu3-wuhan.html'
      }],
      // 学车流程
      studySteps: [{
        id: 1,
        text1: '找驾校',
        text2: '口碑好的驾校',
        href: 'https://www.jiakaobaodian.com/school/'
      },
      {
        id: 2,
        text1: '科目一',
        text2: '驾驶员理论考试',
        href: 'https://www.jiakaobaodian.com/mnks/kemu1/car-wuhan.html'
      },
      {
        id: 3,
        text1: '科目二',
        text2: '场地驾驶技能考试科目',
        href: 'https://jiakaobaodian.com/mnks/kemu2/car-wuhan.html'
      },
      {
        id: 4,
        text1: '科目三',
        text2: '安全文明驾驶常识考试',
        href: 'https://www.jiakaobaodian.com/mnks/kemu3/car-wuhan.html'
      },
      {
        id: 5,
        text1: '科目四',
        text2: '驾驶员理论考试',
        href: 'https://www.jiakaobaodian.com/mnks/kemu4/car-wuhan.html'
      },
      {
        id: 6,
        text1: '拿本',
        text2: '开心拿本，安全驾驶',
      }],
      appName: [{ id: 1, name: '教练宝典APP' },
      { id: 2, name: '驾考宝典APP' },
      { id: 3, name: '买车宝典APP' }
      ],
      // 驾校推荐
      schools: [
        {
          schoolName: '龙泉驾校',
          tags: ['口碑好', '规模大', '拿本快', '包接送'],
          price: 3480,
          star: '84%',
          evaluate: '服务态度：停好，教练不错，',
          userImg: 'https://avatar-user.mc-cdn.cn/user-avatar/2022/08/31/02/8d50f5d5d61c4d538b1f1b342df8c8dc.jpg!100x100'
        },
        {
          schoolName: '公交驾校',
          tags: ['口碑好', '规模大', '拿本快', '包接送'],
          price: 4900,
          star: '88.00000000000001%',
          evaluate: '通过率：全部一遍过 服务态度：好 学车体验：好 规范收费：透明',
          userImg: 'https://avatar-user.mc-cdn.cn/user-avatar/2021/12/26/17/001e1dced32d40729de8a190da5400d2.jpg?_system=HUAWEIYAL-AL10!100x100'
        },
        {
          schoolName: '金菱驾校',
          tags: ['口碑好', '规模大', '拿本快', '包接送'],
          price: 3980,
          star: '91.99999999999999%',
          evaluate: '一人一车，教练挺专业的，各个点位准确，通过率高',
          userImg: 'https://avatar-user.mucang.cn/user-avatar/default/DWLYxmRNYe8.jpg!100x100'
        },
        {
          schoolName: '嘉安驾校',
          tags: ['口碑好', '规模大', '拿本快', '包接送'],
          price: 4000,
          star: '86%',
          evaluate: '。。。。。。。。',
          userImg: 'https://avatar-user.mucang.cn/user-avatar/default/adK3Vu70DEQ.jpg!100x100'
        }
      ],
      // 下载
      dowload: [{
        class: 'left',
        text1: '驾考宝典APP下载', text2: '考驾照 用宝典'
      }, {
        class: 'left right',
        text1: '驾考宝典微信小程序',
        text2: ''
      }]
    }
  },
  methods: {
    selectNavItem(item) {
      this.selectedNavItem = item;
    }
  }

}
</script>

<style scoped lang="less">
header {
  height: 148px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

}

header .header-top {
  width: 1200px;
  height: 42px;
  margin: 28px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo-w {
    width: 207px;
    height: 100%;
    overflow: hidden;
    font-size: 36px;

    .logo {
      display: block;
      width: 207px;
      height: 100%;
      background: url(../images/logo.png) left center no-repeat;
    }
  }

  .search-w {
    position: relative;
    width: 300px;

    input {
      float: left;
      height: 42px;
      width: 100%;
      line-height: 40px;
      border: 1px solid #e9e9e9;
      font-size: 14px;
      padding: 0 40px 0 10px;
    }

    .button {
      position: absolute !important;
      top: 0 !important;
      right: 0 !important;
      width: 14% !important;
    }

  }

  input:focus {
    outline: none;
    border: 1px solid #007aff;
    /* 输入框获得焦点时的边框颜色 */
  }

}

.horizontal-nav {
  width: 100%;
  height: 50px;
  background-color: #37B5F8;
  color: #fff;

  .nav-w {
    width: 1200px;
    margin: auto;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: left;

    .qiye {
      width: 148px;
    }

    .menu-jx {
      position: relative;
      overflow: visible;

      >a:after {
        display: inline-block;
        vertical-align: middle;
        width: 10px;
        height: 10px;
        margin-left: 6px;
        margin-top: 5px;
        border: 5px solid transparent;
        border-top: 5px solid #fff;
        content: ' ';
      }

      .drop-w {
        font-size: 14px;
        display: none;
        position: absolute;
        top: 50px;
        width: 100%;
        background-color: #fff;
        z-index: 2;
        line-height: 40px;
        padding: 0 8px;
        color: #666;
        box-shadow: 0 0 20px rgba(0, 0, 0, .1);

        >a:hover {
          color: #37b5f9;
        }
      }
    }

    .menu-jx:hover .drop-w {
      display: block;
    }

    >li:hover {
      background-color: #54c0f9;
    }


    >li {
      display: inline-block;
      padding: 0;
      vertical-align: top;
      width: 108px;
      text-align: center;

      a {
        display: block;
        height: 100%;
        width: 100%;
      }

      .active {
        background-color: #258FC7;
      }
    }
  }

}

.container {
  width: 1200px;
  margin: 60px auto;

  //鼠标悬停
  a:hover {
    color: #37B5F8;
  }

  //清除浮动
  >.container-content::after {
    clear: both;
    display: table;
    content: " ";
  }

  >.container-content ul.item.km {
    border: 1px solid #e9e9e9;
    width: 580px;

    >li.item-right {
      width: 100%;
      height: 110px;
      line-height: 110px;
      padding-top: 0;
      border: none;
      margin: 0;
      text-align: center;

      >a.link {
        padding: 0 0 0 38px;
        display: inline-block;
        background: url(../images/time1.png) left center no-repeat;
        font-size: 20px;
        font-family: "Microsoft YaHei", "Hiragino Sans GB", "Hiragino Sans GB W3", "Helvetica Neue", Helvetica, Arial, sans-serif;
      }

      >.btn-link {
        width: 300px;
        margin: 15px auto 30px;
        border: none;
        display: block;
        height: 46px;
        line-height: 44px;
        background: #37B5F8;
        color: #fff;
        border-radius: 4px;
      }

    }

    >li.item-right.btn-bar {
      height: auto;
      line-height: 70px;
      float: left;
    }

    >li.item-left {
      float: left;
      width: 250px;
      height: 70px;
      line-height: 20px;
      margin: 0 0 15px 25px;
      padding: 15px 0 15px 85px;
      background-color: #FAFAFA;

      >a {
        font-size: 16px;

        font-family: "Microsoft YaHei", "Hiragino Sans GB", "Hiragino Sans GB W3", "Helvetica Neue", Helvetica, Arial, sans-serif;
      }

      >p {
        color: #999;
      }
    }

    //less插值
    .generate-icons(@n, @total) when (@n =< @total) {
      .icon@{n} {
        background:~"url(../images/icon@{n}.png) left 50px center no-repeat";
      }

      .generate-icons(@n + 1, @total);
    }

    .generate-icons(1, 4); // 调用 mixin 生成四个图标样式
  }

  >.container-title {
    margin-bottom: 40px;
    text-align: center;
    padding-top: 20px;

    >.hr {
      height: 1px;
      border: none;
      border-top: 1px dotted #e9e9e9;
    }

    >.title-text {
      display: inline-block;
      margin-top: -20px;
      line-height: 41px;
      padding: 0 45px;
      background-color: #fff;
      font-size: 30px;
    }
  }
}

.footer .banner-mid-ad.com-part-home {
  margin-top: -30px;
  width: 1200px;
  margin: 60px auto;
}

.part-home {
  width: 1200px;
  margin: 60px auto;

  >.part-home-title {
    margin-bottom: 40px;
    text-align: center;
    padding-top: 20px;

    >.hr {
      height: 1px;
      border: none;
      border-top: 2px dotted red;
    }

    >.title-text {
      display: block;
      margin-top: -16px;
      line-height: 41px;
      padding: 0 45px;
      background-color: #fff;
      font-size: 30px;
    }

    >.title-text2 {
      font-size: 16px;
      margin: 30px 0;
      color: #666;
    }
  }

  >.jiaoxiao-tuijian-container {
    margin: 0 auto;

    >.school-list {
      margin: -30px 0 0 -30px;
      color: #666;
      font-size: 14px;
      font-family: "Microsoft YaHei", "Hiragino Sans GB", "Hiragino Sans GB W3", "Helvetica Neue", Helvetica, Arial, sans-serif;

      >li {
        float: left;
        position: relative;
        width: 585px;
        margin: 30px 0 0 30px;
        padding: 40px 30px;
        border: 1px solid #e9e9e9;

        >.item-content {
          height: 80px;
          margin-top: 30px;
          padding: 20px;
          background: #FAFAFA;
          color: #999;

          >.img-w {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;

            img {
              background: 0 0;
              border: 0;
              max-width: 100%;
            }
          }

          >.content {
            height: 40px;
            line-height: 20px;
            margin-left: 60px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            line-clamp: 2;
          }
        }

        >.item-top {
          >.col1 {
            width: 305px;
            line-height: 30px;

            >.div1 {
              .name {
                max-width: 180px;
                display: inline-block;
                vertical-align: middle;
                font-size: 22px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              .star-w-s {
                display: inline-block;
                vertical-align: middle;
                margin: -3px 0 0 10px;
                width: 90px;
                height: 20px;
                background: url(../images/star2.png) left center no-repeat;

                .bfb {
                  height: 100%;
                  background: url(../images/star.png) left center no-repeat;
                }
              }
            }

            >.div2 {
              margin-top: 10px;
              line-height: 20px;

              >span {
                display: inline-block;
                background: url(../images/ok.png) left center no-repeat;
                padding-left: 20px;

              }

              //第二个span开始
              >span:nth-child(n + 2) {
                margin-left: 10px;
              }
            }
          }

          >.col2 {
            width: 130px;
            line-height: 63px;
            border-left: 1px solid #e9e9e9;
            font-size: 30px;
            text-align: center;
          }

          >.col3 button {
            width: 80px;
            line-height: 28px;
            margin-top: 17px;
            text-align: center;
            font-size: 14px;
            border-radius: 4px;
          }
        }

        >.item-top::after {
          clear: both;
          display: block;
          content: "";
        }

        >.tip {
          position: absolute;
          top: 5px;
          right: 10px;
        }
      }
    }

    >.btn-bar {
      margin-top: 40px;

      a {
        display: block;
        width: 280px;
        margin: 20px auto 0;
        line-height: 48px;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        color: #999;
        text-align: center;
        font-size: 16px;
      }

      a:hover {
        color: #37B5F8;
        border: 1px solid #37B5F8;
      }
    }
  }
}

.com-home-study-step>.content {
  text-align: center;

  ul.item {
    margin: 0 -40px;

    >li.item-left {
      float: left;
      width: 16.6%;
      line-height: 1.4;

      >a {
        display: block;
        padding: 150px 40px 0;

        >.title {
          display: block;
          font-size: 24px;
          font-family: "Microsoft YaHei", "Hiragino Sans GB", "Hiragino Sans GB W3", "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        >p {
          color: #999;
          margin: 10px -20px;
        }
      }

      >a:hover {
        color: #37B5F8;
      }
    }

    //less插值
    .generate-icons(@n, @total) when (@n =< @total) {
      .icon@{n} {
        background:~"url(../images/lc-icon@{n}.png) center top  no-repeat";
      }

      .generate-icons(@n + 1, @total);
    }

    .generate-icons(1, 6); // 调用 mixin 生成四个图标样式

  }
}

.com-home-app-ad {
  background-color: #f5f5f5;

  >.content {
    position: relative;
    width: 1200px;
    height: 560px;
    margin: 70px auto 0;
    overflow: hidden;

    div span {
      font-size: 20px;
    }

    >div {
      position: absolute;
      bottom: -40px;
      text-align: center;
      transition: transform 0.5s;
      /* 添加过渡效果，让移动更平滑 */
    }

    >div:hover {
      transform: translateY(-30px);
      /* 当鼠标悬停时，向上移动 30px */
    }

    >div:hover>div {
      display: block;
    }

    .ad1 {
      left: 30px;
      width: 300px;
      height: 500px;
      background: url(../images/jlbdAPP.png) center bottom no-repeat;

      >div {
        display: none;
        width: 100%;
        height: 100%;
        margin-top: 37px;
        background: url(../images/jkbd-ma.png) center no-repeat;
      }
    }

    .ad2 {
      left: 400px;
      width: 430px;
      height: 540px;
      background: url(../images/jkbd.png) center bottom no-repeat;

      >div {
        display: none;
        width: 100%;
        height: 100%;
        margin-top: 52px;
        background: url(../images/shaoma.png) center no-repeat;
        background-color: rgba(255, 255, 255, .5);
        background-size: 150px 150px;
      }
    }

    .ad3 {
      left: 905px;
      width: 265px;
      height: 428px;
      background: url(../images/mcbd.png) center bottom no-repeat;

      >div {
        display: none;
        width: 100%;
        height: 100%;
        margin-top: 37px;
        background: url(../images/mcbd-sm.png) center no-repeat;
      }
    }
  }
}

.com-home-app-down>.content ul.item>li.item-left {
  float: left;
  width: 600px;
  line-height: 1.7;
  margin: 20px 0;
  padding: 40px 80px;
  background: url(../images/shaoma.png) right 80px center no-repeat;
  background-size: 140px;
  border-right: 1px solid #e9e9e9;

  >span {
    font-size: 20px;
    font-family: "Microsoft YaHei", "Hiragino Sans GB", "Hiragino Sans GB W3", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  >p {
    color: #999;
  }
}

.com-home-app-down>.content ul.item>li.item-left.right {
  float: right;
  background: url(../images/xcx.jpg) right 80px center no-repeat;
  background-size: 130px;
  border: none;
}
</style>
