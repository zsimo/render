// =========== BROWSER
var vdom = require('virtual-dom')
var hyperx = require('hyperx')
var hx = hyperx(vdom.h)

var title = 'world'
var wow = [1,2,3]
var tree = hx`<div>
  <h1 y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(function (w, i) {
    return hx`<b>${w}</b>\n`
})}
</div>`
console.log(vdom.create(tree).toString())

// =========== NODE
var h = require('hyperscript')
var hyperx = require('hyperx')
var hx = hyperx(h)

var title = 'world'
var wow = [1,2,3]
var tree = hx`<div>
  <h1 data-y="ab${1+2}cd">hello ${title}!</h1>
  ${hx`<i>cool</i>`}
  wow
  ${wow.map(function (w) {
    return hx`<b>${w}</b>\n`
})}
</div>`
console.log(tree.outerHTML)