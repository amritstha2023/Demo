import bcrypt from 'bcrypt'
import Joi from 'joi'
import User from '../../models/user.js';
const registerController = {
    async register(req, res, next) {
        // Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        // check if user is in the database already
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                throw new Error('This email is already taken.');
            }

            const { name, email, password } = req.body;

    // Hash password
     const hashedPassword = await bcrypt.hash(password, 10);

     //save into db
     const user = new User({
        name,
        email,
        password: hashedPassword
    });
 
     await user.save()

    res.json({message:'sucessfully Register'})


        } catch (err) {
            return next(err);
        }

    }
}


export default registerController;