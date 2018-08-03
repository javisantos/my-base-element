class MyBaseElement extends HTMLElement {
    constructor () {
      super()
  
      this.state = this.initialState
      this.loaded = false
  
      var style = document.createElement('style')
      var template = document.createElement('template')
      style.textContent = this.style
      template.innerHTML = this.template
  
      this.shadow = this.attachShadow({
        mode: 'open'
      })
      this.shadow.appendChild(style.cloneNode(true))
      this.shadow.appendChild(template.content)
    }
  
    static define (name, child) {
      try {
        customElements.define(name, child)
      } catch (err) {
        console.log(err)
        const h3 = document.createElement('h3')
        h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
        document.body.innerHTML(h3)
      }
    }
  
    /* Beginning of Implementation. */
  
    static get observedAttributes () { return [] /* Array of observed attributes. [Array]. */ }
    static get observedEvents () {  return [] /* Array of observed events [Array]. */ }
  
    get initialState () { return { /* Called in constructor [Object]. */ } }
  
    // LiveCircle 
    connected () { /* Triggered when the component is connected. */ }
    rendered () { /* Triggered each time the component is rendered. */ }
    disconnected () { /* Triggered when the component is disconnected. */ }
  
    // Events
    onState () { /* Called when state changes (state). */ }
    onEvent () { /* Called when state changes (event). */ }
    onChange () { /* Called when attribute change (attrName, oldVal, newVal). */ }
  
    // Rendering
    get style () { return `` /* Define a scoped/shadowed css. */ }
    get template () { return `[Empty Template]` /* Define a literal template. */ }
  
    /* End of Implementation. */
  
    eventHandler (event) {
      this.onEvent(event)
      switch (event.type) {
        case 'click':
          break
        /* ... */
        default:
          break
      }
    }
  
    connectedCallback () {
      this.render()
      this.connected()
      this.loaded = true
  
      if (this.source) this.initEventSource()
  
      var oldAddEventListener = EventTarget.prototype.addEventListener
  
      EventTarget.prototype.addEventListener = function (eventName, eventHandler) {
        oldAddEventListener.call(this, eventName, function (event) {
          let eventNameCapitalized = `on${eventName.replace(/^\w/, c => c.toUpperCase())}`
          if (typeof this[eventNameCapitalized] === 'function') this[eventNameCapitalized](event)
          this.eventHandler(event)
        })
      }
  
      this.constructor.observedEvents.forEach(element => {
        this.addEventListener(element)
      })
    }
  
    disconnectedCallback () {
      this.disconnected()
    }
  
    render () {
      this.shadow.querySelectorAll('DIV')[0].innerHTML = this.template
      this.rendered()
    }
  
    setState (data, shouldRender) {
      const newState = Object.assign({}, this.state, data)
      this.state = newState
      this.onState(this.state)
      if (shouldRender || this.loaded) this.render()
    }
  
    attributeChangedCallback (attrName, oldVal, newVal) {
      console.log(attrName, oldVal, newVal)
      const attrs = {}
      attrs[attrName] = newVal
      this.setState(attrs)
      this.onChange(attrName, oldVal, newVal)
    }
  
  }
  
  const html = (literals, ...substitutions) => {
    let result = ''
  
    for (let i = 0; i < substitutions.length; i++) {
      result += literals.raw[i]
      result += substitutions[i]
    }
  
    result += literals[literals.length - 1]
  
    return result
  }
  
  export { MyBaseElement, html }
  