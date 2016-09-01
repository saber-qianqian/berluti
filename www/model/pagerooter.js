var navData = {
	course: {
		title: '课程发布'
		, list: {
			all: {
				name: '全部课程'
				, url: '/manage/course/all/main'
			}
			, create: {
				name: '创建课程'
				, url: '/manage/course/create/main'
			}
			, chapter: {
				name: '章节管理'
				, url: '/manage/chapter/list/main'
			}
			, practice: {
				name: '作业管理'
				, url: '/manage/practice/list/main'
			}
			, courseware: {
				name: '课件管理'
				, url: '/manage/courseware/list/main'
			}
			, courselist: {
				name: '最新课程管理'
				, url: '/manage/courselist/list/main'
			}
		}
	}
	, content: {
		title: '内容发布'
		, list: {
			welcome: {
				name: '首页'
				, url: '/manage/content/welcome/main'
			}
			, page: {
				name: '定制页'
				, url: '/manage/page/list/main'
			}
			, qsa: {
				name: '调查问卷'
				, url: '/manage/content/qsa/main'
			}
		}
	}
	, other: {
		title: '其他设置'
		, list: {
			template: {
				name: '模板管理'
				, url: '/manage/other/template/main'
			}
			, style: {
				name: '样式管理'
				, url: '/manage/other/style/main'
			}
			, material: {
				name: '素材管理'
				, url: '/manage/other/material/main'
			}
		}
	}
	, system: {
		title: '系统设置'
		, list: {
			user: {
				name: '用户管理'
				, url: '/manage/system/user/main'
			}
			, common: {
				name: '通用管理'
				, url: '/manage/system/common/main'
			}
		}
	}
	, website: {
		title: '网站设置'
		, list: {
			exlink: {
				name: '友情链接'
				, url: '/manage/website/exlink/main'
			}
			, log: {
				name: '操作日志'
				, url: '/manage/website/log/main'
			}
		}
	}
}

exports.getPageRooter = function(req) {
	var url = req.url
	url = url.replace('/manage', '')
	var page_name = url.split('?')[0] || '/welcome'

	var uriStrings = page_name.split('/')
	var pageRooter = ''

	if(navData[uriStrings[1]] && navData[uriStrings[1]].list[uriStrings[2]]){
		pageRooter = uriStrings[1] + '.' + uriStrings[2]
	}

	return pageRooter
}

exports.getPageTitle = function(req) {
	var url = req.url
	var page_name = url.split('?')[0] || '/welcome'

	var uriStrings = page_name.split('/')
	var pageTitle = ''

	if(navData[uriStrings[1]] && navData[uriStrings[1]].list[uriStrings[2]]){
		pageTitle = navData[uriStrings[1]].list[uriStrings[2]].name + ' - ' + navData[uriStrings[1]].title
	}

	return pageTitle
}

exports.get = function(req) {
	return navData
}
