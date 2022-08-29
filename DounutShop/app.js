const donutList = [
    {
        id: 1,
        image: "donut1.jpg",
        name: "Plum-Filled Ponchiki",
        description: "Soft, round donut filled with a fresh plum jelly and dusted with cake suger."
    },
    {
        id: 2,
        image: "donut2.jpg",
        name: "Lemon Meringue Doughnut",
        description: "A delightfully zesty, lemon-flavoured donut with a lemon meringue topping."
    },
    {
        id: 3,
        image: "donut3.jpg",
        name: "D'Ohnut",
        description: "A classeic vanilla donut with pink icing and colorful sprinkles. Every kid's favourite!"
    },
    {
        id: 4,
        image: "donut4.jpg",
        name: "S'mores Doughnut",
        description: "Filled with house-made marshmallow cream and sprinkled with graham cracher crunbs."
    },
]
const orderIds = [];
let yourOrderList = new Array();
const KEY_NAME = "orderList";

class Order {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}
const salesTax = 0.13
const discountPercentage = 0.1
const pricePerDonut = 4.50
const minNumber = 6

let subtotal = 0;
let tax = 0;
let total = 0;
let numberOfOrders = 0;

// helper functions
const calculate = (quantity) => {
    subtotal = quantity * pricePerDonut
    let discount = 0;
    if (quantity > minNumber) {
        discount = subtotal * discountPercentage
        discount = discount.toFixed(2)
        subtotal = subtotal - discount
    }
    tax = salesTax * subtotal
    total = subtotal + tax

    const result = [subtotal.toFixed(2), tax.toFixed(2), total.toFixed(2), discount]
    return result
}
const findDonutById = (id) => {
    for (let i = 0; i < donutList.length; i++) {
        if (donutList[i].id == id) {
            return donutList[i]
        }
    }
    // otherwise, no matching donut found
    return null
}
const searchByDonutNameAndUpdate = (newOrder) => {
    const results = []
    if (yourOrderList.some(elem => elem.name === newOrder.name)) {
        console.log(`the order list already has the order : ${newOrder.name}`);
        //if yes, increase the quantity

        //findIndex - returns index of the matching object or -1
        let indexOfObjToReplace = yourOrderList.findIndex(elem => elem.name === newOrder.name);
        //get the existing object
        let objectToUpdate = yourOrderList[indexOfObjToReplace];

        //modify the quantity
        objectToUpdate.quantity += 1;

        //replace the object in the list
        yourOrderList[indexOfObjToReplace] = objectToUpdate;

    } else {
        console.log(`the order list does not contain the order: ${newOrder.name}`);
        //if not, add new order in the list

        const orderToBeAdded = new Order(newOrder.name, 1)
        yourOrderList.push(orderToBeAdded);
    }
    return results
}

const displayAllDonuts = (donutList, containerElement) => {
    // - loop through donutList
    for (let i = 0; i < donutList.length; i++) {
        const currDonut = donutList[i]

        containerElement.innerHTML += `
            <div class="donut">
                <img src="assets/${currDonut.image}"/ class="imgLarge">
                <p style="font-size:14px;font-weight:bold;">${currDonut.name}</p>
                <p style="font-style: italic">${currDonut.description}</p>
                <button data-dondex-id="${currDonut.id}">ADD TO CART</button>
            </div>
        `
    }

}
const displayOrderList = (orderList, containerElement) => {

    let totalQuantity = 0;

    containerElement.innerHTML = `
    <h1 style="background-color: white;">Your Items</h1>
    <p>Here is a summary of your order:</p>
    <hr>`

    for (let i = 0; i < orderList.length; i++) {
        const currOrder = orderList[i]

        containerElement.innerHTML += `
        <div style="margin-left: 20px">
            <p>${currOrder.name}</p>
            <p style="font-weight: bold;">QUANTITY: ${currOrder.quantity}</p>
        </div>`
        totalQuantity += currOrder.quantity
    }

    const pricingInfo = calculate(totalQuantity)
    discount = pricingInfo[3]
    containerElement.innerHTML += `
    <hr>`
    if (totalQuantity > minNumber) {
        containerElement.innerHTML += `
        <p style="color: red">Discount Applied: -$${discount}`
    }
    subtotal = pricingInfo[0]
    tax = pricingInfo[1]
    total = pricingInfo[2]

    containerElement.innerHTML += `
    <p>Subtotal: <a style="color: blue; background-color: white;">$${subtotal}</a></p>
    <p>Tax: <a style="color: blue; background-color: white;">$${tax}</a></p>
    <p>Total: <a style="color: blue; background-color: white;">$${total}</a></p>`
}

const addToOrders = (evt) => {
    const elementClicked = evt.target
    if (elementClicked.tagName === "BUTTON") {
        console.log("Button clicked")
        const id = elementClicked.getAttribute("data-dondex-id")
        console.log(id)
        // add the donut to the orders
        orderIds.push(id);
        const selectedDonut = findDonutById(id)
        searchByDonutNameAndUpdate(selectedDonut)

        displayOrderList(yourOrderList, document.querySelector("#orders"))
    }
}

const pageLoaded = () => {
    // code to execute when the page loads
    displayAllDonuts(donutList, document.querySelector("#available-list"))
    if (yourOrderList.length != 0) {
        console.log(yourOrderList.length)
        displayOrderList(yourOrderList, document.querySelector("#orders"))
    }
    document.querySelector("#available-list").addEventListener("click", addToOrders)
}
document.addEventListener("DOMContentLoaded", pageLoaded)