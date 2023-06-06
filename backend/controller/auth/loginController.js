import Joi from 'joi';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';

const loginController={
   async login(req,res,next){
        // Validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {    
                throw new Error('username or password wrong.');
            }
            // compare the password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                throw new Error('username or password wrong..');
            }

            res.json({message:'login Register'})

        } catch (error) {
            return next(error);
        }

        
    }
}

export default loginController;