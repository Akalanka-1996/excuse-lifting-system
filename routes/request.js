const router = require('express').Router()
const {createRequest, getRequests, getRequestByUser, updateRequest, deleteRequest, approveRequest, rejectRequest, postRequest} = require('../controller/requestController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getRequests)
router.route('/create').post(protect, createRequest)
router.route('/:id').put(protect, updateRequest).delete(protect, deleteRequest)
router.route('/approve-request/:id').put(approveRequest)
router.route('/reject-request/:id').put(rejectRequest)
router.route('/post-request/:id').put(postRequest)

module.exports = router