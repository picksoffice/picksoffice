interface ResultBadgeProps {
  result: string;
  className?: string;
}

export function ResultBadge({ result, className = '' }: ResultBadgeProps) {
  // Exakt die Klassendefinitionen aus dem Beispiel verwenden
  let badgeClasses = '';

  switch (result) {
    case 'Win':
      badgeClasses =
        'inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20';
      break;
    case 'Loss':
      badgeClasses =
        'inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20';
      break;
    case 'Push':
      badgeClasses =
        'inline-flex items-center rounded-md bg-sky-300/10 px-2 py-1 text-xs font-medium text-sky-300 ring-1 ring-inset ring-sky-300/30';
      break;
    case 'Pending':
    default:
      badgeClasses =
        'inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20';
      break;
  }

  return <span className={`${badgeClasses} ${className}`}>{result}</span>;
}
