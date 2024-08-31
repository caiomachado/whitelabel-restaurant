export type Image = {
    id: number;
    image: string;
}

export enum AvailabilityType {
    AVAILABLE = 'AVAILABLE_NOW',
}

export type ModifierOption = {
    id: number;
    name: string;
    price?: number;
    maxChoices?: number;
    position?: number;
    visible?: number;
    availabilityType: AvailabilityType;
    qty?: number;
    available?: boolean;
}

export type ItemModifier = {
    id: number;
    name: string;
    minChoices?: number;
    maxChoices?: number;
    items: ModifierOption[];
}

export type MenuItem = {
    id: number;
    name: string;
    description?: string | null;
    alcoholic?: number;
    price?: number;
    position?: number;
    visible?: number;
    availabilityType?: AvailabilityType;
    sku?: string;
    modifiers?: ItemModifier[];
    images?: Image[];
    available?: boolean;
}

export type MenuSection = {
    id: number;
    name: string;
    description?: string | null;
    position?: number;
    visible?: number;
    images: Image[];
    items: MenuItem[];
}

export interface Menu {
    id: number;
    name: string;
    type: string;
    collapse: number;
    sections: MenuSection[];
}