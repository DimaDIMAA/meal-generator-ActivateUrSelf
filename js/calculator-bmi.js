document.getElementById("calculate-bmi-button").addEventListener("click", (event) => {
    calculateBMI(event);
});

function calculateBMI(event) {
    let weight = parseFloat(document.getElementById("input-greutate").value);
    let height = parseFloat(document.getElementById("input-inaltime").value);
    let age = parseInt(document.getElementById("input-varsta").value);
    let gen = document.getElementById("select-gen").value;
    let activitate = document.getElementById("select-activitate").value;
    let BMI = (weight / ((height / 100) ** 2));

    if(!weight|| !height || !age || gen === "0" || activitate === "0") return alert("All fields are required!");
    event.preventDefault();

    let heading = document.getElementById("heading");
    let raspunsBMI = document.getElementById("raspunsIMC");

    heading.innerHTML = "";
    raspunsBMI.innerHTML = "";

    if (isNaN(weight) || weight <= 0) {
        heading.innerHTML = "Please provide a valid weight";
    } else if (isNaN(height) || height <= 0) {
        heading.innerHTML = "Please provide a valid height";
    } else if (BMI <= 18.49) {
        heading.innerHTML = `Your BMI is ${BMI.toFixed(1)} - Underweight`;
        raspunsBMI.innerHTML = "Your body weight is too low. Please consult your doctor for advice on diet and health checks.";
    } else if (BMI <= 24.99) {
        heading.innerHTML = `Your BMI is ${BMI.toFixed(1)} - Normal weight`;
        raspunsBMI.innerHTML = "Your body weight is normal. Maintain a healthy diet rich in fruits and vegetables, and exercise regularly to stay in good shape.";
    } else if (BMI <= 29.99) {
        heading.innerHTML = `Your BMI is ${BMI.toFixed(1)} - Overweight`;
        raspunsBMI.innerHTML = "Your body weight is too high. Consider consulting a doctor or reviewing your lifestyle.";
    } else if (BMI <= 34.99) {
        heading.innerHTML = `Your BMI is ${BMI.toFixed(1)} - Obesity Class 1`;
        raspunsBMI.innerHTML = "Your body weight is too high, indicating Obesity Class 1. Consult your doctor for advice on diet and exercise. Taking timely action can prevent obesity-related complications and help maintain your health.";
    } else if (BMI <= 40) {
        heading.innerHTML = `Your BMI is ${BMI.toFixed(1)} - Obesity Class 2`;
        raspunsBMI.innerHTML = "Your body weight is too high, indicating Obesity Class 2. Consult your doctor for advice on diet and exercise. Taking timely action can prevent obesity-related complications and help maintain your health.";
    } else {
        heading.innerHTML = `Your BMI is ${BMI.toFixed(1)} - Morbid Obesity`;
        raspunsBMI.innerHTML = "Your body weight is too high, indicating Morbid Obesity. Consult your doctor for advice on diet, exercise, and possibly medical treatment. Taking timely action can prevent obesity-related complications and help maintain your health.";
    }
}
