class Avatar extends Layer

	constructor: (options = {}) ->
		options.scale ?= 1
		options.width = options.height = 50 * options.scale
		options.backgroundColor = "#EEEEEE"
		options.borderRadius = 100

		super options

		options.status ?= "active"

		sign = new Layer
			parent: @
			x: Align.right
			y: Align.bottom
			width: 35/100*@.width
			height: 35/100*@.height
			borderRadius: 100
			backgroundColor: "transparent"
			borderWidth: 2 * options.scale

		sign.states =
			inactive:
				image: null
				backgroundColor: "transparent"
				borderWidth: 0
			active:
				visible: true
				image: null
				backgroundColor: "#60CA11"
				borderColor: "#FFFFFF"
			messenger:
				visible: true
				borderColor: "#FFFFFF"
				image: "images/messengerIcon.png"

		@.subLayers[0].animate(options.status)

	changeStatus: (type) =>
		@.subLayers[0].animate(type)

exports.Avatar = Avatar
