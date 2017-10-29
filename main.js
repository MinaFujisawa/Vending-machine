(function (){
	var priceSelectBtns = document.querySelectorAll(".priceSelectBtn");
	var priceDisplay = document.getElementById("priceDisplay");
	var changeBox = document.getElementById("changeBox");
	var outputBox = document.querySelector(".resultProductGroup");
	var purchaseBtns = document.querySelectorAll(".purchaseBtn");
	var changeBtn = document.getElementById("changeBtn");
	var resetBtn = document.getElementById("resetBtn");


	var selectedPrice;
	var amount = 0;
	var itemPrices = [];

	
	// get item prices
	for (i = 0; i < purchaseBtns.length; i++) {
		itemPrices[i] = purchaseBtns[i].innerHTML.substr( 1 );
	}
	
	function setPurchasableItems() {
		console.log(amount);
		for (i = 0; i < purchaseBtns.length; i++) {
			if (itemPrices[i] <= amount) {
				purchaseBtns[i].className += " btnEnable";
			} else {
				purchaseBtns[i].classList.remove("btnEnable");
			}
		}
	}

	// check money
	for (priceSelectBtn of priceSelectBtns) {
		priceSelectBtn.addEventListener("click", function(e){
		 	e.preventDefault();

			// add clicked item price
			amount += Number(this.innerHTML);
			
			priceDisplay.innerHTML = "<span>¥</span>" + amount;
			setPurchasableItems();
		});
	}

	// put out result
	for (purchaseBtn of purchaseBtns) {
		purchaseBtn.addEventListener("click", function(){

			var purchaedPrice = this.innerHTML.substr( 1 );
			if(amount >= purchaedPrice){
				amount -= purchaedPrice;
				priceDisplay.innerHTML = "<span>¥</span>" + amount;
			} else if (amount == 0) {
				priceDisplay.innerHTML = "<span>¥</span>" + "0000";
			}

			if (this.classList.contains("btnEnable")) {
				var purchasedItem = this.previousElementSibling;
				var element = document.createElement(purchasedItem.tagName);
				element.setAttribute("class", purchasedItem.className +" pull-left");
				element.innerHTML = purchasedItem.innerHTML;
				outputBox.appendChild(element);
			}

			setPurchasableItems();
			
		});
	}

	// Change / Cancel
	changeBtn.addEventListener("click", function(){
		
		priceDisplay.innerHTML = "<span>¥</span>" + "0000";

		for (btn of purchaseBtns) {
			btn.classList.remove("btnEnable");
		}
		

		while (amount > 0) {
			var moneyItem = document.createElement("div");
			
			if (amount >= 1000){
				moneyItem.className = "bill";
				moneyItem.innerHTML = "1000";
				amount -= 1000;
			} else if (amount >= 500) {
				moneyItem.className = "coin fiveH";
				moneyItem.innerHTML = "500";
				amount -= 500;
			} else if (amount >= 100) {
				moneyItem.className = "coin";
				moneyItem.innerHTML = "100";
				amount -= 100;
			} else if (amount >= 50) {
				moneyItem.className = "coin";
				moneyItem.innerHTML = "50";
				amount -= 50;
			} else if (amount >= 10) {
				moneyItem.className = "coin ten";
				moneyItem.innerHTML = "10";
				amount -= 10;
			}
			moneyItem.className += " pull-left";
			changeBox.appendChild(moneyItem);
		}
	});


	// Reset button
	resetBtn.addEventListener("click", function(){
		amount = 0;
		priceDisplay.innerHTML = "<span>¥</span>" + "0000";
		
		while (outputBox.firstChild) {
		    outputBox.removeChild(outputBox.firstChild);
		}

		while (changeBox.firstChild) {
		    changeBox.removeChild(changeBox.firstChild);
		}

		setPurchasableItems();
	});

}());