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
            5: "Fortunately my space suit is still intact. The joystick on my left hand looks good too. Let's see if the control jets still work and I can steer with the left and right arrow keys...",
            6: "Great! The control nozzles still work! And with the thruster I can let myself be pushed forward.",
            7: "So now I can start looking for our ship and the others. Hopefully I will find them soon...",
            8: "But I have to be careful. There are asteroids floating around everywhere...",
            9: "...and maybe debris from our spaceship.",
            10: "THE END"
        };

        /**
         * Here are the break points, that tell when the story dialog is paued and the gameplay continues...
         * Breakpoint is always an index of the story entry, that will be shown directly after break 
         * ==> last message + 1 
         */
        this.entryBreakpoints = [
            6, 10
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
        if (this.entryIndex >= this.entries.length) return "THE END!";
        let result = this.entries[this.entryIndex];
        this.entryIndex++;
        return result;
    }

}

MoonshotStory.LevelStoryMapping = {}