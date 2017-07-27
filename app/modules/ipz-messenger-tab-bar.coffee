ios = require 'ios-kit'

exports.defaults = {
	tab: {
		label: "label"
		activeIcon:undefined
		inactiveIcon:undefined
		active: undefined
		inactive: undefined
		type: "tab"
		viewTop:0
		viewBottom:0
	}
	bar: {
		tabs: []
		start:0
		type:"tabBar"
		backgroundColor:"white"
		activeColor:"blue"
		inactiveColor:"gray"
		blur:true
	}
}

exports.defaults.tab.props = Object.keys(exports.defaults.tab)
exports.defaults.bar.props = Object.keys(exports.defaults.bar)

exports.tab = (array) ->
	setup = ios.utils.setupComponent(array, exports.defaults.tab)
	specs =
		width: 75

	switch ios.device.name
		when "iphone-5"
			specs.width = 55

	tab = new ios.View
		backgroundColor:"transparent"
		name:setup.label
		constraints:
			width:specs.width
			height:52

	tab.view = new ios.View
		name:setup.label + ".view"
		backgroundColor:"transparent"
		constraints:
			top:setup.viewTop
			bottom:setup.viewBottom
			leading:0
			trailing:0

	# Create Active
	tab.active = new ios.View
		name:".active"
		backgroundColor:"transparent"
		constraints:
			top:0
			bottom:0
			leading:0
			trailing:0
		superLayer:tab

	tab.active.icon = new ios.View
		name:".active.icon"
		constraints:
			width:25
			height:25
			align:"horizontal"
			top:7
		backgroundColor:"transparent"
		superLayer:tab.active
	if setup.active == undefined
		tab.active.icon.image = setup.activeIcon
		tab.active.icon.width = 52
		tab.active.icon.height = 52
	else
		setup.active.superLayer = tab.active.icon
		setup.active.props =
			width:tab.active.icon.width
			height:tab.active.icon.height

	# Create Inactive
	tab.inactive = new ios.View
		backgroundColor:"transparent"
		name:".inactive"
		constraints:
			top:0
			bottom:0
			leading:0
			trailing:0
		superLayer:tab

	tab.inactive.icon = new ios.View
		constraints:
			width:25
			height:25
			align:"horizontal"
			top:7
		backgroundColor:"transparent"
		name:".inactive.icon"
		superLayer:tab.inactive

	tab.label = new ios.Text
		text:setup.label
		superLayer:tab
		color:"#929292"
		fontSize:10
		name:".label"
		textTransform:"capitalize"

	tab.label.constraints =
		bottom:2
		horizontalCenter:tab.active.icon

	if setup.inactive == undefined
		tab.inactive.icon.image = setup.inactiveIcon
		tab.inactive.icon.width = 52
		tab.inactive.icon.height = 52

	else
		setup.inactive.superLayer = tab.inactive.icon
		setup.inactive.props =
			width:tab.inactive.icon.width
			height:tab.inactive.icon.height

	return tab

exports.bar = (array) ->
	setup = ios.utils.setupComponent(array, exports.defaults.bar)

	# If no tabs, make dummy tabs
	if setup.tabs.length == 0
		dummyTab = new exports.tab
		dummyTab2 = new exports.tab
		setup.tabs.push dummyTab
		setup.tabs.push dummyTab2

	specs =
		width: 75
	switch ios.device.name
		when "iphone-5"
			specs.width = 55

	bar = new ios.View
		backgroundColor:"transparent"
		name:"tabBar"
		constraints:
			leading:0
			trailing:0
			bottom:0
			height:52

	bar.bg = new ios.View
		superLayer:bar
		name:".bg"
		constraints:
			leading:0
			trailing:0
			bottom:0
			height:52

	bar.divider = new ios.View
		backgroundColor:"#B2B2B2"
		name:".divider"
		superLayer:bar
		constraints:
			top:0
			leading:0
			trailing:0
			height:.5
	bar.box = new ios.View
		superLayer:bar
		backgroundColor:"transparent"
		name:".box"
		constraints:
			height:52
			width:setup.tabs.length * specs.width


	setActive = (tabIndex) ->
		for tab, index in setup.tabs
			if index == tabIndex
				tab.label.color = ios.utils.color(setup.activeColor)
				tab.active.visible = true
				tab.inactive.visible = false
				tab.view.visible = true
			else
				tab.label.color = ios.utils.color(setup.inactiveColor)
				tab.active.visible = false
				tab.inactive.visible = true
				tab.view.visible = false


	for tab, index in setup.tabs
		#Check for vaild tab object
		bar.box.addSubLayer(tab)
		# Change colors
		# ios.utils.changeFill(tab.active.icon, ios.utils.color(setup.activeColor))
		# ios.utils.changeFill(tab.inactive.icon, ios.utils.color(setup.inactiveColor))
		tab.label.color = ios.utils.color(setup.inactiveColor)
		bar.bg.backgroundColor = setup.backgroundColor

		if setup.blur
			bar.bg.backgroundColor = "rgba(255,255,255, .9)"
			ios.utils.bgBlur(bar.bg)

		if index == 0
			tab.constraints.leading = 0
		else
			tab.constraints.leading = setup.tabs[index - 1]

		ios.layout.set(tab)

		tab.on Events.TouchStart, ->
			tabIndex = @.x / ios.utils.px(specs.width)
			setActive(tabIndex)

	bar.box.constraints =
		align:"horizontal"

	ios.layout.set(bar.box)
	setActive(setup.start)

	bar.tabs = setup.tabs

	return bar
