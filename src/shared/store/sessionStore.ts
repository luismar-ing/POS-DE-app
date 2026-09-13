import { create } from "zustand";

interface CartItem {
    productId: string;
    quantity: number;
    unitPrice: number;
}

interface SessionState {
    isOnline: boolean;
    cart: CartItem[];
    setOnlineStatus: (status: boolean) => void;
    addToCart: (item: CartItem) => void;
    clearCart: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    isOnline: true,
    cart: [],
    setOnlineStatus: (status) => set({ isOnline: status }),
    addToCart: (item) =>
        // se guardan los valores previos del carrito (con state) y se agrega el nuevo item al final del array
        // no se utiliza push para que no se modifique el array original, sino que se cree uno nuevo con los valores previos y el nuevo item
        // asi React detecta el cambio y vuelve a renderizar los componentes
        set((state) => ({cart: [...state.cart, item]})),
    clearCart: () => set({cart: []})
}))