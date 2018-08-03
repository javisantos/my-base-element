// Ugly helper to Convert "()=> helloMars({planet: this.state.otherPlanet, planetColor: 'red'})" to 
// this.helloMars(planet = this.state.otherPlanet, planetColor = 'red') binded to this
export var afuncstring2func =  function (comingFunc, bind) {
    var comingFunc = comingFunc.trim()
    var funcName = comingFunc.substring(comingFunc.indexOf('>') + 1, comingFunc.lastIndexOf('('))
    funcName = funcName.trim()
    try {
      var comingFuncVars = comingFunc.substring(comingFunc.lastIndexOf('{') + 1, comingFunc.lastIndexOf('}')).split(',').map(x => x.split(':').map(y => y.trim()))
        .reduce((a, x) => {
          if (x[1].indexOf('this') !== -1) { // TODO look for a better solution for nested string literals
            var value = x[1].substring(x[1].indexOf('.') + 1, x[1].length).split('.')
            x[1] = bind[value[0]][value[1]]
            a[x[0]] = x[1]
          } else {
            a[x[0]] = x[1].substring(x[1].indexOf("'") + 1, x[1].lastIndexOf("'"))
          }
         
          return a
        }, {})
      var args = Object.keys(comingFuncVars).map((k) => comingFuncVars[k])
      JSON.stringify(args)
    } catch (e) {
      throw new Error(`The arguments in ${funcName} must be a valid Object`)
    }
   
    if (typeof bind[funcName] === 'function') {
        return bind[funcName](...args)
    } else {
      throw new Error(`The function ${funcName} in not defined.`)
    }
}