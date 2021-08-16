import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Form,
  FormItem, Button,
  ButtonGroup,
  Input,
  InputNumber,
  DatePicker,
  Upload,
  Table,
  TableColumn,
  Message,
  Pagination
} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.prototype.$message = Message;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
