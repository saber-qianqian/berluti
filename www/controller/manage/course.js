var controlFns = {
	index: function(params) {
		switch (params) {
			case 'all':
				this.all();
				break;
			case 'create':
				this.create();
				break;
			default:
				this.banner();
				break;
		}
	},
	all: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.pageTitle = data.ptitle
			data._CSSLinks = ['app', 'page/course/table'];

			this.render('page/course/all.html', data);
		});
	},
	create: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/course/create'];

			data.components = [{
				com_type: 'bs-input',
				value: "formdata.name",
				label: "课程名称",
				help: "不能为空",
				required: true,
				icon: true,
				type: "text"
			}, {
				com_type: 'bs-input',
				value: "formdata.category",
				label: "课程分类",
				required: true,
				icon: true,
				type: "text"
			}, {
				com_type: 'upload-image',
				value: "formdata.cover",
				url: "cover_uirl",
				label: "上传封面"
			}, {
				com_type: 'bs-input',
				value: "formdata.lecturer",
				label: "老师姓名",
				help: "用于网页显示老师的名字",
				required: true,
				icon: true,
				type: "text"
			}, {
				com_type: 'bs-input',
				value: "formdata.lecturer_wechat",
				label: "老师ID",
				help: "微信用户唯一号",
				required: true,
				icon: true,
				type: "text"
			}, {
				com_type: 'bs-input',
				value: "formdata.helper",
				label: "课程助手",
				help: "用于网页显示的名字",
				required: true,
				icon: true,
				type: "text"
			}, {
				com_type: 'bs-input',
				value: "formdata.helper_wechat",
				label: "助手ID",
				help: "微信用户唯一号",
				required: true,
				icon: true,
				type: "text"
			}, {
				com_type: 'bs-input',
				value: "formdata.price",
				label: "报名费用",
				help: "人民币，正整数",
				required: true,
				icon: true,
				pattern: "maska",
				type: "number"
			}, {
				com_type: 'bs-input',
				value: "formdata.students_limit",
				label: "课程总人数",
				help: "正整数，10的倍数",
				step: '10',
				required: true,
				icon: true,
				pattern: 'maskat',
				type: "number"
			}, {
				com_type: 'bs-input',
				value: "formdata.class_size",
				label: "班级人数",
				help: "正整数，10的倍数",
				step: '10',
				required: true,
				icon: true,
				pattern: 'maskat',
				type: "number"
			}, {
				com_type: 'datepicker',
				value: "formdata.course_start",
				label: "开课时间",
			}, {
				com_type: 'datepicker',
				value: "formdata.course_end",
				label: "结课时间",
			}, {
				com_type: 'datepicker',
				value: "formdata.registration_start",
				label: "报名开始时间",
			}, {
				com_type: 'datepicker',
				value: "formdata.registration_end",
				label: "报名结束时间",
			}, {
				com_type: 'bs-input',
				value: "formdata.brief",
				label: "课程简介",
				type: 'textarea',
				help: "显示课程简介的内容",
				required: true
			}, {
				com_type: 'bs-input',
				value: "formdata.objective",
				label: "课程目标",
				type: 'textarea',
				help: "显示课程目标内容",
				required: true
			}, {
				com_type: 'bs-input',
				value: "formdata.lecturer_brief",
				label: "讲师介绍",
				type: 'textarea',
				help: "显示讲师介绍内容",
				required: true
			}, {
				com_type: 'bs-input',
				value: "formdata.questions_limit",
				label: "学员可提问次数",
				help: "默认5，正整数",
				error: "正整数",
				required: true,
				type: "number",
				pattern: "maska"
			}];


			this.render('page/course/create.html', data);
		});
	},
	banner: function(id) {
		var php = {};

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['app', 'page/course/banner'];

			this.render('page/course/banner.html', data);
		});
	}
}

exports.__create = controller.__create(controlFns);
