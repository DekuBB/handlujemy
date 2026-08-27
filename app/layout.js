import './globals.css';

export const metadata = {
  title: 'Handlujemy — Ogłoszenia i licytacje',
  description: 'Polska platforma ogłoszeń, sprzedaży i aukcji.'
};

export default function RootLayout({ children }) {
  return <html lang="pl"><body>{children}</body></html>;
}
