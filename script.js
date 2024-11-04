const addItemBtn = document.getElementById('add-item-btn');
const productForm = document.getElementById('product-form');
const addItemWrapper = document.querySelector('.add-item');
const blackBackdrop = document.querySelector('.black-backdrop');
const cancelBtn = document.querySelector('.cancel-btn');
const productsList = document.getElementById('products');
const totalValue = document.getElementById('total-value');

let total = 0;

const toggleAddItemForm = () => {
    productForm.classList.toggle('show');
    addItemWrapper.classList.toggle('active');
    blackBackdrop.classList.toggle('active');
};

addItemBtn.addEventListener('click', toggleAddItemForm);
cancelBtn.addEventListener('click', toggleAddItemForm);
blackBackdrop.addEventListener('click', toggleAddItemForm);
productForm.addEventListener('submit', addItemToList);