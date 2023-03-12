var jatekTer = document.getElementById("jatekter");
var balPanel = document.createElement("div");
var kartyaBox = document.createElement("div");
var pontokBox = document.createElement("div");
var tabla = document.createElement("div");
var korokBox = document.createElement("div");
var cellak = [
    /*{
        id: 1,
        type: "", //v - vár,k - kártya
        {kártya/vár tartalma}
    }*/
];

var KartyaData = [
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


var VarData = [
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

function JatekterBetoltes()
{
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(balPanel);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);
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
            
            var oszlopDiv = document.createElement("div");
            oszlopDiv.classList += " oszlopdiv";
            oszlopDiv.id = k;
            cellak.push({id:k});
            k++;
            sorDiv.appendChild(oszlopDiv);
        }
        tabla.appendChild(sorDiv);
    }
    console.log(cellak);
}
function CellakFeltoltese()
{
    for(var i = 0; i<23;i++)
    {
        var lapszam = Math.floor(Math.random()*23+1);
        var velcella = Math.floor(Math.random()*30+1);
        var kep = document.createElement("img");
        cellak[i].type = "k";
        cellak[i].kartya = KartyaData[i];
        
        kep.src = "img/Lapok/"+lapszam+".jpg"; 
        var cella = document.getElementById(velcella);
        cella.appendChild(kep);   
        cella.appendChild(KartyaData[velcella] );
    }
    
    for(var i = 23;i<30;i++)
    {
        var kep = document.createElement("img");
        cellak[i].type = "v"
        cellak[i].kartya = VarData[i-23];
    }
    /*HF:
    feltöltést átírni, hogy minden kártyából véletlen szerűen 1 kerüljön be a tömbbe
    a tömb alapján jelenítsd meg a képeket*/
}

function Cellalefoglalva(x) {
    for (let i = 0; i < cellak.length; i++) {
        if(cellak[i].id==x){
        return true;
        }
    }
}

function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    
    CellakFeltoltese();
}



Main();