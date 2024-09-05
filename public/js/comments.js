const submitCommentHandler = async function(event){
    const comment = document.querySelector('#newComment').value.trim();
    const postTitle = document.querySelector('.post').getAttribute('id');

    event.preventDefault()
    
    if(!comment || !postTitle){
        alert('please enter a comment');
        return;
    }

    try {
        const res = await fetch('/home/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment,
                postTitle,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(!res.ok){
            console.log('Not good');
            return;
        }

        document.location.reload();
    } catch (error) {
        console.log('not Good');
        return;
    }
};

const showForm = function(event){
    if(document.querySelector('#newComment')){
        document.querySelector('#form').remove();
        return;
    }
    const form = document.createElement('form');
    const container = document.createElement('section');
    const formHeader = document.createElement('header');
    const formInput = document.createElement('textarea');
    const formLabel = document.createElement('label');
    const formBtn = document.createElement('button');
    const location = document.querySelector('#postContainer');

    form.setAttribute('class', 'form p-2')
    formLabel.setAttribute('for', 'newComment');
    formLabel.setAttribute('class', 'my-2 ps-0');
    formInput.setAttribute('id', 'newComment');
    formInput.setAttribute('type', 'text');
    formInput.setAttribute('class', 'col-12 my-2 commentInput');
    formBtn.setAttribute('type', 'submit');
    formBtn.setAttribute('class', 'btn col-12');
    container.setAttribute('class', 'container my-2 post');
    container.setAttribute('id', 'form');
    formHeader.setAttribute('class', 'd-flex flex-row justify-space-between p-2');

    formLabel.innerHTML = 'Comment:';
    formBtn.innerHTML = 'Submit';

    container.appendChild(formHeader);
    container.appendChild(form);
    form.appendChild(formLabel);
    form.appendChild(formInput);
    form.appendChild(formBtn);

    location.insertBefore(container, event.target.parentElement);

    formBtn.addEventListener('click', submitCommentHandler);
}

document
    .querySelector('#addComment')
    .addEventListener('click', showForm);

