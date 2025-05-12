window.onload=()=>{
    console.log('Script is running1');
    //autes oi treis grammes diabazoun to value pou exv merasei apo to link ths prvths selidas pou einai kai to id ths kathgorias
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');
    let usernameselidas;
    let sessionidselidas;
    let books;
    let lectures;
    console.log(value);
    let listwithidsulikou=[];
    let myHeader=new Headers();
    myHeader.append("Accept", "application/json");
    let init={
        method:"GET",
        headers:myHeader
    }

    fetch(`https://learning-hub-1whk.onrender.com/learning-items?category=${value}`,init)
    .then(response=> {
        if(!response.ok){//an kati lathos steile
            throw new Error('Δε μπόρεσα να λάβω τα δεδομένα'); 
        }
        return response.json();//alivs kane to JSON ths js gia poly eukolia
    })
    .then(data=>{
        //apothhkeuv ta ids gia na ftiajv katalhla handlers gia kathe koumpi tou sygkekrimenou ulikou
        for(item of data){
            listwithidsulikou.push(data.id);
        }



        let categories_books=data.filter(data=>data.type=="Book");//edv pairnv me to filter mono ta bblia
        categories_books=categories_books.map(item=>{
            let featureslist=item.features.split(";");
            let string_features="";
            featureslist.forEach(
                function(value){
                    string_features+=value+' --- '
                }
            )
            let item2=item;
            item2.features=string_features;
            return item2

            
        })
        books=categories_books;
        let categories_lectures=data.filter(data=>data.type=="Lecture");//edv pairnv me to filter mono ta lectures
        categories_lectures=categories_lectures.map(item=>{
            let featureslist=item.features.split(";");
            let string_features="";
            featureslist.forEach(
                function(value){
                    string_features+=value+' --- '
                }
            )
            let item2=item;
            item2.features=string_features;
            return item2

            
        })
        lectures=categories_lectures;
        const data2 = { categories_books,categories_lectures };
        const templateSource = document.getElementById('categoryscategory-template').innerHTML;
       const template = Handlebars.compile(templateSource);//ta bazei sto html
       const html = template(data2);//tou stelnei ta dedomena
       document.getElementById('content').innerHTML = html;
    }) 
    /*const buttons = document.querySelectorAll(".agora");
    console.log(buttons.length);
    buttons.forEach(button=>{
      let id=Number(button.value);
      alert(id)
      console.log(id); 
      button.addEventListener("click",(event)=>{
        event.preventDefault();//auto gia na mhn kanei refresh thn selida kai etsi na xanontai ta deodomena apo ton prvto server
        let myHeader=new Headers();//ara kanv munhma me header accept kai json dedomena tou stelnv
        myHeader.append("Content-Type", "application/json");
        let stoixeiaulikou;
        for(item of books){//pav na brv ta stoixeia tou ulikou ta opoia exv svsei se duo pinakes
            if(item.id==id){
                stoixeiaulikou=item;
            }
        }
        for(item of lectures){//pav na brv ta stoixeia tou ulikou ta opoia exv svsei se duo pinakes
            if(item.id==id){
                stoixeiaulikou=item;
            }
        }
        let init={
            method:"PUT",//post giati stelnv deodemna
            headers: myHeader,
            body:JSON.stringify({username:usernameselidas,sessionid:sessionid,stoixeia_ulikou:stoixeiaulikou})
        }
        fetch("http://localhost:4040/kalathi")
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
        })
      })
    })*/

    document.body.addEventListener("click", (event) => {
        // Έλεγχος αν το πατημένο στοιχείο έχει την κλάση "agora"
        if (event.target.classList.contains("agora")) {
            console.log(usernameselidas,sessionidselidas);
            const id = event.target.value;
            alert(id)
            let myHeader=new Headers();//ara kanv munhma me header accept kai json dedomena tou stelnv
            myHeader.append("Content-Type", "application/json");
            let stoixeiaulikou;
            for(item of books){//pav na brv ta stoixeia tou ulikou ta opoia exv svsei se duo pinakes
                if(item.id==id){
                    stoixeiaulikou=item;
                }
            }
            for(item of lectures){//pav na brv ta stoixeia tou ulikou ta opoia exv svsei se duo pinakes
                if(item.id==id){
                    stoixeiaulikou=item;
                }
            }
            let init={
                method:"PUT",//post giati stelnv deodemna
                headers: myHeader,
                body:JSON.stringify({username:usernameselidas,sessionid:sessionidselidas,stoixeia_ulikou:stoixeiaulikou})
            }
            console.log(sessionidselidas);
            fetch("http://localhost:4040/kalathi",init)
            .then(response=>response.json())
            .then(data=>{
                alert(data.message);
            })
            }
    });
    //kodikas oste na perimene na fortothei to dom 
    //otan patithei to koumpi ths klashs login-form
    /*
    console.log('Script is running2');
        // Get references to the form and input fields
        const loginForm = document.querySelector('.login-form'); //edo tou leei oti yparxei afto to pragma 
        const usernameInput = loginForm.querySelector('input[name="username"]');
        const passwordInput = loginForm.querySelector('input[name="password"]');
    
        // Add event listener to the form's submit event
        loginForm.addEventListener('submit', (event) => { 
            //edo tou leei oti file akou sto loginform pou exo ftiaksei kai syndeetai me to login-form
            //tou html esy tha ftiakseis ena event listener an patithei to submit
            // Prevent the form from actually submitting
            event.preventDefault();
    
            // Get the values from the input fields
            const username = usernameInput.value;
            const password = passwordInput.value;
    
            // Log the username and password to the console
            console.log('Username:', username);
            console.log('Password:', password);
        });
        //vazo se antikeimeno ta tous kodikous
        const credentials = {
            username: username,
            password: password
        };
        //kano post pros ton server 
//gia na ftiaksoume ton kdika prepei na egatasthsoume to node.js apo to site tou kai meta na kano npm install express uuid
//gia na katevaso afta pou xreiazomai gia na treksoun ola kai na ftiakso to server side

        // Use fetch to send a POST request to the server
        fetch('https://your-server.com/api/login', {
            method: 'POST',  // Method type
            headers: {
                'Content-Type': 'application/json'  // Set the content type as JSON
            },
            body: JSON.stringify(credentials)  // Send the credentials as a JSON string
        })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            if (data.success) {
                console.log('Authentication successful:', data.message);
            } else {
                console.log('Authentication failed:', data.message);
            }
        })
        .catch(error => {
            console.error('Error during authentication:', error);
        });
*/

    
let submit=document.getElementById("submit");

   submit.addEventListener("click",(event)=>{
    event.preventDefault();//auto gia na mhn kanei refresh thn selida kai etsi na xanontai ta deodomena apo ton prvto server
    //pairnv tis times pou ebale o xrhsths
    let username_form=document.getElementById("username").value.trim();
    let pass=document.getElementById("password").value.trim();
    
   //dhmiourgv aithma kai mesa sthn init bazv body ena json arxeio me ta credentials
    let myHeader=new Headers();//ara kanv munhma me header accept kai json dedomena tou stelnv
    myHeader.append("Content-Type", "application/json");
    let init={
        method:"POST",//post giati stelnv deodemna
        headers: myHeader,
        body:JSON.stringify({username:username_form,password:pass})
    }
    console.log(pass,username,init.body);
    fetch("http://localhost:3030/login",init)//zhtav apo ton server mou loipon
    .then(response=>response.json())//pairnv apanthse se json ara thn kanv json
    .then(data=>{//pairnv to json deomena mou 
        console.log(data);
        if(data.success){//an perases kane ena alert
            alert(data.sessionId);
            usernameselidas=username_form;
            let apotelesmata="Credentials are correct";
            sessionidselidas=data.sessionId;//to apothhkeuv
            const data3 = { apotelesmata };
            const templateSource2 = document.getElementById('apotelesmata-template').innerHTML;
            const template2 = Handlebars.compile(templateSource2);//ta bazei sto html
             const html = template2(data3);//tou stelnei ta dedomena
            document.getElementById('content2').innerHTML = html;
        }
        else{
            let apotelesmata="Credentials are incorrect";
            const data3 = { apotelesmata };
            const templateSource2 = document.getElementById('apotelesmata-template').innerHTML;
            const template2 = Handlebars.compile(templateSource2);//ta bazei sto html
             const html = template2(data3);//tou stelnei ta dedomena
            document.getElementById('content2').innerHTML = html;
        }
        alert(data.message);
    })
   })

  /* username.addEventListener("change",()=>{

   })*/

    document.getElementById('kalathi').addEventListener("click",()=>{
        console.log(usernameselidas,sessionidselidas)
        window.location.href=`cart.html?username=${usernameselidas}&sessionId=${sessionidselidas}`;
    })

}