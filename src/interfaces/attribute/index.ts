type TypeEnum = 'Cor' | 'Tamanho' | 'Tipo';

export interface ProductAttribute {
  type: TypeEnum;
  value: string;
  deletedAt?: Date;
}
