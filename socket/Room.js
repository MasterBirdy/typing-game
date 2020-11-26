class Room {
    constructor(members) {
        this.members = members.reduce((acc, cur) => {
            acc[cur] = { current_string: "" };
        }, {});
        this.timer = Date.now();
        this.typePrompt = "Peter Piper picked a peck of pickled peppers. A peck of pickled peppers Peter Piper picked.";
    }
}

export default Room;
