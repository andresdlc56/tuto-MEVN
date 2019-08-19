import Vue from 'vue';
import App from './components/App.vue';

//Definir donde va montado vue
new Vue({
	render: h => h(App)
}).$mount('#app');