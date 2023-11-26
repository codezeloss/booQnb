interface Props {
  title: string;
  subtitle: string;
  center?: boolean;
}

export default function Heading({ title, subtitle, center }: Props) {
  return (
    <div className={`pb-4 ${center && "text-center"}`}>
      <p className="font-extrabold text-xl">{title}</p>
      <p className="text-base text-muted-foreground font-bold">{subtitle}</p>
    </div>
  );
}
