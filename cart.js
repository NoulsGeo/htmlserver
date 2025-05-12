// This file will handle fetching and passing data to the HTML

// Get parameters from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sessionId = urlParams.get('sessionId');
const username = urlParams.get('username');

// Initialize necessary headers and request options
let myHeader = new Headers();
myHeader.append("Content-Type", "application/json");

const init = {
    method: "POST",
    headers: myHeader,
    body: JSON.stringify({ username: username, sessionId: sessionId })
};

// Global variable to store cart items
let cartitemslol = [];

function remove(id){
//auto gia ta koumpia afairesh

        console.log("mphka sto click event listener");
            console.log("mphka kai sthn afairesh");
            alert("remove element " + id);
            let myheader=new Headers();
            myheader.append("Content-Type", "application/json");
            const init2={
                method:"DELETE",
                headers:myheader,
                body:JSON.stringify({username:username,id:id})
            };
            fetch("http://localhost:4040/kalathisitem",init2)
            .then(response=>response.json())
            .then(data=>{
                alert(data.message)
                if(data.success){
                    document.getElementById("totalcost").innerHTML=data.totalcost
                }
            })
        


//telos gia koumpia

}






// Function to fetch cart items from the server
async function fetchCartItems() {
    try {
        const response = await fetch("http://localhost:4040/kalathi", init);

        if (!response.ok) {
            throw new Error('Network response was not ok');
            return cartitemslol;
        }

        const data = await response.json();
        cartitemslol = data;  // Store fetched data
        alert(data.message)
        return {agores:cartitemslol.agores,totalcost:cartitemslol.totalcost};
    } catch (error) {
        console.error('Fetch error:', error);
        cartitemslol = [];  // If error occurs, fallback to empty array
        return {agores:cartitemslol,totalcost:0};
    }
}




// Expose the functions and data to the window object for later access in HTML
window.fetchCartItems = fetchCartItems;
window.cartitemslol = cartitemslol;

