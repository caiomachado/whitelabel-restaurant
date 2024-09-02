export type ModifierSelection = Record<string, SelectedModifierOption[]>

export type SelectedModifierOption = {
    name: string;
    price: number;
}

export type CartItem = {
    id: number;
    itemId: number;
    name: string;
    quantity: number;
    modifiers: ModifierSelection;
    unitPrice: number;
}