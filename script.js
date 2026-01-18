const productsData = [
  {id:1,name:"Rice 5kg",price:2500,discount:10,img:"https://via.placeholder.com/150"},
  {id:2,name:"Smart Phone",price:45000,discount:5,img:"https://via.placeholder.com/150"},
  {id:3,name:"T-Shirt",price:1200,discount:15,img:"https://via.placeholder.com/150"},
  {id:4,name:"Blender",price:3500,discount:20,img:"https://via.placeholder.com/150"}
];

let cart = [];

function displayProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  productsData.forEach(p => {
    const discountedPrice = p.price - (p.price * p.discount/100);
    productsDiv.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Price: Rs ${discountedPrice} <span style="text-decoration:line-through; color:red">${p.price}</span></p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id){
  const item = productsData.find(p=>p.id===id);
  cart.push(item);
  updateCart();
}

function updateCart(){
  const cartDiv = document.getElementById("cart-items");
  const countSpan = document.getElementById("cart-count");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item,index)=>{
    const discountedPrice = item.price - (item.price*item.discount/100);
    total += discountedPrice;
    cartDiv.innerHTML += `<p>${item.name} - Rs ${discountedPrice} <button onclick="removeFromCart(${index})">Remove</button></p>`;
  });
  countSpan.textContent = cart.length;
  document.getElementById("cart-total").innerHTML = `<strong>Total: Rs ${total}</strong>`;
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

function checkout(){
  if(cart.length===0){
    alert("Cart is empty!");
    return;
  }
  alert("Payment simulated! Total: Rs " + cart.reduce((sum,item)=>sum+(item.price - (item.price*item.discount/100)),0));
  cart = [];
  updateCart();
}

displayProducts();
