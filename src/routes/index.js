
const lazyLoad = moduleName => _ =>  
  import(`../components/${moduleName}`)
    .then(module => module.default)
    .catch(err => console.error(err))

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