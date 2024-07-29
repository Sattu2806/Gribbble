import Container from "@/components/Container";
import TagComponent from "./_components/TagComponent";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <Container>
          <TagComponent/>
            {children}
        </Container>
    </section>
  );
}
