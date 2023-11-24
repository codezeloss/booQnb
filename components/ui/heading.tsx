interface Props {
  title: string;
  subtitle: string;
  center?: boolean;
}

export default function Heading({ title, subtitle, center }: Props) {
  return (
    <div className={`pb-4 ${center && "text-center"}`}>
      <p className="font-extrabold text-lg">{title}</p>
      <p className="text-sm text-muted-foreground font-bold">{subtitle}</p>
    </div>
  );
}
