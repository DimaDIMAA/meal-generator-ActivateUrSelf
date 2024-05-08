// document.getElementById("calculate-bmi-button").addEventListener("submit",(event)=>{
//     event.preventDefault()
//     alert("a fost apasat un buton")
// })

function calculateBMI() {
    let weight = document.getElementById("input-greutate").value;
    let height = document.getElementById("input-inaltime").value;
    let age = document.getElementById("input-varsta").value;
    let gen = document.getElementById("select-gen").value;
    let activitate = document.getElementById("select-activitate").value;
    let IMC = weight / height ** 2 * 10000;
    document.getElementById("raspunsIMC").innerHTML="";
    if(weight === "" || isNaN(weight)){
        document.getElementById("heading").innerHTML="Furnizați o greutate validă";
    }
    else if(height === "" || isNaN(height)){
        document.getElementById("heading").innerHTML="Furnizați o înălțime validă";
    }
    else if(0<IMC && IMC<=18.49){
        document.getElementById("heading").innerHTML="Indicele este "+IMC.toFixed(1)+" Lipsa de hrană";
        document.getElementById("raspunsIMC").innerHTML="Masa corporală este prea mică. Contactează-ți medicul pentru o consultație și pentru recomandări de analize și/sau modificarea dietei.";
    }
    else if(18.5<=IMC && IMC<=24.99){
        document.getElementById("heading").innerHTML="Indicele este "+IMC.toFixed(1)+" Masă corporală normală";
        document.getElementById("raspunsIMC").innerHTML="Masa corporală este normală. Ține o dietă bogată în fructe și legume, alături de un program zilnic cu mișcare pentru a menține o formă bună.";
    }
    else if(25<=IMC && IMC<=29.99){
        document.getElementById("heading").innerHTML="Indicele este "+IMC.toFixed(1)+" Supraponderal";
        document.getElementById("raspunsIMC").innerHTML="Masa corporală este prea mare. Fă-ți o consultație medicală sau revizuiește-ți stilul de viață.";
    }
    else if(30<=IMC && IMC<=34.99){
        document.getElementById("heading").innerHTML="Indicele este "+IMC.toFixed(1)+" Obezitate de grad 1";
        document.getElementById("raspunsIMC").innerHTML="Masa corporală este prea mare, iar indicatorul indică obezitate de grad 1. Contactează-ți medicul, care va recomanda modificarea dietei și sport în fiecare zi. Dacă vei lua măsuri din timp, eviți complicațiile aduse de obezitate și-ți păstrezi sănătatea pentru mai mult timp.)";
    }
    else if(34.99<=IMC && IMC<=40){
        document.getElementById("heading").innerHTML="Indicele este "+IMC.toFixed(1)+" Obezitate de gradul 2";
        document.getElementById("raspunsIMC").innerHTML="Masa corporală este prea mare, iar indicatorul indică obezitate de grad 2. Contactează-ți medicul, care va recomanda modificarea dietei și sport în fiecare zi. Dacă vei lua măsuri din timp, eviți complicațiile aduse de obezitate și-ți păstrezi sănătatea pentru mai mult timp.";
    }
    else if(40<=IMC){
        document.getElementById("heading").innerHTML="Indicele este "+IMC.toFixed(1)+" Obezitate morbidă";
        document.getElementById("raspunsIMC").innerHTML="Masa corporală este prea mare, iar indicatorul indică obezitate morbidă. Contactează-ți medicul, care va recomanda modificarea dietei și sport în fiecare zi. Este posibilă introducerea unui tratament farmaceutic. Dacă vei lua măsuri din timp, eviți complicațiile aduse de obezitate și-ți păstrezi sănătatea pentru mai mult timp.";
    }
}
