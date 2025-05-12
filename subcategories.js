window.onload=()=>{
    //autes oi treis grammes diabazoun to value pou exv merasei apo to link ths prvths selidas pou einai kai to id ths kathgorias
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');
    console.log(value); //edo einai to id tou subcategory

    let myHeader=new Headers();
    myHeader.append("Accept", "application/json");
    let init={
        method:"GET",
        headers:myHeader
    }
    //learning-items?subcategory={id} tou dino to id tou subcategory oste na mou gyrisei oti exei gia afto
    fetch(`https://learning-hub-1whk.onrender.com/learning-items?subcategory=${value}`,init)
    .then(response=> {
        if(!response.ok){//an kati lathos steile
            throw new Error('Δε μπόρεσα να λάβω τα δεδομένα'); 
        }
        return response.json();//alivs kane to JSON ths js gia poly eukolia
    })
    //edo kano akrivos oti ekan kai gia to kategories dld pairno ta dedomena kai ta filtraro oso pros ta vivlia
    
    .then(data=>{
        let subcategories_books=data.filter(data=>data.type=="Book");//edv pairnv me to filter mono ta bblia
        subcategories_books=subcategories_books.map(item=>{
            let featureslist=item.features.split(";");
            featureslist=featureslist.map(phrase=>{//pairnv kathe feauture kai ftiaxnv mia lista pou exei antikeimena kathe enatikeimeno exei to onoma tou feature kai to value tou kai meta sthn html ta bazv se ena pinka me duo sthles
                let item1={};
                let list1=phrase.split(":");
                item1.feature=list1[0];
                item1.value=list1[1];
                return item1;
            })
            console.log(featureslist);
            let item2=item;
            item2.features=featureslist; //edo kano add ta features me morfh listas
            return item2

            
        })
        let subcategories_lectures=data.filter(data=>data.type=="Lecture");//edv pairnv me to filter mono ta lectures
        subcategories_lectures=subcategories_lectures.map(item=>{
            let featureslist=item.features.split(";");
            featureslist=featureslist.map(phrase=>{
                let item1={};
                let list1=phrase.split(":");
                item1.feature=list1[0];
                item1.value=list1[1];
                return item1;
            })
            console.log(featureslist);
            let item2=item;
            item2.features=featureslist; //edo kano add ta features me morfh listas
            return item2

            
        })

        //me afto to kodika ta stelno sto html arxeio gia na emfanistoun
        const data2 = { subcategories_books,subcategories_lectures };
        const templateSource = document.getElementById('categoryscategory-template').innerHTML;
       const template = Handlebars.compile(templateSource);//ta bazei sto html
       const html = template(data2);//tou stelnei ta dedomena
       document.getElementById('content').innerHTML = html;
    }) 
}