export type ModifierSelection = Record<number, SelectedModifierOption[]>

export type SelectedModifierOption = {
    name: string;
    price: number;
}

export type CartItem = {
    id: number;
    name: string;
    quantity: number;
    modifiers: ModifierSelection;
    unitPrice: number;
}