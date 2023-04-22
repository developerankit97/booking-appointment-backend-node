const userId = document.querySelector('#_id');
const userName = document.querySelector('#fullname');
const userEmail = document.querySelector('#email');
const userPhone = document.querySelector('#phone');
const btn = document.querySelector('.btn');
const list = document.querySelector('.items');

btn.addEventListener('click', addAppointment);
window.addEventListener('DOMContentLoaded', getAppointsments);
list.addEventListener('click', deleteAppointment);
list.addEventListener('click', updateAppointment);

function getAppointsments() {
    axios
        .get('http://localhost:3000/')
        .then(response => {
            response.data.forEach(element => {
                let output = `<li class="list-group-item d-flex justify-content-between align-items-center" id="${element.id}">
                                <span>${element.fullName} - ${element.email} - ${element.phone}</span>
                                <div>
                                    <button type="submit" class="btn btn-info edit">Edit</button>
                                    <button type="submit" class="btn btn-danger delete">Delete</button>
                                </div>
                            </li>`;
                list.innerHTML += output;
            });
        })
        .catch(err => console.error(err));
}

function addAppointment(e) {
    e.preventDefault();
    const id = userId.value;
    const name = userName.value;
    const email = userEmail.value;
    const phone = userPhone.value;
    let user = {
        "name": name,
        "email": email,
        "phone": phone,
    };
    if (id) {
        axios
            .put(`http://localhost:3000/appointments/${id}`, user)
            .then(res => window.location.reload())
            .catch(err => console.error(err));
    }
    if (!id && name && email && phone) {
        axios
            .post('http://localhost:3000/appointments', user)
            .then(response => {
                let output = `<li class="list-group-item d-flex justify-content-between align-items-center" id="${response.data.id}">
                                <span>${response.data.fullname} - ${response.data.email} - ${response.data.phone}</span>
                                <div>
                                    <button type="submit" class="btn btn-info edit">Edit</button>
                                    <button type="submit" class="btn btn-danger delete">Delete</button>
                                </div>
                            </li>`;

                list.innerHTML = output;
            })
            .catch(err => console.error(err));
        userName.value = '';
        userEmail.value = '';
        userPhone.value = '';
    }
}

function deleteAppointment(e) {
    if (e.target.classList.contains('delete')) {
        const item = e.target.parentElement.parentElement;
        const id = item.getAttribute('id');
        axios
            .delete(`http://localhost:3000/appointments/${id}`)
            .then(response => {
                item.remove();
            })
            .catch(err => console.error(err));
    }
}

function updateAppointment(e) {
    if (e.target.classList.contains('edit')) {
        const item = e.target.parentElement.parentElement;
        const id = item.getAttribute('id');
        axios
            .get(`http://localhost:3000/appointments/${id}`)
            .then(res => {
                userId.value = res.data.id;
                userName.value = res.data.fullName;
                userEmail.value = res.data.email;
                userPhone.value = res.data.phone;
            })
            .catch(err => console.error(err));
    }
}