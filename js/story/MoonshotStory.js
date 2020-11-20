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
            0: "Oh, hello there. How lucky you found me!",
            1: "My name is Aly.",
            2: "I had a breakdown on my spaceship while I was on my journey through the galaxy and got stranded on a lonely moon.",
            3: "You have to help me pick up the parts I lost when I crashed on the lunar surface! Can you do that for me?",
            4: "Great! You can move left and right with the arrow keys on your keyboard.",
            5: "Move over objects to pick them up. But be careful! There are many dangerous things on this strange moon...",
            6: "Thank you so much! You saved my life!"
        };

        /**
         * Here are the break points, that tell when the story dialog is paued and the gameplay continues...
         * Breakpoint is always an index of the story entry, that will be shown directly after break 
         * ==> last message + 1 
         */
        this.entryBreakpoints = [
            6
        ];

        this.entryIndex = 5;

        this.continueFromBreakpoint = 0;
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