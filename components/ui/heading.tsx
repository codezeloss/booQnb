interface Props {
  title: string;
  subtitle: string;
}

export default function Heading({ title, subtitle }: Props) {
  return (
    <div className="pb-4">
      <p className="font-extrabold text-lg">{title}</p>
      <p className="text-sm text-muted-foreground font-bold">{subtitle}</p>
    </div>
  );
}
