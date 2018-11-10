var h = require('hyperscript')
var html = h('div#page',
    h('div#header',
        h('h1.classy', 'h', { style: {'background-color': '#22f'} })),
    h('div#menu', { style: {'background-color': '#2f2'} },
        h('ul',
            h('li', 'one'),
            h('li', 'two'),
            h('li', 'three'))),
    h('h2', 'content title',  { style: {'background-color': '#f22'} }),
    h('p',
        "so it's just like a templating engine,\n",
        "but easy to use inline with javascript\n"),
    h('p',
        "the intention is for this to be used to create\n",
        "reusable, interactive html widgets. "))

//console.log(html.outerHTML);



console.log(h("div#simo", h("div", "text")).outerHTML);