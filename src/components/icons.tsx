import { Landmark, Rocket, Shield, type LucideProps } from 'lucide-react';

export const Icons = {
  general: (props: LucideProps) => <Landmark {...props} />,
  space: (props: LucideProps) => <Rocket {...props} />,
  war: (props: LucideProps) => <Shield {...props} />,
};
