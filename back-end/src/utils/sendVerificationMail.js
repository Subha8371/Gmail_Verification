const createMailerTransport=require("./createMailerTransporter");


exports.sendVerificationMail=(user)=>{

      // Generate a token with a short expiration time
    //   const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    const verificationLink = `http://localhost:3000/verify?token=${user.emailToken}`;

    const transporter=createMailerTransport.createTransporter();

    const mailOptions={
        from: `"BlueHorse👻" <${process.env.YOUR_EMAIL}>`, // sender address
        to:user.email, // list of receivers
        subject: "Verify your email...", // Subject line
        text: "Hello world?", // plain text body
        html:`<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`, // html body
    }

    transporter.sendMail(mailOptions,(error,info)=>{
       if(error){
        console.log(error)
       }else{
        console.log("verification email sent")
       }
      });
}