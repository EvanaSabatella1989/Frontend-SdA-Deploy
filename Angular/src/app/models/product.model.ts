export interface Category {
    id: string;
    name: string;
}

export interface Rating {
    rate: number,
    count: number
}

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    descripcion: string;
    categoria: string;
    rating?: Rating;
    taxes?: number;
    cantidad?: number
}

export interface CreateProductoDTO extends Omit<Producto, 'id' | "category"> {
    categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductoDTO> {}