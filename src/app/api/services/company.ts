import Company from '@/models/seller/Company';

export class CompanyServices {
  async updateCompanyScore(
    companyId: string,
    rating: number,
    delivery_time: number,
  ) {
    const company = await Company.findById(companyId).exec();
    if (!company) {
      throw new Error('Empresa não encontrada');
    }

    const currentQuantity = company.company_scores.quantity || 0;
    const currentAvgQuality = company.company_scores.avg_products_quality || 0;
    const currentAvgDeliveryTime =
      company.company_scores.avg_delivery_time || 0;

    const newQuantity = currentQuantity + 1;

    const newAvgQuality =
      (currentAvgQuality * currentQuantity + rating) / newQuantity;
    const newAvgDeliveryTime =
      (currentAvgDeliveryTime * currentQuantity + delivery_time) / newQuantity;

    await Company.updateOne(
      { _id: companyId },
      {
        $set: {
          'company_scores.avg_products_quality': newAvgQuality,
          'company_scores.avg_delivery_time': newAvgDeliveryTime,
          'company_scores.quantity': newQuantity,
        },
      },
    );
  }
}
