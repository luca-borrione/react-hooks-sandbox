INTERVIEW EXERCISE – SHOPPING CART CONTEXT
React + TypeScript

You are building a small e-commerce feature.

You need to implement a global shopping cart that can be accessed
and updated from anywhere in the application.

TASK

Implement a CartContext that allows components to:

- Read items currently in the cart
- Add a product to the cart
- Decrease the quantity of a product
- Remove a product completely from the cart
- Clear the entire cart
- Read derived values such as total price and total items

REQUIREMENTS

Types

Define the following types:

type Product = {
    id: string;
    name: string;
    price: number;
};

type CartItem = Product & {
    quantity: number;
};


Context API

Your context must expose:

type CartContextType = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;   // decreases quantity by 1
    clearItem: (id: string) => void;    // removes item completely
    clear: () => void;                  // clears entire cart
};


Behavior Rules

If adding a product that already exists in the cart:
Increase its quantity by 1.

If removeItem is called:
Decrease quantity by 1.
If quantity becomes 0, remove the item from the cart.

If clearItem is called:
Remove that product completely from the cart.

If clear is called:
Empty the entire cart.

totalPrice must be computed automatically as:
Sum of (price × quantity) for all items.

totalItems must reflect either:
• The number of distinct cart entries, OR
• The total quantity of all products.
(Choose one approach and keep it consistent.)

The initial cart state must be empty.

Technical Constraints

Use useState (do not use useReducer in this version).

Use TypeScript (do not use "any").

Use React 18 compatible syntax (.Provider).

Implement a custom useCart hook.

Add a null guard inside the hook.

Do not mutate state directly (use immutable updates).

Avoid unnecessary re-renders if possible.

EXPECTED USAGE EXAMPLE

The following component should work correctly:

function CartSummary() {
    const { items, totalItems, totalPrice } = useCart();

    return (
        <div>
            <p>Total distinct items: {items.length}</p>
            <p>Total items count: {totalItems}</p>
            <p>Total price: {totalPrice}</p>
        </div>
    );
}
