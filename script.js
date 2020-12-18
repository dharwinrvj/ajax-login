const form = {
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    submit: document.getElementById('btn-submit'),
    message: document.getElementById('ajax'),

};
console.log(form);
form.submit.addEventListener('click', () => {
    const req = new XMLHttpRequest();
    req.onload = () => {
        let resobj = null;
        try {
            res = JSON.parse(req.responseText);
        } catch (e) {
            console.log('Could not parse JSON');
        }
        if (res) {
            handleResponse(res);
        }
    };
    const reqData = `username=${form.username.value}&password=${form.password.value}`;

    req.open('post', 'check.php', true);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req.send(reqData);

});
handleResponse = (res) => {
    console.log(res);
    if (res.ok) {
        location.href = 'dashbord.html';
    } else {
        while (form.message.firstChild) {
            form.message.removeChild(form.message.firstChild);
        }
        res.messages.forEach(function (message, i, res) {
            const h4 = document.createElement('h4');
            h4.textContent = message
            form.message.appendChild(h4);
        });
        form.message.style.display = "block";
    }
};