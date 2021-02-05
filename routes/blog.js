const router = require('koa-router')()
const auth = require('../middlewares/auth')
const { login, check } = require('../controllers/user')
router.prefix('/blog')

router.post('/create', auth, check)

module.exports = router
