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

const removeItemFromList = (item, productName) => {
    item.remove();
    
    let products = loadProductsFromLocalStorage();
    products = products.filter(product => product.name !== productName);
    saveProductsToLocalStorage(products);
};

const createProductElement = (product) => {
    const productSubtotal = product.value * product.quantity;

    const productItem = document.createElement('tr');
    productItem.classList.add('product-item');
    
    productItem.innerHTML = `
        <td><input type="checkbox" class="product-checkbox"></td>
        <td class="product-name">${product.name}</td> 
        <td class="product-quantity">${product.quantity}x</td> 
        <td class="product-subtotal">${productSubtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td><button class="remove-btn"><i class="fa-solid fa-trash"></i></button></td>
    `;
    
    productsList.appendChild(productItem); // productsList deve ser um elemento <tbody>
    

    return productItem;
};

const addListenersToProductItem = (productItem, product) => {
    const productSubtotal = product.value * product.quantity;
    const checkbox = productItem.querySelector('.product-checkbox');
    const removeBtn = productItem.querySelector('.remove-btn');

    checkbox.addEventListener('change', (e) => {
        const amount = e.target.checked ? productSubtotal : -productSubtotal;
        updateTotal(amount);
    });

    removeBtn.addEventListener('click', () => {
        if (checkbox.checked) {
            updateTotal(-productSubtotal);
        }
        removeItemFromList(productItem, product.name);
    });
};

const updateTotal = (amount) => {
    total += amount;
    totalValue.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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

    const product = {
        name: productName,
        value: productValue,
        quantity: productQuantity
    };

    
    const productItem = createProductElement(product)
    productsList.appendChild(productItem);

    productForm.reset();
    toggleAddItemForm();

    const products = loadProductsFromLocalStorage();
    products.push(product);
    saveProductsToLocalStorage(products);

    addListenersToProductItem(productItem, product)

};



const displaySavedProducts = () => {
    const products = loadProductsFromLocalStorage();
    products.forEach(product => {
        const productItem = createProductElement(product);
        productsList.appendChild(productItem);

        addListenersToProductItem(productItem, product)
    });
};



document.addEventListener('DOMContentLoaded', displaySavedProducts);
addItemBtn.addEventListener('click', toggleAddItemForm);
cancelBtn.addEventListener('click', toggleAddItemForm);
blackBackdrop.addEventListener('click', toggleAddItemForm);
productForm.addEventListener('submit', addItemToList);