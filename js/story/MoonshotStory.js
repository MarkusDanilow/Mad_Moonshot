/**
 * 
 */
class MoonshotStory {

    /**
     * 
     */
    constructor() {

        /**
         * Theese are the entries that tell the story bit by bit
         */
        this.entries = {
            0: "Where... Where am I? ",
            1: "The last thing I can remember is that...",
            2: "... I was on a journey to a distant moon with my crew. We spent many months in our spaceship, traveling all over the galaxy.",
            3: "Where is everybody? What happened? Where is our ship? ",
            4: "I must find the others and the ship! ",
            5: "Fortunately my space suit is still intact. The joystick on my left hand looks good too. Let's see if the control nozzles still work. " +
                "I should be able to steer with the left and right arrow keys...",
            6: "Great! The control nozzles still work! And with the thruster I can let myself be pushed forward.",
            7: "So now I can start looking for our ship and the others. Hopefully I will find them soon...",
            8: "But I have to be careful. There are asteroids floating around everywhere...",
            9: "...and maybe debris from our spaceship.",
            10: "Finally I reached the ship. But still no sign of the others...",
            11: "Our ship has seen better times... ",
            12: "At least the life support systems still seem to work. So I can refill oxygen for my spacesuit at any time...",
            13: "...and also refuel the nozzles of my suit.",
            14: "I've seen a lot of debris flying around out there. Some of them still looked good.",
            15: "I should try to collect these parts and use them to seal at least the big cracks in the outer hull.",
            16: "For that I need some big plates and screws.",
            17: "Very good, I was able to repair the outer hull of our ship.",
            18: "Next, I should try to get the ship ready to fly again.",
            19: "But that's going to be pretty difficult. The cockpit took quite a beating....",
            20: "I should seal the cockpit next and repair the doors and windows. I'll definitely need more screws and plates for that. ",
            21: "I should also keep my eyes open for transparent parts for the windows...",
            22: "The further I get away from the ship, the faster asteroids become. I'll have to be careful on my next outdoor missions!",
            23: "At least the cockpit is finally sealed.",
            24: "To be able to fly at all again, I have to repair the central control console next.",
            25: "When it's working again, I'll be able to operate the radio again and hopefully reach the others in my crew.",
            26: "Before I go out again, I should fully recharge my suit. Finding the small parts for the control console out there is not going to be easy.",
            27: "The search for the spare parts for the control console took forever. But with a lot of perseverance and a little dexterity, I was finally able to repair the console. " +
                "Hopefully it's not already too late to reach the others....",
            28: "\"Hello, can anyone hear me?\"",
            29: "...",
            30: "\"Can anyone hear me?!\"",
            31: "...",
            32: "\"Hello?!!\"",
            33: "Crap! This is not good...",
            34: "But maybe the others are just drifting outside the radio range. Like I did. I can 't give up hope!",
            35: "I've got to get this ship operational again!",
            36: "The cockpit and the control console are already working. That leaves the engines and the generator.",
            37: "I need a lot of insulation material for the engines, " +
                "so that the ship doesn't explode as soon as I start my first flight attempt... ",
            38: "It's getting wilder and more dangerous out there. Fortunately, all I have to worry about now is the generator.",
            39: "I don't really need much for that. Just a few plates and some extra screws...",
            40: "...and fuel cells.",
            41: "I've already seen a few glowing in the distance. So a part of our fuel supply seems to have survived the crash in one piece...",
            42: "I have everything and the ship should now be ready for use again.",
            43: "All that remains is to hope that the fuel cells are really still intact and that the first ignition doesn't end in a big explosion...",
            44: "I start the turbines in 3...",
            45: "2...",
            46: "1..."
        };

        /**
         * Here are the break points, that tell when the story dialog is paued and the gameplay continues...
         * Breakpoint is always an index of the story entry, that will be shown directly after break 
         * ==> last message + 1 
         */
        this.entryBreakpoints = [
            6, 10, 17, 22, 27, 38, 42
        ];

        MoonshotStory.LevelStoryMapping = { 0: 0 };
        for (let i = 1; i < this.entryBreakpoints.length; i++) {
            MoonshotStory.LevelStoryMapping[i] = this.entryBreakpoints[i - 1];
        }

        this.entryIndex = 0;
        this.continueFromBreakpoint = 0;
    }

    /**
     * 
     */
    isEndReached() {
        return this.entryIndex >= Object.keys(this.entries).length;
    }

    /**
     * 
     */
    isBreakpoint() {
        return this.entryBreakpoints.includes(this.entryIndex);
    }

    /**
     * 
     */
    canContinueFromBreakpoint() {
        return this.entryIndex == this.continueFromBreakpoint;
    }

    /**
     * 
     */
    continueAfterBreakpoint() {
        this.continueFromBreakpoint = this.entryIndex;
    }

    /**
     * 
     */
    next() {
        if (this.entryIndex >= this.entries.length) return -512;
        let result = this.entries[this.entryIndex];
        this.entryIndex++;
        return result;
    }

}

MoonshotStory.LevelStoryMapping = {}