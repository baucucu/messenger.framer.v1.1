class IpzMessengerSearchBox

    constructor:(parentView) ->
        searchBar = new Layer
            width: parentView.width
            backgroundColor: "transparent"
            height: 32
            parent: parentView

        search = new Layer
            width: searchBar.width - 100
            x: Align.center
            superLayer: searchBar
            height: 28
            borderRadius: 5
            backgroundColor: "#DEDEDE"

        searchPlaceholder = new TextLayer
            parent: search
            text: "Search"
            fontSize: 14
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

module.exports = IpzMessengerSearchBox