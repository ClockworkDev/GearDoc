CLOCKWORKRT.components.register([
    {
        name: "foodTracker",
        description: "This component keeps track of the food you eat",
        events: [
            {
                name: "#loop", code: function (event) {
                    //This event is private cause there is no description
                }
            },
            {
                name: "iAteAnIcecream",
                description: "You can call this event to notify that you ate an icecream",
                code: function (event) {
                }
            },
            {
                name: "iAteAHotdog",
                description: "You can call this event to notify that you ate a hotdog",
                "dataSchema": {
                    "ketchup":"<Did you pour some deliciuos sauce?>"
                },
                code: function (event) {
                }
            }
        ],
        triggers: [
            {
                "name": "foodGoalReached",
                "description": "This event will be triggered once you have eaten too much.",
                "dataSchema": {
                    "values": [
                        {
                            "x": "<X value on the first thumsbtick>",
                            "y": "<Y value on the first thumsbtick>"
                        },
                        {
                            "x": "<X value on the second thumsbtick>",
                            "y": "<Y value on the second thumsbtick>"
                        }
                    ],
                    "calories": "<The number of calories that you have swallowed>"
                }
            },
        ]
    }
]);