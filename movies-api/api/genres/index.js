import express from 'express';
import {genres} from './genresData';
//import uniqid from 'uniqid';
import genreModel from './genreModel';
import asyncHandler from 'express-async-handler';


const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    const totalDocumentsPromise = genreModel.estimatedDocumentCount(); //Kick off async calls
    const genresPromise = genreModel.find().limit(limit).skip((page - 1) * limit);

    const totalDocuments = await totalDocumentsPromise; //wait for the above promises to be fulfilled
    const genres = await genresPromise;

    const returnObject = { page: page, total_pages: Math.ceil(totalDocuments / limit), total_results: totalDocuments, results: genres };//construct return Object and insert into response object

    res.status(200).json(returnObject);
}));

export default router;