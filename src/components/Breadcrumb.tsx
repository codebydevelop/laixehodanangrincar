import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://www.laixehodanangrincar.com${item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="breadcrumb" className="w-full text-sm opacity-80 mb-6 flex overflow-x-auto whitespace-nowrap">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index === items.length - 1 ? (
                <span className="font-semibold opacity-100">{item.label}</span>
              ) : (
                <>
                  <Link href={item.href} className="hover:opacity-100 hover:text-blue-500 transition-colors">
                    {item.label}
                  </Link>
                  <ChevronRight size={14} className="mx-2 opacity-50" />
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
