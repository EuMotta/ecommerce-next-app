import { ClipboardList, Info } from 'lucide-react';

interface TechnicalSpecificationsProps {
  characteristics: string;
  specifications: {
    _id: string;
    title: string;
    description: string[];
  }[];
}

const TechnicalSpecifications = ({
  characteristics,
  specifications,
}: TechnicalSpecificationsProps) => {
  return (
    <div className="space-y-10">
      <div>
        <h4 className="mb-5 flex gap-2 uppercase">
          <Info className="text-primary" size={26} />
          <strong>Características</strong>
        </h4>
        <span>{characteristics}</span>
      </div>
      <div>
        <h4 className="mb-5 flex gap-2 uppercase">
          <ClipboardList className="text-primary" size={26} />
          <strong>Descrição</strong>
        </h4>
        <div>
          {specifications.map((spec) => (
            <div key={spec._id} className="mb-4">
              <h5 className="font-bold">{spec.title}</h5>
              <ul className="list-inside list-disc text-xs text-muted-foreground">
                {spec.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;
