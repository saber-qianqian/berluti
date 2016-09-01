function defaultAction(php, channel) {
	var mSelf = this
	var nav = this.loadModel('pagerooter')

	this.listenOn(function(evt) {
		return evt(nav.get(mSelf.req))
	}, 'nav')()

	this.listenOn(function(evt) {
		return evt(nav.getPageRooter(mSelf.req))
	}, 'pagerooter')()
}

exports.bind = defaultAction
