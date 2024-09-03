
const formSwapHandler = async function(event) {
    const state = event.target.getAttribute('state');

    try{
        const res = await fetch(`/user/${state}`);

        if(!res.ok){
            throw new Error('Internal server error')
        } else{
            document.location.replace(`/user/${state}`)
        }

    }catch(err){
        console.log(err);
    }
}

const formSubmit = async function(event){
    event.preventDefault();
    let state = document.querySelector('#formSwap').getAttribute('state');
    let requestType = null;

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(!username || !password){
        alert("please fill out entire form");
        return;
    }

    if(state === '1'){
        requestType = 'signUp'
    } else{
        requestType = 'login'
    }

    try {
        const res = await fetch(`/user/${requestType}`, {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(requestType === 'login'){
            if(!res.ok){
                alert('invalid user or password');
                return
            }

        } else{
            if(!res.ok){
                alert('Username already exist');
                return
            }
        }

        alert('successfully logged in!');
        document.location.replace('/home');
        return;

    } catch (err) {
        console.log('Internal server error');
        return;
    }
}

document
    .querySelector('#formSwap')
    .addEventListener('click', formSwapHandler);

document
    .querySelector('#formSubmit')
    .addEventListener('click', formSubmit);
