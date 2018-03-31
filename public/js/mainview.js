window.onload = () => {
    let u = 0;
    var x = document.createElement("Button");
    x.id= "button1";
    x.innerHTML = "make box";
    x.var1 = u;
    x.onclick = makeBox;
    document.body.appendChild(x);   
}

let count = 0;
function makeBox(s) {
    console.log(this.var1);
    console.log("made 1 box");
    var y = document.createElement("div");
    y.id = count;
    y.className = "box";
   // y.innerHTML=
    //;




    count++;
    document.body.appendChild(y);   
}

