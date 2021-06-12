const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use(validateJWT);


// Get event
router.get('/', getEvents);

// Create event
router.post(
    '/',
    [
        check('title', 'Title field must be filled').not().isEmpty(),
        check('start', 'Start date field must be correctly filled').custom(isDate),
        check('end', 'End date field must be correctly filled').custom(isDate),
        validateFields
    ],
    createEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);



module.exports = router;