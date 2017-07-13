
# Global settings

# Style
Screen.backgroundColor = "white"
systemFontSize = 14
systemColorActive = "#0084FF"
systemColorInactive = "#888"
systemBackgroundColorInactive = "#DEDEDE"
#systemFontFamily = ".SF NS Display"
systemFontFamily = "-apple-system"

# statusBar settings
battery = "100%"
systemTime = "9:41 PM"
signal = 5
systemFontColor = "rgba(3,3,3,1)"
name = "Vodafone"

# Users
# Get some data from restdb.io
apikey = "5956382dafce09e87211e986"
query = {}
sort = "sort=serialno&dir=-1"
max = 12
filter = ""
#query = {}
url = "https://fbusers-4494.restdb.io/rest/fbusers"
GETdata = "#{url}?apikey=#{apikey}&max=#{max}&#{sort}&filter=#{filter}&q="+JSON.stringify(query)

# load data from db
users = JSON.parse Utils.domLoadDataSync GETdata

favoriteUsers = []
birthdayUsers = []
activeUsers = []
myDays = []

for user in users
	if user.activity == true
		activeUsers.push(user)
	if user.birthday == true
		birthdayUsers.push(user)
	if user.favorite == true
		favoriteUsers.push(user)
	if user.myDay == true
		myDays.push(user)
myDays.sort(myDayTime,0)

# Header
header = new Layer
	backgroundColor: "white"
	width: Screen.width
	height: 84

# Status bar
statusBar = new Layer
	backgroundColor: "transparent"
	width: Screen.width
	height: 20
	parent: header

# Mobile Signal
for i in[0..(signal-1)]
	signalDot = new Layer
		superLayer: statusBar
		height: 6
		width: 6
		x: Align.left(5 + 7 * i)
		y: Align.center(-1)
		borderRadius: 25
		backgroundColor: systemFontColor

# Carrier
carrier = new TextLayer
	superLayer: statusBar
	text: name
	x: Align.left(signal*7 + 10)
	y: Align.center
	fontSize: systemFontSize
	fontFamily: systemFontFamily
	letterSpacing: 0.0
	color: systemFontColor

# WiFi
wiFi = new Layer
	parent: statusBar
	x: Align.left(carrier.maxX+5)
	y: Align.center(-1)
	width: 13
	height: 9.000000000000004
	image: "images/Wi-Fi.png"		

# Clock
clock = new TextLayer
	parent: statusBar
	x: Align.center
	y: Align.center
	fontSize: 12
	fontFamily: systemFontFamily
	letterSpacing: 0.0
	color: systemFontColor
	text: systemTime
	
# Battery
batteryIndicator = new Layer
	parent: statusBar
	x: Align.right(-5)
	y: Align.center(-1)
	width: 25
	height: 10
	image: "images/Battery.png"

batteryPercentage = new TextLayer
	parent: statusBar
	x: Align.right( - batteryIndicator.width - 10)
	y: Align.center
	text: battery
	fontSize: 12
	fontFamily: systemFontFamily
	letterSpacing: 0.0
	textAlign: "right"
	color: systemFontColor

# Search bar

searchBar = new Layer
	y: statusBar.height+3
	width: Screen.width
	backgroundColor: "transparent"
	height: 32
	parent: header

avatar = new Layer
	image: "images/Emma.png"
	width: 26
	height: 26
	superLayer: searchBar
	x: Align.left(10)

search = new Layer
	width: Screen.width - 100
	x: Align.center
	superLayer: searchBar
	height: 28
	borderRadius: 5
	backgroundColor: "#{systemBackgroundColorInactive}"

searchPlaceholder = new TextLayer
	parent: search
	text: "Search"
	fontSize: systemFontSize
	fontFamily: ".SF NS Display"
	letterSpacing: 0.0
	x: Align.center
	y: Align.center

searchIcon = new Layer
	parent: search
	image: "images/SearchIcon.png"
	height: 12
	width: 12
	y: Align.center

searchIcon.x = searchPlaceholder.x - (searchIcon.width + 5)


compose = new Layer
	image: "images/CreateIcon.png"
	x: Align.right(-10)
	width: 26
	height: 26
	superLayer: searchBar

# Tab bar

tabBar = new Layer
	y: statusBar.height + searchBar.height + 6
	width: Screen.width
	height: 32
	backgroundColor: "white"
	parent: header
	
messagesTab = new Layer
	name: "messagesTab"
	parent: tabBar
	width: Screen.width / 3
	height: tabBar.height - 5
	x: Align.left
	backgroundColor: "transparent"

messagesTab.states =
	active:
		style:
			"border-bottom": "1px solid #{systemColorActive}"
		color: systemColorActive
		options:
			time: 0.2
	inactive:
		style:
			"border-bottom": "1px solid #{systemBackgroundColorInactive}"
		color: systemColorInactive
		options:
			time: 0.2
messagesTab.states.switch("active")

messagesTabLabel = new TextLayer
	text: "Messages"
	parent: messagesTab
	fontSize: systemFontSize
	x: Align.center

messagesTabLabel.states = 
	active:
		color: systemColorActive
	inactive:
		color: systemColorInactive

activeTab = new Layer
	name: "activeTab"
	parent: tabBar
	width: Screen.width / 3
	x: Align.center
	height: tabBar.height - 5
	backgroundColor: "transparent"

activeTab.states =
	active:
		style:
			"border-bottom": "1px solid #{systemColorActive}"
		color: systemColorActive
	inactive:
		style:
			"border-bottom": "1px solid #{systemBackgroundColorInactive}"
		color: systemColorInactive
activeTab.states.switch("inactive")

activeTabLabel = new TextLayer
	text: "Active"
	width: activeTab.width
	textAlign: "center"
	parent: activeTab
	fontSize: systemFontSize
	x: Align.center

activeTabLabel.states = 
	active:
		color: systemColorActive
	inactive:
		color: systemColorInactive

groupsTab = new Layer
	name: "groupsTab"
	parent: tabBar
	width: Screen.width / 3
	height: tabBar.height - 5
	x: Align.right
	backgroundColor: "transparent"

groupsTab.states =
	active:
		style:
			"border-bottom": "1px solid #{systemColorActive}"
		color: systemColorActive
	inactive:
		style:
			"border-bottom": "1px solid #{systemBackgroundColorInactive}"
		color: systemColorInactive
groupsTab.states.switch("inactive")

groupsTabLabel = new TextLayer
	text: "Groups"
	parent: groupsTab
	fontSize: systemFontSize
	x: Align.center
	color: groupsTab.states.current.color

groupsTabLabel.states = 
	active:
		color: systemColorActive
	inactive:
		color: systemColorInactive

for layer in tabBar.subLayers
	layer.onTap ->
		inactiveTabs = tabBar.subLayers.filter (item) -> item isnt @
		for tab in inactiveTabs
			tab.states.switchInstant("inactive")
			tab.subLayers[0].states.sw
		@.states.switchInstant("active")


# Footer
footer = new Layer
	y: Align.bottom
	height: 50	
	width: Screen.width
	backgroundColor: "white"
	style:
		"border-top": "1px solid #{systemColorInactive}"

homeButton = new Layer
	parent: footer
	x: 0
	y: Align.center
	backgroundColor: "transparent"
	width: Screen.width / 5
	height: 42
	

homeLabel = new TextLayer
	parent: homeButton
	x: Align.center
	y: Align.bottom
	text: "Home"
	fontSize: systemFontSize - 2 
	fontFamily: systemFontFamily
	letterSpacing: 0.1
	textAlign: "center"
	color: "rgba(0,118,255,1)"

homeIconActive = new Layer
	parent: homeButton
	x: Align.center
	y: 0
	width: 24
	height: 24
	image: "images/homeIconActive.png"

homeNotification = new Layer
	parent: homeButton
	width: 15
	height: 15
	borderRadius: 100
	backgroundColor: "red"
	x: Align.right(-15)
	y: Align.top

homeNotificationLabel = new TextLayer
	parent: homeNotification
	text: activeUsers.length
	fontSize: 10
	color: "white"
	x: Align.center
	y: Align.center

callsButton = new Layer
	parent: footer
	x: Screen.width / 5
	y: Align.center
	backgroundColor: "transparent"
	width: Screen.width / 5
	height: 42

callsLabel = new TextLayer
	parent: callsButton
	x: Align.center
	y: Align.bottom
	text: "Calls"
	fontSize: systemFontSize - 2
	fontFamily: systemFontFamily
	letterSpacing: 0.1
	textAlign: "center"
	color: "rgba(146,146,146,1)"

callIcon = new Layer
	parent: callsButton
	x: Align.center
	y: 0
	width: 24
	height: 24
	image: "images/callIcon.png"
	
	circle = new Layer
		parent: footer
		x: Align.center
		y: Align.center(-2)
		width: 38
		height: 38
		borderRadius: 100
		backgroundColor: "transparent"
		borderColor: systemColorActive
		borderWidth: 3

peopleButton = new Layer
	parent: footer
	x: 3 * Screen.width / 5
	y: Align.center
	backgroundColor: "transparent"
	width: Screen.width / 5
	height: 42

peopleLabel = new TextLayer
	parent: peopleButton
	x: Align.center
	y: Align.bottom
	text: "People"
	fontSize: systemFontSize - 2
	fontFamily: systemFontFamily
	letterSpacing: 0.1
	textAlign: "center"
	color: "rgba(146,146,146,1)"

peopleIcon = new Layer
	parent: peopleButton
	x: Align.center
	y: 0
	width: 24
	height: 24
	image: "images/peopleIcon.png"

gamesButton = new Layer
	parent: footer
	x: 4 * Screen.width / 5
	y: Align.center
	backgroundColor: "transparent"
	width: Screen.width / 5
	height: 42

gamesLabel = new TextLayer
	parent: gamesButton
	y: Align.bottom
	x: Align.center
	text: "Games"
	fontSize: systemFontSize - 2
	fontFamily: systemFontFamily
	letterSpacing: 0.1
	textAlign: "center"
	color: "rgba(146,146,146,1)"

gamesIcon = new Layer
	parent: gamesButton
	x: Align.center
	y: 0
	width: 24
	height: 24
	image: "images/meIcon.png"

# Home

home = new ScrollComponent
	size: Screen.size
	backgroundColor: "white"
	directionLock: true
	scrollHorizontal: false
	contentInset: 
		top: header.height
		bottom: footer.height
	directionLock: true


# Home Content

# MyDay

myDay = new ScrollComponent
	parent: home.content
	width: Screen.width
	height: 120
	scrollVertical: false
	directionLock: true

for item in myDays.sort(myDayTime)
	myDayItem = new Layer
		image: "https://fbusers-4494.restdb.io/media/#{item.image}"
		height: 100
		y: 15
		width: 80
		borderRadius: 5
		parent: myDay.content
		x: 5 + myDays.indexOf(item) * 82
	myDayTime = new TextLayer
		text: "#{item.myDayTime}m"
		parent: myDayItem
		fontSize: systemFontSize - 2
		color: "white"
		fontFamily: systemFontFamily
		x: Align.left(2)
		y: Align.bottom(-4)
	myDayName = new TextLayer
		text: "#{item.firstname} #{item.lastname}"
		parent: myDayItem
		fontSize: systemFontSize
		fontWeight: "light"
		color: "white"
		fontFamily: systemFontFamily
		y: Align.bottom(-myDayTime.height - 4)
		x: Align.left(2)

# Messages

messages = new Layer
	parent: home.content
	y: myDay.maxY + 10
	width: Screen.width
	height: users.length * 67
	backgroundColor: "transparent"

for user in users
	message = new Layer
		parent: messages
		width: Screen.width
		height: 65
		y: users.indexOf(user) * 67
		backgroundColor: "transparent"
		directionLock: true
	
	message.states = 
		inactive:
			x: 0
		active:
			x: -190
	
	message.dragabble = true
	message.draggable.vertical = false
	
	message.on Events.Move, (offset, layer) ->
		if offset.x >0 
			layer.x = layer.x - offset.x
		if offset.x < -190
			layer.x = -190
	
	
	message.on Events.DragEnd, (event, layer) ->
		if event.offset.x > - 75
			@.animate("inactive")
		else @.animate("active")
	
	message.onTap (event) ->
		@.animate("inactive")
		
	
	
	messageAction = new Layer
		parent: message
		width: 3 * message.height
		x: Screen.width
		height: message.height
		backgroundColor: "transparent"	
	
	messageActionMore = new Layer
		parent: messageAction
		width: message.height
		height: message.height
		backgroundColor: systemBackgroundColorInactive
	messageActionView = new Layer
		parent: messageAction
		x: messageActionMore.maxX
		width: message.height
		height: message.height
		backgroundColor: systemColorInactive
	messageActionDelete = new Layer
		parent: messageAction
		x: messageActionView.maxX
		width: message.height
		height: message.height
		backgroundColor: "red"

	avatar = new Layer
		parent: message
		image: "https://fbusers-4494.restdb.io/media/#{user.image}"
		width: 50
		height: 50
		borderRadius: 100
		y: Align.center
		x: Align.left(5)
	
	activeAvatar = new Layer
		parent: avatar
		width: 15
		height: 15
		borderRadius: 100
		borderColor: "white"
		borderWidth: 2
		backgroundColor: "green"
		visible: false
		x: Align.right
		y: Align.bottom
	
	name = new TextLayer
		parent: message
		text: "#{user.firstname} #{user.lastname}"
		fontFamily: systemFontFamily
		fontSize: systemFontSize + 3
		color: "black"
		x: avatar.width + 15
		y: Align.center(-8)

	messageText = new TextLayer
		parent: message
		text: "#{user.messageText}"
		truncate: true
		width: Screen.width / 1.7
		fontFamily: systemFontFamily
		fontSize: systemFontSize
		color: systemColorInactive
		x: avatar.width + 15
		y: Align.center(8)
	
	messageTime = new TextLayer
		parent: message
		text: "#{user.messageTime}"
		textAlign: "center"
		fontFamily: systemFontFamily
		fontSize: systemFontSize
		truncate: true
		color: systemColorInactive
		x: Align.right(-5)
		y: Align.center(-8)
		width: Screen.width / 5

	if user.unread
		name.fontWeight = "bold"
		messageText.color = "black"
		messageTime.color = "black"
	if user.activity
		activeAvatar.visible = true

calls = new ScrollComponent
	size: Screen.size
	backgroundColor: "white"
	directionLock: true
	scrollHorizontal: false
	contentInset: 
		top: header.height
		bottom: footer.height
	directionLock: true




# Flow
flow = new FlowComponent
flow.header = header
flow.footer = footer

flow.showNext(home)
callsButton.on Events.Tap, (event) ->
    flow.showNext(calls)
homeButton.on Events.Tap, (event) ->
	flow.showNext(home)






