import './card.scss';

const Card = ({
  children,
  className = '',
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={`kiwi-card ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
