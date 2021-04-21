function onLoad(){
    comprobarUsuarios();
    if(sessionStorage.getItem("log")=='false'||sessionStorage.getItem("log")==null){
        mostrarlogin();
    }else{
        mostrarlogout();
    }
    if(sessionStorage.getItem("Producto")===null){
        loadProducto();
    }
    if(sessionStorage.getItem("Persona")===null){
        loadPersona();
    }
    if(sessionStorage.getItem("Entidad")===null){
        loadEntidad();
    }
    mostrar()
}

function mostrarlogin(){
    let hi = document.getElementById("login")
    hi.innerHTML = `<form>
    <label for="userName">Username:</label><br>
    <input type="text" id="userName"><br>
    <label for="userPw">Password:</label><br>
    <input type="password" id="userPw"><br><br>
    <button onclick="login()">Login</button>
</form>`; 
}

function mostrarlogout(){
    let hi = document.getElementById("login");
    hi.innerHTML = "<button onclick = 'logout()'>Logout</button>";
    crearboton();
}

function aniadir(){
    event.preventDefault();
    let elemJSON = document.getElementById('elemJSON').value;
    let name = document.getElementById('name').value;
    let fechai = document.getElementById('fechai').value;
    let fechad = document.getElementById('fechad').value;
    let img = document.getElementById('img').value;
    let wiki = document.getElementById('wiki').value;
    let personas = document.getElementById('personas').value;
    let entidades = document.getElementById('entidades').value;
    addElem(elemJSON, name, fechai, fechad, img, wiki, personas, entidades);
    window.location.href = '../html/index.html';
}

function addElem(elemJSON, name, fechai, fechad, img, wiki, personas, entidades){
    let listaElem = sessionStorage.getItem(elemJSON);
    listaElem = JSON.parse(listaElem);
    let nuevoElem = {
        "Nombre": name,
        "Fecha de Nacimiento": fechai,
        "Fecha de Defunción": fechad,
        "Imagen": img,
        "Wikipedia": wiki,
        "Tipo": elemJSON
    }
    if(elemJSON == "Productos"){
        nuevoElem.Personas = personas;
        nuevoElem.Entidades = entidades;
    }
    if(elemJSON == "Entidades"){
        nuevoElem.Personas = personas;
    }
    listaElem.push(nuevoElem);
    sessionStorage.setItem(elemJSON,JSON.stringify(listaElem));
}

function comprobarUsuarios(){
    if(sessionStorage.getItem("x")===null){
        sessionStorage.setItem("x","x");
    }
    if(sessionStorage.getItem("y")===null){
        sessionStorage.setItem("y","y");
    }
    if(sessionStorage.getItem("z")===null){
        sessionStorage.setItem("z","z");
    }
}

function loadProducto(){
    let obj = [];
    obj = JSON.stringify(obj);
    sessionStorage.setItem("Producto", obj);
    addElem("Producto", "XML", "12-09-1999", "", "https://upload.wikimedia.org/wikipedia/commons/9/9d/Xml_logo.svg", "https://es.wikipedia.org/wiki/Extensible_Markup_Language");
    addElem("Producto", "Java", "xx-xx-1995", "", "https://upload.wikimedia.org/wikipedia/de/e/e1/Java-Logo.svg", "https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)");
    addElem("Producto", "C", "xx-xx-1972", "", "https://upload.wikimedia.org/wikipedia/commons/3/35/The_C_Programming_Language_logo.svg", "https://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n)");
}

function loadPersona(){
    let obj = [];
    obj = JSON.stringify(obj);
    sessionStorage.setItem("Persona", obj);
    addElem("Persona", "James Gosling", "19-05-1955", "", "https://upload.wikimedia.org/wikipedia/commons/0/00/James_Gosling_2005.jpg", "https://es.wikipedia.org/wiki/James_Gosling");
    addElem("Persona", "Dennis Ritchie", "09-09-1941", "12-10-2011", "https://upload.wikimedia.org/wikipedia/commons/2/23/Dennis_Ritchie_2011.jpg", "https://es.wikipedia.org/wiki/Dennis_Ritchie");
}

function loadEntidad(){
    let obj = [];
    obj = JSON.stringify(obj);
    sessionStorage.setItem("Entidad", obj);
    addElem("Entidad", "Sun Microsystems", "xx-xx-1982", "27-01-2010", "https://upload.wikimedia.org/wikipedia/commons/8/8b/Sun-Logo.svg", "https://es.wikipedia.org/wiki/Sun_Microsystems", "pers1, pers2, pers3");
    addElem("Entidad", "Bell Labs", "xx-xx-1925", "", "https://upload.wikimedia.org/wikipedia/commons/c/c3/Nokia_Bell_Labs_logo.svg", "https://es.wikipedia.org/wiki/Bell_Labs");
}

function login() {
    let userName = document.getElementById('userName').value;
    let userPw = document.getElementById('userPw').value;

    if(userName=== "x" && userPw=== "x") {
        sessionStorage.setItem('log', true);
        mostrar();
    }else if(userName=== "y" && userPw=== "y") {
        sessionStorage.setItem('log', true);
        mostrar();
    }else if(userName=== "z" && userPw=== "z") {
        sessionStorage.setItem('log', true);
        mostrar();
    }else{
        sessionStorage.setItem('log', false);
        mostrar();
    }
    if(sessionStorage.getItem('log')=='true'){
        let hi = document.getElementById("login");
        hi.innerHTML = "<button onclick = 'logout()'>Logout</button>";
        crearboton()
    }
    location.reload();
}
function logout(){
    sessionStorage.setItem('log',false);
    let hi = document.getElementById("login");
    hi.innerHTML = `<form>
        <label for="userName">Username:</label><br>
        <input type="text" id="userName"><br>
        <label for="userPw">Password:</label><br>
        <input type="password" id="userPw"><br><br>
        <button onclick="login()">Login</button>
    </form>`;
    destruirboton();
}

function mostrar(){
    let listap = sessionStorage.getItem("Persona");
    listap = JSON.parse(listap);
    let listapr = sessionStorage.getItem("Producto");
    listapr = JSON.parse(listapr)
    let listae = sessionStorage.getItem("Entidad");
    listae = JSON.parse(listae);
    let i = 0;
    i = imprimirlista(listap, i);
    i = imprimirlista(listapr, i);
    i = imprimirlista(listae, i);
}

function imprimirlista(lista, i){
    let p = document.getElementById("elemento");
    let j = 0;
    for(pers of lista){
        var newDiv = document.createElement("div");
        let newContent="";
        for(atr in pers){
            if(atr=="Nombre"){
                newContent += `<div id="elemento${i}"><p>Nombre:${pers[atr]}</p>`;
            }else if(atr=="Fecha de Nacimiento"){
                newContent += `<p>Fecha de Nacimiento:${pers[atr]}</p>`;
            }else if(atr=="Fecha de Defunción"){
                newContent += `<p>Fecha de Defunción o Disolucion:${pers[atr]}</p>`;
            }else if(atr=="Imagen"){
                newContent += `<img src="${pers[atr]}" width="100" height="100"><br>`;
            }else if(atr=="Wikipedia"){
                newContent += `<a href= "${pers[atr]}">Enlace a Wikipedia</a><br></div>`;
            }
            newDiv.innerHTML=newContent;
        }
        i++;
        j++;
        p.appendChild(newDiv);
        console.log("Antes del if");
        if(sessionStorage.getItem('log')=='true'){
            console.log("Entro al if");
            p.innerHTML += `<button onclick="eliminarobjeto(this,${i})">Eliminar elemento</button>`;
        }
    }
    return i;
}

function eliminarobjeto(obj,i){
    console.log("Entro a la funcion");
    let temp = document.getElementById(`elemento${i-1}`);
    temp.remove();
    obj.remove();
}

function crearboton(){
    let hi = document.getElementById("boton-crear");
    hi.innerHTML = `<button onclick="location.href = '../html/creaModiElem.html';">Crear elemento nuevo</button>`;
}

function destruirboton(){
    let hi = document.getElementById("boton-crear");
    hi.innerHTML = ``;
}