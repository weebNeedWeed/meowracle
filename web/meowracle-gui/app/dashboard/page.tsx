import clsx from "clsx";
import FooterSimple from "@/app/ui/dashboard/footer-simple";
import CardAction from "@/app/ui/dashboard/card-action";
import NoSSRTemplateEditor from "@/app/ui/dashboard/no-ssr-template-editor";
import { Container } from "@mantine/core";
import { DragAndDropContextProvider } from "@/app/contexts/drag-and-drop";
import { ChooseTemplateContextProvider } from "../contexts/choose-template";
import { PreviewContextProvider } from "../contexts/preview";

const Section = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <section
    className={clsx(
      "h-full bg-white shadow-lg shadow-gray-200 rounded-lg w-1/4 border border-gray-200",
      className
    )}
  >
    {children}
  </section>
);

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col">
      <Container size="lg" className="h-full w-full grow-0 overflow-hidden">
        <div className="flex justify-start items-center gap-4 w-full h-full">
          <DragAndDropContextProvider>
            <ChooseTemplateContextProvider>
              <PreviewContextProvider>
                <Section className="p-4">
                  <CardAction />
                </Section>

                <Section className="p-5 w-3/4">
                  <NoSSRTemplateEditor />
                </Section>
              </PreviewContextProvider>
            </ChooseTemplateContextProvider>
          </DragAndDropContextProvider>
        </div>
      </Container>
      <FooterSimple />
    </div>
  );
}
