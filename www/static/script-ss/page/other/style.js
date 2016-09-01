require('core/open/vue/resource')
require('core/open/moment/moment-with-locales')
require('core/open/sweet/alert')
require('core/open/vue/table')

var E_SERVER_ERROR = 'Error communicating with the server'

// fields definition
var tableColumns = [{
	name: '__checkbox:name',
	titleClass: 'text-center',
	dataClass: 'text-center',
}, {
	name: 'nickname',
	title: '名称'
}, {
	name: 'nickname',
	title: '分类'
}, {
	name: 'nickname',
	title: '创建者'
}, {
	name: 'birthdate',
	title: '创建时间'
}, {
	name: 'nickname',
	title: '最后修改者'
}, {
	name: 'birthdate',
	title: '最后修改时间'
}, {
	name: 'email',
	title: '状态',
	sortField: 'email',
}, {
	name: '__actions',
	title: '操作',
	dataClass: 'text-center',
}]

var selectedProps = ''

for(var index in tableColumns){
	if(tableColumns[index].name.indexOf('__checkbox:') > -1){
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
		perPage: 10,
		paginationComponent: 'vuetable-pagination',
		itemActions: [{
			name: 'edit-item',
			label: '编辑',
			icon: 'glyphicon glyphicon-pencil',
			class: 'btn btn-warning',
			extra: {
				title: 'Edit',
				'data-toggle': "tooltip",
				'data-placement': "top"
			}
		}, {
			name: 'delete-item',
			label: '删除',
			icon: 'glyphicon glyphicon-remove',
			class: 'btn btn-danger',
			extra: {
				title: 'Delete',
				'data-toggle': "tooltip",
				'data-placement': "right"
			}
		}],
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
		allCap: function(value) {
			return value.toUpperCase()
		},
		gender: function(value) {
			return value == 'M' ? '<span class="label label-info"><i class="glyphicon glyphicon-star"></i> Male</span>' : '<span class="label label-success"><i class="glyphicon glyphicon-heart"></i> Female</span>'
		},
		formatDate: function(value, fmt) {
			if (value == null) return ''
			fmt = (typeof fmt == 'undefined') ? 'D MMM YYYY' : fmt
			return moment(value, 'YYYY-MM-DD').format(fmt)
		},
		showDetailRow: function(value) {
			var icon = this.$refs.vuetable.isVisibleDetailRow(value) ? 'glyphicon glyphicon-minus-sign' : 'glyphicon glyphicon-plus-sign'
			return [
				'<a class="show-detail-row">',
				'<i class="' + icon + '"></i>',
				'</a>'
			].join('')
		},
		/**
		 * Other functions
		 */
		setFilter: function() {
			this.moreParams = [
				'filter=' + this.searchFor
			]
			this.$nextTick(function() {
				this.$broadcast('vuetable:refresh')
			})
		},
		resetFilter: function() {
			this.searchFor = ''
			this.setFilter()
		},
		preg_quote: function(str) {
			// http://kevin.vanzonneveld.net
			// +   original by: booeyOH
			// +   improved by: Ates Goral (http://magnetiq.com)
			// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// +   bugfixed by: Onno Marsman
			// *     example 1: preg_quote("$40");
			// *     returns 1: '\$40'
			// *     example 2: preg_quote("*RRRING* Hello?");
			// *     returns 2: '\*RRRING\* Hello\?'
			// *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
			// *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

			return (str + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
		},
		highlight: function(needle, haystack) {
			return haystack.replace(
				new RegExp('(' + this.preg_quote(needle) + ')', 'ig'),
				'<span class="highlight">$1</span>'
			)
		},
		makeDetailRow: function(data) {
			return [
				'<td colspan="7">',
				'<div class="detail-row">',
				'<div class="form-group">',
				'<label>Name: </label>',
				'<span>' + data.name + '</span>',
				'</div>',
				'<div class="form-group">',
				'<label>Email: </label>',
				'<span>' + data.email + '</span>',
				'</div>',
				'<div class="form-group">',
				'<label>Nickname: </label>',
				'<span>' + data.nickname + '</span>',
				'</div>',
				'<div class="form-group">',
				'<label>Birthdate: </label>',
				'<span>' + data.birthdate + '</span>',
				'</div>',
				'<div class="form-group">',
				'<label>Gender: </label>',
				'<span>' + data.gender + '</span>',
				'</div>',
				'</div>',
				'</td>'
			].join('')
		},
		rowClassCB: function(data, index) {
			return (index % 2) === 0 ? 'positive' : ''
		},
		paginationConfig: function(componentName) {
			console.log('paginationConfig: ', componentName)
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
		},

		selectedAll: function(){
			var _vuetable = this.$refs.vuetable
			var selectedProps = this.selectedProps

			this.selectedRows = []

			for(var index in _vuetable.tableData){
				this.selectedRows.push(_vuetable.tableData[index][selectedProps])
			}
		},
		selectedInvert: function(){
			var _vuetable = this.$refs.vuetable
			var selectedProps = this.selectedProps
			var _oldSelectedTo = JSON.parse(JSON.stringify(this.selectedRows))

			this.selectedRows = []

			for(var index in _vuetable.tableData){
				if($.inArray(_vuetable.tableData[index][selectedProps], _oldSelectedTo) == -1)
				this.selectedRows.push(_vuetable.tableData[index][selectedProps])
			}
		}
	},
	events: {
		'vuetable:row-changed': function(data) {
			console.log('row-changed:', data.name)
		},
		'vuetable:row-clicked': function(data, event) {
			console.log('row-clicked:', data.name)
		},
		'vuetable:cell-clicked': function(data, field, event) {
			console.log('cell-clicked:', field.name)
			if (field.name !== '__actions') {
				this.$broadcast('vuetable:toggle-detail', data.id)
			}
		},
		'vuetable:action': function(action, data) {
			console.log('vuetable:action', action, data)
			if (action == 'edit-item') {
				sweetAlert(action, data.name)
			} else if (action == 'delete-item') {
				sweetAlert(action, data.name)
			}
		},
		'vuetable:load-success': function(response) {
			var data = response.data.data
			console.log(data)
			if (this.searchFor !== '') {
				for (n in data) {
					data[n].name = this.highlight(this.searchFor, data[n].name)
					data[n].email = this.highlight(this.searchFor, data[n].email)
				}
			}
		},
		'vuetable:load-error': function(response) {
			if (response.status == 400) {
				sweetAlert('Something\'s Wrong!', response.data.message, 'error')
			} else {
				sweetAlert('Oops', E_SERVER_ERROR, 'error')
			}
		}
	}
})
