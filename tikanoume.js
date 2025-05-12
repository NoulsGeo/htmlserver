
window.onload = function () {

    let myHeader=new Headers();
    myHeader.append("Accept", "application/json");
    let init={
        method:"GET",
        headers:myHeader
    }
    fetch('https://learning-hub-1whk.onrender.com/categories',init)//fetch me url server kai to /categories gia na jerei kai init antikeimeno me Get kai tou lev na gyrisei json gyrnaei promise
    .then(response=> {
            if(!response.ok){//an kati lathos steile
                throw new Error('Δε μπόρεσα να λάβω τα δεδομένα'); 
            }
            return response.json();//alivs kane to JSON ths js gia poly eukolia
    })
    .then(data=>{//pare to JSON san pinaka data
        let categoriesWithSubcategories = [];

        for(let j=0;j<data.length;j++){
            fetch(`https://learning-hub-1whk.onrender.com/categories/${data[j].id}/subcategories`, init)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Δε μπόρεσα να λάβω τις υποκατηγορίες για την κατηγορία ${category.title}`);
                }
                return response.json();
            })
            .then(subcategoriesdata=>{
                let subs=[];//ftianv mia lista gia na mpoun ola ta subcategories
                for(let i=0;i<subcategoriesdata.length;i++){
                    let item2={//ftiaxnv to item pou tha mpei gia thn ypokathgoria me tis plhrofories 
                        //id: ακέραιος, μοναδικό αναγνωριστικό της υποκατηγορίας,
                    //o category_id: ακέραιος, αναγνωριστικό της κατηγορίας στην οποία εντάσσεται η υποκατηγορία,
                    //o title: τίτλος της υποκατηγορίας,
                    id:subcategoriesdata[i].id,    
                    category_id:subcategoriesdata[i].category_id,
                    name:subcategoriesdata[i].title
                    } //ftiaxthke to item ths ypokathgorias
                    subs.push(item2);//ta bazv mesa gia thn sugekrimenh ypokathgoria
                }
                let item1={//ftiaxnv to item pou tha mpei gia thn kathgoria me tis plhrofories
                    name:data[j].title,
                    image:data[j].img_url,
                    subcategories:subs, //edo ara exo mesa sto kathe item kathgoria kai mia lista ton items ths ypokathgorias kai oxi apla ton titlo
                    id:data[j].id
                }
                categoriesWithSubcategories.push(item1);
                if(categoriesWithSubcategories.length===data.length){//otan ftaseis sto teleutaio anebase ta sto html arxeio
                    console.log(categoriesWithSubcategories);
                    categoriesWithSubcategories.sort((a,b)=>a.id-b.id);//tis tajhnomo gia na mhn allazoun sunexeia thesh
                    const data2 = { categoriesWithSubcategories };
                    const templateSource = document.getElementById('category-template').innerHTML;
                    const template = Handlebars.compile(templateSource);//ta bazei sto html
                    const html = template(data2);//tou stelnei ta dedomena
                    document.getElementById('content').innerHTML = html;
                }
            })
        }
        
       
    }


    ).catch(error => {
        console.error('Σφάλμα κατά την ανάκτηση των δεδομένων:', error);
    });
    
   
  };

  