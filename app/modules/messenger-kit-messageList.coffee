# Avatar

class Avatar extends Layer

	constructor: (options = {}) ->
		options.scale ?= 1
		options.width = options.height = 50 * options.scale
		options.backgroundColor = "#EEEEEE"
		options.borderRadius = 100
		options.image ?= "https://scontent.fomr1-1.fna.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/1794548_788481771173255_7987156203904451556_n.jpg?oh=3811a18c3c27518a7397a9dd34cdfa85&oe=59EF2FEA"

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

# Message List Item

class MessageListItem extends Layer

	constructor: (options = {}) ->
		options.scale ?= 1
		options.width = Screen.width
		options.height = 74 * options.scale
		options.backgroundColor = "transparent"
		super options

		options.name ?= "Alex Raduca"
		options.lastMessage ?= "Salut. Ce mai faci?"
		options.lastMessageTime ?= "14:24"

		avatar = new Avatar
			parent: @
			x: 24 * options.scale
			y: 11 * options.scale
			scale: options.scale
			status: "messenger"

		name = new TextLayer
			name: "name"
			parent: @
			x: avatar.maxX + options.scale * 24
			fontSize: 17 * options.scale
			y: options.height / 4
			text: options.name
			fontSize: 17 * options.scale


		lastMessage = new TextLayer
			name: "lastMessage"
			parent: @
			x: avatar.maxX + options.scale * 24
			y: options.height / 1.8
			text: options.lastMessage
			fontSize: 16 * options.scale


		lastMessageTime = new TextLayer
			name: "lastMessageTime"
			parent: @
			x: Align.right(-24 * options.scale)
			y: name.y
			fontSize: 15 * options.scale
			text: options.lastMessageTime

	options: (name) =>
		@.name = name
exports.MessageListItem = MessageListItem


# Message List

class MessageList extends Layer
	constructor: (options = {}) ->
		options.scale ?= 1
		options.width = Screen.width
		options.height = options.items * 74 * options.scale
		options.backgroundColor = "transparent"
		super options

		for i in [0..options.items - 1]
			message = new MessageListItem
				parent: @
			message.y = options.scale * i * 74

exports.MessageList = MessageList
