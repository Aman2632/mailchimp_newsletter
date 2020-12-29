const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const mailid= req.body.Email;
    
    const data = {
        members: [
            {
                email_address: mailid,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/f1172683f7";
    
    const options = {
        method: "POST",
        auth: "astn:478fa1ef7a1708b0c419d876e53ecfbe-us7"
    };
    
    const request = https.request(url,options,function(response){
        
        if(response.statusCode==200){
            res.sendFile(__dirname + "/success.html")
        }
        else res.sendFile(__dirname + "/failure.html")
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    
    request.write(jsonData);
    request.end();
    
    
    console.log(fName);
    //res.send();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Your server spinning on port 3000");
})

//1ae361c94628b8bb9f66b8c904ed2b4a-us7
//f1172683f7