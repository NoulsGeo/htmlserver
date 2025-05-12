window.onload=()=>{
    console.log("den mphka")
document.body.addEventListener("click", (event) => {
    console.log("mphka")
    if (event.target.classList.contains("remove")) {
        console.log("mphka kai mphka")
        console.log(usernameselidas,sessionidselidas);
        const id = event.target.value;
        alert("remove element "+id)
        
        }
})
}