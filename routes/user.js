const router = require('koa-router')()
const auth = require('../middlewares/auth')
const { login, check } = require('../controllers/user')
router.prefix('/user')

router.get('/check', auth, check)

router.post('/login', login)

module.exports = router
