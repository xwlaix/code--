// 通过getApp方法拿到全局应用对象
const app = getApp()

Page({
	onLoad(){
		const msg = app.foo()
		console.log(msg)
		console.log(app.num)
		console.log(app.data)

	}
})
