const orders = [];

/* function for the add to cart button, get the meal's id and check if the meal not included in the orders array, push it in, so this orders array will  map into the shopping cart */
$(".menu-card button").on("click", function () {
	const id = $(this).prev().text().slice(4);
	const price = $(this).prev().prev().text().slice(8) * 1;
	const name = $(this).prev().prev().prev().text();
	console.log(price);
	// check if the id !=order.id then push in
	if (!orders.some(item => item.id === id)) orders.push({ id, quantity: 1, price, name }); // order data format[{id, quantity, price, name},{...}]
	console.log(orders);
	renderShoppingCartInt();
	$(".count").text(orders.length);
});

// $(".count").text(orders.length);
/* shopping cart total item */
function showCartTotal() {
	let count = 0;
	orders.forEach(order => {
		count += order.quantity;
	});
	$(".count").text(count);
}
/* show dialog */
$(".cartBtn").on("click", function () {
	$(".shopingCart").get(0).showModal();
	$(".dialog-backdrop").addClass("show");
});

/* close dialog */
$(".dialog-close-btn").on("click", function () {
	$(".shopingCart").get(0).close();
	$(".dialog-backdrop").removeClass("show");
});

$(window).on("keydown", function (e) {
	if (e.key === "Escape") {
		$(".shopingCart").get(0).close();
		$(".dialog-backdrop").removeClass("show");
	}
});

/*  render shopping cart  */
function renderShoppingCartInt() {
	if (orders.length == 0) {
		$(".shopingCart ul").html(`<li class='cart-content'><p>You did not pick any meal yet, click close button to view the meal</p></li>`);
	} else {
		$(".shopingCart ul").html("");
		let totalPrice = 0;
		orders.forEach(order => {
			totalPrice += order.price * order.quantity;
		});

		totalPrice = totalPrice.toFixed(2);
		console.log(totalPrice);

		for (const order of orders) {
			const { id, name, price, quantity } = order;
			$(".shopingCart ul").append(`
			<li class="cart-content" data-key=${id}>
		       <p class="cart-product-name">${name}</p>
		      <p>$${(price * quantity).toFixed(2)}</p>
		      <div class="counter">
		        <button class='minus'>-</button>
		        <input type="text" readonly value="${quantity}" />
		        <button class='plus'>+</button>
		      </div>
		    </li>`);
		}

		$(".shopingCart ul").append(`<hr/>
		<div class='cart-content-total'> 
		<p>Your total price: </p>
		<p>$${totalPrice}</p>
		</div>`);
		/* render the confirm order button only when cart is not empty, and the confirm order button not exist */
		if ($(".dialog-control").children().length === 1) {
			confirmOrderButton();
		}
	}

	$(".minus").on("click", function () {
		const id = $(this).parent().parent().attr("data-key");
		const theOrder = orders.filter(order => order.id == id);
		const index = orders.findIndex(order => order.id == id);
		if (theOrder[0].quantity < 2) {
			orders.splice(index, 1); // delete the order if the quanity is 1
		} else {
			orders[index].quantity -= 1;
		}
		renderShoppingCartInt();
		showCartTotal();
		unMountConfirmOrderButton();
	});

	$(".plus").on("click", function () {
		const id = $(this).parent().parent().attr("data-key");
		const index = orders.findIndex(order => order.id == id);
		orders[index].quantity += 1;
		renderShoppingCartInt();
		showCartTotal();
	});
}

renderShoppingCartInt();

// confirm order
function confirmOrderButton() {
	if (orders.length > 0) {
		$(".dialog-control").append(`<button class="confirm-order">Confirm Order</button>`);
	}
	$(".confirm-order").on("click", function () {
		alert("sending data to backend");
		$(".shopingCart").get(0).close();
		$(".dialog-backdrop").removeClass("show");

		// the original idea is to send the JSON to firebase, but i had cross-origin issus, and i tried proxy, also config my firebase, but still did not fix that yet
	});
}

function unMountConfirmOrderButton() {
	if (orders.length < 1) {
		$(".confirm-order").remove();
	}
}
