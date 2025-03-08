import express from 'express';
//model ref
import Accessories from '../models/accessories.js';

//create express router object 
const router = express.Router();


/**
 * @swagger
 * /api/v1/accessories:
  *  get:
  *    summary: Retrieve all accessories
  *    responses:
  *     200:
  *      description: A list of accessories.
 */

//GET: return all accessories
router.get('/', async (req, res) => {
 
 //use Accessories model to fetch all documents from accessories collection in db
 let accessories = await Accessories.find();

 if(!accessories){
   return res.status(204).json({msg: 'No Results'});
 }

   return res.status(200).json(accessories);
 
});

/**
 * @swagger
 * /api/v1/accessories/{id}:
 *   get:
 *    summary: Find accessory by its id
 *    parameters:
 *     - name: id
 *       in: path
 *       schema:
 *        type: integer
 *        required: true
 *   responses:
 *    200:
 *     description: Returns a single accessory
 *    404:
 *     description: Not found
 */
router.get('/:id', async (req, res) => {
  let accessories = await Accessories.findById(req.params.id);

  if(!accessories){
    return res.status(404).json({msg: 'Not Found'});
  }

  return res.status(200).json(accessories);
});

/**
 * @swagger
 * /api/v1/accessories:
 *   post:
 *     summary: Add a new accessory from POST body
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             id:
 *              type: integer
 *             name:
 *              type: string
 *   responses:
 *     201:
 *      description: Resource created
 *     400:
 *      description: Bad request
 */
router.post('/',async (req, res)=>{
    // if(!req.body){
    //     return res.status(400).json({err: 'Request body Required'});
    // }
    try{
    await Accessories.create(req.body);
    return res.status(201).json(); //201: resource created
    }
    catch(err){
        return res.status(400).json({err:`Bad Request: ${err}`});
    }
  });

/**
 * @swagger
 * /api/v1/accessories/{id}:
 *   put:
 *     summary: update selected accessory from request body
 *     parameters:
 *       -name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       204:
 *         description: Resource updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', async (req, res) => {
  try {
      let accessories = await Accessories.findById(req.params.id);

      if (!accessories) {
          return res.status(404).json({ msg: 'Not Found' });
      } 
      if (req.params.id != req.body._id) {
          return res.status(400).json({ msg: 'Bad Request: _ids do not match' });
      }
      await Accessories.findByIdAndUpdate(req.params.id, req.body);
      return res.status(204).json(); // 204: resource modified
  }
  catch (err) {
      return res.status(400).json({ err: `Bad Request: ${err}` });
  }
});

/**
 * @swagger
 * /api/v1/accessories/{id}:
 *   delete:
 *    summary: Remove selected accessory
 *    parameters:
 *     - name: id
 *       in: path
 *       schema:
 *        type: integer
 *        required: true
 *   responses:
 *    204:
 *     description: Resource deleted
 *    404:
 *     description: Not found
 */
router.delete('/:id', async (req, res) => {
    let accessories = await Accessories.findById(req.params.id);   

    if(!accessories){
      return res.status(404).json({msg: 'Not Found'});
    }

    await Accessories.findByIdAndDelete(req.params.id);
    return res.status(204).json();
});
     
//make contorller public to the rest of the app
export default router;
