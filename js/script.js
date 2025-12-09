let cart = JSON.parse(localStorage.getItem('productos')) || [];
let totalPrice = parseFloat(localStorage.getItem('total')) || 0;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {

    const button = card.querySelector('button');
    const titleProduct = card.querySelector('h4').textContent;

    // Obtiene el precio:
    const priceProduct = parseFloat(
        card.querySelector('span').textContent.replace('$', '')
    );

    button.addEventListener('click', () => {

        // Verifica si el producto ya existe
        const existingProduct = cart.find(item => item.title === titleProduct);

        if (existingProduct) {
            existingProduct.count++;
        } else {
            cart.push({
                title: titleProduct,
                price: priceProduct,
                count: 1,
            });
        }

        totalPrice += priceProduct;

        localStorage.setItem('productos', JSON.stringify(cart));
        localStorage.setItem('total', totalPrice.toString());

        // Suma cantidades:
        const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
        document.querySelector('.count').textContent = totalItems;

        console.log(cart);
    });
});


/* Generación de tabla */

function handleCart() {
    const cart = JSON.parse(localStorage.getItem('productos')) || [];
    const total = parseFloat(localStorage.getItem('total')) || 0;

    const carritoProduct = document.getElementById('itemProducts');

    carritoProduct.innerHTML = ""; // solo limpia este contenedor

    if (cart.length === 0) {
        carritoProduct.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

    let html = `
        <table class="tabla-carrito">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
    `;

    cart.forEach(product => {
        html += `
            <tr>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.count}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <h3>Total: $${total}</h3>
    `;

    carritoProduct.innerHTML = html; // esto SOLO afecta a itemProducts
}

/* Limpiar carrito: */

function limpiarCarrito() {

   if(confirm('¿Estás seguro de vaciar el carrito?')) {
      cart = [];
      totalPrice = 0;
      document.querySelector('.count').textContent = 0;
      localStorage.removeItem('productos');
      localStorage.removeItem('total');
      location.reload();
   }

}

// Aplica CSS a la seccion del carrito
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector("button[onclick='limpiarCarrito()']");
    const titulo = document.querySelector("h2[titulo]");

    if (btn) btn.classList.add("btn-limpiar");
});



document.addEventListener('DOMContentLoaded', handleCart);
