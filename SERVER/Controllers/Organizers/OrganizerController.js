import bcrypt from 'bcryptjs';
import cloudinary from '../../Config/cloudinary.js';
import validator from 'validator';


import Organizer from '../Models/OrganizerModel.js';


import { setOrganizerTokenAndCookies } from '../../Middlewares/jwtAuth.js';
import generateSecureOTP from '../../Config/getOTP.js';




const signUp = async (req,res)=>{
    try{

        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password){
            return res.json({success:false,message:`All Fields Are Mandatory`});
        }


        if(!validator.isEmail(email)){
            return res.json({success:false,message:`Please Provide The Proper Mail`});
        }

        if(password.length<8){
            return res.json({success:false,message:`Password Must be minimum of length 8`});
        }


        const organizerExists = await Organizer.findOne({email});

        if(organizerExists && organizerExists.isAccountVerified){
            return res.json({success:false,message:`Organizer With Provided Mail Already Exists`});
        }

        const saltRound = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,saltRound);



        // setUserTokenAndCookie(newUser,res);

        // console.log("New User Created SUccessfully",newUser);


        const {OTP,hashedOTP,expiredAt} = await generateSecureOTP();

        let newUser = "";
        let updatedUser = "";

        if(!userExists){

            newUser = await Patient.create({
                fullName,
                email,
                password:hashedPassword,
                verifyOtp:hashedOTP, 
                verifyOtpExpiredAt: expiredAt
            })
            
        }else{
            updatedUser = await Patient.findOneAndUpdate({email},
                {
                    $set:{
                        fullName,
                        email,
                        password:hashedPassword,
                        verifyOtp:hashedOTP, 
                        verifyOtpExpiredAt: expiredAt
                    }
                }
            )
        }



        try{
            // console.log(email);
            /*
            const mailOption = {
                from:process.env.SENDER_EMAIL_SMT,
                to:email,
                subject:'Welcom To WeAndOurs',
                text:`We Heartly Welcome You To Our Website. Your Account Has Been Created Successfully With The Email Id :- ${email}`,
            }
            */

            const mailOption = {
                from:`WeAndOurs HealthCare <${process.env.SENDER_EMAIL_SMT}>`,
                to:email,
                subject:`Welcom To 'WeAndOurs' Community`,
                html: `
                  <h1> Hello ${fullName}</h1>
                  <h2>Welcome to WeAndOurs HealthCare </h2>
                  <p>Enter the OTP  <b> ${OTP} </b> To Create Account With The Provided email: <strong>${email}</strong></p>
                  <p>Enjoy your experience 💖</p>
                  
                `,
            }

            //<img src=${'/Health.png'} alt="Health Is Wealth">


            const info = await transporter.sendMail(mailOption);
            console.log(`Mail Has been Sent With The message id :- ${info}, ${info.messageId}`); 

        }catch(error){
            console.log(`Error while Generating the mail ${error}, ${error.message}`);
            return res.json({success:false,message:"Error In Sending OTP to Patient's Email"});
        }



        // res.json({success:true,message:`A new Patient Has Been Registered Success Fully \n Please Update Your Profile`});
        res.json({success:true,message:`OTP Has Been Sent SuccessFully`});


    }catch(error){
        console.log(`Error In Signup End-Point of User (Patient) ${error}`);
        res.json({success:false,message:`Error In Signup End Point ${error}`});
    }
}
