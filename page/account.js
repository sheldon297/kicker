module.exports = {
  page: page
}

function page (req, res) {
  require('../src/account_util').require_logged_in_user(req, res)
  console.log('making account page...')

  require('fs').readFile('html/account.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, { title: 'Dein Account', js: ['edit_account'] }))
  })
}