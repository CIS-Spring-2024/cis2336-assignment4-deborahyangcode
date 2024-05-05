document.addEventListener("DOMContentLoaded", function() {
    function generateMenuItems(menuItems, sectionId) {
        const section = document.getElementById(sectionId);
        const menuDiv = document.createElement('div');
        menuDiv.classList.add('menu');
        menuItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            const img = document.createElement('img');
            img.src = item.imgSrc;
            img.alt = item.name;
            img.classList.add('hover-move');

            const nameParagraph = document.createElement('p');
            nameParagraph.textContent = item.name;

            const priceParagraph = document.createElement('p');
            priceParagraph.textContent = '$' + item.price.toFixed(2);

            const addbutton = document.createElement('button');
            addbutton.textContent = 'Add to Cart';
            addbutton.classList.add('pill'); 
            addbutton.type = 'button';
            addbutton.onclick = function() {
                addcart(item.name, item.price);
            };

            itemDiv.appendChild(img);
            itemDiv.appendChild(nameParagraph);
            itemDiv.appendChild(priceParagraph);
            itemDiv.appendChild(addbutton);
            menuDiv.appendChild(itemDiv);
        });
        section.appendChild(menuDiv);
    }

    generateMenuItems(menu.breakfast, 'breakfast');
    generateMenuItems(menu.lunch, 'lunch');
    generateMenuItems(menu.dinner, 'dinner');
});

function addcart(itemName, price) {
    const cart = document.getElementById('cart-items');
    let existingItem = null;

    cart.querySelectorAll('li').forEach(item => {
        if (item.textContent.includes(itemName)) {
            existingItem = item;
        }
    });

    if (existingItem) {
        const quantityElement = existingItem.querySelector('.quantity');
        const quantity = parseInt(quantityElement.textContent) + 1;
        quantityElement.textContent = quantity;
        updatetotal(price);
    } else {
        const li = document.createElement('li');
        li.textContent = itemName + " - $" + price.toFixed(2) + " ";
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = "1";
        quantitySpan.classList.add('quantity');
        li.appendChild(quantitySpan);

        const rembtn = document.createElement('button');
        rembtn.textContent = 'Remove';
        rembtn.classList.add('pill'); 
        rembtn.onclick = function() {
            li.remove();
            updatetotal(-price); 
        };
        li.appendChild(rembtn);

        const incrbtn = document.createElement('button');
        incrbtn.textContent = '+';
        incrbtn.classList.add('pill'); 
        incrbtn.onclick = function() {
            const quantity = parseInt(quantitySpan.textContent) + 1;
            quantitySpan.textContent = quantity;
            updatetotal(price);
        };
        li.appendChild(incrbtn);

        const decrbtn = document.createElement('button');
        decrbtn.textContent = '-';
        decrbtn.classList.add('pill'); 
        decrbtn.onclick = function() {
            const quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
                updatetotal(-price);
            } else {
                li.remove();
                updatetotal(-price);
            }
        };
        li.appendChild(decrbtn);

        cart.appendChild(li);
        updatetotal(price);
    }
}

function updatetotal(price) {
    const totalPriceElement = document.getElementById('total-price');
    const currentTotal = parseFloat(totalPriceElement.textContent.split(':')[1].trim().replace('$', ''));
    const newTotal = currentTotal + price;
    totalPriceElement.textContent = "Total: $" + newTotal.toFixed(2);
}

function calculatetotal() {
    const totalPriceElement = document.getElementById('total-price');
    const newTotal = parseFloat(totalPriceElement.textContent.split(':')[1].trim().replace('$', ''));
    localStorage.setItem('totalPrice', newTotal.toFixed(2));
    localStorage.setItem('cartItems', JSON.stringify([...document.querySelectorAll('#cart-items li')].map(li => li.textContent)));

    
    window.location.href = 'confirm.html';
}
