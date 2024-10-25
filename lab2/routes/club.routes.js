const Router = require('express')
const router = new Router()
const ClubController = require('../controller/club.controller')

router.post('/club', ClubController.createClub)
router.get('/clubs', ClubController.getClubs)
router.delete('/club/delete', ClubController.deleteClub)
router.put('/club/update', ClubController.updateClub)

module.exports = router