class IpzMessengerSearchBox

    constructor:(parentView) ->
        searchBar = new Layer
            width: parentView.width
            backgroundColor: "transparent"
            height: 64
            parent: parentView

        search = new Layer
            width: searchBar.width - 150
            x: Align.center
            superLayer: searchBar
            height: 56
            borderRadius: 5
            backgroundColor: "#DEDEDE"

        searchPlaceholder = new TextLayer
            parent: search
            text: "Search"
            fontSize: 28
            fontFamily: ".SF NS Display"
            letterSpacing: 0.0
            x: Align.center
            y: Align.center

        searchIcon = new Layer
            parent: search
            image: "images/SearchIcon.png"
            height: 24
            width: 24
            y: Align.center

        searchIcon.x = searchPlaceholder.x - (searchIcon.width + 5)

module.exports = IpzMessengerSearchBox