class ItemCollectionConstants {

}

ItemCollectionConstants.items = {
    1: {
        "FixWayPoint": {
            amount: 2,
            required: true,
            fixed: true
        }
    },
    2: {
        "Screw": {
            amount: 10,
            required: true
        },
        "Bomb": {
            amount: 0,
            required: false
        }
    },
    3: {
        "Screw": {
            amount: 2,
            required: true
        }
    }
}

ItemCollectionConstants.StartupItems = {
    1: {
        "FixWayPoint": {
            amount: 2,
            positions: [
                { x: -0.9, y: 0.9 },
                { x: 0.9, y: 0.9 }
            ]
        }
    }
}