interface DateProps {
  date: Date;
  type?: 'date' | 'time' | 'date_time';
}

const dateConverter = ({ date, type = 'date_time' }: DateProps) => {
  const convertToLocalDate = (inputDate: Date) => {
    switch (type) {
      case 'date':
        return inputDate.toLocaleDateString();
      case 'time':
        return inputDate.toLocaleTimeString();
      case 'date_time':
      default:
        return inputDate.toLocaleString();
    }
  };

  return convertToLocalDate(date);
};

export default dateConverter;
