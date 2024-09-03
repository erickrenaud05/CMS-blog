const loginHandler = async function(event){
    try{
        const res = await fetch(`/user/login/1`);

        if(!res.ok){
            throw new Error('Internal server error')
        } else{
            document.location.replace(`/user/login/1`)
        }
    }catch(err){
        console.log(err);
    }
}

const formSwapHandler = async function(event) {
    const state = event.target.getAttribute('state');
    try{
        const res = await fetch(`/user/login/${state}`);

        if(!res.ok){
            throw new Error('Internal server error')
        } else{
            document.location.replace(`/user/login/${state}`)
        }

    }catch(err){
        console.log(err);
    }
}

document
    .querySelector('#loginBtn')
    .addEventListener('click', loginHandler);

document
    .querySelector('#formSwap')
    .addEventListener('click', formSwapHandler);