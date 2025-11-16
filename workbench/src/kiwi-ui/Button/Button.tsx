import './button.scss';

const Button = ({
  children,
  className = '',
  ...props
}: React.ComponentProps<'button'>) => (
  <button className={`kiwi-btn ${className}`} {...props}>
    {children}
  </button>
);

export default Button;
