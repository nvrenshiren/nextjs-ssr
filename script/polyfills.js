import includes from 'core-js/library/fn/string/virtual/includes'
import repeat from 'core-js/library/fn/string/virtual/repeat'

String.prototype.includes = includes
String.prototype.repeat = repeat
console.log('Load polyfills')
