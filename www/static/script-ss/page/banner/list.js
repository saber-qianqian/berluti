require('core/open/vue/resource')
require('core/open/moment/moment-with-locales')
require('core/open/sweet/alert')
require('core/open/vue/table')

var urlParams = require('core/urlHandle')

var params = urlParams.getParams(location.href)

var E_SERVER_ERROR = 'Error communicating with the server'
var api = {
	'create': '/aj/api/courselist/create'
	, 'update': '/aj/api/courselist/update'
	, 'delete': '/aj/api/courselist/delete'
	, 'show': '/aj/api/courselist/show'
}

// fields definition
var tableColumns = [{
	name: '__checkbox:id',
	titleClass: 'text-center',
	dataClass: 'text-center',
}, {
	name: 'course_id',
	title: '所属课程'
}, {
	name: 'creator',
	title: '创建者'
}, {
	name: 'created_at',
	title: '创建时间'
}, {
	name: 'updated_by',
	title: '最后修改者'
}, {
	name: 'updated_at',
	title: '最后修改时间'
}, {
	name: 'status',
	title: '状态'
}, {
	name: '__actions',
	title: '操作',
	dataClass: 'text-center',
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
		itemActions: [{
			name: 'view-item',
			label: '预览',
			icon: 'glyphicon glyphicon-zoom-in',
			class: 'btn btn-info',
			extra: {
				'title': 'View',
				'data-toggle': "tooltip",
				'data-placement': "left"
			}
		}, {
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
		},

		selectedAll: function() {
			var _vuetable = this.$refs.vuetable
			var selectedProps = this.selectedProps

			this.selectedRows = []

			for (var index in _vuetable.tableData) {
				this.selectedRows.push(_vuetable.tableData[index][selectedProps])
			}
		},
		selectedInvert: function() {
			var _vuetable = this.$refs.vuetable
			var selectedProps = this.selectedProps
			var _oldSelectedTo = JSON.parse(JSON.stringify(this.selectedRows))

			this.selectedRows = []

			for (var index in _vuetable.tableData) {
				if ($.inArray(_vuetable.tableData[index][selectedProps], _oldSelectedTo) == -1)
					this.selectedRows.push(_vuetable.tableData[index][selectedProps])
			}
		},

		openCreateUrl: function(){
			var url = '/manage/courselist/create/main'

			window.location.href = url
		},

		removeDataByIds: function(){
			var mSelf = this

			var ids = mSelf.selectedRows
			if(ids.length){
				$.get(api.delete, { id: ids.join(',') }, function(res){
					if(res.status_code == 200){
						sweetAlert({title: '删除成功'}, function(){
							var deleteData = []

							$.each(ids, function(i, id){
								$.each(mSelf.$refs.vuetable.tableData, function(i, data){
									if(data.id == id){
										deleteData.push(data)
									}
								})
							})

							mSelf.selectedRows = []
							for(var i in deleteData){
								mSelf.$refs.vuetable.tableData.$remove(deleteData[i])
							}
						})
					} else {
						sweetAlert('删除失败', res.message, 'error')
					}
				}, 'json')
			}
		},
		deleteCourse: function(data){
			var mSelf = this

			$.get(api.delete, { id: data.id }, function(res){
				if(res.status_code == 200){
					sweetAlert({title: '删除成功'}, function(){
						mSelf.$refs.vuetable.tableData.$remove(data)
					})
				} else {
					sweetAlert('删除失败', res.message, 'error')
				}
			}, 'json')
		}
	},
	events: {
		'vuetable:action': function(action, data) {
			if (action == 'edit-item') {
				this.openCreateUrl(data.id)
			} else if (action == 'delete-item') {
				this.deleteCourse(data)
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
