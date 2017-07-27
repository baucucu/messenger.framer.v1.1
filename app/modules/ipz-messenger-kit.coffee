
nav = require 'ipz-messenger-nav-bar'
tab = require 'ipz-messenger-tab-bar'
kit = require 'messenger-kit'

exports.IpzMessengerHome = require "ipz-messenger-home"
exports.IpzMessengerCalls = require "ipz-messenger-calls"
exports.IpzMessengerSearchBox = require "ipz-messenger-searchBox"

exports.IpzMessengerNavBar = nav.create
exports.IpzMessengerTab = tab.tab
exports.IpzMessengerTabBar = tab.bar

exports.IpzAvatar = kit.Avatar
exports.IpzMessageList = kit.MessageList
exports.IpzMessageListItem = kit.MessageListItem
exports.IpzActiveFriendsScrollList = kit.ActiveFriendsScrollList
exports.IpzActiveFriends = kit.ActiveFriends
