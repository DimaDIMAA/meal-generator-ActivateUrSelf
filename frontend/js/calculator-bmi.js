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

    let BMR;
    if (gen === "1") {
        BMR = 88.362 + 13.397 * parseInt(weight) + 4.799 * parseInt(height) - 5.677 * parseInt(age);
    }
    
    if (gen === "2") {
        BMR = 447.593 + 9 * parseInt(weight) + 3.098 * parseInt(height) - 4.330 * parseInt(age);
    }
    document.getElementById("afisare-rezultat").innerHTML = BMR
    console.log(BMR)
}