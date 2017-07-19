ios = require 'ios-kit'
IpzMessenger = require "ipz-messenger"
StatusBarLayer = require "StatusBarLayer"

class MasterLayout
    
    @contentView = undefined
    
    constructor:() ->
        mainView = new ios.View
            width:Screen.width
            backgroundColor:Screen.backgroundColor

        # statusBar = new StatusBarLayer
        #     parent: mainView
        #     carrier: "VodafoneRO" #<string>
        #     #time: "9:41 PM" #<string> # if not set, will use local time
        #     percent: 79 #<number>
        #     signal: true #<boolean>
        #     wifi: true #<boolean>
        #     powered: true #<boolean>
        #     showPercentage: true #<boolean>
        #     ipod: false #<boolean> # also affects signal and carrier
        #     hide: false #<boolean> # initial visibility
        #     autoHide: false #<boolean> # hide in landscape where device-appropriate
        #     scaleFactor: 1 #<number> (1 || 2 || 3)
        statusBar = new ios.StatusBar
            superLayer: mainView
            width:Screen.width
        
        @contentView = new ios.View
            y:statusBar.height
            width:Screen.width
            height:Screen.height - statusBar.height
            backgroundColor:"red"
        
        # ios.device.name = "iphone-5"
        # keyboard = new ios.Keyboard
        #     hidden:true

    openApp:(appName) ->
        switch appName
            when "Messenger"
                openedApp = new IpzMessenger(@contentView)
                return openedApp

module.exports = MasterLayout