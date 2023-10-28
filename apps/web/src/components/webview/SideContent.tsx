type SideContentProps = {
  title: string
  children?: React.ReactNode
}

const SideContent: React.FC<SideContentProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col rounded-md"> {/* Col 2 */}
      <div className="bg-white rounded-md mb-4 overflow-hidden">
        <div className="title p-4 bg-gold font-bold text-center">
          {title}
        </div>
        <div className="rounded-md flex flex-col">
          <div>
            {children}
          </div>
          <div className="text-center p-2">
            <button className="mt-2 rounded-full bg-yellow-400 w-full">View all</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideContent
