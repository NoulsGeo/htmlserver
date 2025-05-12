const express=require('express');
const app=express();
const cors=require('cors');//to kanv giati o browzer blockare to aithma giati htan allo orig
let ids=[]
let kalathi=new Map();
const port=4040;
app.use(express.json());//auto edv einai gia na mporv na epejergastv dedomena json 
app.use(cors()); //auto edv mou efage polu vra leei auto epitrepei polla origins giati ta mplokare gia logous asfaleias o browser 
app.put('/kalathi',(req,res)=>{//bazv handler gia put sto kalathi
    console.log("kalese akalthi")
    //pairnv apo to request to username psession id kathos kai ta stoizxeia tou ekpaideutikou ulikou
    const stoixeiaulikou=req.body.stoixeia_ulikou;
    const username=req.body.username;
    const sessionid=req.body.sessionid;
    //ftiaxnv aithma na steilv ston allon server na dv an ontvs yparxei sessionid tou xrhsth
    let myHeader=new Headers();//ara kanv munhma me header accept kai json dedomena tou stelnv
    myHeader.append("Content-Type", "application/json");
    let init={
        method:"POST",//post giati stelnv deodemna
        headers: myHeader,
        body:JSON.stringify({username:username,id:sessionid})
    }
    console.log(username,sessionid);
    //stelnv ston server
    fetch("http://localhost:3030/hassession",init)
    .then(response=>response.json())
    .then(data=>{
        //an ola kala
        if(data.success){
            ids.push(sessionid);
            //bale sto kalathi tou xrhsth (an den eixe janakanei prosthese tn sto map) to uliko an uparxei hdh steile katallhlo munhma
            if(kalathi.has(username)){
                for(item of kalathi.get(username) ){
                    if(item.id==stoixeiaulikou.id){//an uparxei hdh dhladh mesa sthn listatou sugkekrimenou user sto kalathi toy
                        return res.status(404).json({success:false,message:"to antikeimeno exei hdh mpei sto kalathi"})
                    }
                }
                kalathi.get(username).push(stoixeiaulikou);
            }
            else{
                kalathi.set(username,[stoixeiaulikou]);
            }
            console.log(kalathi);
            //steile pisv oti ola kala mphke to uliko
            res.status(200).json({success:true,message:data.message});
        }
        //allivs den eixes kanei session ara munhma lathous
        else{
            return res.status(404).json({success:false,message:data.message});
        }
    })
})

app.post('/kalathi',(req,res)=>{
    
    console.log("prospatheiaaaa")
    let SessionIdLOCAL=req.body.sessionId;
    console.log(SessionIdLOCAL);
    const username=req.body.username;


    let myHeader=new Headers();//ara kanv munhma me header accept kai json dedomena tou stelnv
    myHeader.append("Content-Type", "application/json");
    let init={
        method:"POST",//post giati stelnv deodemna
        headers: myHeader,
        body:JSON.stringify({username:username,id:SessionIdLOCAL})
    }
    //console.log(username,sessionid);
    //stelnv ston server
    fetch("http://localhost:3030/hassession",init)
    .then(response=>response.json())
    .then(data=>{
        //an ola kala
        if(data.success){
            for(let id of ids){
                if(id==SessionIdLOCAL){
                    if(kalathi.get(username)!=undefined){
                        let totalcost=0;
                        for(let item of kalathi.get(username)){
                            totalcost+=item.cost;
                        }
                        console.log(kalathi.get(username))
                        return res.status(200).json({success:true,agores:kalathi.get(username),totalcost:totalcost,message:data.message});
                       
                    }
                }
            }
        }
        //allivs den eixes kanei session ara munhma lathous
        else{
            return res.status(404).json({success:false,agores:[],message:data.message});
        }
    })
    
})


app.delete('/kalathisitem',(req,res)=>{
    const items_id=req.body.id;
    const username=req.body.username;//edv gia asfaleia an htan kanonikh efarmogh mporei na zhtagame kai to session id 

    if(kalathi.get(username)!=undefined){//an uparxei mesa sto kalathi to antikeimeno 
        for(let i=0;i<kalathi.get(username).length ;i++){//bres to kai bgalto apo thn lista 
            if(kalathi.get(username)[i].id==items_id){

                kalathi.get(username).splice(i,1);//to splice thelv edv gia na mhn mhnei undefinmed sthn thesh tou
                console.log(kalathi.get(username))
                let totalcost=0;
                for(let item of kalathi.get(username)){
                    totalcost+=item.cost;
                    }
                return res.status(200).json({success:true,message:"to stoixeio afairethhke",totalcost:totalcost})
            }
        }
    }
    console.log("kati phge lathos")
    return res.status(404).json({success:false,message:"to stoixeio den brethhke"})
})



app.listen(port);