const router = require('koa-router')()
const auth = require('../middlewares/auth')
const { upload } = require('../controllers/common')
router.prefix('/common')

router.post('/upload', upload)

module.exports = router
