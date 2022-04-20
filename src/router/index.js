import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//引入封面组件
import Cover from '@/views/Cover/Cover.vue'

//引入Home组件
import Home from '@/views/Home/Home.vue'
//Home的子组件
import Index from '@/views/HomeComponents/Index.vue'
import Azurlane from '@/views/HomeComponents/Azurlane.vue'
import Article from '@/views/HomeComponents/Article.vue'

//azur子组件
import AzurRole from '@/views/AzurComponents/AzurRole.vue'

//后台页面
import Backstage from '@/views/HomeComponents/Backstage.vue'

//文章编辑页面
import ArticleFrom from '@/components/Article/articleFrom.vue'
//添加文章
import AddArticle from '@/views/Article/AddArticle.vue'

const routes = [{
  path: '/',
  redirect: '/cover'
}, {
  path: '/cover',
  component: Cover,
  meta: {
    title: '伊吹四季'
  }
}, {
  path: '/home',
  component: Home,
  children: [{
    path: '',
    redirect: 'index',

  }, {
    path: 'index',
    component: Index,
    meta: {
      title: '首页'
    }
  }, {
    path: 'azurlane',
    component: Azurlane,
    meta: {
      title: '碧蓝航线'
    },
  }, {
    path: 'azurlane/:id',
    component: AzurRole,
    props: true
  }, {
    path: 'article/:id',
    component: Article,
    props: true,
    meta: {
      title: '文章'
    }
  }, {
    path: 'backstage',
    component: Backstage,
    meta: {
      title: '后台'
    },
  }, {
    path: 'backstage/:id',
    component: ArticleFrom,
    props: true,
    meta: {
      title: '文章编辑'
    }
  }, {
    path: 'addarticle',
    component: AddArticle,
    meta: {
      title: '添加文章'
    }
  }],
}, ]

const router = new VueRouter({
  routes
})

import initData from "@/utils/initData";
import qs from "qs";
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  } else {
    next()
  }
  if (to.path === '/home/backstage') {
    async function ifLog() {
      const {
        data: res
      } = await initData.post(
        "/ifLog",
        qs.stringify({
          session: sessionStorage.getItem("userAdmin"),
        })
      );

      if (res.status !== 0) {
        router.back()
        alert('没登录呢！爪巴！')
      }
    }
    ifLog()
  }
})

export default router