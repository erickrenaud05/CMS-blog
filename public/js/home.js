const homeBtnHandler = async function(event){
    try{
        const res = await fetch('/home');

        if(!res.ok){
            throw new Error('noo');
        }

        document.location.replace('/home');
    }catch(err){
        console.log(err);
    }


}

document
    .querySelector('#homeBtn')
    .addEventListener('click', homeBtnHandler)