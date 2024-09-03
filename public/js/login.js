const loginHandler = async function(event){
    try{
        const res = await fetch('/user/login');

        if(!res.ok){
            throw new Error(err)
        } else{
            document.location.replace('/user/login')
        }

    }catch(err){
        console.log(err);
    }
}

document
    .querySelector('#loginBtn')
    .addEventListener('click', loginHandler)