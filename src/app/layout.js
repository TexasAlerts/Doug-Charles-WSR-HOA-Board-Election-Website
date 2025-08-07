import './globals.css';

export const metadata = {
  title: 'Doug Charles for Windsong Ranch HOA Board',
  description: 'Transparency. Stewardship. Listening. Vote Doug Charles for Windsong Ranch HOA Board of Directors.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
