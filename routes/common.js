const router = require('koa-router')()
const auth = require('../middlewares/auth')
const { upload } = require('../controllers/common')
const checkExist = require('../middlewares/image')
router.prefix('/common')

router.post('/upload', checkExist, upload)

module.exports = router
