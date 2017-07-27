
# Global settings
ios = require 'ios-kit'
MasterLayout = require "ipz-master-layout"
usersModule = require "ipz-dal-usersDAL"

Framer.Device.customize
    deviceType: "apple-iphone-6s-plus-space-gray"
    screenWidth: 750
    screenHeight: 1334
    devicePixelRatio: 1

Framer.Defaults.Layer.force2d = true
ios.device.name = "iphone-6s"

# Style
Screen.backgroundColor = "white"

usersDB = new usersModule
users = usersDB.getUsers({},20, "", "serialno", -1)

masterLayout = new MasterLayout
messenger = masterLayout.openApp("Messenger")
messenger.login(users[0])

