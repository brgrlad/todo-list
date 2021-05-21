const addForm = document.querySelector('.addTodo');
const addInput = document.getElementById('addInput');
const searchInput = document.getElementById('searchInput');
const deleteBtn = document.querySelector('.deleteBtn');
const itemsWrapper = document.querySelector('.itemsWrapper');
const searchForm = document.querySelector('.search');
const localStorageItems = JSON.parse(localStorage.getItem('todos'));
let storedTodosArr = [];


class ULGenerator {

    constructor(UL) {
        let newUL = document.createElement('UL');
        itemsWrapper.prepend(newUL);
        this.UL = document.querySelector('ul');
    }

    addTodo(todo) {
        let newLI = document.createElement('LI');

        newLI.innerHTML = `
            <div class="item">
                <p> ${todo} </p>
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

    searchTodo(term) {
        // make sure the regex expression is right, matching the string with ^ (start with) didn't work -I  don't know why
        //make sure to create a conditonal definying when classes get added or removed if filtering

        let ULArray = Array.from(this.UL.children);

        const regex = new RegExp(`${term}`, `gi`);

        let matches = ULArray.filter(item => {
            if (!item.innerText.match(regex)) {
                item.classList.add('hide')
            } else if (item.innerText.match(regex)) {
                item.classList.remove('hide')
            }
        })
    }
    pushToStoredTodosArr() {

        // retrieve items from local storage and push to itemsArr.

        if (localStorageItems) {
            localStorageItems.forEach(item => {
                storedTodosArr.push(item);
            })
        }

    }
    addToLocalStorage(todo) {
        storedTodosArr.push(todo);
        localStorage.setItem('todos', JSON.stringify(storedTodosArr));
    }
    updateInterface() {
        if (storedTodosArr) {
            storedTodosArr.forEach(item => {
                this.addTodo(item);
            })
        }
    }
}


const newUL = new ULGenerator;
newUL.pushToStoredTodosArr();
newUL.updateInterface();




//add a new todo
addForm.addEventListener('submit', e => {
    e.preventDefault();
    newUL.addTodo(addInput.value);
    newUL.addToLocalStorage(addInput.value);
    addForm.reset();
});

//search for a todo
searchInput.addEventListener('input', e =>{
    let term = searchInput.value.trim();
    newUL.searchTodo(term);
});

//prevent search form from reloading the page
searchForm.addEventListener('submit', e => {
    e.preventDefault();
})

//mark as complete or delete todo
window.addEventListener('click', e => {
    if (e.target.classList == ("far fa-trash-alt deleteBtn")){
        newUL.deleteTodo(e);
    }if(e.target.classList == ("far fa-check-circle")){
        newUL.markComplete(e);
    }
});

