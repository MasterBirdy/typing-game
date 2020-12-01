import typingPrompts from "./typingPrompts";

class Room {
    constructor(members) {
        this.members = members.reduce((acc, cur) => {
            acc[cur] = { currentString: "", actions: 0 };
            return acc;
        }, {});
        this.timer = Date.now();
        this.typePrompt = typingPrompts[Math.floor(Math.random() * typingPrompts.length)];
        this.gameWon = false;
    }

    addCharacter(string, id) {
        if (this.members[id]) {
            this.members[id].currentString = string;
        }
    }

    changeActions(number, id) {
        if (this.members[id]) {
            this.members[id].actions = number;
        }
    }

    hasUserWon(id) {
        if (this.gameWon) {
            return false;
        }
        if (this.members[id] && this.typePrompt === this.members[id].currentString) {
            this.gameWon = true;
            return true;
        }
        return false;
    }
}

export default Room;
