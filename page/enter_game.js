function page(req, res) {
    require('fs').readFile('html/enter_game.html', 'utf8', function (err, html) {
        if (err) throw err

        res.end(require('../src/html_creator').create_html(html, {
            title: 'Neues Spiel',
            js: ['jquery', 'jquery-ui', 'tokenize2', 'enter_game'],
            css: ['bootstrap', 'tokenize2', 'styles_general', 'jquery-ui'],
            nav: true
        }))
    })
}

module.exports = {
    page: page
}
