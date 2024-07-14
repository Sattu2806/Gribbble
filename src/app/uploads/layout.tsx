import Container from "@/components/Container";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <Container>
            {children}
        </Container>
    </section>
  );
}
