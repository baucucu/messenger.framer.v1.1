ios = require 'ios-kit'
IpzMessengerSearchBox = require "ipz-messenger-searchBox"

class IpzMessengerHeader
    @height = 64
    @header = undefined

    constructor:(parentView, height) ->
        @height = height

        @header = new ios.View
            superLayer: parentView
            backgroundColor: "white"
            width: parentView.width
            height: @height

        searchBox = new IpzMessengerSearchBox(@header)

        compose = new Layer
            image: "images/CreateIcon.png"
            x: Align.right(-10)
            width: 26
            height: 26
            superLayer: @header            

        messagesTab = new ios.Tab
	        label:"Messages"
        activeNowTab = new ios.Tab
	        label:"Active"
        groupsTab = new ios.Tab
	        label:"Groups"

        tabBar = new ios.TabBar 
            tabs:[messagesTab, activeNowTab, groupsTab]
            activeColor:"#blue"
            inactiveColor:"grey"

    setAvatar:(avatarImage) ->
        avatar = new Layer
            image: avatarImage
            width: 26
            height: 26
            superLayer: @header
            x: Align.left(10)

module.exports = IpzMessengerHeader