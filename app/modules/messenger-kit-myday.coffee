class Avatar extends Layer
	constructor: (options = {}) ->
		options.scale ?= 1
		options.activity ?= true
		options.width = 50 * options.scale
		options.height = 50 * options.scale
		options.borderRadius = 100
		options.backgroundColor = "#D8D8D8"

		super options

		activeIcon = new Layer
			parent: @
			x: Align.right
			y: Align.bottom
			width: @.scale * 35 / 2
			height: @.scale * 35 / 2
			borderRadius: 100
			borderWidth: @.scale * 2
			borderColor: "white"
			backgroundColor: "#00CC47"

exports.Avatar = Avatar
