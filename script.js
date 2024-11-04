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

const saveProductsToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
};

const loadProductsFromLocalStorage = () => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
};

const addItemToList = (event) => {
    event.preventDefault(); 

    const productName = document.getElementById('product-name').value;
    const productValue = parseFloat(document.getElementById('product-value').value);
    const productQuantity = parseInt(document.getElementById('product-quantity').value);

    if (productName === "" || isNaN(productValue) || isNaN(productQuantity)) {
        alert('Preencha todos os campos corretamente');
        return;
    }

    const productSubtotal = productValue * productQuantity;

    const productItem = document.createElement('li');
    productItem.classList.add('product-item');

    productItem.innerHTML = `
        <input type="checkbox" class="product-checkbox">
        <span class="product-name">${productName}</span> 
        <span class="product-quantity">(${productQuantity}x)</span> 
        <span class="product-subtotal">R$ ${productSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        <button class="remove-btn">Apagar</button>
    `;

    productsList.appendChild(productItem);

    productForm.reset();
    toggleAddItemForm();

    const products = loadProductsFromLocalStorage();
    products.push({ name: productName, value: productValue, quantity: productQuantity });
    saveProductsToLocalStorage(products);

    const checkbox = productItem.querySelector('.product-checkbox');
    const removeBtn = productItem.querySelector('.remove-btn');

    checkbox.addEventListener('change', (e)=> {
        if (e.target.checked) {
            total += productSubtotal;
        } else {
            total -= productSubtotal;
        }
        totalValue.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

    removeBtn.addEventListener('click', () => {
        if (checkbox.checked) {
            total -= productSubtotal
            totalValue.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        removeItemFromList(productItem)
    });
};

const removeItemFromList = (item) => {
    item.remove();
};

const displaySavedProducts = () => {
    const products = loadProductsFromLocalStorage();
    products.forEach(product => {
        const productSubtotal = product.value * product.quantity;

        const productItem = document.createElement('li');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <input type="checkbox" class="product-checkbox">
            <span class="product-name">${product.name}</span> 
            <span class="product-quantity">(${product.quantity}x)</span> 
            <span class="product-subtotal">${productSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <button class="remove-btn">Apagar</button>
        `;

        productsList.appendChild(productItem);

        const checkbox = productItem.querySelector('.product-checkbox');
        const removeBtn = productItem.querySelector('.remove-btn');

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                total += productSubtotal;
            } else {
                total -= productSubtotal;
            }
            totalValue.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        });

        removeBtn.addEventListener('click', () => {
            if (checkbox.checked) {
                total -= productSubtotal;
                totalValue.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
            removeItemFromList(productItem, product.name);
        });
    });
};



document.addEventListener('DOMContentLoaded', displaySavedProducts);
addItemBtn.addEventListener('click', toggleAddItemForm);
cancelBtn.addEventListener('click', toggleAddItemForm);
blackBackdrop.addEventListener('click', toggleAddItemForm);
productForm.addEventListener('submit', addItemToList);