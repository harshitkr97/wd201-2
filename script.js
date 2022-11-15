function submitDetails(e) {
    var form = document.getElementById("form");
    var name = form.name.value;
    var email = form.email.value;
    var password = form.password.value;
    var dob = form.dob.value;
    var terms = form.terms.checked;
    var age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old to register");
        return false;
    }
    var vals = localStorage.getItem("data");
    if (vals == null) {
        vals = [];
    } else {
        vals = JSON.parse(vals);
    }
    vals.push({
        name: name,
        email: email,
        password: password,
        dob: dob,
        terms: terms
    });
    localStorage.setItem("data", JSON.stringify(vals));
    addRow(name, email, password, dob, terms);
    form.name.value = "";
    form.email.value = "";
    form.password.value = "";
    form.dob.value = "";
    form.terms.checked = false;
    return false;
}

function calculateAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function resetDetails() {
    var confirm = window.confirm("Are you sure you want to reset the form?");
    if (confirm) {
        localStorage.clear();
        var table_tbody = document.getElementById("table_tbody");
        table_tbody.innerHTML = "";
        var table = document.getElementById("table");
        table.classList.add("hidden");
        var nodata = document.getElementById("nodata");
        nodata.classList.remove("hidden");
        return true;
    }
}

function addRow(name, email, password, dob, terms) {
    var nodata = document.getElementById("nodata");
    var table = document.getElementById("table");
    nodata.classList.add("hidden");
    table.classList.remove("hidden");
    var table = document.getElementById("table");
    //h = `<td class="px-4 py-3 text-sm font-medium text-gray-900 count"></td>
    h = `<td class="text-sm text-gray-900 font-light px-4 py-3">` + name + `</td>
        <td class="text-sm text-gray-900 font-light px-4 py-3">` + email + `</td>
        <td class="text-sm text-gray-900 font-light px-4 py-3">` + password + `</td>
        <td class="text-sm text-gray-900 font-light px-4 py-3">` + dob + `</td>
        <td class="text-sm text-gray-900 font-light px-4 py-3 mr-12">` + ((terms)?'true':'false') + `</td>`;
    rowclass = "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100";
    var row = table.insertRow(-1);
    row.className = rowclass;
    row.innerHTML = h;
}


window.onload = function() {
    var data = localStorage.getItem("data");
    if (data != null) {
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            addRow(data[i].name, data[i].email, data[i].password, data[i].dob, data[i].terms);
        }
    } else {
        var nodata = document.getElementById("nodata");
        var table = document.getElementById("table");
        nodata.classList.remove("hidden");
        table.classList.add("hidden");
    }
}
