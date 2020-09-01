const tracks = {
    getNew() {
        return {
            active: true,
            startTime: new Date,
            elapsedTime: 0,
            date: new Date,
            ticket: 'ticket',
            ticketTitle: 'ticketTitle',
            epic: 'epic',
            comment: 'comment',
            typeUTZ: 'typeUTZ',
            savedJira: false,
            savedUTZ: false,
        }
    },

    keys: { keyPath: "date" },

    index: [
        {
            name: 'active',
            options: { unique:false }
        }
    ]
}

export default tracks;