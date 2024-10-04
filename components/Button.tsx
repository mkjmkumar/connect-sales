import { buttonVariants } from 'shadcn/ui';

function Button({ children, ...props }) {
  return (
    <button className={buttonVariants()} {...props}>
      {children}
    </button>
  );
}

export default Button;