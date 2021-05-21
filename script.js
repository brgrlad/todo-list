const addForm = document.querySelector('.addTodo');
const addInput = document.getElementById('addInput');
const searchInput = document.getElementById('searchInput');
const deleteBtn = document.querySelector('.deleteBtn');
const itemsWrapper = document.querySelector('.itemsWrapper');

class ULGenerator {

    constructor (UL) {
        let newUL = document.createElement('UL');
        itemsWrapper.prepend(newUL);
        this.UL = document.querySelector('ul');
    }

    addTodo() {
        let newLI = document.createElement('LI');

        newLI.innerHTML = `
            <div class="item">
                <p> ${addInput.value.trim()} </p>
            </div>

            <div class="btnWrapper">
                <i class="far fa-check-circle"></i>
                <i class="far fa-trash-alt deleteBtn"></i></
            </div> `
        ;
        this.UL.append(newLI);



    }

    markComplete(e) {
        let itemWrapper = e.target.parentElement.previousSibling.previousSibling;
        itemWrapper.classList.toggle('ticked');

        let LI = e.target.parentElement.parentElement;
        LI.classList.toggle('opacity');
    }

    deleteTodo(e) {
        let listItem = e.target.parentElement.parentElement;
        listItem.remove();
    }

    searchTodo(term){
        // make sure the regex expression is right, matching the string with ^ (start with) didn't work -I  don't know why
        //make sure to create a conditonal definying when classes get added or removed when filtering

        let ULArray = Array.from(this.UL.children);

        const regex = new RegExp(`${term}`, `gi`);

        let matches = ULArray.filter(item => {
            if(!item.innerText.match(regex)) {
                item.classList.add('hide')
            } else if(item.innerText.match(regex)){
                item.classList.remove('hide')
            }
        })
    }

}


const newUL = new ULGenerator();




//add a new todo
addForm.addEventListener('submit', e => {
    e.preventDefault();
    newUL.addTodo();
    addForm.reset();

});

//search for a todo
searchInput.addEventListener('input', e =>{
    let term = searchInput.value.trim();
    newUL.searchTodo(term);
});


//tick or delete a todo
window.addEventListener('click', e => {
    if (e.target.classList == ("far fa-trash-alt deleteBtn")){
        newUL.deleteTodo(e);
    }if(e.target.classList == ("far fa-check-circle")){
        newUL.markComplete(e);
    }
});

