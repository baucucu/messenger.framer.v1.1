ios = require 'ios-kit'
IpzMessenger = require "ipz-messenger"

class MasterLayout
    
    @contentView = undefined
    
    constructor:() ->
        mainView = new ios.View
            width:Screen.width
            backgroundColor:Screen.backgroundColor

        statusBar = new ios.StatusBar
            superLayer: mainView
            width:Screen.width
            carrier: "VodafoneRO"
        
        @contentView = new ios.View
            y:statusBar.height*0.65
            width:Screen.width
            backgroundColor:Screen.backgroundColor
        
        # keyboard = new ios.Keyboard
        #     hidden:true

    openApp:(appName) ->
        switch appName
            when "Messenger"
                app = new IpzMessenger(@contentView)
                return app

module.exports = MasterLayout