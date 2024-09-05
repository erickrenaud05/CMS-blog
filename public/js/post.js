const postClickHandler = async function(event){
    const target= event.target.closest('section')

    try{
        const res = await fetch(`post/${target.id}`);
        
        if(!res.ok){
            console.log('Post not found');
            return;
        }

        document.location.replace(`home/${target.id}`)
    } catch(err) {
        return;
    }
}

const posts = document.querySelector('#postContainer');

posts.addEventListener('click', postClickHandler);