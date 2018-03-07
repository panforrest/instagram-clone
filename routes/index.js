// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const superagent = require('superagent')

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', (req, res) => {

    const data = {
    	text: 'Instagram Clone',
    	greeting: 'Welcome'
    }

	res.render('index', data)
})

router.get('/:username', (req, res) => {
	const username = req.params.username
	const instagramAPI = 'https://www.instagram.com/'+username+'/?__a=1'

    // const err = {
    //     message: err.message
    // }

    superagent.get(instagramAPI)
    .query(null)
    .set('Accept', 'application/json')
    .end((err, response) => {
        if (err) {
        	// res.json({
        	// 	confirmation: 'fail',
        	// 	message: err.message
        	// })
            const data = {
                message: err.message || 'Check your spelling'
            }
            res.render('error', data)    //res.render('error', null)
            return
        }
        res.render('index',response.body)
    })
})

module.exports = router
