import { MyBaseElement , html, helpers } from "../index.mjs"

    class MyClickBaseElement extends MyBaseElement {
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

        onClick(event, id) {
            helpers.clickTarget(event, id, this)
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
            console.log(`${MyClickBaseElement.is} is rendered with state: `, this.state)
            var helloBtn = document.querySelector(MyClickBaseElement.is.toUpperCase()).shadowRoot.querySelector('#sayhello')
            helloBtn.addEventListener('click', (event) => this.onClick(event, 'sayhello'))
        }

        connected() {
            console.log(`${MyClickBaseElement.is} connected with the DOM`)
        }

        helloMars(planet, planetColor) {
            this.setState({planet, planetColor})
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
            return html`
            <div>
                <span class="black">${this.state.greetings}</span>
                <span class="${this.state.planetColor?this.state.planetColor:'blue'}">${this.state.planet}</span>
                <hr>
                <button id="sayhello" onclick="${()=> helloMars({planet: this.state.otherPlanet, planetColor: 'red'})}"> Say hello to Mars</button>
            </div>
            
            `
        }


    }
    MyBaseElement.define( MyClickBaseElement.is, MyClickBaseElement)
