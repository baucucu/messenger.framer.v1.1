messenger = require ("messenger-kit-avatar")

class MessageListItem extends Layer

	constructor: (options = {}) ->
		options.scale ?= 1
		options.width = Screen.width
		options.height = 90 * options.scale
		options.backgroundColor = "transparent"
		super options

		options.name ?= "Alex Raduca"
		options.lastMessage ?= "Salut. Ce mai faci?"
		options.lastMessageTime ?= "14:24"

		avatar = new messenger.Avatar
			parent: @
			x: 24 * options.scale
			y: 24 * options.scale
			scale: options.scale
			status: "messenger"
			image: "https://scontent.fomr1-1.fna.fbcdn.net/v/t1.0-1/c0.0.320.320/p320x320/1794548_788481771173255_7987156203904451556_n.jpg?oh=3811a18c3c27518a7397a9dd34cdfa85&oe=59EF2FEA"

		name = new TextLayer
			name: "name"
			parent: @
			x: avatar.maxX + options.scale * 24
			fontSize: 17 * options.scale
			y: options.height / 3
			text: options.name
			fontSize: 17 * options.scale


		lastMessage = new TextLayer
			name: "lastMessage"
			parent: @
			x: avatar.maxX + options.scale * 24
			y: options.height * .60
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
