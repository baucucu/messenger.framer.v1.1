ios = require 'ios-kit'
ipz = require 'ipz-messenger-kit'

class IpzMessenger
    @homeView:undefined

    constructor:(parentView, users) ->
        
        homeTab = new ipz.IpzMessengerTab
            label:"Home"
            activeIcon:"images/homeIconActive.png"
            inactiveIcon:"images/homeIcon.png"
            viewTop:parentView.y
            viewBottom:50
        callsTab = new ipz.IpzMessengerTab
            label:"Calls"
            activeIcon:"images/callIconActive.png"
            inactiveIcon:"images/callIcon.png"
            viewTop:parentView.y
            viewBottom:50
        cameraTab = new ipz.IpzMessengerTab
            label:""
            activeIcon:"images/Circle.png"
            inactiveIcon:"images/Circle.png"
            viewTop:parentView.y
            viewBottom:50
        peopleTab = new ipz.IpzMessengerTab
            label:"People"
            activeIcon:"images/groupsIconActive.png"
            inactiveIcon:"images/groupsIcon.png"
            viewTop:parentView.y
            viewBottom:50
        gamesTab = new ipz.IpzMessengerTab
            label:"Games"
            activeIcon:"images/gamesIconActive.png"
            inactiveIcon:"images/gamesIcon.png"
            viewTop:parentView.y
            viewBottom:50

        tabBar = new ipz.IpzMessengerTabBar 
            tabs:[homeTab, callsTab, cameraTab, peopleTab, gamesTab]
            activeColor:"blue"
            inactiveColor:"grey"
            start:0

        @homeView = new ipz.IpzMessengerHome(homeTab.view, users)
        callsView = new ipz.IpzMessengerCalls(callsTab.view)

        peopleView = new ios.View
            superLayer: peopleTab.view
            y: parentView.y
            width: parentView.width
            # height: parentView.height - tabBar.height
            backgroundColor: "blue"

        gamesView = new ios.View
            superLayer: gamesTab.view
            y: parentView.y
            width: parentView.width
            # height: parentView.height - tabBar.height
            backgroundColor: "red"
    
    login:(user) ->
        @homeView.setAvatar(user)

module.exports = IpzMessenger