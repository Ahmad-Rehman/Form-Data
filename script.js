let data = [];

function getFormData() {
    let name = document.getElementById("name").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("address").value;

    return {
        name,
        city,
        address
    };
}

function addToTable(data, index) {
    let tableData = document.getElementById("tableData");
    if (!tableData) {
        console.error("Could not find tableData element");
        return;
    }
    let row = `<tr>
        <td>${data.name}</td>
        <td>${data.city}</td>
        <td>${data.address}</td>
    <td>
        <button type="button" class="btn btn-info btn-sm editBtn" onclick="editData(${index})">Edit</button>
        <button type="button" class="btn btn-danger btn-sm deleteBtn" onclick="deleteData(${index})">Delete</button>
    </td>
    </tr>`;
    tableData.innerHTML += row;}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("city").value = "";
    document.getElementById("address").value = "";}

function saveData() {
    localStorage.setItem("data", JSON.stringify(data));}

function getData() {
    let storedData = localStorage.getItem("data");
    if (storedData) {
        data = JSON.parse(storedData);}
    return data;}

function initTable() {
    let storedData = getData();
    if (storedData) {
        storedData.forEach((item, index) => addToTable(item, index));}}

function deleteData(index) {
    data.splice(index, 1);
    saveData();
    let tableData = document.getElementById("tableData");
    tableData.innerHTML = "";
    initTable();}

function editData(index) {
    let editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-success", "mt-2");
    editBtn.setAttribute("onclick", `updateData(${index})`);
    editBtn.innerHTML = "Update";

    let form = document.getElementById("myForm");
    form.appendChild(editBtn);
    let selectedData = data[index];
    document.getElementById("name").value = selectedData.name;
    document.getElementById("city").value = selectedData.city;
    document.getElementById("address").value = selectedData.address;
    document.querySelector("button[type='submit']").disabled = true;}

function updateData(index) {
    let name = document.getElementById("name").value;
    let city = document.getElementById("city").value;
    let address = document.getElementById("address").value;

    data[index] = { name, city, address };
    saveData();
    clearForm();
    let tableData = document.getElementById("tableData");
    tableData.innerHTML = "";
    initTable();
    document.querySelector("button[type='submit']").disabled = false;
    document.querySelector("button.btn-success").remove();}

window.onload = function() {
    initTable();
    let form = document.getElementById("myForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let formData = getFormData();
        data.push(formData);
        saveData();
        addToTable(formData, data.length - 1);
        clearForm();
    });};