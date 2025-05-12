const { v4: uuidv4 } = require('uuid');
const express=require('express');//xrhsimopoiv thn express
const app=express();
const cors=require('cors');//to kanv giati o browzer blockare to aithma giati htan allo origin
const port=3030;
//let map=new Map();//lejiko me username passwords
//map.set("noularos","lol123");
let users_list=[{name:"noularos",pass:"lol123"}];//lista me credentials
let users_sessionsids=[];
app.use(express.json());//auto edv einai gia na mporv na epejergastv dedomena json 
app.use(cors()); //auto edv mou efage polu vra leei auto epitrepei polla origins giati ta mplokare gia logous asfaleias o browser 
app.post('/login',(req,res)=>{//kai jekinav na kanv kvdika gia diaxeirhsh credential
    //apo to json req pairnv ta credential pou perase o client
    let name =req.body.username;
    let pass=req.body.password;
    if(name===undefined||pass===undefined||name===""||pass===""){
        return res.status(404).json({success:false,message:"undefined somthing went wrong"})
    }
    console.log(name,pass);
    for(item of users_list){
        if(item.name===name && item.pass===pass){
            console.log(200);
            console.log('Login successful');  
            const sessionId=uuidv4();
            users_sessionsids.push({id:sessionId,username:name});
            return res.status(200).json({ success: true, message: "Login successful",sessionId:sessionId });//steile enan status 200 kai ena json oti succes true kai ena munhma 
        }
    }
    //an loipon exeis auto to jeugos
    /*if(map.has(name)){
        if(map.get(name)==pass){
            console.log(200);
            console.log('Login successful');  
            const sessionId=uuidv4();
            return res.status(200).json({ success: true, message: "Login successful",sessionId:sessionId });//steile enan status 200 kai ena json oti succes true kai ena munhma 
        }
    }*/
    //alivs steile 200 alla me lathos dedomena
    console.log(400);
    return res.status(200).json({ success: false, message: "NOT CORRECT CREDENTIAlS" });  // Χρήστης δεν βρέθηκε
    
})
// auto to handler einai otan stelnei o server gia to kalthi gia na dei an uparxei sessionid
app.post('/hassession',(req,res)=>{
    //pare ta stoixeia tou xrhsth
    console.log("einai sundedemenos????");
    const username=req.body.username;
    const sessionid=req.body.id;
    console.log(username,sessionid);
    //den an uparxei stn lista me tous energous xrhstes
    for(item of users_sessionsids){
        if(item.id==sessionid&&username==item.username){
            //steile mynhma
            console.log("ola kala")
            return res.json({success:true,message:"yparxei energos xrhsths ola kala"})
        }
    }
    //steile mynhma
    return res.json({success:false,message:"gia epejergasiasto kalathi agorvn prepei na ginei sundesh sthn uphresia"})
})
app.listen(port);
