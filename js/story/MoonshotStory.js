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
            5: "Fortunately, my spacesuit is still intact. The joystick on my left hand looks good. If the control jets on my suit still work, I can at least move left and right with the arrow keys... ",
            6: "Thank you so much! You saved my life!",
            7: "Let's continue...",
            8: "We have reached the end. Go back to the main menu. You can replay single levels via level selection."
        };

        /**
         * Here are the break points, that tell when the story dialog is paued and the gameplay continues...
         * Breakpoint is always an index of the story entry, that will be shown directly after break 
         * ==> last message + 1 
         */
        this.entryBreakpoints = [
            6, 8
        ];

        for (let i = 9, j = 3; i < 10, j < 10; i++, j++) {
            this.entries[i] = "Story Entry " + i;
            this.entryBreakpoints.push(i);
            MoonshotStory.LevelStoryMapping[j] = i;
        }

        this.entryIndex = 5;

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

MoonshotStory.LevelStoryMapping = {
    0: 0,
    1: 6,
    2: 8
}