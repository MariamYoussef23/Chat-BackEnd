import { Router } from "express";


const router = Router();

router.post('/signup', async (req,res) => {
    try{
        const {firstname, lastName, email, password} = req.body
        if(password.length > 8) {
            return res.status(400).json({message: 'Password must be at least 8 characters '})
        }
    
    }catch (error){
        res.status(500).json({ message: error });
    }
})


export default router