const Userdata=require('../models/userdata');

const next = require("mongodb");
exports.user_copy_data= function (req, res) {
    console.log("Copy api called...");
    var codegeneration='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
    var s1="";
    for(var i=0;i<6;i++)
    {
        var t1=Math.floor(Math.random()*52);
        s1=s1+codegeneration[t1];
    }
    let info = new Userdata(
        {
            user_id:s1,
            user_text_data:req.body.user_text_data
        }
    );
    info.save(function (err) {
        if (err) {
            return next(err);
        }
        console.log(info);
        console.log(info.user_text_data.length);
        res.redirect('/message/'+info.user_id);
    });   
     
        
   
};
var msg=`<!DOCTYPE html>
<html>
<head>
	<title>Message</title>
    <style> 
    body{
        background-color: darkslategrey;
        margin: 0px;
        padding: 0px;
    }
    
    h1,p,a{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color:black;
        background-color:transparent ;
        font-size:40px ;
        text-align: center;
        height: 50px;
        width: auto;
        margin: 0px;
    }
		a{
			text-decoration: none;
		}
		a:hover{
			color: red;
        }
        textarea{
                    
            color: black;
            font-size: 25px;
            font-weight: 400px;
            font-family:  Calibri, 'Trebuchet MS', sans-serif;
            margin-top: 0px;
            width:1445.6px;
            height: 400px;
            border-color: transparent;
            border-radius: 3px;
            background-color: rgb(185,179,175);
            padding: 20px;
        }
    </style> 
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<center>
		<p>Message</p> 
        <a href="/">Home</a>
        
        <textarea cols="100" rows="10" disabled id="datanot">`;
var msg1=`</textarea>
	</center>
</body>
</html>`;
var error1=`<!DOCTYPE html>
<html>
<head>
    <title>ERROR</title>
    <style>

    body{
        background-color: darkslategrey;
        margin: 0px;
        padding: 0px;
    }
    
    h1,p,a{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        color:black;
        background-color:transparent ;
        font-size:40px ;
        text-align: center;
        height: 50px;
        width: auto;
        margin: 0px;
    }
    a{
        text-decoration: none;
    }
    a:hover{
        color: red;
    }
    </style>
</head>
<body>
	<center>
		<h1>Message Not Found</h1><hr>
		<p>Use a valid Link</p>
		<a href="/">Home</a>
	</center>
</body>
</html>`;
exports.getData=function(req,res){


    console.log("Get data api called..");
    var id1=req.params.id;
    Userdata.find({user_id:id1},(err,data)=>{
        if(data.length==0){
            res.send(error1);
        }
        else{
            res.send(msg+data[0].user_text_data+msg1);
        }
    });
};





