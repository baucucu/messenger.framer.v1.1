ios = require 'ios-kit'
IpzMessengerHeader = require "ipz-messenger-header"

class IpzMessenger
    @contentView:undefined
    @header:undefined

    constructor:(parentView) ->
        
        # TODO Header class with all the buttons
        @header = new IpzMessengerHeader(parentView, 64)

        # TODO Footer class with all the buttons
        footer = new ios.View
            superLayer: parentView
            backgroundColor: "green"
            width: parentView.width
            height: 50
            y:parentView.height-50

        @contentView = new ios.View
            superLayer: parentView
            backgroundColor: "yellow"
            y:@header.height
            width: parentView.width
            height: parentView.height - @header.height - footer.height
    
    login:(username, avatar) ->
        welcomeText = new ios.Text
            text:"Welcome, " + username
            superLayer: @contentView
        @header.setAvatar(avatar)

module.exports = IpzMessenger