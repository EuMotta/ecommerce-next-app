export interface Company {
  _id: string;
  logo: string;
  cnpj: string;
  corporate_name: string;
  website: string;
  company_scores: CompanyScores;
  social_media: SocialMedia;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
}
export interface CompanyScores {
  avg_delivery_time: number;
  avg_products_quality: number;
  quantity: number;
}
