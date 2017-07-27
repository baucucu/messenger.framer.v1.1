
ios = require 'ios-kit'

exports.defaults =
	left:undefined
	center:undefined
	right:"Edit"
	blur:true
	superLayer:undefined
	type:"navBar"
	activeColor:'blue'
	inactiveColor:'grey'
	backgroundColor:"rgba(255, 255, 255, .8)"
	dividerBackgroundColor:"#B2B2B2"

exports.defaults.props = Object.keys(exports.defaults)

exports.create = (array) ->
	setup = ios.utils.setupComponent(array, exports.defaults)

	bar = new ios.View
		name:"navBar"
		backgroundColor: setup.backgroundColor
		constraints:
			leading:0
			trailing:0
			top:0
			height:64

	bar.bg = new ios.View
		superLayer:bar
		backgroundColor:'transparent'
		name:".bg"
		constraints:
			leading:0
			trailing:0
			height:44
			bottom:0

	bar.divider = new ios.View
		backgroundColor:setup.dividerBackgroundColor
		name:".divider"
		superLayer:bar.bg
		constraints:
			height:.5
			bottom:0
			leading:0
			trailing:0

	if setup.superLayer
		setup.superLayer.addSubLayer(bar)


	if setup.blur
		ios.utils.bgBlur(bar)

	if setup.blur == false && setup.backgroundColor == "rgba(255, 255, 255, .8)"
		bar.backgroundColor = 'white'

	bar.type = setup.type

	for layer in Framer.CurrentContext.layers
		if layer.type == "statusBar"
			@statusBar = layer
			bar.placeBehind(@statusBar)

    # Handle Left
	if typeof setup.left == "string" && typeof setup.left != "boolean"
		bar.left = new ios.Button
			name:".left"
			superLayer:bar.bg
			text:setup.left
			color:setup.activeColor
			fontWeight:500
			constraints:
				bottom:12
				leading:8
		bar.left.type = "button"
		ios.utils.specialChar(bar.left)
	if typeof setup.left == "object"
		bar.left = setup.left
		bar.left.name = ".left"
		bar.left.superLayer = bar.bg
		bar.left.constraints =
			leading:8
			bottom:12
		ios.layout.set(bar.left)

    # Handle Center
	if typeof setup.center == "string" && typeof setup.center != "boolean"
		bar.center = new ios.Button
			name:".center"
			superLayer:bar.bg
			text:setup.center
			color:setup.inactiveColor
			fontWeight:500
			constraints:
				bottom:12
				align:"horizontal"
		bar.center.type = "button"
		ios.utils.specialChar(bar.center)
	if typeof setup.center == "object"
		bar.center = setup.center
		bar.center.name = ".right"
		bar.center.superLayer = bar.bg
		bar.center.constraints =
			align:"horizontal"
			bottom:12
		ios.layout.set(bar.center)

	# Handle Right
	if typeof setup.right == "string" && typeof setup.right != "boolean"
		bar.right = new ios.Button
			name:".right"
			superLayer:bar.bg
			text:setup.right
			color:setup.inactiveColor
			fontWeight:500
			constraints:
				bottom:12
				trailing:8
		bar.right.type = "button"
		ios.utils.specialChar(bar.right)
	if typeof setup.right == "object"
		bar.right = setup.right
		bar.right.name = ".right"
		bar.right.superLayer = bar.bg
		bar.right.constraints =
			trailing:8
			bottom:12
		ios.layout.set(bar.right)
	
	bar.left.on Events.TouchStart, ->
		bar.left.color = setup.activeColor
		bar.center.color = setup.inactiveColor
		bar.right.color = setup.inactiveColor

	bar.center.on Events.TouchStart, ->
		bar.left.color = setup.inactiveColor
		bar.center.color = setup.activeColor
		bar.right.color = setup.inactiveColor

	bar.right.on Events.TouchStart, ->
		bar.left.color = setup.inactiveColor
		bar.center.color = setup.inactiveColor
		bar.right.color = setup.activeColor

	return bar
