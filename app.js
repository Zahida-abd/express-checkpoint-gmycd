const express=require('express');
const app=express(); 

app.set('view engine','pug');
app.set('views','./views'); 

app.use((req, res, next)=>{
        const date=new Date();
        let jour=date.toDateString().slice(0,3);
        let heure=date.toTimeString().slice(0,2);
        let state=false;
        switch(jour){
            case 'Mon':
            case 'Tue':
            case 'Wed':
            case 'Thu':
            case 'Fri': state=true;
        }
        if(state===true && heure>=9 && heure<=17){
            next();

        } else res.end("<h2>Le site est hors service</h2>");
        
    

        
})

app.get('/', (req, res)=>{
    res.render("home");
})
app.get("/contactus", (req,res)=>{
    res.render("contactus");

})
app.get("/ourservice", (req,res)=>{
    res.render("ourservice")

})



const port=3000;
app.listen(port, (err)=>{
    if(err) console.log("echec de la connexion");
    else console.log("le serveur est en marche "); 
})