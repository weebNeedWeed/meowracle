import clsx from "clsx";
import FooterSimple from "../ui/dashboard/footer-simple";
import CardAction from "../ui/dashboard/card-action";

const Section = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <section
    className={clsx(
      "h-full bg-white shadow-lg shadow-gray-200 rounded-lg p-4 w-1/4 border border-gray-200",
      className
    )}
  >
    {children}
  </section>
);

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-start items-center grow gap-4">
        <Section>
          <CardAction />
        </Section>

        <Section className="grow"></Section>
      </div>

      <FooterSimple />
    </div>
  );
}
