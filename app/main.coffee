
# Global settings
ios = require 'ios-kit'
UsersDAL = require "ipz-dal-usersDAL"
MasterLayout = require "ipz-master-layout"

Framer.Device.customize
    deviceType: Framer.Device.Type.Tablet
    screenWidth: 750
    screenHeight: 1334
    devicePixelRatio: 1


# Style
Screen.backgroundColor = "white"

# Users
# Get some data from restdb.io
# userDal = new UsersDAL
# users = userDal.getUsers({}, 12, "", "serialno", -1)

# favoriteUsers = userDal.getFavoriteUsers(users)
# birthdayUsers = userDal.getBirthdayUsers(users)
# activeUsers = userDal.getActiveUsers(users)
# myDays = userDal.getMyDays(users)
# myDays.sort(myDayTime,0)

masterLayout = new MasterLayout
messenger = masterLayout.openApp("Messenger")
messenger.login("Andy", "images/Ethan.png")

