import express from 'express';
import { getRelationships, addRelationship, deleteRelationship  } from '../controller/relationship.js';

const router = express.Router();



router.get('/', getRelationships)
router.post('/', addRelationship)
router.delete('/', deleteRelationship)
// router.post('/', addLikes)

export default router;

