

const routeConfig = [{
  path: '/',
  getComponent: lazyLoad('home')
}, {
  path: '/home',
  getComponent: lazyLoad('home')
}, {
  path: '/posts',
  getComponent: lazyLoad('posts')
}, {
  path: '/article',
  getComponent: lazyLoad('article')
}, {
  path: './about',
  getComponent: lazyLoad('about')
}]

export default routeConfig