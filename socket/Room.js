class Room {
    constructor(members) {
        this.members = members.reduce((acc, cur) => {
            acc[cur] = { currentString: "", characters: 0 };
            return acc;
        }, {});
        this.timer = Date.now();
        this.typePrompt = "Peter Piper picked a peck of pickled peppers.";
        this.gameWon = false;
    }

    addCharacter(string, id) {
        if (this.members[id]) {
            this.members[id].currentString = string;
            this.members[id].characters++;
        }
    }

    hasUserWon(id) {
        if (this.gameWon) {
            return false;
        }
        console.log("STRING 1", this.typePrompt);
        console.log("STRING 2", this.members[id].currentString);
        if (this.members[id] && this.typePrompt === this.members[id].currentString) {
            this.gameWon = true;
            return true;
        }
        return false;
    }
}

export default Room;
