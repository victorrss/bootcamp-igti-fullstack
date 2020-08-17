import React, { Component } from 'react'

export default class Band extends Component {
    constructor() {
        super()
        this.state = {
            bandName: 'Banda Teste',
            bandMembers: [
                {
                    id: 1,
                    name: 'Neil Peart',
                    instrument: 'Bateria',
                },
                {
                    id: 2,
                    name: 'João',
                    instrument: 'Guitarra',
                },
                {
                    id: 3,
                    name: 'Maria',
                    instrument: 'Contra-baixo',
                },
            ]
        }
    }
    render() {
        const { bandMembers, bandName } = this.state
        return (
            <div>
                <h3>{bandName}</h3>
                <ul>
                    {
                        bandMembers.map((member) => {
                            return <li key={member.id}>{member.name} - {member.instrument}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
