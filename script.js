var jatekTer = document.getElementById("jatekter");

var balPanel = document.createElement("div");
var kartyaBox = document.createElement("div");
var pontokBox = document.createElement("div");
var tabla = document.createElement("div");
var korokBox = document.createElement("div");

function JatekterBetoltes()
{
    balPanel.appendChild(kartyaBox);
    balPanel.appendChild(pontokBox);
    jatekTer.appendChild(balPanel);
    jatekTer.appendChild(tabla);
    jatekTer.appendChild(korokBox);

    kartyaBox.innerHTML = "kartyaBox";
    pontokBox.innerHTML = "pontokBox";
    //tabla.innerHTML = "tabla";
    korokBox.innerHTML = "korokBox";
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
    for(var i = 0; i< db;i++)
    {
        var rand1 = Math.floor(Math.random()*(30-1+1)+1);
        var div = document.getElementById(rand1);
        var img = document.createElement("img");
        var rand2 = Math.floor(Math.random()*(23-1+1)+1);
        img.src = "img/Lapok/"+rand2+".jpg";
        div.appendChild(img);
    }
}
function Main()
{
    JatekterBetoltes();
    JatekterElrendezes();
    TablaGeneralas();
    TablaFeltoltes(5);
}
Main();