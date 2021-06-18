import Toast from './Toast.vue'


const obj = {}
obj.install = function(Vue) {
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  //2.以new的方式构造一个组件对象
  const toast = new toastConstructor()

  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;  // 这里要将组件对象toast赋值给$toast，而不是Toast
}

export default obj
