// Ugly helper to Convert "()=> helloMars({planet: this.state.otherPlanet, planetColor: 'red'})" to 
// this.helloMars(planet = this.state.otherPlanet, planetColor = 'red') binded to this
export var execute =  function (comingFunc, bind) {
  var args = stringFunction.match('(?:\{)(?:.*)(?:\})')[0]
  var funcName = stringFunction.substring(stringFunction.indexOf("> ")+2 , stringFunction.lastIndexOf("("))

  const exec = (fstring, context /*, args */ ) => {
      var args = Array.prototype.slice.call(arguments, 2);
      var namespaces = fstring.split(".").slice(1)
      var func = namespaces.pop();
      for (var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
      }
      return typeof context[func] === "function" ? context[func].apply(this.args) : context[func]
  }

  var argsToObject = args
      .substring(args.lastIndexOf('{') + 1, args.lastIndexOf('}'))
      .split(',')
      .map(x => x.split(':')
          .map(y => y.trim()))
      .reduce((a, x) => {
          a[x[0]] = x[1].indexOf("'") === 0 ? x[1].substring(x[1].indexOf("'") + 1, x[1].lastIndexOf("'")) : exec(x[1], this)
          return a
      }, {})
      var args = Object.keys(argsToObject).map((k) => argsToObject[k])
      if (typeof this[funcName] === 'function') {
          return this[funcName](...args.reverse())
      } else {
          throw new Error(`The function ${funcName} in not defined.`)
      }
}

