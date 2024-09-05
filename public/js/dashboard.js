const dashboardPostHandler = async function(event){
    const post = event.target.closest('div');

    if(post.getAttribute('content')){
        const area = document.querySelector('#dashboardPost');
        area.innerHTML = '';

        renderForm(post.getAttribute('content'), post.getAttribute('title'))
    }
}

function renderForm(content, title){
    const formLocation = document.querySelector('#dashboardPost');
    const form = document.createElement('form');
    const formTitleLabel = document.createElement('label');
    const formTitleInput = document.createElement('input');
    const formContentLabel = document.createElement('label');
    const formContentInput = document.createElement('textArea');
    const formBtn = document.createElement('button');
    const formDeleteBtn = document.createElement('button');
    const formLocationHeader = document.createElement('header');
    const container = document.createElement('div');

    formLocationHeader.setAttribute('class', 'd-flex flex-row justify-space-between p-2 text');
    container.setAttribute('class', 'container my-2 post')
    form.setAttribute('class', 'p-2 form');
    formTitleLabel.setAttribute('class', 'my-2 ps-0');
    formTitleLabel.setAttribute('for', 'titleInput');
    formTitleInput.setAttribute('id', 'titleInput')
    formTitleInput.setAttribute('class', 'col-12')
    formContentLabel.setAttribute('class', 'my-2 ps-0');
    formContentLabel.setAttribute('for', 'contentInput');
    formContentInput.setAttribute('id', 'contentInput')
    formContentInput.setAttribute('class', 'col-12 my-2 commentInput')
    formBtn.setAttribute('type', 'submit');
    formBtn.setAttribute('class', 'btn col-12');
    formDeleteBtn.setAttribute('type', 'submit');
    formDeleteBtn.setAttribute('class', 'btn col-12 mt-1');

    formLocationHeader.innerHTML = 'Edit Post';

    formTitleLabel.innerHTML = 'Title:';
    formContentLabel.innerHTML = 'Content:';

    formTitleInput.defaultValue = title;
    formContentInput.defaultValue = content;

    formBtn.innerHTML = 'Update Post';
    formDeleteBtn.innerHTML = 'Delete Post';


    container.append(formLocationHeader, form)
    form.append(formTitleLabel, formTitleInput, formContentLabel, formContentInput, formBtn, formDeleteBtn)
    formLocation.append(container);
}


document
    .querySelector('#dashboardPost')
    .addEventListener('click', dashboardPostHandler);