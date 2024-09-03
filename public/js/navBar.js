const loginHandler = async function(event){
    try{
        const res = await fetch(`/user/1`);

        if(!res.ok){
            throw new Error('Internal server error')
        } else{
            document.location.replace(`/user/1`)
        }
    }catch(err){
        console.log(err);
    }
}

const logoutHandler = async function(event){
    try {
        const res = await fetch('/user/logout');

        if(!res.ok){
            throw new Error('sad:(');
        }

        alert('successfully signed out');
        document.location.replace('/home')
    } catch (error) {
        console.log(error);
    }
}

const btn = document.querySelector('#loginBtn');

if(btn){
    btn.addEventListener('click', loginHandler);
} else{
    document.querySelector('#logoutBtn')
        .addEventListener('click', logoutHandler);
}
    
