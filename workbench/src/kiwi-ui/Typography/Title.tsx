import './title.scss';

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: TitleLevel;
  className?: string;
}

const Title = ({
  children,
  level = 1,
  className = '',
  ...props
}: TitleProps) => {
  // Map of heading levels to actual JSX elements
  const headingElements: Record<TitleLevel, React.ElementType> = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  };

  const Tag = headingElements[level];

  return (
    <Tag className={`kiwi-title ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Title;
