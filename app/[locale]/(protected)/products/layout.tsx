type BaseLayoutProps = {
    children: React.ReactNode;
  };
  
type ParallelRoutesLayoutProps = BaseLayoutProps & {
    modal: React.ReactNode;
};
  
export default function ProductsLayout(props: BaseLayoutProps | ParallelRoutesLayoutProps) {
    const { children, modal } = props as ParallelRoutesLayoutProps;
    return (
      <>
        {children}
        {modal}
      </>
    )
}