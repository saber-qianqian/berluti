console.log('page base load')
console.log(vuestrapBase)

var vm = new Vue({
	el: '.main'
	, components: {
		base: require('base.vue')
		, vsDropdown: vuestrapBase.dropdown
	}
	, data: function(){
		return{
			name: 'yun',
			showVariable: true,
			state: 'success',
			arrow: true
		}
	}
	, methods:{
		showme: function(){
			console.log('showme')
		}
	}
	, ready: function(){
		console.log('page base welcome: ' + this.name)
	}
})
