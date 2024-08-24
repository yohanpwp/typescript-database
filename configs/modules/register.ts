import bcrypt from "bcrypt";
import userModel from "../routes/database";

export const postRegister = async (req:any, res:any) => {
        try {
          let data = req.body;
          let username:string = data.username.toLowerCase();
      
          if(!data.username || !data.password || !data.firstName) return res.status(200).json({ message: 'Please check your input values' });
          else if(!data.createdBy){ data.createdBy = username}
          const checkUser = await userModel.findOne({ where: { username: username }})
          if(checkUser) return res.status(200).json({ message: 'Username already exists' });
          // Hashing the password before storing it in the database
          bcrypt.hash(data.password, 5, async (err, hash) => {
            if (err) {console.error('Error hashing password:', err) 
            return ;}
            else {
              data.password = hash;
              const user = await userModel.create(data);
              res.status(201).json({user, message: 'User registered successfully'});
            }
          });
        } catch (error:any) {
            res.status(400).json({ 
              message: 'Bad Request' ,
              errors: error.message
            });
        }
      };