ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'
IpzMessengerSearchBox = require "ipz-messenger-searchBox"

class IpzMessengerCalls
    @header = undefined
    @flow = undefined

    constructor:(parentView) ->
        ## HEADER
        @header = new ios.View
            superLayer: parentView
            width: parentView.width
            height: 64
            backgroundColor: "white"

        searchBox = new IpzMessengerSearchBox(@header)
        
        ## END HEADER

module.exports = IpzMessengerCalls