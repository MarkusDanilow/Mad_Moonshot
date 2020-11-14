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
        this.entries = [
            "Oh, hello there. How lucky you found me!",
            "My name is Aly.",
            "I had a breakdown on my spaceship while I was on my journey through the galaxy and got stranded on a lonely moon.",
            "You have to help me pick up the parts I lost when I crashed on the lunar surface! Can you do that for me?",
            "Great! You can move left and right with the arrow keys on your keyboard.",
            "Move over objects to pick them up. But be careful! There are many dangerous things on this strange moon..."
        ];

        /**
         * Here are the break points, that tell when the story dialog is paued and the gameplay continues...
         * Breakpoint is always an index of the story entry, that will be shown directly after break 
         * ==> last message + 1 
         */
        this.entryBreakpoints = [
            6
        ];

        this.gamePlayCallbacks = {
            6: MoonshotApplication.INSTANCE.startFirstLevel
        };

        this.entryIndex = 5;
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
    switchToGameplay() {
        return this.gamePlayCallbacks[this.entryIndex];
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