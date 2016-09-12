require('core/open/vue/resource')
require('core/open/moment/moment-with-locales')
require('core/open/sweet/alert')
require('core/open/vue/table')

var urlParams = require('core/urlHandle')

var params = urlParams.getParams(location.href)

var E_SERVER_ERROR = 'Error communicating with the server'
var api = {
	delete: '/aj/api/log/delete'
}

// fields definition
var tableColumns = [{
	name: 'user_id',
	title: '用户ID'
}, {
	name: 'action',
	title: '操作'
}, {
	name: 'class',
	title: '操作对象'
}, {
	name: 'created_at',
	title: '操作时间'
}]

var selectedProps = ''

for (var index in tableColumns) {
	if (tableColumns[index].name.indexOf('__checkbox:') > -1) {
		selectedProps = tableColumns[index].name.replace('__checkbox:', '')
	}
}

var vm = new Vue({
	el: '.main',
	components: {
		cmsHeader: require('core/www/header.vue'),
		cmsNav: require('core/www/nav.vue'),
		breadcrumb: require('core/www/breadcrumb.vue'),
		cmsTable: require('core/www/expect.vue')
	},
	data: {
		searchFor: '',
		fields: tableColumns,
		paginationComponent: 'vuetable-pagination',
		moreParams: [],
		selectedProps: selectedProps,
		selectedRows: []
	},
	watch: {
		'perPage': function(val, oldVal) {
			this.$broadcast('vuetable:refresh')
		},
		'paginationComponent': function(val, oldVal) {
			this.$broadcast('vuetable:load-success', this.$refs.vuetable.tablePagination)
			this.paginationConfig(this.paginationComponent)
		}
	},
	methods: {
		/**
		 * Callback functions
		 */
		formatDate: function(value, fmt) {
			if (value == null) return ''
			fmt = (typeof fmt == 'undefined') ? 'D MMM YYYY' : fmt
			return moment(value, 'YYYY-MM-DD').format(fmt)
		},
		rowClassCB: function(data, index) {
			return (index % 2) === 0 ? 'positive' : ''
		},
		paginationConfig: function(componentName) {
			if (componentName == 'vuetable-pagination') {
				this.$broadcast('vuetable-pagination:set-options', {
					wrapperClass: 'pagination',
					icons: {
						first: '',
						prev: '',
						next: '',
						last: ''
					},
					activeClass: 'active',
					linkClass: 'btn btn-default',
					pageClass: 'btn btn-default'
				})
			}
			if (componentName == 'vuetable-pagination-dropdown') {
				this.$broadcast('vuetable-pagination:set-options', {
					wrapperClass: 'form-inline',
					icons: {
						prev: 'glyphicon glyphicon-chevron-left',
						next: 'glyphicon glyphicon-chevron-right'
					},
					dropdownClass: 'form-control'
				})
			}
		}
	},
	events: {
		'vuetable:load-error': function(response) {
			if (response.status == 400) {
				sweetAlert('Something\'s Wrong!', response.data.message, 'error')
			} else {
				sweetAlert('Oops', E_SERVER_ERROR, 'error')
			}
		}
	}
})
