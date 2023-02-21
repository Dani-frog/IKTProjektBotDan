var jatekTer = document.getElementById("jatekter");
var balPanel = document.createElement("div");
var kartyaBox = document.createElement("div");
var pontokBox = document.createElement("div");
var tabla = document.createElement("div");
var korokBox = document.createElement("div");

var Kartyak =[
{id:1,value:-3,sign:''},
{id:2,value:2,sign:''},
{id:3,value:5,sign:''},
{id:4,value:4,sign:''},
{id:5,value:3,sign:''},
{id:6,value:0,sign:'pap'},
{id:7,value:-6,sign:''},
{id:8,value:6,sign:''},
{id:9,value:0,sign:'taliga'},
{id:10,value:2,sign:''},
{id:11,value:0,sign:'hegy'},
{id:12,value:-5,sign:''},
{id:13,value:4,sign:''},
{id:14,value:0,sign:'sarkany'},
{id:15,value:5,sign:''},
{id:16,value:6,sign:''},
{id:17,value:-4,sign:''},
{id:18,value:1,sign:''},
{id:19,value:-1,sign:''},
{id:20,value:-2,sign:''},
{id:21,value:1,sign:''},
{id:22,value:3,sign:''},
{id:23,value:0,sign:'hegy'},
]


var Tornyok = [
{id:1,color:"kek",value:1},
{id:2,color:"kek",value:2},
{id:3,color:"kek",value:3},
{id:4,color:"kek",value:4},
{id:5,color:"piros",value:1},
{id:6,color:"piros",value:2},
{id:7,color:"piros",value:3},
{id:8,color:"piros",value:4},
{id:9,color:"sarga",value:1},
{id:10,color:"sarga",value:2},
{id:11,color:"sarga",value:3},
{id:12,color:"sarga",value:4},
{id:13,color:"zold",value:1},
{id:14,color:"zold",value:2},
{id:15,color:"zold",value:3},
{id:16,color:"zold",value:4},
]

var cellak = [
    {/*id:1,
    type:"",//k,v
    {/*kartya v vár tartalma*/ }

]

function JatekterBetoltes()
{
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(balPanel);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);
/*
    kartyaBox.innerHTML = "kartyaBox";
    pontokBox.innerHTML = "pontokBox";
    //tabla.innerHTML = "tabla";
    korokBox.innerHTML = "korokBox";
    */
}
function JatekterElrendezes()
{
    balPanel.id = "balpanel";
    kartyaBox.id = "kartyabox";
    pontokBox.id = "pontokbox";
    tabla.id = "tabla";
    korokBox.id = "korokbox";
}
function TablaGeneralas()
{
    var k = 1;
    for(var i = 0; i < 5; i++)
    {
        var sorDiv = document.createElement("div");
        sorDiv.classList += " sordiv";
        for(var j = 0; j<6;j++)
        {
            var kep = document.createElement("img");
            var oszlopDiv = document.createElement("div");
            oszlopDiv.classList += " oszlopdiv";
            oszlopDiv.id = k;
            cellak[k-1].id=k;
            k++;
            sorDiv.appendChild(oszlopDiv);
        }
        tabla.appendChild(sorDiv);
    }
}
function TablaFeltoltes(db)
{
    // tölts be egy képek az első cellába
    // véletlenszerűen válassz ki egy képet és tedd az első cellába
    // véletlen helyre helyezd el a véletlen kiválasztott képet
    // paraméter segítségével megadott darabszámú képet helyezz el, véletlen helyre
    // Generálja ki a 23 képet a 30 helyre véletlenszerűen,
    // a maradékra pedig véletlen tornyokat tegyen.
    // csak egy kártyát generáljon ki
    
    var ht = new Array();
    var laptomb = new Array();
    var kepid = new Array();
    for(var i = 0; i< db;i++)
    {
        
        var kep = document.createElement("img");
        var lapszam = Math.floor(Math.random()*23+1);
        var velcella = Math.floor(Math.random()*30+1);

        while(kepid.includes(lapszam))
        {
            lapszam = Math.floor(Math.random()*23+1);
        }
        kep.src = "img/Lapok/"+lapszam+".jpg";
        kepid.push(lapszam);
        cellak[i-1]

        while(ht.includes(velcella))
        {
            velcella = Math.floor(Math.random()*30+1);
        }

        laptomb[velcella-1] = lapszam;
        var cella = document.getElementById(velcella);
        ht.push(velcella);
        
        cella.appendChild(kep);
    }
    var tt = new Array("kek","piros","sarga","zold");
    for(var i = 0;i< 7;i++)
    {
        var kep = document.createElement("img");
        var toronyszam = Math.floor(Math.random()*4+1);
        kep.src = "img/tornyok/"+tt[Math.floor(Math.random()*4+1)-1]+"/"+toronyszam+".png";
        var velcella = Math.floor(Math.random()*30+1);
        while(ht.includes(velcella))
        {
            velcella = Math.floor(Math.random()*30+1);
        }
        
        laptomb[velcella-1] = "t"+toronyszam;
        var cella = document.getElementById(velcella);
        ht.push(velcella);
        cella.appendChild(kep);
    }

    var sorErtekek = SorErtek(laptomb);
    var oszlopErtekek = OszlopErtek(laptomb);
    console.log(sorErtekek);
    console.log(oszlopErtekek);
}

function OszlopErtek(laptomb)
{
    var lapertek = [-3,2,5,4,3,0,-6,6,0,2,0,-5,4,0,5,6,-4,1,-1,-2,0,3,1];
    var set = new Array();
    var ans = 0;
    for(var i = 0;i<6;i++)
    {
        ans = 0;
        for(var j = 0;j<30;j+=6)
        {
            
            let ertek = laptomb[i+j];
            if(ertek[0]=="t"){
                //console.log("TORONY\nérték:"+ertek[1])
                ans+=parseInt(ertek[1]);
            }
            else{
                //console.log("LAP\nérték:"+(lapertek[ertek-1]))
                ans +=parseInt(lapertek[ertek-1]);
            }
            //console.log("ANS:"+ans)
        }
        set.push(ans);
        //console.log("PUSH:"+ans)
    }
    return set;
}
function SorErtek(laptomb)
{
    var lapertek = [-3,2,5,4,3,0,-6,6,0,2,0,-5,4,0,5,6,-4,1,-1,-2,0,3,1];
    var set = new Array();
    var ans = 0;
    for(var i = 0;i<30;i+=6)
    {
        ans = 0;
        for(var j = 0;j<6;j++)
        {
            let ertek = laptomb[i+j];
            if(ertek[0]=="t"){
                //console.log("TORONY\nérték:"+ertek[1])
                ans+=parseInt(ertek[1]);
            }
            else{
                //console.log("LAP\nérték:"+(lapertek[ertek-1]))
                ans +=parseInt(lapertek[ertek-1]);
            }
            //console.log("ANS:"+ans)
        }
        set.push(ans);
        //console.log("PUSH:"+ans)
    }
    return set;
}
function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    TablaFeltoltes(23);
}

var objektum = {id:1, nev:"Béla", szev:1467}
objektum.nev = "Karcsi"
console.log(objektum.nev)

Main();