function defaultAction(php, channel) {
	var mSelf = this
	var nav = this.loadModel('pagerooter')

	this.listenOn(function(evt) {
		return evt(nav.get(mSelf.req))
	}, 'nav')()

	this.listenOn(function(evt) {
		return evt(nav.getPageRooter(mSelf.req))
	}, 'pagerooter')()

	this.eventHandle.onOver = function(data) {
		data.userinfo = {
			status_code: 200,
			message: "",
			data: {
				account_id: "153423320631877937",
				nick_name: "yun",
				avatar: {
					image_poster: "http://gn0.dev/images/2016-09-05/3b04fe9620bce7211884478977d4258a4cbf1caf39949401ff2d117cb17efd75.jpg"
				},
				status: 0,
				mobile: "18911746134",
				email: "xxx@qq.com",
				account_type: "1"
			}
		}
	}
}

exports.bind = defaultAction
