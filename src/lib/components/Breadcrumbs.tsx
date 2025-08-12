export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="flex py-3 px-4 text-gray-600 dark:text-gray-300">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.path} className="inline-flex items-center">
            {index > 0 && (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mx-1 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>Separator</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            <a 
              href={item.path} 
              className={`inline-flex items-center text-sm font-medium ${
                index === items.length - 1 
                  ? 'text-primary-600 dark:text-primary-400 cursor-default' 
                  : 'hover:text-primary-700 dark:hover:text-primary-300'
              }`}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
