import { Converter } from './components/Converter';

export function App() {
  return (
    <>
      {/* Visually hidden h1 for SEO - screen readers and crawlers will see this */}
      <h1 className="visually-hidden">
        Unit Converter - Convert Length, Temperature, Data, Colors and More
      </h1>
      <main role="main" aria-label="Unit Converter">
        <Converter />
      </main>
    </>
  );
}
