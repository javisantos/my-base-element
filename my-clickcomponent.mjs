import afuncstring2func from './helpers/arrow-function-string-to-function.mjs'

import ("./index.mjs").then((Module) => {

    const {
        MyBaseElement
    } = Module

    class MyComponent extends MyBaseElement {
        constructor() {
            super()
            
        }

        static get is() {
            return 'my-clickcomponent'
        }

        static get observedAttributes() {
            return ['greetings', 'planet']
        }

        static get observedEvents() {
            return ['click']
        }     

        onClick(event) {
            if (!event.path[0].attributes['onclick']) return 
            var comingFunc = event.path[0].attributes['onclick'].value
            afuncstring2func(comingFunc, this)
        }

        get initialState() {
            return {
                otherPlanet: "Mars",
                greetings: 'Hello',
                planet: "World",
                planetColor: "green"
            }
        }

        rendered() {
            console.log(`${MyComponent.is} is rendered with state: `, this.state)
        }

        connected() {
            console.log(`${MyComponent.is} connected with the DOM`)
        }

        helloMars(planetColor, planet) {
            this.setState({planetColor, planet})
        }

        get style() {
            return (`
                :host {
                    color: blue;
                }
                .black {
                    color: black;
                }
                .red {
                    color: red;
                }
                .green {
                    color: green;
                }
            `)
        }

        get template() {
            return `
            <div>
                <span class="black">${this.state.greetings}</span>
                <span class="${this.state.planetColor?this.state.planetColor:'blue'}">${this.state.planet}</span>
                <hr>
                <button onclick="${()=> helloMars({planet: this.state.otherPlanet, planetColor: 'red'})}"> Say hello to Mars</button>
            </div>
            
            `
        }


    }
    MyBaseElement.define( MyComponent.is, MyComponent)
})