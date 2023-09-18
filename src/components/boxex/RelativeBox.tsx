interface RelativeBoxI {
  children: React.ReactNode
}
export const RelativeBox = ({ children }: RelativeBoxI) => {
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: 'red',
      }}
    >
      {children}
    </div>
  )
}
